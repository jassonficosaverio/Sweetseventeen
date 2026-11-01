/* Halaman 11: kado kejutan */
onPage("s-gift", () => $("gift").classList.remove("open", "shake"));
function openGift() {
  const g = $("gift"); if (g.classList.contains("shake") || g.classList.contains("open")) return;
  g.classList.add("shake");
  setTimeout(() => { g.classList.remove("shake"); g.classList.add("open"); burst(200); }, 1600);
  setTimeout(next, 3300);
}
$("gift").onclick = openGift;
$("gift").onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") openGift(); };
