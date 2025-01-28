chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

  if (request.action === 'toggleExtension') {
    // Implement the logic to toggle the extension's functionality
    // For example, you might send a message to a content script to enable/disable certain behaviors
    console.log('Extension is now', request.isActive ? 'active' : 'inactive');
    
    
  } else {
    console.log("Script inactive");
  }

});
