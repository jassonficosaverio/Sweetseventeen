/* =====================================================
   ✏️  EDIT BAGIAN INI SAJA
   ===================================================== */
const CONFIG = {
  name: "Nama Temanmu",                 // nama panggilan dia
  from: "Nama Kamu",                    // nama kamu (tanda tangan di akhir)
  date: "2027-01-12T00:00:00+07:00",    // tanggal & jam ulang tahun (WIB)
  lockBeforeDate: true,                 // true = kejutan terkunci sampai hari H
  music: "assets/music.mp3",            // taruh lagu di sini (opsional)

  letterTitle: "Happy Birthday",
  letter: [
    "Hai {name} 💜",
    "Selamat ulang tahun yang ke-17! Rasanya baru kemarin kita kenal, dan sekarang kamu sudah sampai di umur yang manis ini.",
    "Terima kasih sudah jadi teman yang baik, yang selalu mau dengerin cerita, ketawa bareng, dan ada di saat aku butuh.",
    "Semoga di usia 17 ini kamu makin bahagia, makin sehat, dan semua mimpimu pelan-pelan jadi nyata. Jangan lupa, kamu itu berharga banget.",
    "Have the sweetest seventeen ever!",
  ],

  // Foto: taruh file di assets/photos/ lalu sesuaikan nama & caption.
  // Kalau file belum ada, otomatis muncul kotak placeholder.
  photos: [
    { src: "assets/photos/1.jpg", caption: "Momen seru" },
    { src: "assets/photos/2.jpg", caption: "Ketawa bareng" },
    { src: "assets/photos/3.jpg", caption: "Hari itu" },
    { src: "assets/photos/4.jpg", caption: "Favoritku" },
    { src: "assets/photos/5.jpg", caption: "Kenangan" },
    { src: "assets/photos/6.jpg", caption: "Kita" },
  ],

  wishes: [
    "Semoga selalu dikelilingi orang-orang yang tulus 🌷",
    "Semoga semua cita-citamu tercapai satu per satu ✨",
    "Semoga selalu sehat dan bahagia setiap hari 💜",
    "Semoga makin percaya diri jadi dirimu sendiri 🦋",
    "Dan semoga persahabatan kita awet selamanya 🎀",
  ],
};
/* ===================================================== */

const $ = (id) => document.getElementById(id);
const fill = (s) => s.replaceAll("{name}", CONFIG.name);
const target = new Date(CONFIG.date).getTime();
const preview = new URLSearchParams(location.search).has("preview"); // ?preview=1 untuk mencoba

/* ---------- stage switching ---------- */
let current = "s-gate";
function go(id) {
  $(current).classList.remove("active");
  current = id;
  setTimeout(() => $(id).classList.add("active"), 350);
}

/* ---------- text fill ---------- */
$("gateTitle").textContent = "Sweet Seventeen";
$("letterTitle").textContent = CONFIG.letterTitle;
$("sign").textContent = "— " + CONFIG.from;
document.title = `Sweet Seventeen untuk ${CONFIG.name} 💜`;

/* ---------- countdown ---------- */
let unlocked = false;
function tick() {
  const diff = target - Date.now();
  if (diff <= 0 || !CONFIG.lockBeforeDate || preview) {
    if (!unlocked) {
      unlocked = true;
      $("count").classList.add("hidden");
      $("gateHint").classList.add("hidden");
      $("gateSub").textContent = diff <= 0 ? `Selamat ulang tahun, ${CONFIG.name}! 🎉` : "Mode preview aktif 👀";
      $("openGate").classList.remove("hidden");
    }
    return;
  }
  const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24,
        m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
  const p = (n) => String(n).padStart(2, "0");
  $("cd").textContent = p(d); $("ch").textContent = p(h); $("cm").textContent = p(m); $("cs").textContent = p(s);
}
tick(); setInterval(tick, 1000);

/* ---------- music ---------- */
const audio = $("audio");
audio.src = CONFIG.music;
audio.addEventListener("error", () => $("musicBtn").classList.add("hidden"));
$("musicBtn").onclick = () => {
  if (audio.paused) { audio.play(); $("musicBtn").classList.add("on"); }
  else { audio.pause(); $("musicBtn").classList.remove("on"); }
};
function startMusic() {
  audio.volume = 0.7;
  audio.play().then(() => { $("musicBtn").classList.remove("hidden"); $("musicBtn").classList.add("on"); }).catch(() => {});
}

$("openGate").onclick = () => { startMusic(); go("s-envelope"); burst(60); };

/* ---------- envelope ---------- */
function openEnvelope() {
  const e = $("envelope");
  if (e.classList.contains("open")) return;
  e.classList.add("open"); burst(40);
  setTimeout(() => { go("s-letter"); startTyping(); }, 1600);
}
$("envelope").onclick = openEnvelope;
$("envelope").onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") openEnvelope(); };

/* ---------- letter typing ---------- */
let typeTimer, fullText = "";
function startTyping() {
  fullText = CONFIG.letter.map(fill).join("\n\n");
  const el = $("letterText"); el.textContent = ""; let i = 0;
  clearInterval(typeTimer);
  typeTimer = setInterval(() => {
    el.textContent += fullText[i++];
    $("s-letter").querySelector(".paper").scrollTop = 1e5;
    if (i >= fullText.length) finishTyping();
  }, 45);
}
function finishTyping() {
  clearInterval(typeTimer);
  $("letterText").textContent = fullText;
  $("skipType").classList.add("hidden");
  $("toGallery").classList.remove("hidden");
}
$("skipType").onclick = finishTyping;
$("toGallery").onclick = () => { go("s-gallery"); buildGallery(); };

