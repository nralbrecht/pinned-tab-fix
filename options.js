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

document.getElementsByClassName('preferences-title')[0].innerText = chrome.i18n.getMessage("loadInBackgroundName");
document.getElementsByClassName('preferences-description')[0].innerText = chrome.i18n.getMessage("loadInBackgroundDescription");
