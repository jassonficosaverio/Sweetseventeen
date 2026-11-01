/* Musik latar */
const audio = $("audio");
audio.src = CONFIG.music;
audio.addEventListener("error", () => $("musicBtn").classList.add("hidden"));
$("musicBtn").onclick = () => {
  if (audio.paused) { audio.play(); $("musicBtn").classList.add("on"); }
  else { audio.pause(); $("musicBtn").classList.remove("on"); }
};
function startMusic() {
  audio.volume = 0.7;
  audio.play().then(() => { $("musicBtn").classList.remove("hidden"); $("musicBtn").classList.add("on"); }).catch(() => {});
}
