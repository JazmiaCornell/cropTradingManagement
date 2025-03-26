//Citation Scope: Implement Create
// Date: 12/07/2024
// Orginality: Adapted
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

// Get the objects we need to modify
let addGreenhousesCropsForm = document.getElementById('add-greenhouses-crops-form-ajax');

// Modify the objects we need
addGreenhousesCropsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputGreenhouse = document.getElementById("input-greenhouse-ajax");
    let inputCrop = document.getElementById("input-crop-ajax");

    // Get the values from the form fields
    let greenhouseValue = inputGreenhouse.value;
    let cropValue = inputCrop.value;

    // Put our data we want to send in a javascript object
    let data = {
        greenhouse_id: greenhouseValue,
        crop_id: cropValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-greenhouses-crops-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputGreenhouse.value = '';
            inputCrop.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// greenhouses_crops
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("greenhouses-crops-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let greenhouseCell = document.createElement("TD");
    let cropCell = document.createElement("TD");


    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.greenhouse_crop_id;
    greenhouseCell.innerText = newRow.greenhouse_id;
    cropCell.innerText = newRow.crop_name;


    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete"
    deleteCell.onclick = function(){
        deleteGreenhousesCrops(newRow.greenhouse_crop_id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(cropCell);
    row.appendChild(greenhouseCell);
    row.appendChild(deleteCell);
    
    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.greenhouse_crop_id);

    // Add the greenhouse_crop to the table
    currentTable.appendChild(row);

    // Start of new Step 8 code for adding new data to the dropdown menu for updating people
    
    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("input-greenhouse-crop-update");
    let option = document.createElement("option");
    option.text = newRow.greenhouse_crop_id
    option.value = newRow.greenhouse_crop_id;
    selectMenu.add(option);
    // End of new step 8 code.
}