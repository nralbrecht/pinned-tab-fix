let checkbox = document.getElementById('loadInBackground');

browser.storage.local.get("loadInBackground").then(function(res) {
	if (res.loadInBackground !== undefined) {
		checkbox.checked = !res.loadInBackground;
	}
});

checkbox.addEventListener("click", function(e) {
	browser.storage.local.set({
		"loadInBackground": !e.target.checked
	});
});

document.getElementsByClassName('preferences-title')[0].innerText = browser.i18n.getMessage("loadInBackgroundName");
document.getElementsByClassName('preferences-description')[0].innerText = browser.i18n.getMessage("loadInBackgroundDescription");
