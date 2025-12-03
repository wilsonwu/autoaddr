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
          <div><b>姓名:</b> ${addr.name || ''}</div>
          <div><b>省/州:</b> ${addr.province || ''}</div>
          <div><b>城市:</b> ${addr.city || ''}</div>
          <div><b>门牌号:</b> ${addr.house_number || ''}</div>
          <div><b>地址:</b> ${addr.address || ''}</div>
          <div><b>邮编:</b> ${addr.zip_code || ''}</div>
        `;
      } catch (e) {
        outputDiv.textContent = 'Could not parse JSON: ' + content;
      }

    } catch (error) {
      outputDiv.textContent = 'Error: ' + error.message;
    }
  });
});
