// 보다아트 릴스 엔진 v5 — v4 속도 그대로, 효과만 더 화려하게
// 글자가 한 자씩 떨어져 박힘 · 도장마다 터지는 선과 종이 조각 · 큰 숫자 위로 빛줄기
// CD에 홀로그램 무지갯빛 · 박자마다 살짝 튀는 그림 · 큰 타격엔 색 번짐과 줌 펀치
// CD 구멍 모양으로 열리는 장면 전환 · 뒤에 흐르는 큰 외곽 글자와 빛 번짐
let STAMPS=[], SHN=0;

function kinetic(inner,u){
  return inner.replace(/<text ([^>]*)>([^<]*)<\/text>/g,(m,a,c)=>{
    const s=c.replace(/&amp;/g,'&').replace(/&lt;/g,'<');
    const ch=Array.from(s), n=ch.length; if(n<1) return m;
    const lag=/transform=/.test(a)?0.04:0;
    const fs=+((a.match(/font-size="([\d.]+)"/)||[0,60])[1]);
    let prev=0,dys=[],rots=[],done=true;
    for(let i=0;i<n;i++){
      const p=cl((u-lag-i*0.035)/0.3,0,1), e=outBack(p);
      const off=-(1-e)*fs*0.6;
      rots.push(((1-p)*(i%2?16:-16)).toFixed(1)); dys.push((off-prev).toFixed(1)); prev=off;
      if(p<1) done=false;
    }
    if(done) return m;
    return `<text ${a} dy="${dys.join(' ')}" rotate="${rots.join(' ')}">${c}</text>`;
  });
}
function sheen(inner,u){
  const texts=(inner.match(/<text (?![^>]*transform=)[^>]*>[^<]*<\/text>/g)||[]).filter(x=>+((x.match(/font-size="([\d.]+)"/)||[0,0])[1])>=110).join('');
  if(!texts) return '';
  const id='shn'+(SHN++), p=(u-0.25)/0.55, x=-200+p*1900;
  return `<clipPath id="${id}">${texts}</clipPath><g clip-path="url(#${id})"><rect x="${x}" y="-300" width="110" height="2600" fill="${IVORY}" opacity="0.8" transform="skewX(-22)"/><rect x="${x+150}" y="-300" width="30" height="2600" fill="${IVORY}" opacity="0.65" transform="skewX(-22)"/></g>`;
}
const _stamp=window.stamp;
window.stamp=function(t,t0,cx,cy,inner){
  if(t<t0) return '';
  const u=t-t0;
  if(u<0.8 && inner) STAMPS.push([t0,cx,cy]);
  const kin=kinetic(inner,u);
  let s=_stamp(t,t0,cx,cy,kin);
  if(u>0.25&&u<0.8) s+=sheen(inner,u);
  return s;
};

const HOLO=['#F3C1CC','#F6E3A8','#C9E6D2','#BCD6F2','#DCC8F2','#F3C1CC'];
const _cd=window.cd;
window.cd=function(cx,cy,r,rot,o={}){
  let s=_cd(cx,cy,r,rot,o);
  if(o.plain||r<40) return s;
  const ri=r*0.36, ro=r*0.97, sw=o.sw||Math.max(3,Math.min(6,r*0.04));
  let g='';
  for(let i=0;i<6;i++){const a0=rot*1.4+i*Math.PI/3, a1=a0+Math.PI/3;
    g+=`<path d="M${cx+ri*Math.cos(a0)} ${cy+ri*Math.sin(a0)} L${cx+ro*Math.cos(a0)} ${cy+ro*Math.sin(a0)} A${ro} ${ro} 0 0 1 ${cx+ro*Math.cos(a1)} ${cy+ro*Math.sin(a1)} L${cx+ri*Math.cos(a1)} ${cy+ri*Math.sin(a1)} A${ri} ${ri} 0 0 0 ${cx+ri*Math.cos(a0)} ${cy+ri*Math.sin(a0)} Z" fill="${HOLO[i]}" opacity="0.55"/>`;}
  const ga=-rot*0.8-0.6;
  g+=`<path d="M${cx+ri*Math.cos(ga)} ${cy+ri*Math.sin(ga)} L${cx+ro*Math.cos(ga)} ${cy+ro*Math.sin(ga)}" stroke="${IVORY}" stroke-width="${r*0.06}" stroke-linecap="round" opacity="0.85"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="${sw}"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r*0.34}" fill="${IVORY}" stroke="${INK}" stroke-width="${sw*0.7}"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r*0.13}" fill="${F4}" stroke="${INK}" stroke-width="${sw*0.8}"/>`;
  const gx=cx+r*0.78*Math.cos(ga+0.5), gy=cy+r*0.78*Math.sin(ga+0.5), gs=r*0.09*(0.6+0.4*Math.abs(Math.sin(rot*3)));
  g+=`<path d="M${gx-gs} ${gy} Q${gx} ${gy} ${gx} ${gy-gs} Q${gx} ${gy} ${gx+gs} ${gy} Q${gx} ${gy} ${gx} ${gy+gs} Q${gx} ${gy} ${gx-gs} ${gy} Z" fill="${IVORY}"/>`;
  return s+g;
};

