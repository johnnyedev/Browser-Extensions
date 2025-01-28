chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.enabled !== undefined && message.tabId !== undefined) {
    chrome.tabs.get(message.tabId, function (tab) {
      const url = new URL(tab.url);
      const domain = url.hostname;

      chrome.storage.local.get(['whitelist', 'blacklist', 'whitelistEnabled', 'blacklistEnabled'], function (result) {
        const whitelistEnabled = result.whitelistEnabled;
        const blacklistEnabled = result.blacklistEnabled;
        const whitelist = result.whitelist || [];
        const blacklist = result.blacklist || [];

        if (whitelistEnabled && !whitelist.includes(domain)) {
          console.log('Domain not in whitelist');
          return;
        }

        if (blacklistEnabled && blacklist.includes(domain)) {
          console.log('Domain in blacklist');
          return;
        }

        if (message.enabled) {
          chrome.scripting.executeScript({
            target: { tabId: message.tabId },
            files: ['content.js']
          });
        } else {
          chrome.scripting.executeScript({
            target: { tabId: message.tabId },
            func: () => {
              // Disable content script functionality
              if (window.contentScriptEnabled) {
                window.contentScriptEnabled = false;
                // Add any cleanup code here if needed
              }
            }
          });
        }
      });
    });
  }
});
