(function() {
	"use strict";
	document.getElementById("downloadTableAsCSVButton").addEventListener("click", function(){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.executeScript(tabs[0].id, {file: "downloadcsv.js", allFrames:true});
		});
		window.close();
	});
})(); 

