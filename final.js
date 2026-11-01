/* Halaman 12: penutup */
$("finalName").textContent = `untuk ${CONFIG.fullName}`;
$("finalMsg").textContent = fill(CONFIG.finalMessage);
$("sign").textContent = "— " + CONFIG.from;
if (CONFIG.whatsapp) {
  $("waBtn").href = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappText)}`;
  $("waBtn").classList.remove("hidden");
}
onPage("s-final", () => { burst(160); setTimeout(() => burst(120), 900); });
$("replay").onclick = restart;
