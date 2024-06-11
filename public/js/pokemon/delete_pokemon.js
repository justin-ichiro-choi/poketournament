function deletePokemon(pokemonID) {
    let link = '/delete-pokemon-ajax/';
    let data = {
      id: pokemonID
    };
  
  $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(pokemonID);
      }
    });
  }
    
  function deleteRow(pokemonID){
      let table = document.getElementById("pokemon-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == pokemonID) {
              table.deleteRow(i);
              break;
         }
      }
      location.reload();
  }
