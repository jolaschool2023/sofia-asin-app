/* ============================================================
   PARIS 🗼 · Test de Compatibilidad de Amor 💘 💛
   ============================================================ */

// ---------- floating hearts background ----------
(function spawnHearts() {
  const box = document.getElementById("hearts");
  const emojis = ["💛", "💖", "💘", "💕", "💓", "💞", "✨"];
  for (let i = 0; i < 26; i++) {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 12 + Math.random() * 22 + "px";
    h.style.animationDuration = 9 + Math.random() * 12 + "s";
    h.style.animationDelay = -Math.random() * 12 + "s";
    box.appendChild(h);
  }
})();

// ---------- utilities ----------
function normalize(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function hashString(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  }
  return h >>> 0;
}

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

// ---------- zodiac ----------
const SIGNS = [
  { name: "Aries",       from: [3, 21],  to: [4, 19],  element: "fuego", emoji: "♈" },
  { name: "Tauro",       from: [4, 20],  to: [5, 20],  element: "tierra", emoji: "♉" },
  { name: "Géminis",     from: [5, 21],  to: [6, 20],  element: "aire",  emoji: "♊" },
  { name: "Cáncer",      from: [6, 21],  to: [7, 22],  element: "agua",  emoji: "♋" },
  { name: "Leo",         from: [7, 23],  to: [8, 22],  element: "fuego", emoji: "♌" },
  { name: "Virgo",       from: [8, 23],  to: [9, 22],  element: "tierra", emoji: "♍" },
  { name: "Libra",       from: [9, 23],  to: [10, 22], element: "aire",  emoji: "♎" },
  { name: "Escorpio",    from: [10, 23], to: [11, 21], element: "agua",  emoji: "♏" },
  { name: "Sagitario",   from: [11, 22], to: [12, 21], element: "fuego", emoji: "♐" },
  { name: "Capricornio", from: [12, 22], to: [1, 19],  element: "tierra", emoji: "♑" },
  { name: "Acuario",     from: [1, 20],  to: [2, 18],  element: "aire",  emoji: "♒" },
  { name: "Piscis",      from: [2, 19],  to: [3, 20],  element: "agua",  emoji: "♓" },
];

function getSign(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d)) return null;
  const m = d.getMonth() + 1, day = d.getDate();
  for (const s of SIGNS) {
    const [fm, fd] = s.from, [tm, td] = s.to;
    if (fm <= tm) {
      if ((m === fm && day >= fd) || (m > fm && m < tm) || (m === tm && day <= td)) return s;
    } else { // wraps the year (Capricornio)
      if ((m === fm && day >= fd) || (m > fm) || (m < tm) || (m === tm && day <= td)) return s;
    }
  }
  return null;
}

function elementCompat(e1, e2) {
  const pair = [e1, e2].sort().join("+");
  const table = {
    "fuego+fuego": 10,
    "tierra+tierra": 10,
    "aire+aire": 10,
    "agua+agua": 10,
    "aire+fuego": 12,
    "agua+tierra": 12,
    "aire+tierra": -8,
    "agua+aire": -8,
    "fuego+tierra": -8,
    "agua+fuego": -10,
  };
  return table[pair] ?? 0;
}

// ---------- verdicts & advice ----------
const VERDICTS = [
  { min: 90, emoji: "💍", label: "¡EL AMOR DE TU VIDA!", sub: "De esas historias que se cuentan con música de fondo y velitas. Cuídalo como se cuida un tesoro.", color: "#ff2e63" },
  { min: 75, emoji: "✨", label: "Tal para cual", sub: "Encajáis como una canción de cuna a las 3 de la mañana. Hay química, risas y pan con tomate.", color: "#ff5c8a" },
  { min: 55, emoji: "💛", label: "Buena química… con trabajo", sub: "El chispero está. Falta paciencia, comunicación y menos responder con un 'bien'.", color: "#ffd166" },
  { min: 35, emoji: "🤝", label: "Quizás mejor como amigos", sub: "Como pareja, un poco choque de trenes; como amigos para siempre, una joya.", color: "#b388ff" },
  { min: 0,  emoji: "😈", label: "¡Cuidado! Posible enemigo", sub: "Esto es dinamita envuelta en una sonrisa. Mantén la distancia… o las manos fuera.", color: "#94a3b8" },
];

const ADVICE = {
  high: [
    ["Escúchala de verdad", "no la oigas, escúchala: repite lo que dice y pregúntale más."],
    ["Sorpresas pequeñas", "su canción favorita, un café traído justo, una notita escondida."],
    ["Celebra sus victorias", "sé la primera en aplaudir lo que cuesta aplauso."],
    ["Limpia los teflón de ego", "pedir perdón primero no es perder, es ganar."],
    ["Planifiquen algo juntos", "un viaje barato, una serie compartida, un ritual semanal."],
  ],
  mid: [
    ["Habla sin adivinar", "lo que no digas, ella se lo inventará; y seguro que peor."],
    ["Pon fechas a las conversaciones", "15 minutos 'voy a hablar contigo' sin pantallas, sin móvil."],
    ["Cada quien su espacio", "el amor no se mide en horas compartidas sino en respeto."],
    ["Aprende su lenguaje", "algunos aman con palabras, otros con actos, otros con tiempo."],
    ["Revisad Expectativas", "las suposiciones silenciosas son los mini terremotos de la relación."],
  ],
  low: [
    ["Mantén la calma", "no todo desafío merece una guerra; a veces solo merece silencio."],
    ["Protege tu energía", "las personas tóxicas consumen como cupones caducados."],
    ["No cambies por nadie", "quien te quiere te quiere con tus rarezas y tus lunes."],
    ["Rodéate de amigos", "un círculo sano es el mejor antídoto para una relación confusa."],
    ["Si huye, no persigas", "el amor no es una democracia de persecución ni un reality show."],
  ],
};

