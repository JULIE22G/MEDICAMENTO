const rachaEl = document.getElementById("racha");
const btn = document.getElementById("btn");
const calendarioEl = document.getElementById("calendario");
const mensajeEl = document.getElementById("mensaje");

// 🎉 Confeti
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 🔁 CICLO
const DIAS_SI = 10;
const DIAS_NO = 20;
const CICLO = DIAS_SI + DIAS_NO;

// 📅 HOY
const hoy = new Date();
const hoyStr = hoy.toDateString();

// 📅 Enero 2026 (visual)
const year = 2026;
const month = 0;

// 💜 Mensajes lindos
const mensajes = [
  "Lo estás haciendo muy bien corazon 💜",
  "Un pasito también cuenta 🌷",
  "Sigue así, con calma ✨",
  "Incluso los días tranquilos importan 🌙",
  "Te quiero mi vidita 🤍"
];

// 💾 Cargar datos
let racha = Number(localStorage.getItem("rachaMed"));
let ultimaFecha = localStorage.getItem("ultimaFechaMed");

// 🌱 Si es primera vez, empezar en 6
if (!racha) {
  racha = 6;
  localStorage.setItem("rachaMed", racha);
  localStorage.setItem("ultimaFechaMed", hoyStr);
}

rachaEl.textContent = racha;

// 🔘 Botón
if (ultimaFecha === hoyStr) {
  btn.disabled = true;
  btn.textContent = "Ya marcado hoy ✔";
}

btn.addEventListener("click", () => {
  const ayer = new Date(hoy);
  ayer.setDate(hoy.getDate() - 1);

  // Modo suave: nunca se reinicia
  if (ultimaFecha !== hoyStr) {
    racha++;
  }

  mensajeEl.textContent = mensajes[Math.floor(Math.random() * mensajes.length)];

  localStorage.setItem("rachaMed", racha);
  localStorage.setItem("ultimaFechaMed", hoyStr);

  rachaEl.textContent = racha;
  btn.disabled = true;
  btn.textContent = "Ya marcado hoy ✔";

  lanzarConfeti();
});

// 📅 Calendario
function renderCalendario() {
  calendarioEl.innerHTML = "";
  const diasMes = new Date(year, month + 1, 0).getDate();

  for (let d = 1; d <= diasMes; d++) {
    const div = document.createElement("div");
    div.className = "dia";
    div.textContent = d;

    const offset = d - hoy.getDate();
    const diaRelativo = ((offset % CICLO) + CICLO) % CICLO;

    if (diaRelativo < DIAS_SI) {
      div.classList.add("si");
    } else {
      div.classList.add("no");
    }

    if (offset === 0) div.classList.add("hoy");

    calendarioEl.appendChild(div);
  }
}

renderCalendario();

// 🎉 Confeti
function lanzarConfeti() {
  const confeti = [];
  const colores = ["#ff9a9e", "#fad0c4", "#b983ff", "#a6c1ee"];

  for (let i = 0; i < 120; i++) {
    confeti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      c: colores[Math.floor(Math.random() * colores.length)],
      v: Math.random() * 3 + 2
    });
  }

  let frame = 0;

  function animar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confeti.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.fill();
      p.y += p.v;
    });

    frame++;
    if (frame < 60) {
      requestAnimationFrame(animar);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animar();
}