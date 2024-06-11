// Get the objects we need to modify
let addMatchForm = document.getElementById('add-match-form-ajax');

// Modify the objects we need
addMatchForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let moveName = document.getElementById("input-move-name").value;
    let moveDescription = document.getElementById("input-move-description").value;
    let movePower = document.getElementById("input-move-power").value;
    let moveType = document.getElementById("input-move-type").value

    // Put our data we want to send in a javascript object
    let data = {
        moveName: moveName,
        moveDescription: moveDescription,
        movePower: movePower,
        moveType: moveType
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-move-form-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            document.getElementById("input-move-name").value = '';
            document.getElementById("input-move-description").value = '';
            document.getElementById("input-move-power").value = '';
            document.getElementById("input-move-type").value = '';

 
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// bsg_people
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("moves-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");

    let moveNameCell = document.createElement("TD");
    let moveDescriptionCell = document.createElement("TD");
    let movePowerCell = document.createElement("TD");
    let moveTypeCell = document.createElement("TD");


    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    
    idCell.innerText = newRow.id;
    moveNameCell.innerText = newRow.moveName;
    moveDescriptionCell.innerText = newRow.moveDescription;
    movePowerCell.innerText = newRow.movePower;
    moveTypeCell.innerText = newRow.typeOfMove;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteMove(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(moveNameCell);
    row.appendChild(moveDescriptionCell);
    row.appendChild(movePowerCell);
    row.appendChild(moveTypeCell);

    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.id);

    
    // Add the row to the table
    currentTable.appendChild(row);
    location.reload();

    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.name;
    option.value = newRow.id;
    selectMenu.add(option);
    // End of new step 8 code.

    location.reload();
}