function burst(t,t0,cx,cy,big){
  const u=t-t0; let g='';
  if(u<0.45){ const q=u/0.45, n=big?14:9;
    for(let i=0;i<n;i++){const a=i*2*Math.PI/n+rnd(t0*7+i)*0.3, r1=(big?90:60)+q*(big?520:300), r2=r1+(big?90:55)*(1-q);
      g+=`<line x1="${cx+r1*Math.cos(a)}" y1="${cy+r1*Math.sin(a)}" x2="${cx+r2*Math.cos(a)}" y2="${cy+r2*Math.sin(a)}" stroke="${i%3?DEEP:ROSE}" stroke-width="${(big?9:6)*(1-q)+1}" stroke-linecap="round"/>`;}
    if(big&&u<0.25){ const rr=40+u*1600; g+=`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="${ROSE}" stroke-width="${14*(1-u/0.25)}" opacity="${0.8*(1-u/0.25)}"/>`; }
  }
  if(u<0.9){ const n=big?16:8, C=window.CONF||[ROSE,DEEP,SAND,'#F3C1CC','#BCD6F2','#F6E3A8'];
    for(let i=0;i<n;i++){const a=rnd(t0*13+i)*2*Math.PI, v=(big?700:420)+rnd(t0+i*3)*500;
      const x=cx+v*u*Math.cos(a), y=cy+v*u*Math.sin(a)+1100*u*u, op=cl(1-(u-0.45)/0.45,0,1), rot=u*720*(i%2?1:-1)+i*40;
      g+=`<rect x="${x-9}" y="${y-5}" width="18" height="10" fill="${C[i%C.length]}" opacity="${op}" transform="rotate(${rot} ${x} ${y})"/>`;}
  }
  return g;
}
function iris(t,c){   // CD 구멍 모양 전환: 디스크가 화면을 덮고, 가운데 구멍이 커지며 새 장면이 열림
  const a=c-0.22, z=c+0.26; if(t<a||t>z) return '';
  let g='';
  if(t<c){ const p=out((t-a)/0.22), R=40+p*1250;
    g+=`<circle cx="540" cy="900" r="${R}" fill="${window.IRISC||DEEP}"/>`;
    for(let k=1;k<6;k++) g+=`<circle cx="540" cy="900" r="${R*k/6}" fill="none" stroke="${window.IRISR||ROSE}" stroke-width="3" opacity="0.6"/>`;
    g+=`<circle cx="540" cy="900" r="${R*0.13}" fill="${F4}"/>`;
  } else { const p=out((t-c)/0.26), h=60+p*1300;
    g+=`<path d="M-50 -50 H1130 V1970 H-50 Z M${540+h} 900 A${h} ${h} 0 1 0 ${540-h} 900 A${h} ${h} 0 1 0 ${540+h} 900 Z" fill="${window.IRISC||DEEP}" fill-rule="evenodd"/>`;
    g+=`<circle cx="540" cy="900" r="${h}" fill="none" stroke="${window.IRISR||ROSE}" stroke-width="10"/>`;
    g+=`<circle cx="540" cy="900" r="${h+40}" fill="none" stroke="${IVORY}" stroke-width="4" opacity="0.6"/>`;
  }
  return g;
}

