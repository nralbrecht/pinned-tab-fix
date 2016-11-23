let lastActiveTabId = 0;
let loadInBackground = true;

chrome.storage.local.get("loadInBackground", function(res) {
	if (res.loadInBackground === undefined) {
		loadInBackground = true;

		chrome.storage.local.set({
			"loadInBackground": true
		});
	} else {
		loadInBackground = res.loadInBackground;
	}
});

chrome.storage.onChanged.addListener(function(changes) {
	if (changes["loadInBackground"]) {
		loadInBackground = changes["loadInBackground"].newValue;
	}
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
	lastActiveTabId = activeInfo.tabId;
});

chrome.tabs.onCreated.addListener(function(tab) {
	chrome.tabs.get(lastActiveTabId, function(lastActiveTab) {
		if (lastActiveTab.pinned || lastActiveTabId === tab.id) {
			chrome.tabs.move(tab.id, {
				index: -1
			}, function() {
				if (loadInBackground) {
					chrome.tabs.update(lastActiveTab.id, { active: true });
				} else {
					chrome.tabs.update(tab.id, { active: true });
				}
			});
		}
	});
});
