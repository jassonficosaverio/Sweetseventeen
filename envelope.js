/* Halaman 2: amplop */
$("envTo").textContent = `For ${CONFIG.name}`;
onPage("s-envelope", () => $("envelope").classList.remove("open"));
function openEnvelope() {
  const e = $("envelope");
  if (e.classList.contains("open")) return;
  e.classList.add("open"); burst(40);
  setTimeout(next, 1600);
}
$("envelope").onclick = openEnvelope;
$("envelope").onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") openEnvelope(); };
