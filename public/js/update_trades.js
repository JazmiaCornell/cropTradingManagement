//Citation Scope: Implement Update
// Date: 12/07/2024
// Orginality: Adapted
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

// Get the objects we need to modify
let updateTradesForm = document.getElementById('update-trades-form-ajax');

// Modify the objects we need
updateTradesForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTradeID = document.getElementById("input-trade-update");
    let inputVaultID = document.getElementById("input-vault-id-update");
    let inputResourceID = document.getElementById("input-resource-id-update");
    let inputResourceAmount = document.getElementById("input-resource-amount-update");
    let inputCropID = document.getElementById("input-crop-id-update");
    let inputCropAmount = document.getElementById("input-crop-amount-update");
    let inputDate = document.getElementById("input-trade-date-update");
    let inputStatus = document.getElementById("input-status-update");

    // Get the values from the form fields
    let tradeIDValue = inputTradeID.value;
    let vaultIDValue = inputVaultID.value || null;
    let resourceIDValue = inputResourceID.value || null;
    let resourceAmountValue = inputResourceAmount.value;
    let cropIDValue = inputCropID.value || null;
    let cropAmountValue = inputCropAmount.value;
    let dateValue = inputDate.value;
    let statusValue = inputStatus.value;
    
    // Form validation
    if (!tradeIDValue || !resourceAmountValue || !cropAmountValue || !dateValue || !statusValue) {
        console.error("All fields must be filled out.");
        return;
    }

    // Validate numeric fields
    if (isNaN(resourceAmountValue) || isNaN(cropAmountValue)) {
        console.error("Fields fields must be valid numbers.");
        return;
    }

    // Create the data object
    let data = {
        trade_id: tradeIDValue,
        vault_id: vaultIDValue,
        resource_id: resourceIDValue,
        resource_amount: resourceAmountValue,
        crop_id: cropIDValue,
        crop_amount: cropAmountValue,
        trade_date: dateValue,
        status: statusValue
    };
        
      
    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-trades-ajax", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                // Log response for debugging
                console.log("Success:", xhttp.responseText);
                
                //let parsedResponse = JSON.parse(xhttp.responseText);
                clearForm();
                window.location.reload();
            } else {
                console.error("Error:", xhttp.responseText);
            }
        }
    };

    console.log("Sending data:", data);
    xhttp.send(JSON.stringify(data));
});


// clear the form after updating table
function clearForm() {
    let form = document.getElementById("update-trades-form-ajax"); 

    // Reset all form fields
    form.reset();
}
