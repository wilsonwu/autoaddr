// Saves options to chrome.storage
const saveOptions = () => {
  const endpoint = document.getElementById('endpoint').value;
  const apiKey = document.getElementById('apiKey').value;
  const deployment = document.getElementById('deployment').value;

  chrome.storage.sync.set(
    { azureEndpoint: endpoint, azureApiKey: apiKey, azureDeployment: deployment },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { azureEndpoint: '', azureApiKey: '', azureDeployment: '' },
    (items) => {
      document.getElementById('endpoint').value = items.azureEndpoint;
      document.getElementById('apiKey').value = items.azureApiKey;
      document.getElementById('deployment').value = items.azureDeployment;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
