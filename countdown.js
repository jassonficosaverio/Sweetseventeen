/* Halaman 1: hitung mundur + kunci sampai hari H */
/* Halaman 1: tiga fase (terbuka -> terkunci + hitung mundur -> terbuka) */
const lockFrom = new Date(CONFIG.lockFrom).getTime();
$("gateSub").textContent = `Hari spesial ${CONFIG.name} akan segera tiba…`;
$("gateDate").textContent = "📅 " + new Date(CONFIG.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }) + " • 00:00 WIB";
function isLocked() {
  const now = Date.now();
  return CONFIG.lockBeforeDate && !preview && now >= lockFrom && now < target;
}
function tick() {
  const now = Date.now(), diff = target - now;
  if (!isLocked()) {
    $("count").classList.add("hidden"); $("gateHint").classList.add("hidden"); $("openGate").classList.remove("hidden");
    $("gateSub").textContent = now >= target ? `Selamat ulang tahun, ${CONFIG.name}! 🎉`
      : preview ? "Mode preview aktif 👀" : "Mode pengecekan 👀 (terkunci mulai " + new Date(CONFIG.lockFrom).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Jakarta" }) + ")";
    return;
  }
  $("count").classList.remove("hidden"); $("gateHint").classList.remove("hidden"); $("openGate").classList.add("hidden");
  $("gateSub").textContent = `Hari spesial ${CONFIG.name} akan segera tiba…`;
  const dd = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
  const p = (n) => String(n).padStart(2, "0");
  $("cd").textContent = p(dd); $("ch").textContent = p(h); $("cm").textContent = p(m); $("cs").textContent = p(s);
}
tick(); setInterval(tick, 1000);
$("openGate").onclick = () => {
  if (isLocked()) return;
  startMusic(); burst(60); next();
};
