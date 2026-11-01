/* Halaman 8: karakter favorit */
const fav = CONFIG.favorite;
$("dzTitle").textContent = fill(fav.title);
$("dzTag").textContent = fav.anime;
$("dzName").textContent = fav.character;
$("dzNote").textContent = fill(fav.note);
(function () {
  const box = $("dzImg"), img = new Image(); img.src = fav.image; img.alt = fav.character;
  img.onerror = () => { box.innerHTML = '<div class="ph" style="height:100%">🌸</div>'; };
  box.append(img);
})();
onPage("s-dazai", () => burst(30));
$("dzNext").onclick = next;
