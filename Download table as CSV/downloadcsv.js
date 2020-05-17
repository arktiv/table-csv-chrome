(function() {
	"use strict";
	let selected = document.getSelection();
	if (!selected.focusNode) {
		alert("No HTML table was found focus point. Try clicking inside the table and try again.");
		return;
	}
	let clickedEl = selected.focusNode.parentElement;
	let table = clickedEl.closest("table");		
	if(table === null){
		alert("No HTML table was found");
		return;
	}
	table = table.cloneNode(true);
	let csv = [];
	let rows = table.rows;				
	for (let i = 0; i < rows.length; i++) {
		let row = [], cols = rows[i].querySelectorAll("td, th");	
		for (let j = 0; j < cols.length; j++) {
			let columnItem = cols[j].innerText.replace("\"", "\"\""); //as per rfc4180
			columnItem = columnItem.replace(/(\r\n\t|\n|\r\t)/gm," ").trim(); //New lines are nothing but trouble										
			cols[j].querySelectorAll("img").forEach(function(ele){ columnItem = columnItem + (columnItem.length > 0 ? " " : "") + ele.src; });
			cols[j].querySelectorAll("input, textarea").forEach(function(ele){ columnItem = columnItem + (columnItem.length > 0 ? " " : "") + ele.value + " (i)"; });
			row.push("\"" + columnItem + "\"");
			for(let a = 1; a < cols[j].colSpan; a++){
				row.push("\"\""); //keep alignment by adding empty cells for colSpan
			}
			for(let a = 1; a < cols[j].rowSpan; a++){
				rows[i+a].insertBefore(document.createElement("td"), rows[i+a].children[j]); //keep alignment by adding empty cells for rowSpan
			}
		}
		csv.push(row.join(","));  				
	}  
	let downloadLink = document.createElement("a");
	let fileName = prompt("File name: ", (table.id || table.id.length > 0) ? table.id : "table");
	if(fileName == null) return;			
	downloadLink.download = fileName != "" ? fileName + ".csv" : "table.csv"
	downloadLink.href = window.URL.createObjectURL(new Blob([csv.join("\r\n")], {type: "text/csv"}));
	downloadLink.style.display = "none";
	document.body.appendChild(downloadLink);
	downloadLink.click();	
})();
