// Get the objects we need to modify
let updatePersonForm = document.getElementById('update-match-form-ajax');

// Modify the objects we need
updatePersonForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let matchID = document.getElementById("mySelect").value;
    let matchRoundNumber = document.getElementById("input-match-round-number").value;
    let contestant1 = document.getElementById("input-edit-contestant-1").value;
    let contestant2 = document.getElementById("input-edit-contestant-2").value;


    // Put our data we want to send in a javascript object
    let data = {
        matchID: matchID,
        matchRoundNumber: matchRoundNumber,
        contestant1: contestant1,
        contestant2: contestant2
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-match-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, matchID);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    console.log(data);
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, matchID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("matches-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == matchID) {

            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let roundNumberCell = updateRowIndex.getElementsByTagName("td")[2];
            let contestant1Cell = updateRowIndex.getElementsByTagName("td")[3];
            let contestant2Cell = updateRowIndex.getElementsByTagName("td")[4];


            // Reassign homeworld to our value we updated to
            roundNumberCell.innerHTML = parsedData[0].matchRoundNumber; 
            contestant1Cell.innerHTML = parsedData[0].contestant1;
            contestant2Cell.innerHTML = parsedData[0].contestant2;


       }
    }
    location.reload();
}