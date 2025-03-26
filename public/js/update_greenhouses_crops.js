//Citation Scope: Implement Update
// Date: 12/07/2024
// Orginality: Adapted
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

// Get the objects we need to modify
let updateGreenhousesCropsForm = document.getElementById('update-greenhouses-crops-form-ajax');

// Modify the objects we need
updateGreenhousesCropsForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputGreenhouseCrop = document.getElementById("input-greenhouse-crop-update");
    let inputCrop = document.getElementById("input-crop-update");
    let inputGreenhouse = document.getElementById("input-greenhouse-update");

    // Get the values from the form fields
    let greenhouseCropValue = inputGreenhouseCrop.value;
    let cropValue = inputCrop.value;
    let greenhouseValue = inputGreenhouse.value;
    
    if (!greenhouseCropValue || !cropValue || !greenhouseValue) {
        console.error("All fields must be filled out.");
        return;
    }

    if (isNaN(greenhouseCropValue) || isNaN(cropValue) || isNaN(greenhouseValue)) {
        console.error("All fields must be valid numbers.");
        return;
    }

    let data = {
        greenhouse_crop_id: parseInt(greenhouseCropValue),
        crop_id: parseInt(cropValue),
        greenhouse_id: parseInt(greenhouseValue),
    };
        
      
    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-greenhouses-crops-ajax", true);
    xhttp.setRequestHeader("Content-Type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
            if (xhttp.status === 200) {
                console.log("Success:", xhttp.responseText);
                let parsedResponse = JSON.parse(xhttp.responseText);
                //updateRow(parsedResponse, greenhouseCropValue);
                clearForm();
                window.location.reload()
            } else {
                console.error("Error:", xhttp.responseText);
            }
        }
    };

    console.log("Sending data:", data);
    xhttp.send(JSON.stringify(data));
});


function updateRow(data, greenhouseCropID) {
    let table = document.getElementById("greenhouses-crops-table");
    for (let row of table.rows) {
        if (row.getAttribute("data-value") == greenhouseCropID) {
            row.cells[1].innerText = data.crop_id;
            row.cells[2].innerText = data.greenhouse_id;
        }
    }
    clearForm();
}


// clear the form after updating table
function clearForm() {
    let form = document.getElementById("update-greenhouses-crops-form-ajax"); 

    // Reset all form fields
    form.reset();
}
