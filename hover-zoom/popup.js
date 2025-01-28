document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleButton');
  let extensionActive = false;

  toggleButton.addEventListener('click', () => {
    extensionActive = !extensionActive;
    toggleButton.textContent = extensionActive ? 'Disable Extension' : 'Enable Extension';

    // Send a message to the background script to toggle the functionality
    chrome.runtime.sendMessage({ action: 'toggleExtension', isActive: extensionActive });
  });
});
