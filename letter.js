/* Halaman 3: surat yang diketik */
$("letterTitle").textContent = CONFIG.letterTitle;
let typeTimer, fullText = "";
function startTyping() {
  fullText = CONFIG.letter.map(fill).join("\n\n");
  const el = $("letterText"); el.textContent = ""; let i = 0;
  $("skipType").classList.remove("hidden"); $("letterNext").classList.add("hidden");
  clearInterval(typeTimer);
  typeTimer = setInterval(() => {
    el.textContent += fullText[i++];
    document.querySelector("#s-letter .paper").scrollTop = 1e5;
    if (i >= fullText.length) finishTyping();
  }, 24);
}
function finishTyping() {
  clearInterval(typeTimer);
  $("letterText").textContent = fullText;
  $("skipType").classList.add("hidden"); $("letterNext").classList.remove("hidden");
}
onPage("s-letter", startTyping);
$("skipType").onclick = finishTyping;
$("letterNext").onclick = next;
