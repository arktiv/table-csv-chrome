chrome.runtime.onInstalled.addListener(()=> {
	chrome.contextMenus.create({ id: "DLCSV", title: "Download table as CSV", type: "normal", contexts: ["page"]});	
});
chrome.contextMenus.onClicked.addListener((item, tab)=> {
		"use strict";
		if(item.menuItemId == "DLCSV"){	
			chrome.tabs.query({active: true, currentWindow: true}, (tabs)=> {
				chrome.scripting.executeScript({
					target: { tabId: tabs[0].id, allFrames: true },
					func: () => {dltcsvRightClick = true;}
				}).then(() => {
					chrome.scripting.executeScript({
						target: { tabId: tabs[0].id, allFrames: true },
						files: ["downloadcsv.js"]
					})
				});
			});	
		}	
});
