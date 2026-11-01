/* Halaman 7: video (hanya muncul kalau CONFIG.video diisi) */
const vid = $("momentVideo");
if (CONFIG.video) vid.src = CONFIG.video;
onPage("s-video", () => { vid.currentTime = 0; });
$("videoNext").onclick = () => { vid.pause(); next(); };