/* ---------- gallery ---------- */
function placeholder(i) {
  const d = document.createElement("div"); d.className = "ph";
  d.textContent = ["🌸", "💜", "🦋", "🎀", "✨", "🌷"][i % 6]; return d;
}
let galleryBuilt = false;
function buildGallery() {
  if (galleryBuilt) return; galleryBuilt = true;
  const box = $("polaroids");
  CONFIG.photos.forEach((p, i) => {
    const f = document.createElement("div"); f.className = "pol";
    f.style.setProperty("--r", (Math.random() * 10 - 5).toFixed(1) + "deg");
    f.style.setProperty("--d", i * 0.15 + "s");
    const img = new Image(); img.src = p.src; img.alt = p.caption; img.loading = "lazy";
    img.onerror = () => img.replaceWith(placeholder(i));
    f.append(img);
    const c = document.createElement("small"); c.textContent = p.caption; f.append(c);
    f.onclick = () => {
      const lb = $("lightbox"), t = $("lbImg"); t.innerHTML = "";
      const big = f.querySelector("img") ? new Image() : placeholder(i);
      if (big instanceof Image) big.src = p.src;
      t.append(big); $("lbCap").textContent = p.caption; lb.classList.remove("hidden");
    };
    box.append(f);
  });
}
$("lightbox").onclick = () => $("lightbox").classList.add("hidden");
$("toCake").onclick = () => go("s-cake");

/* ---------- cake ---------- */
$("blow").onclick = () => {
  $("cake").classList.add("out");
  $("blow").classList.add("hidden");
  $("cakeSub").textContent = "Yeay! Semoga harapanmu terkabul 🎉";
  burst(220);
  setTimeout(() => burst(150), 700);
  setTimeout(() => $("toFinal").classList.remove("hidden"), 1200);
};
$("toFinal").onclick = () => {
  go("s-final");
  const ul = $("wishList"); ul.innerHTML = "";
  CONFIG.wishes.forEach((w, i) => {
    const li = document.createElement("li"); li.textContent = w; li.style.animationDelay = 1 + i * 0.6 + "s"; ul.append(li);
  });
  setTimeout(() => burst(120), 600);
};
$("replay").onclick = () => {
  $("envelope").classList.remove("open"); $("cake").classList.remove("out");
  $("blow").classList.remove("hidden"); $("toFinal").classList.add("hidden");
  $("skipType").classList.remove("hidden"); $("toGallery").classList.add("hidden");
  $("cakeSub").textContent = "Pejamkan mata, buat harapan, lalu tiup lilinnya 🕯️";
  go("s-envelope");
};

/* ---------- background: petals & sparkles ---------- */
const bg = $("bg"), bx = bg.getContext("2d");
let W, H, petals = [];
function size() { W = bg.width = innerWidth * devicePixelRatio; H = bg.height = innerHeight * devicePixelRatio; }
addEventListener("resize", size); size();
const cols = ["#d9c3f3", "#f2c5cf", "#e9b9a8", "#ffffff", "#c9b3ee"];
for (let i = 0; i < 38; i++) petals.push(mkPetal(true));
function mkPetal(init) {
  return { x: Math.random() * W, y: init ? Math.random() * H : -20, r: (4 + Math.random() * 8) * devicePixelRatio,
    vy: (0.4 + Math.random() * 0.9) * devicePixelRatio, vx: (Math.random() - .5) * .6 * devicePixelRatio,
    a: Math.random() * 6.28, va: (Math.random() - .5) * .03, c: cols[Math.floor(Math.random() * cols.length)], o: .35 + Math.random() * .45 };
}
function drawBg() {
  bx.clearRect(0, 0, W, H);
  for (const p of petals) {
    p.y += p.vy; p.x += p.vx + Math.sin(p.y / 60) * .4; p.a += p.va;
    if (p.y > H + 20) Object.assign(p, mkPetal(false));
    bx.save(); bx.translate(p.x, p.y); bx.rotate(p.a); bx.globalAlpha = p.o; bx.fillStyle = p.c;
    bx.beginPath(); bx.ellipse(0, 0, p.r, p.r * .55, 0, 0, 6.28); bx.fill(); bx.restore();
  }
  requestAnimationFrame(drawBg);
}
drawBg();

/* ---------- confetti ---------- */
const cf = $("confetti"), cx = cf.getContext("2d"); let bits = [], running = false;
function cfSize() { cf.width = innerWidth * devicePixelRatio; cf.height = innerHeight * devicePixelRatio; }
addEventListener("resize", cfSize); cfSize();
const ccols = ["#b79be3", "#e9b6c4", "#e6bfa2", "#ffffff", "#f6d77a", "#c98a86"];
function burst(n) {
  const k = devicePixelRatio;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * 6.28, s = (4 + Math.random() * 9) * k;
    bits.push({ x: cf.width / 2, y: cf.height * .45, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 6 * k,
      w: (5 + Math.random() * 6) * k, h: (3 + Math.random() * 5) * k, r: Math.random() * 6, vr: (Math.random() - .5) * .4,
      c: ccols[Math.floor(Math.random() * ccols.length)], life: 160 + Math.random() * 60 });
  }
  if (!running) { running = true; loop(); }
}
function loop() {
  cx.clearRect(0, 0, cf.width, cf.height);
  bits = bits.filter((b) => b.life-- > 0 && b.y < cf.height + 40);
  for (const b of bits) {
    b.vy += .22 * devicePixelRatio; b.vx *= .99; b.x += b.vx; b.y += b.vy; b.r += b.vr;
    cx.save(); cx.translate(b.x, b.y); cx.rotate(b.r); cx.globalAlpha = Math.min(1, b.life / 40);
    cx.fillStyle = b.c; cx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h); cx.restore();
  }
  if (bits.length) requestAnimationFrame(loop); else running = false;
}
