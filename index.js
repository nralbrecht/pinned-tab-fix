let utils = require("sdk/tabs/utils");
let options = require("sdk/simple-prefs");
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

      let tempTabIndex = lastActiveTabIndex;
      tab.activate();
      if (!(options.prefs.openInForground || lowLevelTab.getAttribute("label") === "Neuer Tab")) {
        window.tabs[tempTabIndex].activate();
      }
    }
  });
}

for each (let window in windows) {
  onWindowOpen(window);
}

windows.on('open', onWindowOpen);
