let tabs = require('sdk/tabs');
let utils = require("sdk/tabs/utils");
let options = require("sdk/simple-prefs");
let { viewFor } = require("sdk/view/core");

let lastActiveTab = null;

tabs.on('open', function onOpen(tab){
  if(lastActiveTab != null){
    if(lastActiveTab.isPinned){
      const lowLevelTab = viewFor(tab);
      const lowLevelBrowser = utils.getTabBrowserForTab(lowLevelTab);

      const progressEventHandler = {
        onStateChange: function() {
          lowLevelBrowser.moveTabTo(lowLevelTab, tab.window.tabs.length + 1);
          lowLevelBrowser.removeProgressListener(progressEventHandler);
        }
      }

      lowLevelBrowser.addProgressListener(progressEventHandler);

      let tempTab = lastActiveTab;
      tab.activate();
      if (!(options.prefs.openInForground || lowLevelTab.getAttribute("label") === "Neuer Tab")) {
        tempTab.activate();
      }
    }
  }
});

tabs.on('activate', function onActive(tab){
  lastActiveTab = tab;
});
