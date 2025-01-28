document.addEventListener('DOMContentLoaded', function () {
  const toggleButton = document.getElementById('toggleButton');
  const whitelistInput = document.getElementById('whitelistInput');
  const addWhitelist = document.getElementById('addWhitelist');
  const whitelist = document.getElementById('whitelist');
  const toggleWhitelist = document.getElementById('toggleWhitelist');
  const blacklistInput = document.getElementById('blacklistInput');
  const addBlacklist = document.getElementById('addBlacklist');
  const blacklist = document.getElementById('blacklist');
  const toggleBlacklist = document.getElementById('toggleBlacklist');

  // Set default state to disabled if not already set
  chrome.storage.local.get(['enabled', 'whitelist', 'blacklist', 'whitelistEnabled', 'blacklistEnabled'], function (result) {
    if (result.enabled === undefined) {
      chrome.storage.local.set({ enabled: false });
      toggleButton.textContent = 'Enable Content Script';
    } else {
      toggleButton.textContent = result.enabled ? 'Disable Content Script' : 'Enable Content Script';
    }

    if (result.whitelist) {
      result.whitelist.forEach(domain => {
        addListItem(whitelist, domain, 'whitelist');
      });
    }

    if (result.blacklist) {
      result.blacklist.forEach(domain => {
        addListItem(blacklist, domain, 'blacklist');
      });
    }

    toggleWhitelist.textContent = result.whitelistEnabled ? 'Disable Whitelist' : 'Enable Whitelist';
    toggleBlacklist.textContent = result.blacklistEnabled ? 'Disable Blacklist' : 'Enable Blacklist';
  });

  toggleButton.addEventListener('click', function () {
    chrome.storage.local.get(['enabled'], function (result) {
      const newState = !result.enabled;
      chrome.storage.local.set({ enabled: newState }, function () {
        toggleButton.textContent = newState ? 'Disable Content Script' : 'Enable Content Script';
        
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          const activeTab = tabs[0];
          chrome.runtime.sendMessage({ enabled: newState, tabId: activeTab.id });
        });
      });
    });
  });

  addWhitelist.addEventListener('click', function () {
    const domain = whitelistInput.value.trim();
    if (domain) {
      chrome.storage.local.get(['whitelist'], function (result) {
        const newWhitelist = result.whitelist || [];
        newWhitelist.push(domain);
        chrome.storage.local.set({ whitelist: newWhitelist }, function () {
          addListItem(whitelist, domain, 'whitelist');
          whitelistInput.value = '';
        });
      });
    }
  });

  toggleWhitelist.addEventListener('click', function () {
    chrome.storage.local.get(['whitelistEnabled'], function (result) {
      const newState = !result.whitelistEnabled;
      chrome.storage.local.set({ whitelistEnabled: newState }, function () {
        toggleWhitelist.textContent = newState ? 'Disable Whitelist' : 'Enable Whitelist';
      });
    });
  });

  addBlacklist.addEventListener('click', function () {
    const domain = blacklistInput.value.trim();
    if (domain) {
      chrome.storage.local.get(['blacklist'], function (result) {
        const newBlacklist = result.blacklist || [];
        newBlacklist.push(domain);
        chrome.storage.local.set({ blacklist: newBlacklist }, function () {
          addListItem(blacklist, domain, 'blacklist');
          blacklistInput.value = '';
        });
      });
    }
  });

  toggleBlacklist.addEventListener('click', function () {
    chrome.storage.local.get(['blacklistEnabled'], function (result) {
      const newState = !result.blacklistEnabled;
      chrome.storage.local.set({ blacklistEnabled: newState }, function () {
        toggleBlacklist.textContent = newState ? 'Disable Blacklist' : 'Enable Blacklist';
      });
    });
  });

  function addListItem(list, domain, type) {
    const li = document.createElement('li');
    li.className = 'list-item';

    const input = document.createElement('input');
    input.type = 'text';
    input.value = domain;
    input.disabled = true;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function () {
      if (input.disabled) {
        input.disabled = false;
        editButton.textContent = 'Save';
      } else {
        const newDomain = input.value.trim();
        if (newDomain) {
          chrome.storage.local.get([type], function (result) {
            const list = result[type] || [];
            const index = list.indexOf(domain);
            if (index !== -1) {
              list[index] = newDomain;
              chrome.storage.local.set({ [type]: list }, function () {
                input.disabled = true;
                editButton.textContent = 'Edit';
              });
            }
          });
        }
      }
    });

    const removeButton = document.createElement('button');
    removeButton.textContent = 'X';
    removeButton.addEventListener('click', function () {
      chrome.storage.local.get([type], function (result) {
        const list = result[type] || [];
        const index = list.indexOf(domain);
        if (index !== -1) {
          list.splice(index, 1);
          chrome.storage.local.set({ [type]: list }, function () {
            li.remove();
          });
        }
      });
    });

    li.appendChild(input);
    li.appendChild(editButton);
    li.appendChild(removeButton);
    list.appendChild(li);
  }
});

