// Get the objects we need to modify
let updateMoveForm = document.getElementById('update-move-form-ajax');

// Modify the objects we need
updateMoveForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get the values from the form fields
    let moveID = document.getElementById("mySelect").value;
    let moveName = document.getElementById("input-edit-move-name").value;
    let moveDescription = document.getElementById("input-edit-move-description").value;
    let movePower = document.getElementById("input-edit-move-power").value;
    let moveType = document.getElementById("input-edit-move-type").value;


    // Put our data we want to send in a javascript object
    let data = {
        moveID: moveID,
        moveName: moveName,
        moveDescription: moveDescription,
        movePower: movePower,
        moveType: moveType
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-move-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            console.log("Yes!")
            updateRow(xhttp.response, moveID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, moveID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("moves-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == moveID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let move_name_cell = updateRowIndex.getElementsByTagName("td")[2];
            let move_description_cell = updateRowIndex.getElementsByTagName("td")[3];
            let move_power_cell = updateRowIndex.getElementsByTagName("td")[4];
            let move_type_cell = updateRowIndex.getElementsByTagName("td")[5];



            // Reassign homeworld to our value we updated to
            move_name_cell.innerHTML = parsedData[0].moveName; 
            move_description_cell.innerHTML = parsedData[0].moveDescription; 
            move_power_cell.innerHTML = parsedData[0].movePower; 
            move_type_cell.innerHTML = parsedData[0].moveType;


       }
    }

    location.reload();
}