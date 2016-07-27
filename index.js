let utils = require("sdk/tabs/utils");
let { viewFor } = require("sdk/view/core");
let windows = require('sdk/windows').browserWindows;

function onWindowOpen(window) {
  let lastActiveTabIndex = window.tabs.activeTab.index;

  window.tabs.on('activate', function onActive(tab){
    lastActiveTabIndex = tab.index;
  });

  window.tabs.on('open', function onOpen(tab){
    if(window.tabs[lastActiveTabIndex].isPinned){
      const lowLevelTab = viewFor(tab);
      const lowLevelBrowser = utils.getTabBrowserForTab(lowLevelTab);

      const progressEventHandler = {
        onStateChange: function() {
          lowLevelBrowser.moveTabTo(lowLevelTab, window.tabs.length + 1);
          lowLevelBrowser.removeProgressListener(progressEventHandler);
        }
      }

      lowLevelBrowser.addProgressListener(progressEventHandler);

      tab.activate();
      if ((tab.url !== 'about:newtab') && require('sdk/preferences/service').get('browser.tabs.loadInBackground', true)) {
        window.tabs[lastActiveTabIndex].activate();
      }
    }
  });
}

for each (let window in windows) {
  onWindowOpen(window);
}

windows.on('open', onWindowOpen);
