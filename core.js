/* Fungsi dasar + pengatur perpindahan halaman */
const $ = (id) => document.getElementById(id);
const fill = (s) => s.replaceAll("{name}", CONFIG.name).replaceAll("{fullName}", CONFIG.fullName);
const target = new Date(CONFIG.date).getTime();
const preview = !!CONFIG.previewKey && new URLSearchParams(location.search).get("preview") === CONFIG.previewKey;

const PAGES = ["s-gate", "s-envelope", "s-letter", "s-diary", "s-reasons", "s-gallery", "s-video",
               "s-dazai", "s-cake", "s-wishes", "s-gift", "s-final"];
const order = PAGES.filter((id) => id !== "s-video" || !!CONFIG.video);
let idx = 0, busy = false;
const hooks = {};
function onPage(id, fn) { (hooks[id] = hooks[id] || []).push(fn); }

function drawDots() {
  const d = $("dots");
  d.classList.toggle("hidden", idx === 0);
  d.innerHTML = order.slice(1).map((_, i) => `<i class="${i + 1 < idx ? "done" : i + 1 === idx ? "now" : ""}"></i>`).join("");
}
function goTo(i) {
  if (busy) return; busy = true;
  const old = $(order[idx]);
  old.classList.remove("active"); old.classList.add("leaving");
  gust();
  setTimeout(() => {
    old.classList.remove("leaving");
    idx = i;
    const el = $(order[idx]);
    el.scrollTop = 0; el.classList.add("active");
    (hooks[order[idx]] || []).forEach((f) => f());
    drawDots(); busy = false;
  }, 650);
}
function next() { if (idx < order.length - 1) goTo(idx + 1); }
function restart() { goTo(1); }
