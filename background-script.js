let lastActiveTabId = 0;

chrome.tabs.onActivated.addListener(function(activeInfo) {
	lastActiveTabId = activeInfo.tabId;
});

chrome.tabs.onCreated.addListener(function(tab) {
	chrome.tabs.get(lastActiveTabId, function(lastActiveTab) {
		if (lastActiveTab.pinned) {
			chrome.tabs.move(tab.id, {
				index: -1
			}, function(updatedTab) {
				if (updatedTab.url === 'about:newtab') {
					chrome.tabs.update(updatedTab.id, { active: true });
				} else {
					chrome.tabs.update(lastActiveTab.id, { active: true });
				}
			});
		}
	});
});
