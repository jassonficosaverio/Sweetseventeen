/* Latar: kelopak sakura jatuh, bintang berkelip, dan confetti */
const bg = $("bg"), bx = bg.getContext("2d");
const dpr = Math.min(devicePixelRatio || 1, 2);
let W, H, wind = 0;
function size() { W = bg.width = innerWidth * dpr; H = bg.height = innerHeight * dpr; }
addEventListener("resize", size); size();
function gust() { wind = 9 * dpr; }

function petalPath(c, s) {
  c.beginPath();
  c.moveTo(0, -.7 * s);
  c.bezierCurveTo(.2 * s, -1.05 * s, .85 * s, -1.0 * s, .85 * s, -.3 * s);
  c.bezierCurveTo(.9 * s, .4 * s, .3 * s, .9 * s, 0, 1.0 * s);
  c.bezierCurveTo(-.3 * s, .9 * s, -.9 * s, .4 * s, -.85 * s, -.3 * s);
  c.bezierCurveTo(-.85 * s, -1.0 * s, -.2 * s, -1.05 * s, 0, -.7 * s);
  c.closePath();
}
const pink = ["#ffc9db", "#ffb7d0", "#ffd9e6", "#ffcfe0", "#ffe5ee", "#f9b4cf"];
const rnd = Math.random;
function mkPetal(init) {
  return { x: rnd() * W, y: init ? rnd() * H : -30 * dpr, s: (6 + rnd() * 9) * dpr, vy: (.55 + rnd() * 1.0) * dpr,
    vx: (rnd() * .5 - .05) * dpr, a: rnd() * 6.28, va: (rnd() - .5) * .035, f: rnd() * 6.28, vf: .02 + rnd() * .04,
    sw: rnd() * 6.28, c: pink[Math.floor(rnd() * pink.length)], o: .7 + rnd() * .28 };
}
const petals = Array.from({ length: 46 }, () => mkPetal(true));
const stars = Array.from({ length: 18 }, () => ({ x: rnd() * W, y: rnd() * H, s: (2 + rnd() * 4) * dpr, p: rnd() * 6.28, v: .02 + rnd() * .03 }));

function star(c, s) {
  c.beginPath();
  for (let i = 0; i < 8; i++) { const r = i % 2 ? s * .28 : s; c.lineTo(Math.cos(i * Math.PI / 4 - Math.PI / 2) * r, Math.sin(i * Math.PI / 4 - Math.PI / 2) * r); }
  c.closePath();
}
function drawBg() {
  bx.clearRect(0, 0, W, H);
  for (const t of stars) {
    t.p += t.v; const a = (Math.sin(t.p) + 1) / 2;
    bx.save(); bx.translate(t.x, t.y); bx.globalAlpha = .15 + a * .6; bx.fillStyle = "#fff"; bx.shadowColor = "#ffd6e8"; bx.shadowBlur = 8 * dpr;
    star(bx, t.s * (.6 + a * .6)); bx.fill(); bx.restore();
  }
  wind *= .965;
  for (const p of petals) {
    p.sw += .02; p.f += p.vf; p.a += p.va;
    p.y += p.vy; p.x += p.vx + Math.sin(p.sw) * .7 * dpr + wind * (.35 + p.s / (15 * dpr));
    if (p.y > H + 40 * dpr || p.x > W + 60 * dpr) Object.assign(p, mkPetal(false));
    bx.save(); bx.translate(p.x, p.y); bx.rotate(p.a); bx.scale(.25 + .75 * Math.abs(Math.cos(p.f)), 1);
    bx.globalAlpha = p.o; bx.fillStyle = p.c; petalPath(bx, p.s); bx.fill();
    bx.globalAlpha = p.o * .45; bx.fillStyle = "#fff"; petalPath(bx, p.s * .5); bx.fill();
    bx.restore();
  }
  requestAnimationFrame(drawBg);
}
drawBg();

/* confetti + kelopak yang meledak */
const cf = $("confetti"), cx = cf.getContext("2d"); let bits = [], running = false;
function cfSize() { cf.width = innerWidth * dpr; cf.height = innerHeight * dpr; }
addEventListener("resize", cfSize); cfSize();
const cfCols = ["#b79be3", "#ee9db8", "#ffd1e0", "#ffffff", "#f6d77a", "#c98a86", "#ffb7d0"];
function burst(n) {
  for (let i = 0; i < n; i++) {
    const a = rnd() * 6.28, s = (4 + rnd() * 9) * dpr;
    bits.push({ x: cf.width / 2, y: cf.height * .45, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 6 * dpr,
      w: (5 + rnd() * 6) * dpr, h: (3 + rnd() * 5) * dpr, r: rnd() * 6, vr: (rnd() - .5) * .4, petal: rnd() < .4,
      c: cfCols[Math.floor(rnd() * cfCols.length)], life: 160 + rnd() * 60 });
  }
  if (!running) { running = true; cfLoop(); }
}
function cfLoop() {
  cx.clearRect(0, 0, cf.width, cf.height);
  bits = bits.filter((b) => b.life-- > 0 && b.y < cf.height + 40);
  for (const b of bits) {
    b.vy += .22 * dpr; b.vx *= .99; b.x += b.vx; b.y += b.vy; b.r += b.vr;
    cx.save(); cx.translate(b.x, b.y); cx.rotate(b.r); cx.globalAlpha = Math.min(1, b.life / 40); cx.fillStyle = b.c;
    if (b.petal) { petalPath(cx, b.w * .9); cx.fill(); } else cx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);
    cx.restore();
  }
  if (bits.length) requestAnimationFrame(cfLoop); else running = false;
}
