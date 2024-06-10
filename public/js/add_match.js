// Get the objects we need to modify
let addMatchForm = document.getElementById('add-match-form-ajax');

// Modify the objects we need
addMatchForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let roundNumberValue = document.getElementById("input-round-number").value;
    let contestant1Value = document.getElementById("input-contestant-1").value;
    let contestant2Value = document.getElementById("input-contestant-2").value;

    // Put our data we want to send in a javascript object
    let data = {
        roundNumber: roundNumberValue,
        contestant1: contestant1Value,
        contestant2: contestant2Value
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-match-form-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            document.getElementById("input-round-number").value = '';
            document.getElementById("input-contestant-1").value = '';
            document.getElementById("input-contestant-2").value = '';
 
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
    let currentTable = document.getElementById("matches-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let roundNumberCell = document.createElement("TD");

    let contestant1Cell = document.createElement("TD");
    let contestant2Cell = document.createElement("TD");

    let deleteCell = document.createElement("TD");


    // Fill the cells with correct data
    
    idCell.innerText = newRow.id;
    roundNumberCell.innerText = newRow.roundNumber;
    contestant1Cell.innerText = newRow.contestant1;
    contestant2Cell.innerText = newRow.contestant2;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteTrainer(newRow.id);
    };

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(roundNumberCell);
    row.appendChild(contestant1Cell);
    row.appendChild(contestant2Cell);

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