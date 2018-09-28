# Pinned Tabs Fix

Get the add-on from the [Mozilla add-on page](https://addons.mozilla.org/de/firefox/addon/pinned-tabs-fix/).

Tabs that are opened from a pinned one are opened at the far left of the tab bar. This gets problematic if you use a large amount of tabs because you start to jump from the left to the right end of your tab bar. Normally new tabs are opened on the right end - this add-on ensures that tabs from a pinned tab are opened on the right end, too.

This add-on adds the functions described in [this bug discussion](https://bugzilla.mozilla.org/show_bug.cgi?id=970102).

##### Known Issues:
Due to limitations in the implementation of Add-on in Firefox you may see the tabbar scrolling from left to right. Depending on your settings you may also see flashing of the current page when opening a new Tab.

## Changelog
### [v2.3.1] (Firefox 48.0 - *)
- Remove "tabs" permission

### [v2.3.0] (Firefox 48.0 - *)
- Rework of the core logic
- Only move tabs that were opened from a pinned tab

### [v2.2.3] (Firefox 48.0 - *)
- Check if a tab was opened via "undo close tab"

### [v2.2.2] (Firefox 48.0 - *)
- Add icon

### [v2.2.1] (Firefox 48.0 - *)
- Add "tabs" permission
- Check for "about:newtab" via the url

### [v2.2.0] (Firefox 48.0 - *)
- Swich from callbacks to promises

### [v2.1.0] (Firefox 48.0 - Firefox 60.0a1)
- Always activate new tabs
- Always activate links opened from other applications

### v2.0.7 (Firefox 48.0 - Firefox 54.*)
- Always activate new tabs

### [v2.0.6] (Firefox 48.0 - Firefox 54.*)
- Always open links in unpined tabs on the direct right

### [v2.0.5] (Firefox 48.0 - Firefox 54.*)
- Open links with blank target, on the right

### [v2.0.4] (Firefox 48.0 - Firefox 54.*)
- Add an option page
- Localize option page
- Remove "tabs" permission

### v2.0.3 (Firefox 48.0 - Firefox 54.*)
- Fix add-on name
- Add default locale
- Localize add-on description

### v2.0.2 (Firefox 48.0 - Firefox 54.*)
- Port the add-on to a WebExtension
- Deprecate usage of the "open tabs in the foreground" setting

### [v1.2.2] (Firefox 38.0a1 - Firefox 56.*)
- Use the "open tabs in the foreground" setting
- Refactor behavior of new tabs

### v1.2.0 (Firefox 38.0a1 - Firefox 56.*)
- Add compatibility for private browsing

### v1.1.3 (Firefox 38.0a1 - Firefox 56.*)
- Add an option to open tabs in foreground
- Open new and external links in foreground
- Add compatibility for multiple windows

[v2.3.1]: https://github.com/nralbrecht/pinned-tab-fix/releases/tag/v2.3.1
[v2.3.0]: https://github.com/nralbrecht/pinned-tab-fix/releases/tag/v2.3.0
[v2.2.3]: https://github.com/nralbrecht/pinned-tab-fix/releases/tag/v2.2.3
[v2.2.2]: https://github.com/nralbrecht/pinned-tab-fix/releases/tag/v2.2.2
[v2.2.1]: https://github.com/nralbrecht/pinned-tab-fix/releases/tag/v2.2.1
[v2.2.0]: https://github.com/nralbrecht/pinned-tab-fix/releases/tag/v2.2.0
[v2.1.0]: https://github.com/nralbrecht/pinned-tab-fix/releases/tag/v2.1.0
[v2.0.6]: https://github.com/nralbrecht/pinned-tab-fix/releases/tag/v2.0.6
[v2.0.5]: https://github.com/nralbrecht/pinned-tab-fix/releases/tag/v2.0.5
[v2.0.4]: https://github.com/nralbrecht/pinned-tab-fix/releases/tag/v2.0.4
[v1.2.2]: https://github.com/nralbrecht/pinned-tab-fix/releases/tag/v1.2.2
