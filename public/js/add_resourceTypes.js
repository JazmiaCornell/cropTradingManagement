//Citation Scope: Implement Create
// Date: 12/07/2024
// Orginality: Adapted
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

// get the objects we need to modify
let addResourceTypesForm = document.getElementById('add-resource-types-form-ajax');

// modify the objects we need
addResourceTypesForm.addEventListener("submit", function (e) {

    // prevent the form from submitting
    e.preventDefault();

    // get form fields we need to get data from
    let inputTypeName = document.getElementById("input-type-name");

    // get the values from the form fields
    let typeNameValue = inputTypeName.value;

    // put our data we want to send in a JS object
    let data = {
        type_name: typeNameValue,
    }

    // setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-resourceTypes", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            inputTypeName.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    console.log(data)

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// creates a single row from an object representing a single record from resourceTypes
addRowToTable = (data) => {
    // get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("resource-types-table");

    // get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // create a row and 2 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let typeNameCell = document.createElement("TD");

    // fill the cells with correct data
    idCell.innerText = newRow.type_id;
    typeNameCell.innerText = newRow.type_name;

    // add the cells to the row
    row.appendChild(idCell);
    row.appendChild(typeNameCell);

    // add resource_type to the table
    currentTable.appendChild(row);
}