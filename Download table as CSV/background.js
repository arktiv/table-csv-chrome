chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({ id: "DLCSV", title: "Download table as CSV", type: "normal", contexts: ["page"] });
});

chrome.contextMenus.onClicked.addListener(function(item, tab) {
		"use strict";
		if(item.menuItemId == "DLCSV"){
			chrome.tabs.sendMessage(tab.id, "downloadTableAsCSV");
		}
});
