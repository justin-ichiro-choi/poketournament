function deleteTrainer(trainerID) {
    let link = '/delete-trainer-ajax/';
    let data = {
      id: trainerID
    };

    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(trainerID);
      }
    });
  }
  
  function deleteRow(trainerID){
      let table = document.getElementById("trainer-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == trainerID) {
              table.deleteRow(i);
              break;
         }
      }

      location.reload();
  }