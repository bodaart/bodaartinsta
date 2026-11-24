// 그리운 것들 1편 "12월 거리의 캐럴" — 덧씌우는 화면(글자·날짜 도장·눈·빛 번짐·먼지) + 마지막 제작 사진 몽타주·끝 화면
// 0~20.2초는 투명 배경(밑에 AI 영상), 20.2초부터는 직접 배경을 칠한다.
const cv = document.getElementById('c'), X = cv.getContext('2d');
const W = 1080, H = 1920;
const S = [0, 2.6, 7.0, 11.4, 15.8, 20.2, 23.0, 26.0];
const CREAM = '#FFF4E2', ORANGE = '#FF8A2A';
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const eo = p => 1 - Math.pow(1 - clamp(p), 3);
const eio = p => { p = clamp(p); return p < .5 ? 4*p*p*p : 1 - Math.pow(-2*p + 2, 3) / 2; };
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

const PH = ['p_mg_c2.jpg', 'p_mg_a1.jpg', 'p_mg2_a2.jpg', 'p_mg_m4.jpg', 'p_mg2_m2.jpg'].map(s => { const im = new Image(); im.src = s; return im; });

// ---------- 글자 ----------
function fitSize(lines, size, weight, maxW) {
  let s = size;
  for (;;) { X.font = `${weight} ${s}px G`; if (Math.max(...lines.map(l => X.measureText(l).width)) <= maxW || s < 30) return s; s -= 2; }
}
function caption(lines, t, t0, t1, cy, size, weight = 700, opt = {}) {
  if (t < t0 || t > t1) return;
  const s = fitSize(lines, size, weight, opt.maxW || 960), lh = s * 1.42;
  const out = opt.noOut ? 1 : 1 - clamp((t - (t1 - 0.32)) / 0.32);
  X.save(); X.font = `${weight} ${s}px G`; X.textBaseline = 'middle';
  X.shadowColor = 'rgba(0,0,0,0.62)'; X.shadowBlur = 24; X.shadowOffsetY = 3;
  let k = 0; const y0 = cy - (lines.length - 1) * lh / 2;
  lines.forEach((ln, li) => {
    const chars = [...ln], ws = chars.map(c => X.measureText(c).width), tw = ws.reduce((a, b) => a + b, 0);
    let x = W / 2 - tw / 2;
    chars.forEach((c, ci) => {
      const ta = t0 + (opt.delay ?? 0.22) + k * (opt.step ?? 0.034), p = eo((t - ta) / 0.32);
      if (p > 0) { X.globalAlpha = p * out * (opt.alpha ?? 1); X.fillStyle = opt.color || CREAM; X.fillText(c, x, y0 + li * lh + 12 * (1 - p)); }
      x += ws[ci]; k++;
    });
  });
  X.restore();
}
function label(txt, t, t0, t1) {
  if (t < t0 || t > t1) return;
  const a = eo((t - t0) / 0.5) * (1 - clamp((t - (t1 - 0.3)) / 0.3));
  X.save(); X.globalAlpha = a * 0.92; X.font = '400 34px G'; X.letterSpacing = '6px';
  X.fillStyle = CREAM; X.textAlign = 'center'; X.textBaseline = 'middle';
  X.shadowColor = 'rgba(0,0,0,0.6)'; X.shadowBlur = 14; X.fillText(txt, W / 2, 168);
  X.shadowBlur = 0; X.globalAlpha = a * 0.6; X.fillRect(W/2 - 190, 166, 70, 2); X.fillRect(W/2 + 120, 166, 70, 2);
  X.restore();
}

