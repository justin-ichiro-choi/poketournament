// Get the objects we need to modify
let updateTrainerForm = document.getElementById('update-trainer-form-ajax');

// Modify the objects we need
updateTrainerForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTrainerID = document.getElementById("mySelect");
    let inputTrainerPhone = document.getElementById("input-trainer-phone-2");
    let inputTrainerEmail = document.getElementById("input-trainer-email-2");
    let inputNumberOfWins = document.getElementById("input-trainer-number-of-wins-2");



    // Get the values from the form fields
    let trainerIDValue = inputTrainerID.value;
    let trainerPhoneValue = inputTrainerPhone.value;
    let trainerEmailValue = inputTrainerEmail.value;
    let numberOfWinsValue = inputNumberOfWins.value;


    // Put our data we want to send in a javascript object
    let data = {
        trainerID: trainerIDValue,
        trainerPhone: trainerPhoneValue,
        trainerEmail: trainerEmailValue,
        numberOfWins: numberOfWinsValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-trainer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    
    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            console.log("Yes!")
            updateRow(xhttp.response, trainerIDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, trainerID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("trainer-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == trainerID) {

            // Get the location of the row where we found the matching person ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of homeworld value
            let phone_cell = updateRowIndex.getElementsByTagName("td")[2];
            let email_cell = updateRowIndex.getElementsByTagName("td")[3];
            let number_of_wins_cell = updateRowIndex.getElementsByTagName("td")[4];



            // Reassign homeworld to our value we updated to
            email_cell.innerHTML = parsedData[0].trainerEmail; 
            phone_cell.innerHTML = parsedData[0].trainerPhone; 
            number_of_wins_cell.innerHTML = parsedData[0].numberOfWins; 

       }
    }

    location.reload();
}