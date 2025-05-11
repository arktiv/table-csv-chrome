(()=>{
	"use strict";
	document.getElementById("dTaCSVButton").addEventListener("click", ()=>{
		chrome.tabs.query({active: true, currentWindow: true}, (tabs)=> {
			chrome.scripting.executeScript({
				target: { tabId: tabs[0].id, allFrames: true },
				files: ["downloadcsv.js"]
			});
		});
		window.close();
	});
	let encodingSelect = document.getElementById("encoding");
	let delimiterSelect = document.getElementById("delimiter");
	chrome.storage.local.get(["encoding", "delimiter"], (result)=> {
		encodingSelect.value = result["encoding"];
		delimiterSelect.value = result["delimiter"];
	});
	encodingSelect.addEventListener("change", ()=>{
		chrome.storage.local.set({"encoding": encodingSelect.value});
	});
	delimiterSelect.addEventListener("change", ()=>{
		chrome.storage.local.set({"delimiter": delimiterSelect.value});
	});
})(); 

