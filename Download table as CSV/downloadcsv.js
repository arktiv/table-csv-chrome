(()=> {
	"use strict";
	function startDownload(){
		if(document.getSelection().focusNode == null)return;
		let clickedEl = document.getSelection().focusNode.parentElement;
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
				let columnItem = cols[j].innerText.replace(/"/g, "\"\""); //as per rfc4180
				columnItem = columnItem.replace(/(\r\n\t|\n|\r\t)/gm," ").trim(); //New lines are nothing but trouble										
				cols[j].querySelectorAll("img").forEach((ele)=>{ columnItem = columnItem + (columnItem.length > 0 ? " " : "") + ele.src; });
				cols[j].querySelectorAll("input, textarea").forEach((ele)=>{ columnItem = columnItem + (columnItem.length > 0 ? " " : "") + ele.value + " (i)"; });
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
		downloadLink.download = fileName != "" ? fileName + ".csv" : "table.csv";
		chrome.storage.local.get(["encoding"], (result)=> {
			let dataBlob = (result["encoding"] == "utf") ? new Blob([csv.join("\r\n")], {type: "text/csv"}) : new Blob([new Uint8Array([0xEF, 0xBB, 0xBF]), csv.join("\r\n")], {type: "text/csv;charset=utf-8"});
			downloadLink.href = window.URL.createObjectURL(dataBlob);
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
			downloadLink.click();	
		});	
	}
	
	if(window.hasOwnProperty("dltcsvRightClick") && dltcsvRightClick){
		dltcsvRightClick = false;
		startDownload();
	}else{
		let originalCursor = document.body.style.cursor;
		document.addEventListener("click", (event)=>{ 
			document.body.style.cursor = originalCursor; 
			startDownload(); }, {once:true}, true);
		document.body.style.cursor = "crosshair";		
	}
})();
