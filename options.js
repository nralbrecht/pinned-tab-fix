let checkbox = document.getElementById('loadInBackground');

chrome.storage.local.get("loadInBackground", function(res) {
	if (res.loadInBackground !== undefined) {
		checkbox.checked = !res.loadInBackground;
	}
});

checkbox.addEventListener("click", function(e) {
	chrome.storage.local.set({
		"loadInBackground": !e.target.checked
	});
});
