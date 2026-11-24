// 그리운 것들 2편 "엄마가 녹음해 둔 내 어릴 적 목소리 테이프" — 덧씌우는 화면(글자·날짜 도장·REC/재생 표시·햇살 먼지·빛 번짐·필름 먼지)
// + 마지막 제작 사진 몽타주·끝 화면. 0~20.2초는 투명 배경(밑에 AI 영상), 20.2초부터는 직접 배경을 칠한다.
const cv = document.getElementById('c'), X = cv.getContext('2d');
const W = 1080, H = 1920;
const S = [0, 2.6, 7.0, 11.4, 15.8, 20.2, 23.0, 26.0];
const CREAM = '#FFF4E2', ORANGE = '#FF8A2A';
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const eo = p => 1 - Math.pow(1 - clamp(p), 3);
const eio = p => { p = clamp(p); return p < .5 ? 4*p*p*p : 1 - Math.pow(-2*p + 2, 3) / 2; };
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

const PH = ['p_mg2_m4.jpg', 'p_mg_m3.jpg', 'p_mg2_m3.jpg', 'p_mg2_a1.jpg', 'p_mg_b1.jpg'].map(s => { const im = new Image(); im.src = s; return im; });

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
  const hw = X.measureText(txt).width / 2 + 26;   // 글자 길이에 맞춰 양옆 줄을 띄운다
  X.shadowBlur = 0; X.globalAlpha = a * 0.6; X.fillRect(W/2 - hw - 60, 166, 60, 2); X.fillRect(W/2 + hw, 166, 60, 2);
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

// ---------- REC / 재생 표시 ----------
function recMark(t, t0, t1) {
  if (t < t0 || t > t1) return;
  const a = eo((t - t0) / 0.4) * (1 - clamp((t - (t1 - 0.3)) / 0.3));
  const on = Math.floor((t - t0) * 1.6) % 2 === 0 ? 1 : 0.18;
  X.save(); X.globalAlpha = a;
  X.fillStyle = `rgba(255,70,50,${on})`; X.shadowColor = 'rgba(255,60,40,0.95)'; X.shadowBlur = 18 * on;
  X.beginPath(); X.arc(92, 168, 13, 0, 6.283); X.fill();
  X.shadowColor = 'rgba(0,0,0,0.6)'; X.shadowBlur = 12; X.fillStyle = CREAM;
  X.font = '700 34px G'; X.letterSpacing = '5px'; X.textBaseline = 'middle'; X.fillText('REC', 118, 170);
  X.restore();
}
function playMark(t, t0, t1) {
  if (t < t0 || t > t1) return;
  const a = eo((t - t0) / 0.4) * (1 - clamp((t - (t1 - 0.3)) / 0.3));
  X.save(); X.globalAlpha = a * 0.95;
  X.fillStyle = '#BFE8B0'; X.shadowColor = 'rgba(150,230,140,0.8)'; X.shadowBlur = 14;
  X.beginPath(); X.moveTo(80, 152); X.lineTo(80, 184); X.lineTo(108, 168); X.closePath(); X.fill();
  X.shadowColor = 'rgba(0,0,0,0.6)'; X.shadowBlur = 12; X.fillStyle = CREAM;
  X.font = '700 34px G'; X.letterSpacing = '5px'; X.textBaseline = 'middle'; X.fillText('PLAY', 122, 170);
  X.restore();
}
// 다시 듣는 장면: 목소리 파형이 아래에서 흔들린다
function wave(t, t0, t1) {
  if (t < t0 || t > t1) return;
  const a = eo((t - t0) / 0.6) * (1 - clamp((t - (t1 - 0.35)) / 0.35));
  const x0 = 190, x1 = W - 190, y = 1712, n = 120;
  X.save(); X.globalAlpha = a * 0.85; X.strokeStyle = CREAM; X.lineWidth = 3; X.lineJoin = 'round';
  X.shadowColor = 'rgba(255,220,170,0.8)'; X.shadowBlur = 12;
  X.beginPath();
  for (let i = 0; i <= n; i++) {
    const u = i / n, x = x0 + (x1 - x0) * u, edge = Math.sin(Math.PI * u);
    const syl = 0.35 + 0.65 * Math.pow(Math.abs(Math.sin(t * 3.1 + u * 2.0)), 1.5);   // 말소리처럼 들쭉날쭉
    const v = (Math.sin(u * 46 + t * 17) * 0.6 + Math.sin(u * 91 - t * 23) * 0.4) * 34 * edge * syl;
    i ? X.lineTo(x, y + v) : X.moveTo(x, y + v);
  }
  X.stroke(); X.restore();
}

