document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("spreadsheet");
    const tbody = table.querySelector("tbody");
    const thead = table.querySelector("thead");
    const addRowButton = document.getElementById("addRow");
    const addColumnButton = document.getElementById("addColumn");

    const defaultRows = 20;
    const defaultCols = 10;

    // Sample data to populate
    const sampleData = [
        [100, 200, 300, 400, 500],
        [150, 250, 350, 450, 550],
        [180, 280, 380, 480, 580],
        [120, 220, 320, 420, 520],
        [140, 240, 340, 440, 540],
    ];

    // Initialize the spreadsheet
    function initializeSheet(rows, cols) {
        // Create column headers
        const headerRow = thead.querySelector("tr");
        for (let i = 1; i <= cols; i++) {
            const th = document.createElement("th");
            th.textContent = String.fromCharCode(64 + i); // A, B, C...
            headerRow.appendChild(th);
        }

        // Create rows with cells
        for (let i = 0; i < rows; i++) {
            const row = document.createElement("tr");
            const rowHeader = document.createElement("td");
            rowHeader.textContent = i + 1;
            rowHeader.style.backgroundColor = "#f4f4f4"; // Row headers
            row.appendChild(rowHeader);

            for (let j = 0; j < cols; j++) {
                const cell = document.createElement("td");
                cell.contentEditable = "true";
                // Fill sample data if available
                if (sampleData[i] && sampleData[i][j] !== undefined) {
                    cell.textContent = sampleData[i][j];
                }
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        }
    }

    // Add a new row
    function addRow() {
        const rows = tbody.rows.length + 1;
        const cols = thead.querySelector("tr").children.length - 1;
        const row = document.createElement("tr");
        const rowHeader = document.createElement("td");
        rowHeader.textContent = rows;
        rowHeader.style.backgroundColor = "#f4f4f4"; // Row headers
        row.appendChild(rowHeader);

        for (let j = 1; j <= cols; j++) {
            const cell = document.createElement("td");
            cell.contentEditable = "true";
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    // Add a new column
    function addColumn() {
        const cols = thead.querySelector("tr").children.length;
        const th = document.createElement("th");
        th.textContent = String.fromCharCode(64 + cols); // A, B, C...
        thead.querySelector("tr").appendChild(th);

        Array.from(tbody.rows).forEach(row => {
            const cell = document.createElement("td");
            cell.contentEditable = "true";
            row.appendChild(cell);
        });
    }

    // Get selected column data
    function getColumnData(columnIndex) {
        return Array.from(tbody.rows).map(row => {
            const cell = row.cells[columnIndex];
            const value = parseFloat(cell.textContent.trim()) || 0; // Default to 0 if not a valid number
            return value;
        });
    }

    // Sum function
    document.getElementById("calculateSum").addEventListener("click", () => {
        const columnLetter = prompt("Enter column letter to calculate sum (e.g., A, B):").toUpperCase();
        const columnIndex = columnLetter.charCodeAt(0) - 65 + 1; // Correct column index
        if (columnIndex < 1 || columnIndex >= thead.querySelector("tr").children.length) {
            alert("Invalid column letter! Please enter a valid column.");
            return;
        }
        const data = getColumnData(columnIndex);
        const sum = data.reduce((a, b) => a + b, 0);
        alert(`Sum of column ${columnLetter}: ${sum}`);
    });

    // Average function
    document.getElementById("calculateAvg").addEventListener("click", () => {
        const columnLetter = prompt("Enter column letter to calculate average (e.g., A, B):").toUpperCase();
        const columnIndex = columnLetter.charCodeAt(0) - 65 + 1;
        if (columnIndex < 1 || columnIndex >= thead.querySelector("tr").children.length) {
            alert("Invalid column letter! Please enter a valid column.");
            return;
        }
        const data = getColumnData(columnIndex);
        const avg = data.reduce((a, b) => a + b, 0) / data.length;
        alert(`Average of column ${columnLetter}: ${avg}`);
    });

    // Max function
    document.getElementById("calculateMax").addEventListener("click", () => {
        const columnLetter = prompt("Enter column letter to calculate max (e.g., A, B):").toUpperCase();
        const columnIndex = columnLetter.charCodeAt(0) - 65 + 1;
        if (columnIndex < 1 || columnIndex >= thead.querySelector("tr").children.length) {
            alert("Invalid column letter! Please enter a valid column.");
            return;
        }
        const data = getColumnData(columnIndex);
        const max = Math.max(...data);
        alert(`Max of column ${columnLetter}: ${max}`);
    });

    // Min function
    document.getElementById("calculateMin").addEventListener("click", () => {
        const columnLetter = prompt("Enter column letter to calculate min (e.g., A, B):").toUpperCase();
        const columnIndex = columnLetter.charCodeAt(0) - 65 + 1;
        if (columnIndex < 1 || columnIndex >= thead.querySelector("tr").children.length) {
            alert("Invalid column letter! Please enter a valid column.");
            return;
        }
        const data = getColumnData(columnIndex);
        const min = Math.min(...data);
        alert(`Min of column ${columnLetter}: ${min}`);
    });

    // Initialize with default rows, columns, and sample data
    initializeSheet(defaultRows, defaultCols);

    addRowButton.addEventListener("click", addRow);
    addColumnButton.addEventListener("click", addColumn);
});