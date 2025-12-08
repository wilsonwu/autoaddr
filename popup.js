console.log('This is a popup!');
const textarea = document.getElementById('addressInput');
console.log('Textarea found:', textarea);

// Initialize i18n
document.addEventListener('DOMContentLoaded', async () => {
  await i18n.init();
  i18n.apply();
});

document.getElementById('splitBtn').addEventListener('click', () => {
  const address = textarea.value;
  const outputDiv = document.getElementById('output');
  
  if (!address) {
    outputDiv.textContent = i18n.getText('msgEnterAddress');
    return;
  }

  outputDiv.textContent = i18n.getText('msgProcessing');

  chrome.storage.sync.get(['azureEndpoint', 'azureApiKey', 'azureDeployment'], async (items) => {
    const { azureEndpoint, azureApiKey, azureDeployment } = items;

    if (!azureEndpoint || !azureApiKey || !azureDeployment) {
      outputDiv.innerHTML = i18n.getText('msgConfigError');
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
              content: "You are an address parser. Return ONLY a raw JSON object (no markdown code blocks) with keys: name, province, city, address, zip_code, country. If province/state is missing in the input, infer it from the city. Do not separate house number, include it in the address field."
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

        // If province is missing but city exists, try to complete it
        if ((!addr.province || addr.province === 'null' || addr.province === '') && addr.city) {
          outputDiv.textContent = i18n.getText('msgCompleting');
          try {
            const countryContext = addr.country ? ` in ${addr.country}` : '';
            const compResponse = await fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'api-key': azureApiKey
              },
              body: JSON.stringify({
                messages: [
                  {
                    role: "system", 
                    content: "You are a geography helper. Return ONLY the province/state name for the given city. Do not return JSON, just the name."
                  },
                  {
                    role: "user", 
                    content: `Which province/state is the city "${addr.city}"${countryContext}?`
                  }
                ],
                temperature: 0.1
              })
            });

            if (compResponse.ok) {
              const compData = await compResponse.json();
              let inferredProvince = compData.choices[0].message.content.trim();
              // Remove trailing period if present
              if (inferredProvince.endsWith('.')) {
                inferredProvince = inferredProvince.slice(0, -1);
              }
              addr.province = inferredProvince;
            }
          } catch (compError) {
            console.error("Failed to infer province:", compError);
            // Continue with original data if inference fails
          }
        }

        outputDiv.innerHTML = `
          <div class="result-item" data-value="${addr.name || ''}"><b>${i18n.getText('fieldName')}:</b> <span class="value">${addr.name || ''}</span></div>
          <div class="result-item" data-value="${addr.province || ''}"><b>${i18n.getText('fieldProvince')}:</b> <span class="value">${addr.province || ''}</span></div>
          <div class="result-item" data-value="${addr.city || ''}"><b>${i18n.getText('fieldCity')}:</b> <span class="value">${addr.city || ''}</span></div>
          <div class="result-item" data-value="${addr.address || ''}"><b>${i18n.getText('fieldAddress')}:</b> <span class="value">${addr.address || ''}</span></div>
          <div class="result-item" data-value="${addr.zip_code || ''}"><b>${i18n.getText('fieldZip')}:</b> <span class="value">${addr.zip_code || ''}</span></div>
          <div class="copy-hint">${i18n.getText('lblClickToCopy')}</div>
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
        outputDiv.textContent = i18n.getText('msgParseError') + content;
      }

    } catch (error) {
      outputDiv.textContent = i18n.getText('msgApiError') + error.message;
    }
  });
});
