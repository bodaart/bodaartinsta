// 보다아트 릴스 v6 "트렌디판" — 다크 + 리퀴드 글래스 + 라임 포인트
// 요즘 숏폼 문법: 스토리형 진행 바, 단어 단위로 튀어나오는 자막(숫자는 라임), 흐림에서 또렷해지는 큰 글자,
// 크롬 빛줄기, 유리 카드 위의 사물, 광택 CD, 줌 블러 컷 전환, 은은하게 흐르는 그라데이션 빛.
// 속도는 v4와 같게(빨리 감기 느낌 없음).
const G = {BG:'#08080D', LIME:'#C8FF3D', VIO:'#7C6CFF', CYAN:'#2FD3F0', PINK:'#FF5FA2'};
INK='#F5F5F7'; DEEP=G.LIME; ROSE=G.VIO; SAND='rgba(0,0,0,0.5)'; BEIGE='rgba(255,255,255,0.09)';
IVORY='rgba(255,255,255,0.18)'; F4=G.BG; TAUPE='rgba(255,255,255,0.45)'; GREY='#8E8E9A';
let STAMPS=[], SHN=0, CDN=0, __T=0;

window.ink=function(x,y,str,size,w,o={}){
  const ls=o.ls!==undefined?o.ls:-0.035*size, an=o.anchor||'start', fill=o.fill||INK;
  const a=`x="${x}" y="${y}" font-size="${size}" font-weight="${w}" letter-spacing="${ls}" text-anchor="${an}"`;
  let s='';
  if(o.mis) s+=`<text ${a} fill="${fill===INK?G.VIO:fill}" opacity="0.55" filter="url(#glow)">${esc(str)}</text>`;
  return s+`<text ${a} fill="${fill}">${esc(str)}</text>`;
};
function sheen(inner,u){
  const texts=(inner.match(/<text (?![^>]*filter=)[^>]*>[^<]*<\/text>/g)||[]).filter(x=>+((x.match(/font-size="([\d.]+)"/)||[0,0])[1])>=110).join('');
  if(!texts) return '';
  const id='shn'+(SHN++), p=(u-0.2)/0.6, x=-300+p*2000;
  return `<clipPath id="${id}">${texts}</clipPath><g clip-path="url(#${id})"><rect x="${x}" y="-300" width="140" height="2600" fill="url(#chromeband)" transform="skewX(-20)"/></g>`;
}
window.stamp=function(t,t0,cx,cy,inner){
  if(t<t0) return '';
  const u=t-t0+(t0<0.05?0.4:0), p=out(cl(u/0.3,0,1)), sc=0.9+0.1*p, dy=(1-p)*46, op=cl(u/0.14,0,1), bl=Math.round((1-p)*9);
  if(u<0.6&&inner) STAMPS.push([t0,cx,cy]);
  let s=`<g opacity="${op.toFixed(2)}" transform="translate(0,${dy.toFixed(1)}) translate(${cx},${cy}) scale(${sc.toFixed(3)}) translate(${-cx},${-cy})"${bl>0?` filter="url(#b${bl})"`:''}>${inner}</g>`;
  if(u>0.2&&u<0.8) s+=sheen(inner,u);
  return s;
};
// 단어 단위로 튀어나오는 자막, 숫자가 든 단어는 라임
window.cap=function(t,t0,lines,y0,size){
  size=size||60; let s='';
  lines.forEach((ln,i)=>{const tl=t0+i*0.42; if(t<tl) return;
    const y=y0+i*size*1.34, words=ln.split(' ');
    let ts='', prev=0;
    words.forEach((wd,k)=>{const p=out(cl((t-tl-k*0.075)/0.18,0,1)), off=(1-p)*20, hl=/[0-9]/.test(wd);
      ts+=`<tspan dy="${(off-prev).toFixed(1)}" fill="${hl?G.LIME:INK}" fill-opacity="${p.toFixed(2)}">${esc(wd)}${k<words.length-1?' ':''}</tspan>`; prev=off;});
    s+=`<text x="90" y="${y}" font-size="${size}" font-weight="700" letter-spacing="${(-0.025*size).toFixed(1)}" style="white-space:pre">${ts}</text>`;
  });
  return s;
};
window.cd=function(cx,cy,r,rot,o={}){
  let g=`<ellipse cx="${cx}" cy="${cy+r*0.9}" rx="${r*0.8}" ry="${r*0.12}" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#discg)"/>`;
  if(!o.plain){const ri=r*0.36, ro=r*0.98, H=['#FF5FA2','#C8FF3D','#2FD3F0','#7C6CFF','#FFB86B','#FF5FA2'];
    for(let i=0;i<6;i++){const a0=rot*1.3+i*Math.PI/3,a1=a0+Math.PI/3;
      g+=`<path d="M${cx+ri*Math.cos(a0)} ${cy+ri*Math.sin(a0)} L${cx+ro*Math.cos(a0)} ${cy+ro*Math.sin(a0)} A${ro} ${ro} 0 0 1 ${cx+ro*Math.cos(a1)} ${cy+ro*Math.sin(a1)} L${cx+ri*Math.cos(a1)} ${cy+ri*Math.sin(a1)} A${ri} ${ri} 0 0 0 ${cx+ri*Math.cos(a0)} ${cy+ri*Math.sin(a0)} Z" fill="${H[i]}" opacity="0.38"/>`;}}
  const ga=-rot*0.7-0.8, ri=r*0.38, ro=r*0.97;
  g+=`<path d="M${cx+ri*Math.cos(ga-0.18)} ${cy+ri*Math.sin(ga-0.18)} L${cx+ro*Math.cos(ga-0.12)} ${cy+ro*Math.sin(ga-0.12)} A${ro} ${ro} 0 0 1 ${cx+ro*Math.cos(ga+0.12)} ${cy+ro*Math.sin(ga+0.12)} L${cx+ri*Math.cos(ga+0.18)} ${cy+ri*Math.sin(ga+0.18)} Z" fill="#FFFFFF" opacity="0.45"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r*0.34}" fill="#15151C" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r*0.13}" fill="${G.BG}" stroke="rgba(255,255,255,0.5)" stroke-width="1.5"/>`;
  return g;
};
window.seal=function(t,t0,cx,cy,str,size,rot,w){
  const h=size*1.7; w=w||str.length*size*1.0+70;
  return stamp(t,t0,cx,cy,`<g transform="rotate(${rot*0.5} ${cx} ${cy})"><rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="${h/2}" fill="${G.LIME}"/>`+`<text x="${cx}" y="${cy+size*0.36}" font-size="${size}" font-weight="800" text-anchor="middle" fill="#0A0A0A">${esc(str)}</text></g>`);
};
// 위쪽: 스토리형 진행 바 + 유리 알약 태그
window.chrome=function(tagStr){
  const E=window.EP, b=[0].concat(E.beats||[]).concat([E.dur||20]);
  let s=''; const x0=60,x1=1020,gap=8,n=b.length-1,w=(x1-x0-gap*(n-1))/n, y=206;
  for(let i=0;i<n;i++){const f=cl((__T-b[i])/(b[i+1]-b[i]),0,1), x=x0+i*(w+gap);
    s+=`<rect x="${x}" y="${y}" width="${w}" height="6" rx="3" fill="rgba(255,255,255,0.22)"/>`;
    if(f>0) s+=`<rect x="${x}" y="${y}" width="${(w*f).toFixed(1)}" height="6" rx="3" fill="#FFFFFF"/>`;}
  const tw=tagStr.replace(/\s+/g,' ').length*27+56;
  s+=`<rect x="60" y="244" width="${tw}" height="56" rx="28" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.25)" stroke-width="1.5"/>`;
  s+=`<circle cx="88" cy="272" r="7" fill="${G.LIME}"/>`;
  s+=`<text x="106" y="282" font-size="28" font-weight="700" fill="#F5F5F7" letter-spacing="-0.5">${esc(tagStr.replace(/\s+/g,' '))}</text>`;
  s+=`<text x="1020" y="282" font-size="24" font-weight="800" fill="rgba(255,255,255,0.75)" letter-spacing="6" text-anchor="end">BODA ART</text>`;
  return s;
};
window.endcard=function(t,t0,l1,l2,tw){
  let art='',txt='';
  txt+=`<text x="90" y="560" font-size="36" font-weight="800" fill="${G.LIME}" letter-spacing="1">다음 편 →</text>`;
  txt+=stamp(t,t0,90,700,ink(90,690,l1,104,900)+ink(90,822,l2,104,900));
  art+=cd(800,1080,150,tw*2.2);
  if(t-t0>0.3) txt+=stamp(t,t0+0.3,330,1000,`<rect x="86" y="952" width="560" height="96" rx="48" fill="${G.LIME}"/><text x="366" y="1014" font-size="40" font-weight="800" text-anchor="middle" fill="#0A0A0A" letter-spacing="-0.5">팔로우하면 다음 편이 떠요</text>`);
  if(t-t0>0.6){
    txt+=stamp(t,t0+0.6,90,1240,ink(90,1250,'보다아트',72,900));
    txt+=`<text x="90" y="1316" font-size="38" font-weight="600" fill="${GREY}" letter-spacing="-0.5">2007년부터 음반을 만듭니다</text>`;
    txt+=`<text x="90" y="1410" font-size="38" font-weight="700" fill="${G.LIME}" letter-spacing="-0.5">음반 제작 문의는 프로필 링크</text>`;
  }
  return {art,txt};
};
function modern(svg){ // 굵은 손그림 선 → 가는 유리 선
  return svg.replace(/stroke-width="([\d.]+)"/g,(m,v)=>`stroke-width="${Math.max(1.5,(+v)*0.45).toFixed(1)}"`)
            .replace(/stroke="#F5F5F7"/g,'stroke="rgba(255,255,255,0.85)"');
}
function blobs(t,si){
  const P=[[[200,520],[900,1350],[820,420]],[[880,600],[180,1300],[520,980]],[[540,380],[860,1500],[160,900]]][si%3];
  const C=['vio','cyan','lime'];
  let s='';
  P.forEach((p,i)=>{const x=p[0]+Math.sin(t*0.4+i*2)*90, y=p[1]+Math.cos(t*0.33+i)*80; s+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${620-i*80}" fill="url(#g_${C[i]})"/>`;});
  return s;
}
window.render=function(t){
  const E=window.EP, f=Math.round(t*FPS);
  __T=t; CAPN=0; SHN=0; CDN=0; STAMPS=[];
  const sc=E.scene(t, stp(t,12));
  const cuts=E.cuts||[], beats=E.beats||cuts, hits=E.hits||[];
  let b0=0, si=0; for(const b of beats) if(t>=b){b0=b; si++;}
  const u=t-b0, endT=(E.dur||20)-3;
  const pq=cl(u/4.5,0,1); let push=1+0.03*(pq<.5?2*pq*pq:1-Math.pow(-2*pq+2,2)/2);
  let sx=0,sy=0,rgb=0,blur=0,flash=0; const SH=[[9,-6],[-6,4],[3,-2],[-1,1],[0,0]];
  for(const h of hits){const k=Math.floor((t-h)*FPS+1e-6);
    if(k>=0&&k<SH.length){sx+=SH[k][0];sy+=SH[k][1]} if(k>=0&&k<6) push*=1+0.045*(1-k/6); if(k>=0&&k<2) rgb=Math.max(rgb,2-k); if(k>=0&&k<3) flash=Math.max(flash,0.22*(1-k/3));}
  for(const c of cuts){const d=Math.abs(t-c); if(d<0.16){const q=1-d/0.16; blur=Math.max(blur,Math.round(q*12)); push*=1+0.09*q; flash=Math.max(flash,0.2*q*q);}}
  const e=b0>0?outBack(cl(u/0.5,0,1)):1, ey=(1-cl(e,0,1.2))*60;
  const bt=(t%(60/90)), pulse=1+0.012*Math.exp(-bt/0.1);
  let defs=`<defs>
   <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><circle cx="7" cy="7" r="3" fill="${G.VIO}" opacity="0.8"/></pattern>
   <filter id="glow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="22"/></filter>
   <radialGradient id="g_vio"><stop offset="0" stop-color="${G.VIO}" stop-opacity="0.55"/><stop offset="1" stop-color="${G.VIO}" stop-opacity="0"/></radialGradient>
   <radialGradient id="g_cyan"><stop offset="0" stop-color="${G.CYAN}" stop-opacity="0.32"/><stop offset="1" stop-color="${G.CYAN}" stop-opacity="0"/></radialGradient>
   <radialGradient id="g_lime"><stop offset="0" stop-color="${G.LIME}" stop-opacity="0.16"/><stop offset="1" stop-color="${G.LIME}" stop-opacity="0"/></radialGradient>
   <radialGradient id="discg" cx="0.4" cy="0.35" r="0.75"><stop offset="0" stop-color="#F4F4F8"/><stop offset="0.55" stop-color="#B9BCC8"/><stop offset="1" stop-color="#6E7180"/></radialGradient>
   <linearGradient id="glassg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0.12"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0.03"/></linearGradient>
   <linearGradient id="chromeband" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFFFFF" stop-opacity="0"/><stop offset="0.5" stop-color="#FFFFFF" stop-opacity="0.85"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></linearGradient>
   <filter id="rgb" x="-3%" y="-3%" width="106%" height="106%"><feOffset in="SourceGraphic" dx="${-4*rgb}" result="a"/><feColorMatrix in="a" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/><feOffset in="SourceGraphic" dx="${4*rgb}" result="b"/><feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="gb"/><feBlend in="r" in2="gb" mode="screen"/></filter>`;
  for(let i=1;i<=12;i++) defs+=`<filter id="b${i}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${i}"/></filter>`;
  defs+=`</defs>`;
  let back=`<rect x="0" y="0" width="1080" height="1920" fill="${G.BG}"/>`+blobs(t,si);
  // 장면 뒤 유리 카드 (사물이 있는 장면만)
  let card='';
  if(sc.art && t>=(beats[0]||0) && t<endT){const ca=cl((u)/0.35,0,1);
    card=`<g opacity="${ca.toFixed(2)}"><rect x="60" y="665" width="960" height="505" rx="48" fill="url(#glassg)" stroke="rgba(255,255,255,0.16)" stroke-width="1.5"/><path d="M108 666 H972" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/></g>`;}
  // 도장 순간의 빛 고리
  let fx=''; const seen={};
  for(const [t0,cx,cy] of STAMPS){const key=t0.toFixed(2)+cx+'|'+cy; if(seen[key]) continue; seen[key]=1;
    const uu=t-t0, big=hits.some(h=>Math.abs(h-t0)<0.04); if(uu<0.45){const q=uu/0.45, R=40+q*(big?700:380);
      fx+=`<circle cx="${cx}" cy="${cy}" r="${R.toFixed(0)}" fill="none" stroke="${big?G.LIME:'#FFFFFF'}" stroke-width="${(big?5:3)*(1-q)+0.5}" opacity="${(0.7*(1-q)).toFixed(2)}"/>`;}}
  const art=modern(sc.art||'');
  const inner=`<g transform="translate(0,${ey.toFixed(1)}) translate(540,950) scale(${pulse.toFixed(4)}) translate(-540,-950)">${card}${art}</g>`+(sc.txt||'')+fx;
  const flt=blur>0?` filter="url(#b${Math.min(12,blur)})"`:(rgb?' filter="url(#rgb)"':'');
  const body=`<g transform="translate(${540+sx},${900+sy}) scale(${push.toFixed(4)}) translate(-540,-900)"${flt}>${inner}</g>`;
  const fl=flash>0?`<rect x="0" y="0" width="1080" height="1920" fill="#FFFFFF" opacity="${flash.toFixed(2)}"/>`:'';
  const vig=`<rect x="0" y="0" width="1080" height="1920" fill="url(#vig)"/>`;
  document.getElementById('s').innerHTML=defs.replace('</defs>',`<radialGradient id="vig" cx="0.5" cy="0.45" r="0.75"><stop offset="0.6" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.55"/></radialGradient></defs>`)+back+body+vig+chrome(E.tag)+fl;
  const st=document.getElementById('stage'); st.style.background=G.BG;
  const g=document.getElementById('grain'), k=Math.floor(f/3);
  g.style.backgroundImage=`url(grain${k%3}.png)`; g.style.opacity='0.10'; g.style.mixBlendMode='screen';
  g.style.transform=`translate(${Math.round((rnd(k)-.5)*30)}px,${Math.round((rnd(k+40)-.5)*30)}px)`;
};
