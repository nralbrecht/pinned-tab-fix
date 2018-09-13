let lastActiveTab = {
	"id": 0,
	"pinned": false
};
let loadInBackground = true;

browser.storage.local.get("loadInBackground", function(res) {
	if (res.loadInBackground === undefined) {
		loadInBackground = true;

		browser.storage.local.set({
			"loadInBackground": true
		});
	} else {
		loadInBackground = res.loadInBackground;
	}
});

browser.storage.onChanged.addListener(function(changes) {
	if (changes["loadInBackground"]) {
		loadInBackground = changes["loadInBackground"].newValue;
	}
});

browser.tabs.onActivated.addListener(function(activeInfo) {
	browser.tabs.get(activeInfo.tabId).then(function(activeTab) {
		lastActiveTab = {
			"id": activeTab.id,
			"pinned": activeTab.pinned
		};
	});
});

browser.tabs.onCreated.addListener(function(tab) {
	if (lastActiveTab.pinned) {
		browser.tabs.query({
			windowId: tab.windowId
		})
		.then(function(tabs) {
			return browser.tabs.get(tab.id).then(function(tabInfo) {
				// don't move these tabs
				let newTab = tab.url == "about:newtab"; // new tab
				let rightEnd = tab.index == tabs.length - 1; // already at the right
				let lastClosed = tab.url == "about:blank" && tab.favIconUrl // undo close tab

				if (!lastClosed && !newTab && !rightEnd) {
					return browser.tabs.move(tab.id, {
						index: -1
					});
				}
			})
		})
		.then(function() {
			// in all cases scroll tab bar to the right
			browser.tabs.update(tab.id, { active: true });
			
			if (loadInBackground) {
				browser.tabs.update(lastActiveTab.id, { active: true });
			}
		});
	}
});
