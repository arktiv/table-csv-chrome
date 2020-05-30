chrome.runtime.onInstalled.addListener(function() {
	chrome.contextMenus.create({ id: "DLCSV", title: "Download table as CSV", type: "normal", contexts: ["page"]});	
});
chrome.contextMenus.onClicked.addListener(function(item, tab) {
		"use strict";
		if(item.menuItemId == "DLCSV"){	
			chrome.tabs.executeScript(tab.id, {code: "dltcsvRightClick = true;", allFrames:true}, function() { chrome.tabs.executeScript(tab.id, {file: "downloadcsv.js", allFrames:true});});			
		}	
});
