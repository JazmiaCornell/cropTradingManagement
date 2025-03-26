//Citation Scope: Implement Create
// Date: 12/07/2024
// Orginality: Adapted
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

// Get the objects we need to modify
let addCropsForm = document.getElementById('add-crops-form-ajax');

// Modify the objects we need
addCropsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCropName = document.getElementById("input-crop-name");
    let inputAvgYield = document.getElementById("input-avg-yield");

    // Get the values from the form fields
    let cropNameValue = inputCropName.value;
    let avgYieldValue = inputAvgYield.value;

    // Put our data we want to send in a javascript object
    let data = {
        crop_name: cropNameValue,
        avg_yield: avgYieldValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-crops-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCropName.value = '';
            inputAvgYield.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// crops
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("crops-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let cropNameCell = document.createElement("TD");
    let avgYieldCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.crop_id;
    cropNameCell.innerText = newRow.crop_name;
    avgYieldCell.innerText = newRow.avg_yield;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete"
    deleteCell.onclick = function(){
        deleteCrops(newRow.crop_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(cropNameCell);
    row.appendChild(avgYieldCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.crop_id);

    // Add the crop to the table
    currentTable.appendChild(row);
}