function adviceFor(pct) {
  if (pct >= 70) return ADVICE.high;
  if (pct >= 40) return ADVICE.mid;
  return ADVICE.low;
}

// ---------- elements ----------
const form = document.getElementById("love-form");
const formCard = document.getElementById("form-card");
const resultCard = document.getElementById("result-card");
const meterFg = document.getElementById("meter-fg");
const meterNum = document.getElementById("meter-num");
const meterLove = document.getElementById("meter-love");
const verdictEl = document.getElementById("verdict");
const verdictSubEl = document.getElementById("verdict-sub");
const adviceList = document.getElementById("advice-list");
const zodiacBox = document.getElementById("zodiac-box");
const zodiacA = document.getElementById("zodiac-a");
const zodiacB = document.getElementById("zodiac-b");
const zodiacVerdict = document.getElementById("zodiac-verdict");
const toast = document.getElementById("toast");

const CIRC = 2 * Math.PI * 84; // r = 84

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const fd = new FormData(form);
  const nameA = (fd.get("nameA") || "").toString();
  const nameB = (fd.get("nameB") || "").toString();
  const dateA = (fd.get("dateA") || "").toString();
  const dateB = (fd.get("dateB") || "").toString();

  const a = normalize(nameA), b = normalize(nameB);
  if (!a || !b) return;

  // base score: deterministic from the pair of names
  let base = hashString(a + "❤" + b) % 101; // 0–100
  // nudge sentiment: same initial letter = extra spark
  if (a[0] === b[0]) base = clamp(base + 8, 0, 100);

  // zodiac modifier
  const signA = getSign(dateA);
  const signB = getSign(dateB);
  let zodiacMod = 0;
  if (signA && signB) zodiacMod = elementCompat(signA.element, signB.element);

  const pct = clamp(Math.round(base + zodiacMod), 3, 99);

  const verdict = VERDICTS.find(v => pct >= v.min) ?? VERDICTS[VERDICTS.length - 1];

  // render meter
  meterFg.style.strokeDasharray = CIRC;
  meterFg.style.strokeDashoffset = CIRC * (1 - pct / 100);
  meterFg.style.stroke = verdict.color;
  meterNum.textContent = pct + "%";
  meterLove.textContent = "♥ " + (pct / 10).toFixed(1) + "/10";

  verdictEl.textContent = verdict.emoji + " " + verdict.label;
  verdictSubEl.textContent = verdict.sub;

  // zodiac block
  if (signA && signB) {
    zodiacBox.hidden = false;
    zodiacA.textContent = `${signA.emoji} ${signA.name} (${signA.element})`;
    zodiacB.textContent = `${signB.emoji} ${signB.name} (${signB.element})`;
    const compat = signA.element === signB.element
      ? "Gemelos astrales: misma energía, el doble de intensidad."
      : zodiacMod > 0
        ? `Los astros aprueban esta pareja (+${zodiacMod}). El universo tiene buen gusto.`
        : `Los astros arquean la ceja (${zodiacMod}). Pero el amor no atiende mandamientos, así que…`;
    zodiacVerdict.textContent = compat;
  } else {
    zodiacBox.hidden = true;
  }

  // advice
  adviceList.innerHTML = "";
  for (const [title, text] of adviceFor(pct)) {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${title}.</strong> ${text}`;
    adviceList.appendChild(li);
  }

  // swap views
  formCard.hidden = true;
  resultCard.hidden = false;
  resultCard.scrollIntoView({ behavior: "smooth", block: "start" });
  document.title = `${pct}% · PARIS 🗼`;

  // burst of hearts
  const box = document.getElementById("hearts");
  for (let i = 0; i < 10; i++) {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = ["💘", "💖", "💕", "💞"][i % 4];
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = 20 + Math.random() * 26 + "px";
    h.style.animationDuration = 6 + Math.random() * 6 + "s";
    box.appendChild(h);
    setTimeout(() => h.remove(), 12000);
  }
});

document.getElementById("restart-btn").addEventListener("click", () => {
  resultCard.hidden = true;
  formCard.hidden = false;
  form.reset();
  document.title = "PARIS 🗼 · Compatibilidad de Amor";
  formCard.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("share-btn").addEventListener("click", async () => {
  const a = document.getElementById("name-a").value || "Tú";
  const b = document.getElementById("name-b").value || "Esa persona";
  const text = `💘 Test Tal para Cual: ${a} + ${b} = ${meterNum.textContent} — ${verdictEl.textContent}`;
  try {
    await navigator.clipboard.writeText(text);
    showToast("¡Copiado! Pégalo donde quieras 💌");
  } catch {
    showToast("No se pudo copiar 😕");
  }
});
