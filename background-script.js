let loadInBackground = true;

// initialise loadInBackground with the value in storage or set to true
browser.storage.local.get("loadInBackground").then(function(res) {
	if (res.loadInBackground === undefined) {
		browser.storage.local.set({
			"loadInBackground": loadInBackground
		});
	} else {
		loadInBackground = res.loadInBackground;
	}
});

// update loadInBackground when it is changed in the options
browser.storage.onChanged.addListener(function(changes) {
	if (changes["loadInBackground"]) {
		loadInBackground = changes["loadInBackground"].newValue;
	}
});

// init lastActiveTab
let lastActiveTab = {
	"id": 0,
	"pinned": false,
	"windowId": 0
};

function setLastActiveTab(id, pinned, windowId) {
	lastActiveTab.id = id;
	lastActiveTab.pinned = pinned;
	lastActiveTab.windowId = windowId;
}

// initialise lastActiveTab with current active tab as no initial onActivated ist emitted
browser.tabs.query({active: true, currentWindow: true}).then((activeTabs) => {
	setLastActiveTab(activeTabs[0].id, activeTabs[0].pinned, activeTabs[0].windowId);
});

// keep lastActiveTab up to date when user changes tab
browser.tabs.onActivated.addListener(function(activeInfo) {
	browser.tabs.get(activeInfo.tabId).then((activeTab) => {
		// prevent saving tab when its immediately closed again
		if (activeTab.status == "complete") {
			setLastActiveTab(activeTab.id, activeTab.pinned, activeTab.windowId);
		}
	});
});

browser.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	if (tab.active && tab.status === "complete") {
		// save lastActiveTab when it was not saved by onActivated and it has finished loading

		browser.tabs.get(tabId).then((activeTab) => {
			setLastActiveTab(activeTab.id, activeTab.pinned, activeTab.windowId);
		});
	}
	else if (tab.active && tab.pinned && tab.status === "complete") {
		// compensate the fact that no onActivated event is emitted when the active tab is pinned

		browser.tabs.get(tabId).then((activeTab) => {
			setLastActiveTab(activeTab.id, activeTab.pinned, activeTab.windowId);
		});
	}
}, {
	"properties": ["status", "pinned"]
});

// update lastActiveTab when focusing a different firefox window
browser.windows.onFocusChanged.addListener(function(windowId) {
	if (browser.windows.WINDOW_ID_NONE === windowId) {
		return;
	}

	browser.tabs.query({active: true, currentWindow: true}).then((activeTabs) => {
		setLastActiveTab(activeTabs[0].id, activeTabs[0].pinned, activeTabs[0].windowId);
	});
});

// when a new tab is opened and the last active tab was pinned, move tab to the right and conditionaly keep it activated
browser.tabs.onCreated.addListener(function(tab) {
	if (lastActiveTab.pinned && lastActiveTab.windowId === tab.windowId) {
		browser.tabs.query({
			"windowId": tab.windowId,
			"pinned": true
		})
		.then(function(tabs) {
			if (tab.index == tabs.length || tab.index == tabs.length + 1) {
				browser.tabs.move(tab.id, {
					index: -1
				})
				.then(function() {
					// in all cases scroll tab bar to the right
					browser.tabs.update(tab.id, { active: true }).then(function() {
						if (loadInBackground) {
							// conditionaly refocus source tab
							browser.tabs.update(lastActiveTab.id, { active: true });
						}
					});
				});
			}
		});
	}
});
