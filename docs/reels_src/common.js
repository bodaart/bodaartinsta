// 보다아트 릴스 공통 엔진 — 인쇄 교정지 스타일
const INK='#2B2320',ROSE='#C4877C',DEEP='#9A5A51',SAND='#D9C6B2',BEIGE='#EADFD1',IVORY='#F7F2EB',TAUPE='#B39A85',GREY='#7B6D64',F4='#F4EEE4';
const FPS=30;
function rnd(n){const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)}
const cl=(v,a,b)=>Math.max(a,Math.min(b,v));
const pr=(t,a,b)=>cl((t-a)/(b-a),0,1);
const out=p=>1-Math.pow(1-p,3);
const stp=(t,f)=>Math.floor(t*f+1e-6)/f;
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')}

function ink(x,y,str,size,w,o={}){
  const ls=o.ls!==undefined?o.ls:-0.02*size, an=o.anchor||'start', fill=o.fill||INK;
  const a=`x="${x}" y="${y}" font-size="${size}" font-weight="${w}" letter-spacing="${ls}" text-anchor="${an}"`;
  let s='';
  if(o.mis) s+=`<text ${a} fill="${o.misc||ROSE}" transform="translate(${o.mis[0]},${o.mis[1]})">${esc(str)}</text>`;
  s+=`<text ${a} fill="${fill}">${esc(str)}</text>`;
  return s;
}
function stamp(t,t0,cx,cy,inner){
  if(t<t0) return '';
  const k=t-t0<2/FPS?1.05:1;
  return `<g transform="translate(${cx},${cy}) scale(${k}) translate(${-cx},${-cy})">${inner}</g>`;
}
function cap(t,t0,lines,y0,size){
  let s='';size=size||60;
  lines.forEach((ln,i)=>{const tt=t0+i*0.45; if(t>=tt) s+=stamp(t,tt,90,y0+i*size*1.32,ink(90,y0+i*size*1.32,ln,size,700))});
  return s;
}
function year(t,t0,str,size){
  size=size||300;
  return stamp(t,t0,90,610,ink(84,610,str,size,900,{ls:-0.045*size,mis:[9,7]}));
}
function src(str){return ink(990,1408,str,24,500,{anchor:'end',fill:GREY,ls:0})}
// 기울어진 도장 상자
function seal(t,t0,cx,cy,str,size,rot,w){
  const h=size*1.9; w=w||str.length*size*1.0+70;
  return stamp(t,t0,cx,cy,`<g transform="rotate(${rot} ${cx} ${cy})"><rect x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" fill="none" stroke="${DEEP}" stroke-width="6"/>`+ink(cx,cy+size*0.36,str,size,800,{anchor:'middle',fill:DEEP,ls:0})+`</g>`);
}
// 가격표
function tag(t,t0,x,y,str,rot){
  const w=str.length*34+90,h=84;
  return stamp(t,t0,x,y,`<g transform="rotate(${rot||-8} ${x} ${y})"><path d="M${x} ${y} L${x+40} ${y-h/2} L${x+w} ${y-h/2} L${x+w} ${y+h/2} L${x+40} ${y+h/2} Z" fill="${IVORY}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><circle cx="${x+34}" cy="${y}" r="8" fill="none" stroke="${INK}" stroke-width="4"/>`+ink(x+62,y+17,str,48,900,{ls:-1,fill:DEEP})+`</g>`);
}

