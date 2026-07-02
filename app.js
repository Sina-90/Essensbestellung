const SUPABASE_URL = "https://sbkuqafnxptdibsuqtfc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNia3VxYWZueHB0ZGlic3VxdGZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5ODQ3ODIsImV4cCI6MjA5ODU2MDc4Mn0.PUpjutvvbQo5H2G9kaHUhbxGnJ6GmrnvhRWYMh9ZUYc";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
const meals = [
  "Schweineschnitzel mit Bratensauce, Nudeln und Salat",
  "Putengulasch mit Spätzle und Salat",
  "Gemüsegulasch mit Nudeln",
  "Blumenkohl in Kräutersauce mit Kartoffeln",
  "Bunter Blattsalat mit Brötchen",
  "Karottengulasch mit Polenta"
];

let selectedMeal = null;

function renderMeals() {
  const container = document.getElementById("meals");
  container.innerHTML = "";

  meals.forEach((meal) => {
    const div = document.createElement("div");
    div.className = "meal";
    div.innerText = meal;

    div.onclick = () => {
      selectedMeal = meal;
      document.querySelectorAll(".meal").forEach(m => m.classList.remove("selected"));
      div.classList.add("selected");
    };

    container.appendChild(div);
  });
}

// 🔥 BESTELLUNG IN DATENBANK
async function submitOrder() {
  const name = document.getElementById("name").value;

  if (!name || !selectedMeal) {
    alert("Bitte Name und Gericht auswählen!");
    return;
  }

  const { error } = await supabase
    .from("orders")
    .insert([
      { name: name, meal: selectedMeal }
    ]);

  if (error) {
    alert("Fehler beim Speichern!");
    console.error(error);
    return;
  }

  alert("Bestellung gespeichert!");

  document.getElementById("name").value = "";
  selectedMeal = null;
  document.querySelectorAll(".meal").forEach(m => m.classList.remove("selected"));
}

// 🔥 ADMIN DATEN LADEN
async function showAdmin() {
  const admin = document.getElementById("admin");

  const { data, error } = await supabase
    .from("orders")
    .select("*");

  if (error) {
    admin.innerHTML = "Fehler beim Laden";
    return;
  }

  const count = {};

  let html = "<h3>📋 Alle Bestellungen</h3>";

  data.forEach(o => {
    html += `<div>${o.name} → ${o.meal}</div>`;
    count[o.meal] = (count[o.meal] || 0) + 1;
  });

  html += "<h3>📊 Auswertung</h3>";

  for (let meal in count) {
    html += `<div><b>${meal}</b>: ${count[meal]}</div>`;
  }

  admin.innerHTML = html;
}

renderMeals();
window.submitOrder = submitOrder;
window.showAdmin = showAdmin;
