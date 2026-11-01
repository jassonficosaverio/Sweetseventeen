/* Halaman 6: galeri polaroid */
function placeholder(i) {
  const d = document.createElement("div"); d.className = "ph";
  d.textContent = ["🌸", "💜", "🦋", "🎀", "✨", "🌷"][i % 6]; return d;
}
let galleryBuilt = false;
function buildGallery() {
  if (galleryBuilt) return; galleryBuilt = true;
  const box = $("polaroids");
  CONFIG.photos.forEach((p, i) => {
    const f = document.createElement("div"); f.className = "pol";
    f.style.setProperty("--r", (Math.random() * 10 - 5).toFixed(1) + "deg");
    f.style.setProperty("--d", i * 0.15 + "s");
    const img = new Image(); img.src = p.src; img.alt = p.caption; img.loading = "lazy";
    img.onerror = () => img.replaceWith(placeholder(i));
    f.append(img);
    const c = document.createElement("small"); c.textContent = p.caption; f.append(c);
    f.onclick = () => {
      const t = $("lbImg"); t.innerHTML = "";
      const big = f.querySelector("img") ? new Image() : placeholder(i);
      if (big instanceof Image) big.src = p.src;
      t.append(big); $("lbCap").textContent = p.caption; $("lightbox").classList.remove("hidden");
    };
    box.append(f);
  });
}
onPage("s-gallery", buildGallery);
$("lightbox").onclick = () => $("lightbox").classList.add("hidden");
$("galleryNext").onclick = next;
