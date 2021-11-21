/* 
    Name: Ethan Yu
    Email: Ethan_Yu@student.uml.edu
    Github: https://github.com/Yuniversality/gui-assignment4-part1
    JavaScript File for Assignment 4A: Adding jQuery Validation to Dynamic Multiplication Table
*/

// Vanilla JavaScript section

function clearTable()
{
    let tableBody = document.querySelector("tbody");
    let tableRow = tableBody.lastElementChild;
    while (tableRow)
    {
        tableBody.removeChild(tableRow);
        tableRow = tableBody.lastElementChild;
    }
}

// Generate the dynamic table by adding to the HTML (if user input is valid)
function generateDynamicTable() 
{   
    // Clear the current table displayed
    clearTable();

    // Put the user inputs into their own variables
    let minCols = document.getElementById('minColVal').value;
    let maxCols = document.getElementById('maxColVal').value;
    let minRows = document.getElementById('minRowVal').value;
    let maxRows = document.getElementById('maxRowVal').value;

    // Get the place for the table and create the first row
    let tableBody = document.getElementById("dynamic-tbody");
    let columnHeaderRow = document.createElement("tr");
    tableBody.appendChild(columnHeaderRow);

    // Create the top-leftmost cell
    let topLeftCornerCell = document.createElement("td");
    topLeftCornerCell.textContent = 0;
    columnHeaderRow.appendChild(topLeftCornerCell);

    // Fill in the rest of the first row
    for (let i = minCols; i <= maxCols; i++)
    {
        let newCell = document.createElement("td");
        newCell.textContent = i;
        columnHeaderRow.appendChild(newCell);
    }

    // Create the rest and fill in the rest of the table cells
    for (let i = minRows; i <= maxRows; i++)
    {
        let newRow = document.createElement("tr");
        tableBody.appendChild(newRow);
        let newRowHeader = document.createElement("td");
        newRowHeader.textContent = i;
        newRow.appendChild(newRowHeader);
        for (let j = minCols; j <= maxCols; j++)
        {
            let newCell = document.createElement("td");
            newCell.textContent = i * j;
            newRow.appendChild(newCell);
        }
    }
}

// jQuery Section 

$("form").validate({
    // Specify validation rules
    rules: {
        // Key name on the left side is the name attribute of an input field 
        // Validation rules are defined on the right side
        minColVal: {
            required: true
        },
        maxColVal: {
            required: true,
        },
        minRowVal: {
            required: true,
        },
        maxRowVal: {
            required: true,
        }
    },

    // Specify validation error messages
    messages: {
        minColVal: {
            required: "Please enter the minimum column number",
        },
        maxColVal: {
            required: "Please enter the maximum column number",
        },
        minRowVal: {
            required: "Please enter the minimum row number",
        },
        maxRowVal: {
            required: "Please enter the maximum row number",
        }
    }
});

// When the "Generate Table" button is clicked, create the table
// but do not refresh the page
$('#generate-table-button').click(function() {
    if ($("#form").valid())
    {
        generateDynamicTable();
        event.preventDefault();
    }
});
