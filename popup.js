console.log('This is a popup!');
const textarea = document.getElementById('addressInput');
console.log('Textarea found:', textarea);

document.getElementById('splitBtn').addEventListener('click', () => {
  const address = textarea.value;
  const outputDiv = document.getElementById('output');
  
  if (!address) {
    outputDiv.textContent = 'Please enter an address.';
    return;
  }

  outputDiv.textContent = 'Processing...';

  chrome.storage.sync.get(['azureEndpoint', 'azureApiKey', 'azureDeployment'], async (items) => {
    const { azureEndpoint, azureApiKey, azureDeployment } = items;

    if (!azureEndpoint || !azureApiKey || !azureDeployment) {
      outputDiv.innerHTML = 'Please configure Azure OpenAI settings in <a href="#" id="openOptions">Options</a>.';
      document.getElementById('openOptions').addEventListener('click', () => chrome.runtime.openOptionsPage());
      return;
    }

    try {
      // Ensure endpoint ends with slash
      let baseUrl = azureEndpoint.endsWith('/') ? azureEndpoint : azureEndpoint + '/';
      const url = `${baseUrl}openai/deployments/${azureDeployment}/chat/completions?api-version=2024-05-01-preview`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': azureApiKey
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system", 
              content: "You are an address parser. Return ONLY a raw JSON object (no markdown code blocks) with keys: name, province, city, house_number, address, zip_code."
            },
            {
              role: "user", 
              content: address
            }
          ],
          temperature: 0.1
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      try {
        const addr = JSON.parse(content);
        outputDiv.innerHTML = `
          <div class="result-item" data-value="${addr.name || ''}"><b>姓名:</b> <span class="value">${addr.name || ''}</span></div>
          <div class="result-item" data-value="${addr.province || ''}"><b>省/州:</b> <span class="value">${addr.province || ''}</span></div>
          <div class="result-item" data-value="${addr.city || ''}"><b>城市:</b> <span class="value">${addr.city || ''}</span></div>
          <div class="result-item" data-value="${addr.house_number || ''}"><b>门牌号:</b> <span class="value">${addr.house_number || ''}</span></div>
          <div class="result-item" data-value="${addr.address || ''}"><b>地址:</b> <span class="value">${addr.address || ''}</span></div>
          <div class="result-item" data-value="${addr.zip_code || ''}"><b>邮编:</b> <span class="value">${addr.zip_code || ''}</span></div>
          <div class="copy-hint">点击条目即可复制</div>
        `;

        // Add click event listeners for copying
        const items = outputDiv.querySelectorAll('.result-item');
        items.forEach(item => {
          item.addEventListener('click', () => {
            const text = item.getAttribute('data-value');
            if (text) {
              navigator.clipboard.writeText(text).then(() => {
                // Visual feedback
                const originalBg = item.style.backgroundColor;
                item.style.backgroundColor = '#d0ebff';
                setTimeout(() => {
                  item.style.backgroundColor = originalBg;
                }, 200);
              });
            }
          });
        });

      } catch (e) {
        outputDiv.textContent = 'Could not parse JSON: ' + content;
      }

    } catch (error) {
      outputDiv.textContent = 'Error: ' + error.message;
    }
  });
});
