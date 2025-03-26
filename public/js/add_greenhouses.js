//Citation Scope: Implement Create
// Date: 12/07/2024
// Orginality: Adapted
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

// Get the objects we need to modify
let addGreenhousesForm = document.getElementById('add-greenhouses-form-ajax');

// Modify the objects we need
addGreenhousesForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCropYield = document.getElementById("input-crop-yield");

    // Get the values from the form fields
    let cropYieldValue = inputCropYield.value;

    // Put our data we want to send in a javascript object
    let data = {
        crop_yield: cropYieldValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-Greenhouses-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputCropYield.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// greenhouses
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("greenhouses-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let cropYieldCell = document.createElement("TD");

    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.greenhouse_id;
    cropYieldCell.innerText = newRow.crop_yield;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete"
    deleteCell.onclick = function(){
        deleteGreenhouses(newRow.greenhouse_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(cropYieldCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.greenhouse_id);

    // Add the greenhouse to the table
    currentTable.appendChild(row);
}