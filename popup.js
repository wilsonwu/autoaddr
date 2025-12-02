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
      const url = `${baseUrl}openai/deployments/${azureDeployment}/chat/completions?api-version=2024-02-15-preview`;

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
              content: "You are an address parser. Return ONLY a raw JSON object (no markdown code blocks) with keys: street, city, state, zip, country."
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
          <div><b>Street:</b> ${addr.street || ''}</div>
          <div><b>City:</b> ${addr.city || ''}</div>
          <div><b>State:</b> ${addr.state || ''}</div>
          <div><b>Zip:</b> ${addr.zip || ''}</div>
          <div><b>Country:</b> ${addr.country || ''}</div>
        `;
      } catch (e) {
        outputDiv.textContent = 'Could not parse JSON: ' + content;
      }

    } catch (error) {
      outputDiv.textContent = 'Error: ' + error.message;
    }
  });
});
