//Get the objects
let addPokemonForm = document.getElementById('add-pokemon-form-ajax');

//Modify
addPokemonForm.addEventListener("submit", function(e) {

    //Prevent submission
    e.preventDefault();

    //Get form fields
    let pokemonName = document.getElementById("input-pokemon-name").value;
    let pokemonLevel = document.getElementById("input-pokemon-level").value;
    let primaryType = document.getElementById("input-primary-type").value;
    let secondaryType = document.getElementById("input-secondary-type").value;
    let heldItem = document.getElementById("input-held-item").value;
    let trainerID = document.getElementById("input-pokemon-trainer").value;
    let movesetID = document.getElementById("input-pokemon-moveset").value;
    //Put data in javascript object
    let data = {
        pokemonName: pokemonName,
        pokemonLevel: pokemonLevel,
        primaryType: primaryType,
        secondaryType: secondaryType,
        heldItem: heldItem,
        trainerID: trainerID,
        movesetID: movesetID
    }

    //Setup AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-pokemon-form-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    //Tell AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            //add new data to table
            addRowToTable(xhttp.response);

            //clear the input fields
            document.getElementById("input-pokemon-name").value = '';
            document.getElementById("input-pokemon-level").value = '';
            document.getElementById("input-primary-type").value = '';
            document.getElementById("input-secondary-type").value = '';
            document.getElementById("input-held-item").value = '';
            document.getElementById("input-pokemon-trainer").value = '';
            document.getElementById("input-pokemon-moveset").value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input")
        }
    }

    //send the request
    xhttp.send(JSON.stringify(data));
})

//create a single row from an object
addRowToTable = (data) => {

    //get reference to the current table
    let currentTable = document.getElementById("pokemon-table");

    //get the location
    let newRowIndex = currentTable.rows.length;

    //get a reference to the new row
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length-1]

    //create a row and cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let pokemonNameCell = document.createElement("TD");
    let pokemonLevelCell = document.createElement("TD");
    let primaryTypeCell = document.createElement("TD");
    let secondaryTypeCell = document.createElement("TD");
    let heldItemCell = document.createElement("TD");
    let trainerIDCell = document.createElement("TD");
    let movesetIDCell = document.createElement("TD");


    let deleteCell = document.createElement("TD");

    //fill the cells
    idCell.innerText = newRow.id;
    pokemonNameCell.innerText = newRow.pokemonName;
    pokemonLevelCell.innerText = newRow.pokemonLevel;
    primaryTypeCell.innerText = newRow.primaryType;
    secondaryTypeCell.innerText = newRow.secondaryType;
    heldItemCell.innerText = newRow.heldItem;
    trainerIDCell.innerText = newRow.trainerID;
    movesetIDCell.innerText = newRow.movesetID;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteTrainer(newRow.id);
    };

    //add cells to a row
    row.appendChild(idCell);
    row.appendChild(pokemonNameCell);
    row.appendChild(pokemonLevelCell);
    row.appendChild(primaryTypeCell);
    row.appendChild(secondaryTypeCell);
    row.appendChild(heldItemCell);
    row.appendChild(trainerIDCell);
    row.appendChild(movesetIDCell);


    row.appendChild(deleteCell);

    //add row attribute for delete function
    row.setAttribute('data-value', newRow.id)

    //add row to table
    currentTable.appendChild(row);
    location.reload();

    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.name;
    option.value = newRow.id;
    selectMenu.addEventListener(option);
    
    location.reload();
}