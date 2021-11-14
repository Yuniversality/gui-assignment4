/* 
    Name: Ethan Yu
    Email: Ethan_Yu@student.uml.edu
    Github: https://github.com/Yuniversality?tab=repositories
    Javascript File for Assignment 3: Creating a Dynamic Multiplication Table
*/

// Retrieve user input from the forms in the HTML and returns the values in an array
function getValues()
{
    let minCols = document.getElementById('minimum-column-value').value;
    let maxCols = document.getElementById('maximum-column-value').value;
    let minRows = document.getElementById('minimum-row-value').value;
    let maxRows = document.getElementById('maximum-row-value').value;
    //document.write(minCols + maxCols + minRows + maxRows);
    return [minCols, maxCols, minRows, maxRows];
}

// Check to see if user input is numbers and if the min is greater than max
function checkValues(inputValues)
{
    // Keep track of how many user input error there are
    // If 0, then no errors, if nonzero, then the user needs to fix their input
    let errorVal = 0;
    
    // Reset the text for all the warning labels
    document.getElementById("general-error-messages-label").innerHTML = "";
    document.getElementById("min-col-val-warning").textContent = "";
    document.getElementById("max-col-val-warning").textContent = "";
    document.getElementById("min-row-val-warning").textContent = "";
    document.getElementById("max-row-val-warning").textContent = "";
    
    // Check if minCols input is valid
    if (isNaN(inputValues[0]))
    {
        document.getElementById("min-col-val-warning").textContent = "Minimum Column Value is Invalid";
        errorVal++;
    }

    // Check if maxCols input is valid
    if (isNaN(inputValues[1]))
    {
        document.getElementById("max-col-val-warning").textContent = "Maximum Column Value is Invalid";
        errorVal++;
    }

    // Check if minRows input is valid
    if (isNaN(inputValues[2]))
    {
        document.getElementById("min-row-val-warning").textContent = "Minimum Row Value is Invalid";
        errorVal++;
    }

    // Check if maxRows input is valid
    if (isNaN(inputValues[3]))
    {
        document.getElementById("max-row-val-warning").textContent = "Maximum Row Value is Invalid";
        errorVal++;
    }

    // Check to see if minCols and maxCols values make sense
    if (inputValues[0] > inputValues[1])
    {
        document.getElementById("general-error-messages-label").innerHTML = document.getElementById("general-error-messages-label").innerHTML +
            "The maximum column value must be larger than the minimum value. <br>";
        errorVal++;
    }

    // Check to see if minRows and maxRows values make sense
    if (inputValues[2] > inputValues[3])
    {
        document.getElementById("general-error-messages-label").innerHTML = document.getElementById("general-error-messages-label").innerHTML +
            "The maximum row value must be larger than the minimum value.";
        errorVal++;
    }

    return errorVal;
}

function clearTable()
{
    //let tableBody = document.getElementById("dynamic-tbody");
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
    clearTable();
    // First get the user input from getValues() and then check to see if they're valid
    let inputValues = getValues();
    let errorPresent = checkValues(inputValues);

    // If there's an error with the user input, then don't generate the table
    if (errorPresent)
    {
        return;
    }

    // Put the user inputs into their own variables
    let minCols = inputValues[0];
    let maxCols = inputValues[1];
    let minRows = inputValues[2];
    let maxRows = inputValues[3];

    // 
    let tableBody = document.getElementById("dynamic-tbody");
    let columnHeaderRow = document.createElement("tr");
    tableBody.appendChild(columnHeaderRow);

    let topLeftCornerCell = document.createElement("td");
    topLeftCornerCell.textContent = 0;
    columnHeaderRow.appendChild(topLeftCornerCell);

    for (let i = minCols; i <= maxCols; i++)
    {
        let newCell = document.createElement("td");
        newCell.textContent = i;
        columnHeaderRow.appendChild(newCell);
    }

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