// ── 그림 ──
function lp(cx,cy,r,rot){
  let f=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${INK}"/>`, l='';
  for(let i=0;i<5;i++){const rr=r*(0.46+i*0.105);l+=`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="#5c4f48" stroke-width="2"/>`}
  const a1=-0.9,a2=-0.35;
  for(const k of [0.62,0.8]){const rr=r*k;
    l+=`<path d="M${cx+rr*Math.cos(a1)} ${cy+rr*Math.sin(a1)} A${rr} ${rr} 0 0 1 ${cx+rr*Math.cos(a2)} ${cy+rr*Math.sin(a2)}" fill="none" stroke="${SAND}" stroke-width="${Math.max(2,r*0.021)}" stroke-linecap="round"/>`}
  f+=`<circle cx="${cx+r*0.02}" cy="${cy+r*0.017}" r="${r*0.33}" fill="${ROSE}"/>`;
  l+=`<circle cx="${cx}" cy="${cy}" r="${r*0.33}" fill="none" stroke="${IVORY}" stroke-width="3"/>`;
  l+=`<line x1="${cx+r*0.1*Math.cos(rot)}" y1="${cy+r*0.1*Math.sin(rot)}" x2="${cx+r*0.27*Math.cos(rot)}" y2="${cy+r*0.27*Math.sin(rot)}" stroke="${IVORY}" stroke-width="${Math.max(2,r*0.021)}" stroke-linecap="round"/>`;
  l+=`<circle cx="${cx}" cy="${cy}" r="${r*0.035}" fill="${IVORY}"/>`;
  return f+l;
}
function cassette(x,y,w,rot){
  const h=w*0.63;
  let s=`<rect x="${x+7}" y="${y+6}" width="${w}" height="${h}" rx="14" fill="${SAND}"/>`;
  s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="none" stroke="${INK}" stroke-width="6"/>`;
  s+=`<rect x="${x+w*0.08+5}" y="${y+h*0.12+4}" width="${w*0.84}" height="${h*0.56}" rx="8" fill="${IVORY}"/>`;
  s+=`<rect x="${x+w*0.08}" y="${y+h*0.12}" width="${w*0.84}" height="${h*0.56}" rx="8" fill="none" stroke="${INK}" stroke-width="5"/>`;
  s+=`<line x1="${x+w*0.14}" y1="${y+h*0.24}" x2="${x+w*0.62}" y2="${y+h*0.24}" stroke="${DEEP}" stroke-width="4" stroke-linecap="round"/>`;
  const wy=y+h*0.34,wh=h*0.26;
  s+=`<rect x="${x+w*0.22}" y="${wy}" width="${w*0.56}" height="${wh}" rx="${wh/2}" fill="${INK}"/>`;
  for(const k of [0.33,0.67]){const cx=x+w*k,cy=wy+wh/2,rr=wh*0.36;
    s+=`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="${IVORY}"/>`;
    for(let i=0;i<3;i++){const a=rot+i*2.094;s+=`<line x1="${cx}" y1="${cy}" x2="${cx+rr*Math.cos(a)}" y2="${cy+rr*Math.sin(a)}" stroke="${INK}" stroke-width="4"/>`}}
  s+=`<path d="M${x+w*0.2} ${y+h} L${x+w*0.26} ${y+h*0.78} L${x+w*0.74} ${y+h*0.78} L${x+w*0.8} ${y+h}" fill="none" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  for(const k of [0.36,0.5,0.64]) s+=`<circle cx="${x+w*k}" cy="${y+h*0.89}" r="5" fill="${INK}"/>`;
  return s;
}
function cd(cx,cy,r,rot,o={}){
  const sw=o.sw||Math.max(3,Math.min(6,r*0.04)), off=Math.min(7,r*0.05);
  let s=`<circle cx="${cx+off}" cy="${cy+off*0.85}" r="${r}" fill="${o.fill||BEIGE}"/>`;
  if(!o.plain) for(const a0 of [rot,rot+Math.PI]){const a1=a0+0.62;
    s+=`<path d="M${cx+off} ${cy+off*0.85} L${cx+off+r*Math.cos(a0)} ${cy+off*0.85+r*Math.sin(a0)} A${r} ${r} 0 0 1 ${cx+off+r*Math.cos(a1)} ${cy+off*0.85+r*Math.sin(a1)} Z" fill="url(#dots)"/>`}
  s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="${sw}"/>`;
  s+=`<circle cx="${cx+off*0.6}" cy="${cy+off*0.5}" r="${r*0.34}" fill="${IVORY}"/>`;
  s+=`<circle cx="${cx}" cy="${cy}" r="${r*0.34}" fill="none" stroke="${INK}" stroke-width="${sw*0.7}"/>`;
  s+=`<circle cx="${cx}" cy="${cy}" r="${r*0.13}" fill="${F4}" stroke="${INK}" stroke-width="${sw*0.8}"/>`;
  return s;
}
function mini(cx,cy,r,on){   // 작은 CD (격자용)
  if(!on) return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${SAND}" stroke-width="2.5" stroke-dasharray="5 6"/>`;
  return `<circle cx="${cx+3}" cy="${cy+2.5}" r="${r}" fill="${ROSE}"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="3.5"/><circle cx="${cx}" cy="${cy}" r="${r*0.3}" fill="${F4}" stroke="${INK}" stroke-width="3"/>`;
}
function stack(x,base,w,n,color,seedBase,hh,gap){
  let s='';hh=hh||19;gap=gap||5;
  for(let i=0;i<n;i++){const dx=(rnd(seedBase+i)-0.5)*16, y=base-(i+1)*(hh+gap);
    s+=`<rect x="${x+dx+5}" y="${y+4}" width="${w}" height="${hh}" rx="3" fill="${color}"/>`;
    s+=`<rect x="${x+dx}" y="${y}" width="${w}" height="${hh}" rx="3" fill="none" stroke="${INK}" stroke-width="4"/>`}
  return s;
}
function bar(x,base,w,h,color){
  if(h<2) return '';
  return `<rect x="${x+7}" y="${base-h+6}" width="${w}" height="${h}" fill="${color}"/><rect x="${x}" y="${base-h}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
}
function ground(base,x0,x1){return `<line x1="${x0||110}" y1="${base}" x2="${x1||970}" y2="${base}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`}
function jewel(x,y,s){       // CD 케이스
  const h=s*0.88, sp=s*0.12;
  let g=`<rect x="${x+8}" y="${y+7}" width="${s}" height="${h}" rx="6" fill="${BEIGE}"/>`;
  g+=`<rect x="${x}" y="${y}" width="${s}" height="${h}" rx="6" fill="none" stroke="${INK}" stroke-width="6"/>`;
  g+=`<line x1="${x+sp}" y1="${y}" x2="${x+sp}" y2="${y+h}" stroke="${INK}" stroke-width="5"/>`;
  for(let i=0;i<7;i++){const yy=y+h*0.12+i*h*0.127;g+=`<line x1="${x+sp*0.28}" y1="${yy}" x2="${x+sp*0.72}" y2="${yy}" stroke="${INK}" stroke-width="3"/>`}
  return g;
}
function factory(x,base,w){
  const h=w*0.42, th=w*0.16, n=3, tw=w/n;
  let roof=`M${x} ${base-h}`;
  for(let i=0;i<n;i++){roof+=` L${x+tw*i} ${base-h-th} L${x+tw*(i+1)} ${base-h}`}
  const body=`M${x} ${base} L${x} ${base-h} `+roof.slice(roof.indexOf('L'))+` L${x+w} ${base} Z`;
  let s=`<path d="${body}" fill="${SAND}" transform="translate(8,7)"/>`;
  s+=`<rect x="${x+w*0.8}" y="${base-h-th*1.5}" width="${w*0.1}" height="${th*1.5}" fill="none" stroke="${INK}" stroke-width="6"/>`;
  s+=`<path d="${body}" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  s+=`<rect x="${x+w*0.08}" y="${base-h*0.55}" width="${w*0.14}" height="${h*0.55}" fill="${F4}" stroke="${INK}" stroke-width="5"/>`;
  for(const k of [0.34,0.52,0.7]) s+=`<rect x="${x+w*k}" y="${base-h*0.7}" width="${w*0.1}" height="${h*0.26}" fill="${IVORY}" stroke="${INK}" stroke-width="4"/>`;
  return s;
}
function smoke(x,y,k){let s='';for(let i=0;i<3;i++){const yy=y-i*46-((k*14)%46);s+=`<circle cx="${x+(rnd(i+k)-.5)*22}" cy="${yy}" r="${14+i*6}" fill="none" stroke="${TAUPE}" stroke-width="4"/>`}return s}
function box(x,y,w,h,fill){return `<rect x="${x+8}" y="${y+7}" width="${w}" height="${h}" rx="10" fill="${fill||SAND}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="none" stroke="${INK}" stroke-width="6"/>`}
function phone(x,y,w){
  const h=w*1.9;
  let s=`<rect x="${x+8}" y="${y+7}" width="${w}" height="${h}" rx="28" fill="${BEIGE}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="28" fill="none" stroke="${INK}" stroke-width="6"/>`;
  s+=`<line x1="${x+w*0.38}" y1="${y+22}" x2="${x+w*0.62}" y2="${y+22}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
  return s;
}

// ── 깔려 있는 인쇄 표시 ──
function chrome(tagStr){
  let s='';
  const M=[[60,250],[1020,250],[60,1530],[1020,1530]];
  for(const [x,y] of M){const sx=x<540?-1:1, sy=y<900?-1:1;
    s+=`<line x1="${x}" y1="${y+sy*14}" x2="${x}" y2="${y+sy*46}" stroke="${INK}" stroke-width="2"/>`;
    s+=`<line x1="${x+sx*14}" y1="${y}" x2="${x+sx*46}" y2="${y}" stroke="${INK}" stroke-width="2"/>`}
  [INK,DEEP,ROSE,TAUPE,SAND,BEIGE].forEach((c,i)=>{s+=`<rect x="${90+i*30}" y="1548" width="30" height="16" fill="${c}"/>`});
  s+=`<g stroke="${INK}" stroke-width="2" fill="none"><circle cx="990" cy="1556" r="11"/><line x1="972" y1="1556" x2="1008" y2="1556"/><line x1="990" y1="1538" x2="990" y2="1574"/></g>`;
  s+=ink(90,300,tagStr,30,700,{ls:1,fill:DEEP});
  s+=`<line x1="90" y1="318" x2="262" y2="318" stroke="${DEEP}" stroke-width="3"/>`;
  s+=ink(990,300,'BODA ART',26,800,{ls:5,anchor:'end',fill:INK});
  return s;
}
function ruler(t,cfg){
  const Y=1452,X0=110,X1=970,keys=cfg.keys;
  let p=keys[0][1];
  for(let i=0;i<keys.length-1;i++){if(t>=keys[i][0]){const q=pr(stp(t,15),keys[i][0],keys[i+1][0]);p=keys[i][1]+(keys[i+1][1]-keys[i][1])*out(q)}}
  let s=`<line x1="${X0}" y1="${Y}" x2="${X1}" y2="${Y}" stroke="${INK}" stroke-width="3"/>`;
  for(let i=0;i<=30;i++){const x=X0+(X1-X0)*i/30;s+=`<line x1="${x}" y1="${Y}" x2="${x}" y2="${Y-(i%10===0?16:8)}" stroke="${INK}" stroke-width="2"/>`}
  for(const [y,k] of cfg.years){const xx=X0+(X1-X0)*k,on=p>=k-0.001;
    s+=`<text x="${xx}" y="${Y+40}" font-size="26" font-weight="${on?800:500}" fill="${on?INK:TAUPE}" text-anchor="${k<0.05?'start':k>0.95?'end':'middle'}" letter-spacing="1">${y}</text>`}
  const px=X0+(X1-X0)*p;
  s+=`<line x1="${X0}" y1="${Y}" x2="${px}" y2="${Y}" stroke="${DEEP}" stroke-width="9"/>`;
  s+=`<path d="M${px-13} ${Y-34} L${px+13} ${Y-34} L${px} ${Y-12} Z" fill="${DEEP}"/>`;
  return s;
}
// 맺음 카드
function endcard(t,t0,l1,l2,tw){
  let art='',txt='';
  txt+=ink(90,520,'다음 편',40,800,{fill:DEEP,ls:2});
  txt+=`<line x1="90" y1="544" x2="210" y2="544" stroke="${DEEP}" stroke-width="4"/>`;
  txt+=stamp(t,t0,90,700,ink(90,690,l1,104,900)+ink(90,822,l2,104,900));
  art+=cd(820,1090,120,tw*2.2);
  if(t-t0>0.3){
    txt+=stamp(t,t0+0.3,300,1000,`<rect x="86" y="950" width="520" height="92" fill="none" stroke="${DEEP}" stroke-width="6"/>`+ink(346,1012,'팔로우하면 다음 편이 떠요',40,800,{anchor:'middle',fill:DEEP,ls:-0.5}));
  }
  if(t-t0>0.6){
    txt+=stamp(t,t0+0.6,90,1240,ink(90,1250,'보다아트',70,900,{mis:[6,5]}));
    txt+=ink(90,1316,'2007년부터 음반을 만듭니다',38,600,{fill:GREY,ls:-0.5});
    txt+=ink(90,1410,'음반 제작 문의는 프로필 링크',38,700,{fill:DEEP,ls:-0.5});
  }
  return {art,txt};
}

window.render=function(t){
  const E=window.EP, f=Math.round(t*FPS);
  const sc=E.scene(t, stp(t,12));
  const seed=Math.floor(f/3)%9+1;
  const defs=`<defs>
   <pattern id="dots" width="13" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><circle cx="6.5" cy="6.5" r="3.6" fill="${ROSE}"/></pattern>
   <filter id="boil" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="7" xChannelSelector="R" yChannelSelector="G"/></filter>
   <filter id="rough" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="3"/><feDisplacementMap in="SourceGraphic" scale="2.2"/></filter>
  </defs>`;
  document.getElementById('s').innerHTML=defs+chrome(E.tag)+(sc.ruler?ruler(t,E.ruler):'')+`<g filter="url(#boil)">${sc.art||''}</g><g filter="url(#rough)">${sc.txt||''}</g>`;
  const g=document.getElementById('grain'), k=Math.floor(f/3);
  g.style.backgroundImage=`url(grain${k%3}.png)`;
  g.style.transform=`translate(${Math.round((rnd(k)-.5)*30)}px,${Math.round((rnd(k+40)-.5)*30)}px)`;
};
document.fonts.ready.then(()=>{window.render(0);window.ready=true});
