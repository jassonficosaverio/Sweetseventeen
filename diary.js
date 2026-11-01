/* Halaman 4: diary rahasia */
let dIdx = 0;
$("coverText").textContent = CONFIG.diaryCover;
function showEntry() {
  const e = CONFIG.diary[dIdx], p = $("dpage");
  p.classList.remove("show");
  setTimeout(() => {
    p.innerHTML = `<h3>${e.title}</h3><p>${e.text}</p>`;
    $("dCount").textContent = `${dIdx + 1}/${CONFIG.diary.length}`;
    p.classList.add("show");
  }, 220);
  if (dIdx === CONFIG.diary.length - 1) $("diaryDone").classList.remove("hidden");
}
function openBook() {
  const b = $("book"); if (b.classList.contains("open")) return;
  b.classList.add("open"); $("diaryHint").classList.add("hidden");
  setTimeout(() => { $("dnav").classList.remove("hidden"); showEntry(); }, 700);
}
onPage("s-diary", () => {
  dIdx = 0; $("book").classList.remove("open"); $("dnav").classList.add("hidden");
  $("diaryHint").classList.remove("hidden"); $("diaryDone").classList.add("hidden"); $("dpage").classList.remove("show");
});
$("book").onclick = openBook;
$("book").onkeydown = (e) => { if (e.key === "Enter" || e.key === " ") openBook(); };
$("dPrev").onclick = () => { if (dIdx > 0) { dIdx--; showEntry(); } };
$("dNext").onclick = () => { if (dIdx < CONFIG.diary.length - 1) { dIdx++; showEntry(); } };
$("diaryDone").onclick = next;
