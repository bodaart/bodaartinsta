// 사라진 매체들 #2 — LD, 레코드판만 한 영화 (26초 내레이션판, 트렌디판용)
// 사실 근거: 1978.12 미국 애틀랜타에서 첫 판매(첫 타이틀 Jaws), 지름 12인치(약 30cm) 아날로그 영상 디스크, CLV 한 면 60분,
//           일본에선 노래방 반주용으로 오래 쓰임(1999년까지 가정용 영상 주류), 파이오니어 2009.1 생산 종료 발표(마지막 모델이 노래방용, 파이오니어 누적 950만 대 이상).
const S=[2.6,7.0,11.4,15.8,20.2,23.0];
const LDEFS=`<defs><linearGradient id="ldg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E9E4F7"/><stop offset="0.35" stop-color="#9FD3FF"/><stop offset="0.6" stop-color="#F7C8E0"/><stop offset="1" stop-color="#C8FF3D"/></linearGradient></defs>`;
function ldisc(cx,cy,r,rot){ // LD: 은색 무지개 디스크, 가운데 작은 구멍
  let g=`<ellipse cx="${cx}" cy="${cy+r*0.9}" rx="${r*0.8}" ry="${r*0.12}" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#ldg)" stroke="rgba(255,255,255,0.7)" stroke-width="2"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0F0F15" opacity="0.35"/>`;
  for(let i=0;i<7;i++){const rr=r*(0.3+i*0.1); g+=`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1.5"/>`;}
  const ga=-rot*0.6-0.9, ri=r*0.26, ro=r*0.97;
  g+=`<path d="M${cx+ri*Math.cos(ga-0.3)} ${cy+ri*Math.sin(ga-0.3)} L${cx+ro*Math.cos(ga-0.18)} ${cy+ro*Math.sin(ga-0.18)} A${ro} ${ro} 0 0 1 ${cx+ro*Math.cos(ga+0.18)} ${cy+ro*Math.sin(ga+0.18)} L${cx+ri*Math.cos(ga+0.3)} ${cy+ri*Math.sin(ga+0.3)} Z" fill="#FFFFFF" opacity="0.35"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r*0.22}" fill="#F4EEE4"/><circle cx="${cx}" cy="${cy}" r="${r*0.05}" fill="#0F0F15"/>`;
  g+=`<line x1="${cx+r*0.08*Math.cos(rot)}" y1="${cy+r*0.08*Math.sin(rot)}" x2="${cx+r*0.19*Math.cos(rot)}" y2="${cy+r*0.19*Math.sin(rot)}" stroke="#2B2320" stroke-width="3" stroke-linecap="round"/>`;
  return g;
}
function clockp(cx,cy,r,p,col){
  const a=-Math.PI/2, b=a+Math.PI*2*Math.max(0.001,Math.min(0.999,p)), big=p>0.5?1:0;
  let g=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="10"/>`;
  g+=`<path d="M${cx+r*Math.cos(a)} ${cy+r*Math.sin(a)} A${r} ${r} 0 ${big} 1 ${cx+r*Math.cos(b)} ${cy+r*Math.sin(b)}" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round"/>`;
  return g;
}
function pillp(x,y,str,on){ const w=str.length*30+60;
  return `<rect x="${x}" y="${y}" width="${w}" height="64" rx="32" fill="${on?DEEP:'rgba(255,255,255,0.08)'}" stroke="${on?DEEP:'rgba(255,255,255,0.35)'}" stroke-width="2"/>`+
         `<text x="${x+w/2}" y="${y+44}" font-size="34" font-weight="800" text-anchor="middle" fill="${on?'#0A0A0A':INK}" letter-spacing="-0.5">${esc(str)}</text>`;
}
function mic(cx,cy,s){ // 노래방 마이크
  return `<rect x="${cx-s*0.12}" y="${cy}" width="${s*0.24}" height="${s*0.9}" rx="${s*0.12}" fill="#2A2A33" stroke="rgba(255,255,255,0.5)" stroke-width="2" transform="rotate(-25 ${cx} ${cy})"/>`+
         `<circle cx="${cx}" cy="${cy-s*0.05}" r="${s*0.28}" fill="${DEEP}" stroke="rgba(255,255,255,0.6)" stroke-width="2" transform="rotate(-25 ${cx} ${cy})"/>`+
         `<circle cx="${cx}" cy="${cy-s*0.05}" r="${s*0.28}" fill="url(#dots)" opacity="0.6" transform="rotate(-25 ${cx} ${cy})"/>`;
}
function tv(x,y,w,on,tw){ const h=w*0.78;
  let g=`<rect x="${x+8}" y="${y+12}" width="${w}" height="${h}" rx="18" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#2B2320" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>`;
  g+=`<rect x="${x+w*0.06}" y="${y+h*0.08}" width="${w*0.72}" height="${h*0.78}" rx="14" fill="${on?'url(#artg)':'#0A0A10'}" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>`;
  if(on){ for(let i=0;i<4;i++){ const yy=y+h*0.08+((tw*140+i*h*0.2)%(h*0.78)); g+=`<rect x="${x+w*0.06}" y="${yy.toFixed(1)}" width="${w*0.72}" height="3" fill="rgba(255,255,255,0.25)"/>`; } }
  g+=`<circle cx="${x+w*0.89}" cy="${y+h*0.3}" r="${w*0.04}" fill="rgba(255,255,255,0.3)"/><circle cx="${x+w*0.89}" cy="${y+h*0.5}" r="${w*0.04}" fill="rgba(255,255,255,0.3)"/>`;
  g+=`<rect x="${x+w*0.3}" y="${y+h}" width="${w*0.4}" height="${h*0.07}" fill="#2B2320"/>`;
  return g;
}
window.EP={cuts:[2.6,11.4,20.2,23.0],beats:[2.6,7.0,11.4,15.8,20.2,23.0],hits:[0.35,15.8],flash:[0.35],
 tag:'사라진 매체들  #2',dur:26,ruler:{years:[],keys:[[0,0],[26,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,470,'레코드판만 한 영화',84,900);
    txt+=stamp(t,0,470,900,ink(80,930,'LD',300,900,{mis:[12,9],fill:DEEP,misc:SAND,ls:-14}));
    if(t>=0.35) txt+=seal(t,0.35,860,585,'1978',56,-9,260);
    if(t>=1.0) txt+=stamp(t,1.0,300,1200,ink(90,1180,'디스크에 영상을',100,900)+ink(90,1310,'처음 담은 매체',100,900));
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'30cm',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.7)), e2=out(pr(stp(u,12),1.0,1.5));
    art+=LDEFS+`<g opacity="${e1.toFixed(2)}" transform="scale(${(0.6+0.4*e1).toFixed(3)})" transform-origin="400 900">`+ldisc(400,900,220,tw*2)+`</g>`;
    if(u>1.0) art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*120).toFixed(1)},0)">`+cd(850,980,90,tw*2)+`</g>`+(u>1.5?pillp(760,1100,'CD 12cm',false):'');
    if(u>0.7) art+=pillp(130,1150,'LP와 같은 크기',true);
    txt+=cap(t,t0+0.3,['지름 30cm, LP와 같은 크기.','그런데 담긴 건 음악이 아니라 영상.'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'한 면에',150,900,{mis:[9,7]})+ink(560,560,'60분',150,900,{fill:DEEP}));
    const p=pr(stp(u,12),0.3,2.6);
    art+=LDEFS+ldisc(300,960,170,tw*2);
    art+=clockp(760,960,150,p,DEEP);
    txt+=`<text x="760" y="985" font-size="72" font-weight="900" text-anchor="middle" fill="${INK}" letter-spacing="-2">${Math.round(p*60)}분</text>`;
    if(u>2.6) art+=pillp(620,1140,'영화는 뒤집어서',true);
    txt+=cap(t,t0+0.3,['한 면에 60분.','영화 한 편엔 판을 뒤집어야 했어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'노래방',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.8,1.3));
    art+=LDEFS+`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-120).toFixed(1)},0)">`+tv(150,760,420,u>0.6,tw)+`</g>`;
    if(u>0.8) art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*120).toFixed(1)},0)">`+mic(760,860,200)+`</g>`;
    for(let i=0;i<4;i++){ if(u>1.2+i*0.3) art+=note(640+i*90,760-(i%2)*50,56,i%2?DEEP:'rgba(255,255,255,0.8)'); }
    if(u>1.4) art+=pillp(560,1140,'일본 노래방 반주',true);
    txt+=cap(t,t0+0.3,['일본에선 노래방 반주로','오래오래 사랑받았어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'2009',170,900,{mis:[9,7]})+ink(560,560,'마지막',150,900,{fill:DEEP}));
    const f=1-pr(stp(u,12),0.6,2.4);
    art+=LDEFS+`<g opacity="${(0.15+0.85*f).toFixed(2)}" transform="translate(0,${((1-f)*40).toFixed(1)})">`+ldisc(300,960,170,tw*2)+`</g>`;
    const e2=out(pr(stp(u,12),1.0,1.6));
    art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*120).toFixed(1)},0)">`+cd(760,960,120,tw*2)+`</g>`;
    if(u>1.6) art+=pillp(660,1140,'DVD에 자리를',true);
    if(u>2.2) art+=pillp(130,1140,'마지막 플레이어 2009',false);
    txt+=cap(t,t0+0.3,['DVD가 오고 자리를 내줬어요.','마지막 플레이어는 2009년.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'그래도',150,900,{mis:[9,7]})+ink(520,560,'남은 것',150,900,{fill:DEEP}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.9,1.5));
    art+=LDEFS+`<g opacity="${e1.toFixed(2)}">`+ldisc(260,960,150,tw*2)+`</g>`;
    if(u>0.9) art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*120).toFixed(1)},0)">`+cd(560,960,110,tw*2)+`<text x="690" y="985" font-size="60" font-weight="900" fill="${DEEP}">+</text>`+tv(730,870,200,true,tw)+`</g>`;
    if(u>1.5) art+=pillp(400,1140,'음반에 영상을 담는 꿈',true)+sparkle(190,780,24)+sparkle(960,1110,22);
    txt+=cap(t,t0+0.3,['음반에 영상을 담는 꿈은','지금도 다른 모습으로 이어져요.'],1296,58);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'LP의 근본','2편',tw),{ruler:false});
 }};
