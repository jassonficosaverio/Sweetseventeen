/* Halaman 10: gelembung doa melayang */
let readW = new Set();
function buildSky() {
  const sky = $("sky"); sky.innerHTML = ""; readW = new Set();
  $("wCount").textContent = 0; $("wishNext").classList.add("hidden");
  const emo = ["💌", "🌸", "✨", "💜", "🦋", "🎀", "⭐", "🫧"];
  CONFIG.wishes.forEach((w, i) => {
    const b = document.createElement("button"); b.className = "bubble"; b.textContent = emo[i % emo.length];
    const N = CONFIG.wishes.length, t = 12 + (i % 3) * 2;
    b.style.left = 4 + (((i * 5) % N) / Math.max(N - 1, 1)) * 78 + "%";
    b.style.setProperty("--t", t + "s"); b.style.setProperty("--d", -(t * ((i * 3) % N) / N) + "s");
    b.onclick = () => {
      $("wText").textContent = fill(w); $("wishPop").classList.remove("hidden"); burst(20);
      b.classList.add("read"); readW.add(i); $("wCount").textContent = readW.size;
      if (readW.size >= CONFIG.wishes.length) $("wishNext").classList.remove("hidden");
    };
    sky.append(b);
  });
}
onPage("s-wishes", buildSky);
$("wishPop").onclick = () => $("wishPop").classList.add("hidden");
$("wishSkip").onclick = next;
$("wishNext").onclick = next;
