function deleteMatch(matchID) {
    let link = '/delete-match-ajax/';
    let data = {
      id: matchID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(matchID);
      }
    });
  }
  
  function deleteRow(matchID){
      let table = document.getElementById("matches-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == matchID) {
              table.deleteRow(i);
              break;
         }
      }
      location.reload();
  }