const meals = [
  "Schweineschnitzel mit Bratensauce, Nudeln und Salat",
  "Putengulasch mit Spätzle und Salat",
  "Gemüsegulasch mit Nudeln",
  "Blumenkohl in Kräutersauce mit Kartoffeln",
  "Bunter Blattsalat mit Brötchen",
  "Karottengulasch mit Polenta"
];

let selectedMeal = null;

const orders = JSON.parse(localStorage.getItem("orders") || "[]");

function renderMeals() {
  const container = document.getElementById("meals");
  container.innerHTML = "";

  meals.forEach((meal) => {
    const btn = document.createElement("div");
    btn.className = "meal";
    btn.innerText = meal;

    btn.onclick = () => {
      selectedMeal = meal;

      document.querySelectorAll(".meal").forEach(m => m.classList.remove("selected"));
      btn.classList.add("selected");
    };

    container.appendChild(btn);
  });
}

function submitOrder() {
  const name = document.getElementById("name").value;

  if (!name) {
    alert("Bitte Namen eingeben!");
    return;
  }

  if (!selectedMeal) {
    alert("Bitte Gericht auswählen!");
    return;
  }

  orders.push({ name, meal: selectedMeal });

  localStorage.setItem("orders", JSON.stringify(orders));

  alert("Bestellung gespeichert!");

  document.getElementById("name").value = "";
  selectedMeal = null;

  document.querySelectorAll(".meal").forEach(m => m.classList.remove("selected"));
}

function showAdmin() {
  const admin = document.getElementById("admin");

  const count = {};

  orders.forEach(o => {
    count[o.meal] = (count[o.meal] || 0) + 1;
  });

  let html = "<h3>?? Alle Bestellungen</h3>";

  orders.forEach(o => {
    html += `<div>${o.name} ? ${o.meal}</div>`;
  });

  html += "<h3>?? Auswertung</h3>";

  for (let meal in count) {
    html += `<div><b>${meal}</b>: ${count[meal]}</div>`;
  }

  admin.innerHTML = html;
}

renderMeals();