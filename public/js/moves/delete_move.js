function deleteMove(moveID) {
    let link = '/delete-move-ajax/';
    let data = {
      id: moveID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(moveID);
      }
    });
  }
  
  function deleteRow(moveID){
      let table = document.getElementById("moves-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == moveID) {
              table.deleteRow(i);
              break;
         }
      }
      location.reload();
  }