window.render=function(t){
  const E=window.EP, f=Math.round(t*FPS);
  CAPN=0; SHN=0; STAMPS=[];
  const sc=E.scene(t, stp(t,12));
  const seed=Math.floor(f/3)%9+1;
  const cuts=E.cuts||[], beats=(E.beats||cuts), hits=E.hits||[];
  let b0=0; for(const b of beats) if(t>=b) b0=b;
  const u=t-b0;
  const pq=cl(u/4.5,0,1); let push=1+0.035*(pq<.5?2*pq*pq:1-Math.pow(-2*pq+2,2)/2);
  let sx=0,sy=0,rgb=0; const SH=[[13,-9],[-8,6],[5,-3],[-2,1],[1,0]];
  for(const h of hits){const k=Math.floor((t-h)*FPS+1e-6);
    if(k>=0&&k<SH.length){sx+=SH[k][0];sy+=SH[k][1]}
    if(k>=0&&k<6) push*=1+0.05*(1-k/6);
    if(k>=0&&k<3) rgb=Math.max(rgb,3-k);}
  const e=b0>0?outBack(cl(u/0.5,0,1)):1, ex=(1-e)*120, es=0.94+0.06*cl(e,0,1.2);
  const bt=(t%(60/90)), pulse=1+0.022*Math.exp(-bt/0.11);
  const defs=`<defs>
   <pattern id="dots" width="13" height="13" patternUnits="userSpaceOnUse" patternTransform="rotate(28)"><circle cx="6.5" cy="6.5" r="3.6" fill="${ROSE}"/></pattern>
   <filter id="boil" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed="${seed}"/><feDisplacementMap in="SourceGraphic" scale="7" xChannelSelector="R" yChannelSelector="G"/></filter>
   <filter id="rough" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="3"/><feDisplacementMap in="SourceGraphic" scale="2.2"/></filter>
   <filter id="rgb" x="-3%" y="-3%" width="106%" height="106%"><feOffset in="SourceGraphic" dx="${-3*rgb}" dy="${1*rgb}" result="a"/><feColorMatrix in="a" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r"/><feOffset in="SourceGraphic" dx="${3*rgb}" dy="${-1*rgb}" result="b"/><feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="gb"/><feBlend in="r" in2="gb" mode="screen"/></filter>
   <radialGradient id="leak"><stop offset="0" stop-color="${window.LEAK1||ROSE}" stop-opacity="0.32"/><stop offset="1" stop-color="${window.LEAK1||ROSE}" stop-opacity="0"/></radialGradient>
   <radialGradient id="leak2"><stop offset="0" stop-color="${window.LEAK2||'#F6E3A8'}" stop-opacity="0.35"/><stop offset="1" stop-color="${window.LEAK2||'#F6E3A8'}" stop-opacity="0"/></radialGradient>
  </defs>`;
  // 뒤에 깔리는 빛 번짐 + 큰 외곽 글자
  let back=`<circle cx="${180+Math.sin(t*0.5)*120}" cy="${420+Math.cos(t*0.4)*90}" r="520" fill="url(#leak)"/><circle cx="${900+Math.cos(t*0.45)*110}" cy="${1350+Math.sin(t*0.35)*120}" r="560" fill="url(#leak2)"/>`;
  const bg=E.bg||'CD';
  back+=`<text x="${540-((t*22)%400)}" y="1180" font-size="760" font-weight="900" fill="none" stroke="${window.BGSTROKE||SAND}" stroke-width="3" opacity="${window.BGOP||0.7}" text-anchor="middle" letter-spacing="-30">${esc(bg)}</text>`;
  let flash='';
  for(const fl of (E.flash||[])){const k=Math.floor((t-fl)*FPS+1e-6); if(k>=0&&k<2) flash+=`<rect x="0" y="0" width="1080" height="1920" fill="${IVORY}" opacity="${k===0?0.6:0.25}"/>`}
  let wp=''; cuts.forEach((c,i)=>{wp+= (i%2===1)? iris(t,c) : wipe(t,c,i)});
  // 도장 터짐
  const seen={}; let fx='';
  for(const [t0,cx,cy] of STAMPS){const key=t0.toFixed(2)+'|'+cx+'|'+cy; if(seen[key]) continue; seen[key]=1;
    const big=hits.some(h=>Math.abs(h-t0)<0.04); fx+=burst(t,t0,cx,cy,big);}
  const artTf=`translate(${ex},0) translate(540,900) scale(${es*pulse}) translate(-540,-900)`;
  const inner=(sc.ruler?ruler(t,E.ruler):'')+`<g transform="${artTf}"><g filter="url(#boil)">${sc.art||''}</g></g><g filter="url(#rough)">${sc.txt||''}</g>`+fx;
  const body=`<g transform="translate(${540+sx},${900+sy}) scale(${push}) translate(-540,-900)"${rgb?' filter="url(#rgb)"':''}>`+inner+`</g>`;
  document.getElementById('s').innerHTML=defs+back+chrome(E.tag)+body+flash+`<g filter="url(#rough)">${wp}</g>`;
  const g=document.getElementById('grain'), k=Math.floor(f/3);
  g.style.backgroundImage=`url(grain${k%3}.png)`;
  g.style.transform=`translate(${Math.round((rnd(k)-.5)*30)}px,${Math.round((rnd(k+40)-.5)*30)}px)`;
};
