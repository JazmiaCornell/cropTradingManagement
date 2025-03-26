//Citation Scope: Implement Delete
// Date: 12/07/2024
// Orginality: Adapted
// Source: https://github.com/osu-cs340-ecampus/nodejs-starter-app/

function deleteGreenhousesCrops(greenhouseCropID) {
    // Put our data we want to send in a javascript object
    let data = {
        greenhouse_crop_id: greenhouseCropID
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-greenhouses-crops-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(greenhouseCropID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

// deletes greenhouses_crops from table
function deleteRow(greenhouseCropID){

    let table = document.getElementById("greenhouses-crops-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == greenhouseCropID) {
            table.deleteRow(i);
            deleteDropDownMenu(greenhouseCropID);
            break;
       }
    }
}

// updates dropDownMenu for update function by removing recently deleted greenhouse_crop
function deleteDropDownMenu(greenhouseCropID){
    let selectMenu = document.getElementById("mySelect");
    for (let i = 0; i < selectMenu.length; i++){
        if (Number(selectMenu.options[i].value) === Number(greenhouseCropID)){
          selectMenu[i].remove();
          break;
        } 
    
      }
}
