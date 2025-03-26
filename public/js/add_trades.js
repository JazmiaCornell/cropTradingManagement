//Citation Scope: Implement Create
// Date: 12/07/2024
// Orginality: Adapted
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

// get the objects we need to modify
let addTradesForm = document.getElementById('add-trades-form-ajax');

// modify the objects we need
addTradesForm.addEventListener("submit", function (e) {

    // prevent form submission
    e.preventDefault();

    // get form fields we need to get data from
    let inputVaultID = document.getElementById("input-vault-id");
    let inputResourceID = document.getElementById("input-resource-id");
    let inputResourceAmount = document.getElementById("input-resource-amount");
    let inputCropID = document.getElementById("input-crop-id");
    let inputCropAmount = document.getElementById("input-crop-amount");
    let inputTradeDate = document.getElementById("input-trade-date");
    let inputStatus = document.getElementById("input-status");

    // get vaules from the form fields
    let vaultIdValue = inputVaultID.value;
    let resourceIdValue = inputResourceID.value;
    let resourceAmountValue = inputResourceAmount.value;
    let cropIdValue = inputCropID.value;
    let cropAmountValue = inputCropAmount.value;
    let tradeDateValue = inputTradeDate.value;
    let statusValue = inputStatus.value;

    // put our data we want to send in a JS object
    let data = {
        vault_id: vaultIdValue,
        resource_id: resourceIdValue,
        resource_amount: resourceAmountValue,
        crop_id: cropIdValue,
        crop_amount: cropAmountValue,
        trade_date: tradeDateValue,
        status: statusValue
    }

    // setup AJAX
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-trades", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // tell AJAX request how to resolve    
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            addRowToTable(xhttp.response);

            inputVaultID.value = '';
            inputResourceID.value = '';
            inputResourceAmount.value = '';
            inputCropID.value = '';
            inputCropAmount.value = '';
            inputTradeDate.value = '';
            inputStatus.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    console.log(data)

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// creates a single row from an object representing a single record from trades
addRowToTable = (data) => {
    // get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("trades-table");

    // get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // create a row and 8 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let vaultIdCell = document.createElement("TD");
    let resourceIdCell = document.createElement("TD");
    let resourceAmountCell = document.createElement("TD");
    let cropIdCell = document.createElement("TD");
    let cropAmountCell = document.createElement("TD");
    let tradeDateCell = document.createElement("TD");
    let statusCell = document.createElement("TD");

    // fill the cells with correct data
    idCell.innerText = newRow.trade_id;
    vaultIdCell.innerText = newRow.vault_id;
    resourceIdCell.innerText = newRow.resource_id;
    resourceAmountCell.innerText = newRow.resource_amount;
    cropIdCell.innerText = newRow.crop_id;
    cropAmountCell.innerText = newRow.crop_amount;
    tradeDateCell.innerText = newRow.trade_date;
    statusCell.innerText = newRow.status;

    // add the cells to the row
    row.appendChild(idCell);
    row.appendChild(vaultIdCell);
    row.appendChild(resourceIdCell);
    row.appendChild(resourceAmountCell);
    row.appendChild(cropIdCell);
    row.appendChild(cropAmountCell);
    row.appendChild(tradeDateCell);
    row.appendChild(statusCell);

    // add trade to the table
    currentTable.appendChild(row);
}