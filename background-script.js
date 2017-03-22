let lastActiveTab = {
	"id": 0,
	"pinned": false
};
let secondToLastTab = lastActiveTab;
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
	chrome.tabs.get(activeInfo.tabId, function(activeTab) {
		secondToLastTab = lastActiveTab;
		lastActiveTab = {
			"id": activeInfo.tabId,
			"pinned": activeTab.pinned
		};
	});
});

chrome.tabs.onCreated.addListener(function(tab) {
	if (lastActiveTab.pinned || (secondToLastTab.pinned && lastActiveTab.id === tab.id)) {
		chrome.tabs.move(tab.id, {
			index: -1
		}, function() {
			chrome.tabs.update(tab.id, { active: true });

			if (loadInBackground) {
				chrome.tabs.update(lastActiveTab.id, { active: true });
			}
		});
	}
});
