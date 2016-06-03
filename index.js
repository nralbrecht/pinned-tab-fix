var tabs = require('sdk/tabs');
var utils = require("sdk/tabs/utils");
var { viewFor } = require("sdk/view/core");
var { Hotkey } = require("sdk/hotkeys");
var { Cu, Ci } = require('chrome');
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

var lastActiveTab = null;

tabs.on('open', function onOpen(tab){
  console.log([tab.id, tab.title, tab.url, tab.index, tab.window, tab.readyState]);
  if(lastActiveTab != null){
    if(lastActiveTab.isPinned){
      const lowLevelTab = viewFor(tab);
      const lowLevelBrowser = utils.getTabBrowserForTab(lowLevelTab);

      lowLevelBrowser.addProgressListener({
        QueryInterface: XPCOMUtils.generateQI(["nsIWebProgressListener", "nsISupportsWeakReference"]),
        onStateChange: function(aWebProgress, aRequest, aFlag, aStatus) {
          // lowLevelBrowser.moveTabTo(lowLevelTab, tab.window.tabs.length + 1);
          console.log("state");
          if (aFlag & Ci.nsIWebProgressListener.STATE_START) {
            // This fires when the load event is initiated
            console.log("start");
            // console.log({"flag": aFlag, "status": aStatus, "tab-readystate": tab.readyState});
          }
        },
        onLocationChange: function(aProgress, aRequest, aURI, aFlag) {
          console.log("location");
          lowLevelBrowser.moveTabTo(lowLevelTab, tab.window.tabs.length + 1);
        },
        onProgressChange: function(aWebProgress, aRequest, curSelf, maxSelf, curTot, maxTot) {
          console.log("progress");
          // lowLevelBrowser.moveTabTo(lowLevelTab, tab.window.tabs.length + 1);
        },
        onStatusChange: function(aWebProgress, aRequest, aStatus, aMessage) {
          console.log("status");
          // lowLevelBrowser.moveTabTo(lowLevelTab, tab.window.tabs.length + 1);
        },
        onSecurityChange: function(aWebProgress, aRequest, aState) {
          console.log("security");
          // lowLevelBrowser.moveTabTo(lowLevelTab, tab.window.tabs.length + 1);
        }
      });

      var tempTab = lastActiveTab;

      tab.activate();
      tab.index = tab.window.tabs.length + 1;
      tempTab.activate();
    }
  }
});

tabs.on('activate', function onActive(tab){
  lastActiveTab = tab;
});

tabs.open({
  url: "https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/tabs",
  isPinned: true
});

var showHotKey = Hotkey({
  combo: "accel-space",
  onPress: function() {
    var ij = lastActiveTab.window.tabs.length;
  }
});
