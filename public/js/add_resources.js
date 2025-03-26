//Citation Scope: Implement Create
// Date: 12/07/2024
// Orginality: Adapted
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

// get the objects we need to modify
let addResourcesForm = document.getElementById('add-resources-form-ajax');

// modify the objects we need
addResourcesForm.addEventListener("submit", function (e) {

    // prevent the form from submitting
    e.preventDefault();

    // get form fields we need to get data from
    let inputResourceName = document.getElementById("input-resource-name");
    let inputResourceType = document.getElementById("input-resource-type");

    // get the values from the form fields
    let resourceNameValue = inputResourceName.value;
    let resourceTypeValue = inputResourceType.value;

    // put our data we want to send in a JS object
    let data = {
        resource_name: resourceNameValue,
        resource_type: resourceTypeValue,
    }

    // setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-resources", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            inputResourceName.value = '';
            inputResourceType.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    console.log(data)

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// creates a single row from an object representing a single record from resources
addRowToTable = (data) => {
    // get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("resources-table");
    
    // get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // create a row and 3 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let resourceNameCell = document.createElement("TD");
    let resourceTypeCell = document.createElement("TD");

    // fill the cells with correct data
    idCell.innerText = newRow.resource_id;
    resourceNameCell.innerText = newRow.resource_name;
    resourceTypeCell.innerText = newRow.resource_type;

    // add the cells to the row
    row.appendChild(idCell);
    row.appendChild(resourceNameCell);
    row.appendChild(resourceTypeCell);

    // add resource to the table
    currentTable.appendChild(row);
}