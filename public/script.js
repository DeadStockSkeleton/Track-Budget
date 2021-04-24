

let transactions = [];
let myChart;



function render() {
  const tbody = $("#tbody");
  $(tbody).html("");

  for (let i = 0; i < transactions.length; i++){
    for (let j = 0; j < transactions[i].length; j ++){
      const tr = $('<tr>');
      $(tr).html(`
      <td>${transactions[i][j].name}</td>
      <td class="text-primary">${transactions[i][j].value}</td>
      <td  class="text-muted"><button class="btn-outline-danger btn" id="${transactions[i][j].id}">
        DELETE
      </button></td>
      `);

      $(tbody).append(tr);
    }
  }
}

$("#add").on("click", async () => {
  const name = $("#tName").val();
  const amount = $("#tAmount").val();

  if (name && amount) {
    let transaction = {
      name: name,
      value: amount,
      date: new Date().toISOString(),
    };

    transactions.unshift(transaction);

const response = await fetch("/budget/transaction", {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
        $(name).val('');
        $(amount).val('');
    if (response.ok){
        location.reload();
        
    }else{
        console.log('no');
    }
    
  }
});

fetch("/budget/transaction",{
  method: 'GET'
}).then(response => response.json()).then(data => {
  transactions.push(data);
  render();
})

