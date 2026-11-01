/* Halaman 5: 17 alasan */
let opened = new Set();
function buildHearts() {
  const box = $("hearts"); box.innerHTML = ""; opened = new Set();
  $("rCount").textContent = 0; $("reasonNext").classList.add("hidden");
  CONFIG.reasons.forEach((r, i) => {
    const b = document.createElement("button"); b.textContent = i + 1; b.setAttribute("aria-label", "Alasan " + (i + 1));
    b.onclick = () => {
      b.classList.add("done"); opened.add(i);
      $("rNum").textContent = `alasan ke-${i + 1}`; $("rText").textContent = fill(r);
      $("reasonPop").classList.remove("hidden"); burst(26);
      $("rCount").textContent = opened.size;
      if (opened.size >= CONFIG.reasons.length) $("reasonNext").classList.remove("hidden");
    };
    box.append(b);
  });
}
onPage("s-reasons", buildHearts);
$("reasonPop").onclick = () => $("reasonPop").classList.add("hidden");
$("reasonSkip").onclick = next;
$("reasonNext").onclick = next;
