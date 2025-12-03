// Saves options to chrome.storage
const saveOptions = () => {
  const endpoint = document.getElementById('endpoint').value;
  const apiKey = document.getElementById('apiKey').value;
  const deployment = document.getElementById('deployment').value;
  const language = document.getElementById('language').value;

  chrome.storage.sync.set(
    { azureEndpoint: endpoint, azureApiKey: apiKey, azureDeployment: deployment, language: language },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = i18n.getText('msgSaved');
      setTimeout(() => {
        status.textContent = '';
      }, 750);
      
      // Reload to apply language changes immediately if needed
      if (language !== i18n.getLang()) {
        location.reload();
      }
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = async () => {
  await i18n.init();
  i18n.apply();

  chrome.storage.sync.get(
    { azureEndpoint: '', azureApiKey: '', azureDeployment: '', language: i18n.getLang() },
    (items) => {
      document.getElementById('endpoint').value = items.azureEndpoint;
      document.getElementById('apiKey').value = items.azureApiKey;
      document.getElementById('deployment').value = items.azureDeployment;
      document.getElementById('language').value = items.language;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
