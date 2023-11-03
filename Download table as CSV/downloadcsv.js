(async () => {
    "use strict";

    async function startDownload() {
        const table = document.querySelector("#tbl");
        
        // Get the selected month and year
        const month = document.querySelector("#mnth option:checked").text;
        const year = document.querySelector("#year").value;

        // Add the month and year to the CSV data
        const csv = [`${month} - ${year}`];

        const clonedTable = table.cloneNode(true);
        clonedTable.querySelectorAll("tr").forEach((row) => {
            const csvRow = [];
            row.querySelectorAll("td, th").forEach((cell) => {
                let columnItem = cell.innerText.replace(/"/g, "\"\"").replace(/(\r\n\t|\n|\r\t)/gm, " ").trim();
                cell.querySelectorAll("img").forEach((img) => columnItem += (columnItem.length > 0 ? " " : "") + img.src);
                cell.querySelectorAll("input, textarea").forEach((input) => columnItem += (columnItem.length > 0 ? " " : "") + input.value + " (i)");

                csvRow.push(`"${columnItem}"`.repeat(cell.colSpan || 1));
            });
            csv.push(csvRow.join(","));
        });

        let csvData = '\n\n' + csv.join("\r\n");

        // Request a file handle.
        const [fileHandle] = await window.showOpenFilePicker();

        // Request permission to write.
        await fileHandle.requestPermission({ mode: 'readwrite' });

        // Create a FileSystemWritableFileStream to write to.
        const writableStream = await fileHandle.createWritable();

        // Make sure we start with the file's current contents.
        await writableStream.write(await fileHandle.getFile().then(file => file.text()));

        // Write the new contents of the file.
        await writableStream.write(csvData);

        // Close the stream.
        await writableStream.close();
    }

    startDownload();
})();
