let transactions = [];
let myChart;
let total = 0;

function render() {
  const tbody = $("#tbody");
  $(tbody).html("");

  for (let i = 0; i < transactions.length; i++) {
    const tr = $("<tr>");
    $(tr).html(`
      <td>${transactions[i].name}</td>
      <td class="text-primary">$${transactions[i].value}</td>
      `);

    $(tbody).append(tr);

    total += parseInt(transactions[i].value);
  }

  $("#total").text(`$${total}`);

  let reversed = transactions.slice().reverse();
  let sum = 0;
  let labels = reversed.map((t) => {
    let date = new Date(t.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  });
  let data = reversed.map((t) => {
    sum += parseInt(t.value);
    return sum;
  });
  if (myChart) {
    myChart.destroy();
  }
  let ctx = $("#myChart")[0].getContext("2d");

  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Total Over Time",
          borderColor: "#0d6efd",
          data,
        },
      ],
    },
  });
}

async function addTransaction(addFunds) {
  const name = $("#tName").val();
  const amount = $("#tAmount").val();

  if (name && amount) {
    let transaction = {
      name: name,
      value: amount,
      date: new Date().toISOString(),
    };

    if (!addFunds) {
      transaction.value *= -1;
    }

    transactions.unshift(transaction);

    const response = await fetch("/budget/transaction", {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    $(name).val("");
    $(amount).val("");
    if (response.ok) {
      location.reload();
    } else {
      console.log("no");
    }
  }
}

$("#add").on("click", async () => {
  addTransaction(true);
});

$("#sub").on("click", async () => {
  addTransaction(false);
});

fetch("/budget/transaction", {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    transactions = data;
    render();
  });