// ---------- 햇살 속 먼지·빛·먼지·비네트 ----------
const MOTES = (() => { const r = rng(42); return Array.from({ length: 38 }, () => ({ x: r() * W, y: r() * H, s: 2 + Math.pow(r(), 2.2) * 16, v: 8 + r() * 26, sw: r() * 6.28, a: 0.15 + r() * 0.4 })); })();
function motes(t, amt = 1) {
  if (amt <= 0) return;
  X.save();
  for (const f of MOTES) {
    const y = ((f.y - t * f.v) % H + H) % H, x = f.x + Math.sin(t * 0.5 + f.sw) * 30;
    const tw = 0.6 + 0.4 * Math.sin(t * 2.2 + f.sw * 3);
    const g = X.createRadialGradient(x, y, 0, x, y, f.s);
    g.addColorStop(0, `rgba(255,236,200,${f.a * tw * amt})`); g.addColorStop(0.5, `rgba(255,226,180,${f.a * 0.4 * tw * amt})`); g.addColorStop(1, 'rgba(255,226,180,0)');
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
  motes(t, 0.7 * a);
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
    caption(['그 목소리, 이젠', '음반 한 장에'], t, S[5] + 0.25, S[6] + 0.1, 300, 74, 700);
    caption(['CD · USB · 싸바리 · 모바일 앱 음반'], t, S[5] + 0.9, S[6] + 0.1, 1640, 38, 400, { alpha: 0.85, step: 0.015 });
  }
}
function endcard(t) {
  if (t < S[6]) return;
  X.save(); const v = X.createLinearGradient(0, 960, 0, H); v.addColorStop(0, 'rgba(16,9,6,0)'); v.addColorStop(0.25, 'rgba(16,9,6,0.72)'); v.addColorStop(1, 'rgba(16,9,6,0.9)');
  X.globalAlpha = eo((t - S[6]) / 0.5); X.fillStyle = v; X.fillRect(0, 960, W, 960); X.restore();
  caption(['올해 연말엔'], t, S[6] + 0.15, S[7] + 1, 1140, 56, 400, { noOut: true });
  caption(['가족 목소리, 음반 한 장'], t, S[6] + 0.45, S[7] + 1, 1262, 96, 700, { noOut: true, step: 0.045 });
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
  ['엄마가 녹음기를 들이대면', '나는 노래를 불렀대요'],
  ['빨간 녹음 버튼,', '천천히 돌아가던 테이프'],
  ['생일마다, 명절마다', '우리 가족 목소리가 담겼죠'],
  ['다시 틀어 보니', '그날 그 목소리가 그대로예요'],
];
const DATES = [null, "'87 05 05", "'87 05 05", "'89 11 03", null];
window.render = function (t) {
  X.clearRect(0, 0, W, H);
  if (t < S[5] + 0.4) {
    vignette(t < S[1] ? 0.5 : 0.62);
    // 햇살 먼지: 지금(서랍)엔 조금, 그 시절엔 가득, 다시 듣는 밤엔 거의 없게
    motes(t, t < S[1] ? 0.45 : t < S[4] ? 0.45 + 0.55 * eo((t - S[1]) / 0.6) : 1 - 0.8 * eo((t - S[4]) / 0.6));
    // 훅(지금)
    caption(['서랍 속에서 나온', '낡은 테이프 하나'], t, 0.05, S[1] + 0.05, 900, 88, 700, { delay: 0.08, step: 0.03 });
    label('지금', t, 0.2, S[1]);
    label('그 시절, 우리 집', t, S[1] + 0.3, S[4]);
    label('지금, 다시 듣는 밤', t, S[4] + 0.3, S[5]);
    recMark(t, S[1] + 0.3, S[4]);
    playMark(t, S[4] + 0.3, S[5]);
    for (let i = 1; i <= 4; i++) {
      caption(CAP[i], t, S[i], S[i + 1], 1490, 60, 700);
      if (DATES[i]) stamp(DATES[i], t, S[i] + 0.12, S[i + 1]);
    }
    wave(t, S[4] + 0.5, S[5]);
    flash(t, S[1] - 0.02, 0.32, 0.9);               // 지금 → 그 시절: 재생 버튼 "철컥"과 함께 번쩍
    leak(t, S[1] + 0.1, 1, 0.75);
    leak(t, S[2], -1, 0.55); leak(t, S[3], 1, 0.5);
    flash(t, S[4] - 0.02, 0.4, 0.45);               // 그 시절 → 다시 지금
    leak(t, S[5], 1, 0.6, '255,170,90');
  }
  if (t >= S[5]) { montage(t); endcard(t); vignette(0.45); }
  dust(t);
};
Promise.all([
  document.fonts.load('700 60px G', '가나다'), document.fonts.load('400 34px G', '가나다'),
  ...PH.map(im => im.decode().catch(() => 0)),
]).then(() => { window.render(0); window.ready = true; });
