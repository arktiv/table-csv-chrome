(function() {
	"use strict";
	let clickedEl = null;
	document.addEventListener("mousedown", function(event){
		clickedEl = event.button == 2 ? event.target : null;
	}, true);

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if(request == "downloadTableAsCSV") {
			if(clickedEl == null)return;
			let table = clickedEl.closest("table");		
			if(table === null){
				alert("No HTML table was found");
			}
			let csv = [];
			let rows = table.rows;			
			for (let i = 0; i < rows.length; i++) {
				let row = [], cols = rows[i].querySelectorAll("td, th");
				
				for (let j = 0; j < cols.length; j++) {
					let columnItem = cols[j].innerText.replace("\"", "\"\""); //as per rfc4180
					columnItem = columnItem.replace(/(\r\n\t|\n|\r\t)/gm," "); //New lines are noting but trouble
					row.push("\"" + columnItem + "\"");
					for(let a = 1; a < cols[j].colSpan; a++){
						row.push("\"\""); //keep alignment by adding empty cells for colSpan
					}
				}
				csv.push(row.join(","));  	
			}  
			let downloadLink = document.createElement("a");
			downloadLink.download = (table.id || table.id.length > 0) ? table.id + ".csv" : "table.csv";
			downloadLink.href = window.URL.createObjectURL(new Blob([csv.join("\r\n")], {type: "text/csv"}));
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
			downloadLink.click();
		}
	});	
		
})();