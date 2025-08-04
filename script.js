let history = [];

function insertToDisplay(data) {
  document.querySelector("#display").value += data;
}

function clean() {
  document.querySelector("#display").value = "";
}

function back() {
  const display = document.querySelector("#display");
  display.value = display.value.slice(0, -1);
}

function result() {
  const display = document.querySelector("#display");
  const expression = display.value;

  if (!expression) return;

  try {
    const result = eval(expression);
    display.value = result;

    // Adicionar ao histórico
    addToHistory(expression, result);
  } catch (error) {
    display.value = "Error";
  }
}

function addToHistory(expression, result) {
  history.unshift({ expression, result });

  // Limitar histórico a 50 itens
  if (history.length > 50) {
    history = history.slice(0, 50);
  }

  updateHistoryDisplay();
}

function updateHistoryDisplay() {
  const historyBody = document.getElementById("historyBody");
  historyBody.innerHTML = "";

  history.forEach((item, index) => {
    const row = document.createElement("tr");
    row.onclick = () => selectFromHistory(item.expression, item.result);

    row.innerHTML = `
      <td>${item.expression}</td>
      <td>${item.result}</td>
    `;

    historyBody.appendChild(row);
  });
}

function selectFromHistory(expression, result) {
  const display = document.querySelector("#display");
  display.value = result;
}

function clearHistory() {
  history = [];
  updateHistoryDisplay();
}
