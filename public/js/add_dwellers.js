//Citation Scope: Implement Create
// Date: 12/07/2024
// Orginality: Adapted
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

// get the objects we need to modify
let addDwellersForm = document.getElementById('add-dwellers-form-ajax');

// modify the objects we need
addDwellersForm.addEventListener("submit", function (e) {

    // prevent the form from submitting
    e.preventDefault();

    // get form fields we need to get data from
    let inputDwellerName = document.getElementById("input-dweller-name");
    let inputBirthdate = document.getElementById("input-birthdate");
    let inputWorkLocation = document.getElementById("input-work-location");
    let inputRole = document.getElementById("input-role");

    // get the values from the form fields
    let dwellerNameValue = inputDwellerName.value;
    let birthdateValue = inputBirthdate.value;
    let workLocationValue = inputWorkLocation.value;
    let roleValue = inputRole.value;

    // put our data we want to send in a JS object
    let data = {
        dweller_name: dwellerNameValue,
        birthdate: birthdateValue,
        work_location: workLocationValue,
        role: roleValue
    }

    // setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-dwellers", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            inputDwellerName.value = '';
            inputBirthdate.value = '';
            inputWorkLocation.value = '';
            inputRole.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    console.log(data)

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// creates a single row from an object representing a single record from dwellers
addRowToTable = (data) => {
    // get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("dwellers-table");


    // get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // create a row and 5 cells 
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let dwellerNameCell = document.createElement("TD");
    let birthdateCell = document.createElement("TD");
    let workLocationCell = document.createElement("TD");
    let roleCell = document.createElement("TD");

    // fill the cells with correct data
    idCell.innerText = newRow.dweller_id;
    dwellerNameCell.innerText = newRow.dweller_name;
    birthdateCell.innerText = newRow.birthdate;
    workLocationCell.innerText = newRow.work_location;
    roleCell.innerText = newRow.role;

    // add the cells to the row
    row.appendChild(idCell);
    row.appendChild(dwellerNameCell);
    row.appendChild(birthdateCell);
    row.appendChild(workLocationCell);
    row.appendChild(roleCell);

    // add the dweller to the table
    currentTable.appendChild(row);
}