// ---------- 필름 카메라 날짜 도장(7획 숫자) ----------
const SEG = { '0':'abcdef','1':'bc','2':'abged','3':'abgcd','4':'fgbc','5':'afgcd','6':'afgedc','7':'abc','8':'abcdefg','9':'abcdfg' };
function seg7(ch, x, y, h, th) {
  const w = h * 0.52, m = h / 2, on = SEG[ch] || '';
  const R = (sx, sy, sw, sh) => X.fillRect(x + sx, y + sy, sw, sh);
  if (on.includes('a')) R(th*0.6, 0, w - th*1.2, th);
  if (on.includes('g')) R(th*0.6, m - th/2, w - th*1.2, th);
  if (on.includes('d')) R(th*0.6, h - th, w - th*1.2, th);
  if (on.includes('f')) R(0, th*0.6, th, m - th*0.9);
  if (on.includes('b')) R(w - th, th*0.6, th, m - th*0.9);
  if (on.includes('e')) R(0, m + th*0.3, th, m - th*0.9);
  if (on.includes('c')) R(w - th, m + th*0.3, th, m - th*0.9);
  return w;
}
function stamp(str, t, t0, t1) {
  if (t < t0 || t > t1) return;
  const blink = t - t0 < 0.45 ? (Math.floor((t - t0) * 14) % 2 ? 0.25 : 1) : 1;
  const flick = 0.86 + 0.14 * Math.sin(t * 23.0) * Math.sin(t * 7.3);
  const h = 46, th = 7, gap = 11;
  X.save(); X.globalAlpha = blink * flick * (1 - clamp((t - (t1 - 0.25)) / 0.25));
  X.fillStyle = ORANGE; X.shadowColor = 'rgba(255,110,20,0.95)'; X.shadowBlur = 16;
  let tw = 0; for (const c of str) tw += c === ' ' ? 26 : c === "'" ? 14 : h * 0.52 + gap;
  let x = 1012 - tw, y = 1768;
  for (const c of str) {
    if (c === ' ') { x += 26; continue; }
    if (c === "'") { X.fillRect(x, y, th - 1, 14); x += 14; continue; }
    x += seg7(c, x, y, h, th) + gap;
  }
  X.restore();
}

