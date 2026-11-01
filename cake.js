/* Halaman 9: kue + tiup lilin (tombol atau mikrofon) */
let micStream = null, micTimer = null;
function stopMic() {
  clearInterval(micTimer); micTimer = null;
  if (micStream) { micStream.getTracks().forEach((t) => t.stop()); micStream = null; }
  $("micHint").classList.add("hidden");
}
function blowOut() {
  if ($("cake").classList.contains("out")) return;
  stopMic();
  $("cake").classList.add("out"); $("blowRow").classList.add("hidden");
  $("cakeSub").textContent = "Yeay! Semoga harapanmu terkabul 🎉";
  burst(220); setTimeout(() => burst(150), 700);
  setTimeout(() => $("cakeNext").classList.remove("hidden"), 1200);
}
onPage("s-cake", () => {
  stopMic();
  $("cake").classList.remove("out"); $("blowRow").classList.remove("hidden"); $("cakeNext").classList.add("hidden");
  $("cakeSub").textContent = "Pejamkan mata, buat harapan, lalu tiup lilinnya 🕯️";
  $("blowMic").classList.toggle("hidden", !(navigator.mediaDevices && navigator.mediaDevices.getUserMedia));
});
$("blow").onclick = blowOut;
$("blowMic").onclick = async () => {
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const ac = new (window.AudioContext || window.webkitAudioContext)(), an = ac.createAnalyser();
    an.fftSize = 512; ac.createMediaStreamSource(micStream).connect(an);
    const buf = new Uint8Array(an.fftSize); let hits = 0;
    $("micHint").classList.remove("hidden");
    micTimer = setInterval(() => {
      an.getByteTimeDomainData(buf);
      let peak = 0; for (const v of buf) peak = Math.max(peak, Math.abs(v - 128));
      hits = peak > 60 ? hits + 1 : 0;
      if (hits >= 3) { ac.close(); blowOut(); }
    }, 60);
  } catch (e) { $("micHint").textContent = "Mikrofon tidak diizinkan, pakai tombol Tiup Lilin aja ya 😊"; $("micHint").classList.remove("hidden"); }
};
$("cakeNext").onclick = next;
