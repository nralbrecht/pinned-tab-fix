let lastActiveTab = {
	"id": 0,
	"pinned": false
};
let loadInBackground = true;

browser.storage.local.get("loadInBackground").then(function(res) {
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

browser.tabs.query({active: true, currentWindow: true}).then((activeTabs) => {
	lastActiveTab = {
		"id": activeTabs[0].id,
		"pinned": activeTabs[0].pinned
	}
});
browser.tabs.onActivated.addListener(function(activeInfo) {
	browser.tabs.get(activeInfo.tabId).then(function(activeTab) {
		if (activeTab.status == "complete") {
			lastActiveTab = {
				"id": activeTab.id,
				"pinned": activeTab.pinned
			};
		}
	});
});

const onUpdatedEventFilter = {
	"properties": [
		"pinned"
	]
};
browser.tabs.onUpdated.addListener(function(_, _, updatedTab) {
	if (updatedTab.active && updatedTab.pinned && updatedTab.status === "complete") {
		lastActiveTab = {
			"id": updatedTab.id,
			"pinned": updatedTab.pinned
		};
	}
}, onUpdatedEventFilter);

browser.tabs.onCreated.addListener(function(tab) {
	if (lastActiveTab.pinned) {
		browser.tabs.query({
			"currentWindow": true,
			"pinned": true
		})
		.then(function(tabs) {
			if (tab.index == tabs.length || tab.index == tabs.length + 1) {
				browser.tabs.move(tab.id, {
					index: -1
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
	}
});