// ---------- 눈·빛·먼지·비네트 ----------
const FLAKES = (() => { const r = rng(42); return Array.from({ length: 44 }, () => ({ x: r() * W, y: r() * H, s: 4 + Math.pow(r(), 2.4) * 44, v: 70 + r() * 150, sw: r() * 6.28, a: 0.12 + r() * 0.38 })); })();
function snow(t, amt = 1) {
  if (amt <= 0) return;
  X.save();
  for (const f of FLAKES) {
    const y = (f.y + t * f.v) % (H + 120) - 60, x = f.x + Math.sin(t * 0.9 + f.sw) * 22;
    const g = X.createRadialGradient(x, y, 0, x, y, f.s);
    g.addColorStop(0, `rgba(255,252,245,${f.a * amt})`); g.addColorStop(0.45, `rgba(255,250,240,${f.a * 0.55 * amt})`); g.addColorStop(1, 'rgba(255,250,240,0)');
    X.fillStyle = g; X.beginPath(); X.arc(x, y, f.s, 0, 6.283); X.fill();
  }
  X.restore();
}
function leak(t, c, side, strength = 0.6, col = '255,140,50') {
  const p = (t - (c - 0.28)) / 0.75; if (p <= 0 || p >= 1) return;
  const a = Math.sin(Math.PI * p) * strength, cx = side < 0 ? -80 : W + 80, cy = 600 + 500 * p;
  const g = X.createRadialGradient(cx, cy, 0, cx, cy, 1150);
  g.addColorStop(0, `rgba(${col},${a})`); g.addColorStop(0.45, `rgba(${col},${a * 0.4})`); g.addColorStop(1, `rgba(${col},0)`);
  X.fillStyle = g; X.fillRect(0, 0, W, H);
}
function flash(t, c, dur, a0) { const p = (t - c) / dur; if (p < 0 || p > 1) return; X.fillStyle = `rgba(255,248,235,${a0 * (1 - p) * (1 - p)})`; X.fillRect(0, 0, W, H); }
function dust(t) {
  const f = Math.round(t * 30), r = rng(1000 + f);
  X.save();
  for (let i = 0; i < 7; i++) { X.fillStyle = r() < 0.6 ? 'rgba(20,12,6,0.45)' : 'rgba(255,248,230,0.4)'; X.beginPath(); X.arc(r() * W, r() * H, 0.8 + r() * 2.4, 0, 6.283); X.fill(); }
  if (r() < 0.12) { X.strokeStyle = 'rgba(20,12,6,0.3)'; X.lineWidth = 1.4; const x = r() * W, y = r() * H; X.beginPath(); X.moveTo(x, y); X.quadraticCurveTo(x + 30 - r() * 60, y + 40, x + 20 - r() * 40, y + 90 + r() * 80); X.stroke(); }
  if (r() < 0.08) { X.fillStyle = 'rgba(255,245,225,0.10)'; X.fillRect(r() * W, 0, 1.5, H); }
  X.fillStyle = `rgba(255,236,210,${r() * 0.028})`; X.fillRect(0, 0, W, H);
  X.restore();
}
function vignette(a = 0.62) {
  const g = X.createRadialGradient(W/2, H*0.48, 420, W/2, H*0.5, 1220);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(8,4,2,${a})`);
  X.fillStyle = g; X.fillRect(0, 0, W, H);
  const b = X.createLinearGradient(0, H - 760, 0, H); b.addColorStop(0, 'rgba(10,5,2,0)'); b.addColorStop(1, 'rgba(10,5,2,0.55)');
  X.fillStyle = b; X.fillRect(0, H - 760, W, 760);
}

// ---------- 몽타주(폴라로이드) ----------
const POL = [{ dx: -46, dy: 10, r: -6 }, { dx: 52, dy: -18, r: 5 }, { dx: -26, dy: 28, r: -2.5 }, { dx: 44, dy: 4, r: 7 }, { dx: 0, dy: -6, r: -1 }];
function polaroid(im, cx, cy, rot, sc, a) {
  const fw = 600, ph = 560, fh = ph + 20 + 92;
  X.save(); X.globalAlpha = a; X.translate(cx, cy); X.rotate(rot * Math.PI / 180); X.scale(sc, sc);
  X.shadowColor = 'rgba(0,0,0,0.55)'; X.shadowBlur = 40; X.shadowOffsetY = 18;
  X.fillStyle = '#F3EEE4'; X.fillRect(-fw/2, -fh/2, fw, fh); X.shadowColor = 'transparent';
  if (im.naturalWidth) {
    const iw = im.naturalWidth, ih = im.naturalHeight, side = Math.min(iw, ih), pw = fw - 40;
    X.drawImage(im, (iw - side) / 2, (ih - side) / 2, side, side, -pw/2, -fh/2 + 20, pw, ph);
    X.fillStyle = 'rgba(255,190,120,0.10)'; X.fillRect(-pw/2, -fh/2 + 20, pw, ph);
  }
  X.restore();
}
function warmBg(a) {
  if (a <= 0) return;
  X.save(); X.globalAlpha = a;
  const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#2B1B11'); g.addColorStop(1, '#100906');
  X.fillStyle = g; X.fillRect(0, 0, W, H);
  const r = X.createRadialGradient(W/2, 860, 40, W/2, 860, 900); r.addColorStop(0, 'rgba(255,170,90,0.20)'); r.addColorStop(1, 'rgba(255,170,90,0)');
  X.fillStyle = r; X.fillRect(0, 0, W, H);
  X.restore();
}
function montage(t) {
  const a = eo((t - S[5]) / 0.35); warmBg(a);
  snow(t, 0.55 * a);
  const endP = eio((t - S[6]) / 0.6);           // 끝 화면으로 넘어가며 더미가 위로 올라가고 흐려짐
  X.save();
  if (endP > 0) X.filter = `blur(${(endP * 7).toFixed(1)}px)`;
  POL.forEach((p, i) => {
    const ta = S[5] + 0.18 + i * 0.52, q = eo((t - ta) / 0.36);
    if (q <= 0) return;
    const sc = (1.38 - 0.38 * q) * (1 - 0.2 * endP), cy = 930 + p.dy - 60 * (1 - q) - 300 * endP;
    polaroid(PH[i], W/2 + p.dx * (1 - 0.3 * endP), cy, p.r * (0.6 + 0.4 * q), sc, q * (1 - 0.62 * endP));
  });
  X.restore();
  if (t < S[6]) {
    caption(['그 노래, 이젠', '음반 한 장에'], t, S[5] + 0.25, S[6] + 0.1, 300, 74, 700);
    caption(['CD · USB · 싸바리 · 모바일 앱 음반'], t, S[5] + 0.9, S[6] + 0.1, 1640, 38, 400, { alpha: 0.85, step: 0.015 });
  }
}
function endcard(t) {
  if (t < S[6]) return;
  X.save(); const v = X.createLinearGradient(0, 960, 0, H); v.addColorStop(0, 'rgba(16,9,6,0)'); v.addColorStop(0.25, 'rgba(16,9,6,0.72)'); v.addColorStop(1, 'rgba(16,9,6,0.9)');
  X.globalAlpha = eo((t - S[6]) / 0.5); X.fillStyle = v; X.fillRect(0, 960, W, 960); X.restore();
  caption(['올해 연말엔'], t, S[6] + 0.15, S[7] + 1, 1140, 56, 400, { noOut: true });
  caption(['우리 가족 노래 한 장'], t, S[6] + 0.45, S[7] + 1, 1262, 96, 700, { noOut: true, step: 0.045 });
  const la = eo((t - (S[6] + 1.0)) / 0.5);
  X.save(); X.globalAlpha = la * 0.7; X.fillStyle = '#E9B98A'; X.fillRect(W/2 - 70 * la, 1352, 140 * la, 3); X.restore();
  caption(['음반 제작은 보다아트'], t, S[6] + 1.05, S[7] + 1, 1440, 48, 700, { noOut: true, color: '#F7D9B5' });
  caption(['CD · USB 음반, 그리고 모바일 앱 음반까지'], t, S[6] + 1.35, S[7] + 1, 1518, 34, 400, { noOut: true, alpha: 0.82, step: 0.012 });
  caption(['bodacd.co.kr'], t, S[6] + 1.6, S[7] + 1, 1600, 34, 400, { noOut: true, alpha: 0.75, step: 0.02 });
  stamp("'26 12 24", t, S[6] + 1.9, S[7] + 1);
}

// ---------- 한 장면 그리기 ----------
const CAP = [
  null,
  ['그땐 레코드 가게 앞 스피커에서', '캐럴이 흘러나왔어요'],
  ['리어카엔 캐럴 테이프가', '산처럼 쌓여 있었죠'],
  ['카드 한 장에 테이프 하나,', '그게 최고의 선물이었죠'],
  ['온 가족이 모여', '연말 노래를 따라 부르던 밤'],
];
const DATES = [null, "'95 12 24", "'96 12 23", "'97 12 24", "'98 12 31"];
window.render = function (t) {
  X.clearRect(0, 0, W, H);
  if (t < S[5] + 0.4) {
    vignette(t < S[1] ? 0.5 : 0.62);
    snow(t, t < S[1] ? 0 : eo((t - S[1]) / 0.6));
    // 훅(지금)
    caption(['요즘 12월,', '거리가 참 조용하죠'], t, 0.05, S[1] + 0.05, 900, 88, 700, { delay: 0.08, step: 0.03 });
    label('지금, 12월', t, 0.2, S[1]);
    label('그 시절, 12월', t, S[1] + 0.3, S[5]);
    for (let i = 1; i <= 4; i++) {
      caption(CAP[i], t, S[i], S[i + 1], 1490, 60, 700);
      stamp(DATES[i], t, S[i] + 0.12, S[i + 1]);
    }
    flash(t, S[1] - 0.02, 0.32, 0.9);               // 지금 → 그 시절: 셔터 번쩍
    leak(t, S[1] + 0.1, 1, 0.75);
    leak(t, S[2], -1, 0.55); leak(t, S[3], 1, 0.5); leak(t, S[4], -1, 0.55);
    leak(t, S[5], 1, 0.6, '255,170,90');
  }
  if (t >= S[5]) { montage(t); endcard(t); vignette(0.45); }
  dust(t);
};
Promise.all([
  document.fonts.load('700 60px G', '가나다'), document.fonts.load('400 34px G', '가나다'),
  ...PH.map(im => im.decode().catch(() => 0)),
]).then(() => { window.render(0); window.ready = true; });
