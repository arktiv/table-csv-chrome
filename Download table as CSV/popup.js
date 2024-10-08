(()=>{
	"use strict";
	document.getElementById("downloadTableAsCSVButton").addEventListener("click", ()=>{
		chrome.tabs.query({active: true, currentWindow: true}, (tabs)=> {
			chrome.scripting.executeScript({
				target: { tabId: tabs[0].id, allFrames: true },
				files: ["downloadcsv.js"]
			});
		});
		window.close();
	});
	chrome.storage.local.get(["encoding"], (result)=> {
		if(result["encoding"] == "utf"){
			document.getElementById("encodingUTF8").checked = true;
		}else{
			document.getElementById("encodingUTF8BOM").checked = true;
		}
	});

	document.getElementById("encodingUTF8BOM").addEventListener("click", ()=>{
		chrome.storage.local.set({"encoding": "utf8bom"});
	});
	document.getElementById("encodingUTF8").addEventListener("click", ()=>{
		chrome.storage.local.set({"encoding": "utf"});
	});
})(); 

