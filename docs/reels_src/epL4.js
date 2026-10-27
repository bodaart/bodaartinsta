// LP의 근본 #1 — 한 면에 23분, 그리고 지금은 (20초판, 트렌디판용)
// 사실 근거: Wikipedia "LP record" (1948.6.21 컬럼비아 발표, 33⅓회전, 12인치, 처음 한 면 약 23분, 78회전 셸락판은 12인치도 한 면 5분 미만),
//           RIAA 2024 연간 보고(미국 LP 4,400만 장 · 18년 연속 매출 성장 · CD 3,300만 장보다 3년째 많음), CD는 1982년 12cm·74분(CD의 근본 1·2편)
const S=[2.6,7.0,11.4,15.8,20.2,23.0];   // 장면 4.4초(내레이션용 26초판)
function disc78(cx,cy,r,rot){ // 셸락판: 무광 검정, 가운데 종이 라벨
  let g=`<ellipse cx="${cx}" cy="${cy+r*0.9}" rx="${r*0.8}" ry="${r*0.12}" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1B1B22" stroke="rgba(255,255,255,0.45)" stroke-width="2"/>`;
  for(let i=0;i<6;i++){const rr=r*(0.42+i*0.095); g+=`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="2"/>`;}
  g+=`<circle cx="${cx}" cy="${cy}" r="${r*0.34}" fill="#D9C6B2"/><circle cx="${cx}" cy="${cy}" r="${r*0.05}" fill="#1B1B22"/>`;
  g+=`<line x1="${cx+r*0.12*Math.cos(rot)}" y1="${cy+r*0.12*Math.sin(rot)}" x2="${cx+r*0.28*Math.cos(rot)}" y2="${cy+r*0.28*Math.sin(rot)}" stroke="#2B2320" stroke-width="3" stroke-linecap="round"/>`;
  return g;
}
function vinyl(cx,cy,r,rot){ // LP: 검정 + 보라 라벨 + 빛 반사
  let g=`<ellipse cx="${cx}" cy="${cy+r*0.9}" rx="${r*0.8}" ry="${r*0.12}" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0F0F15" stroke="rgba(255,255,255,0.55)" stroke-width="2"/>`;
  for(let i=0;i<9;i++){const rr=r*(0.4+i*0.065); g+=`<circle cx="${cx}" cy="${cy}" r="${rr}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>`;}
  const ga=-rot*0.6-0.9, ri=r*0.4, ro=r*0.97;
  g+=`<path d="M${cx+ri*Math.cos(ga-0.2)} ${cy+ri*Math.sin(ga-0.2)} L${cx+ro*Math.cos(ga-0.14)} ${cy+ro*Math.sin(ga-0.14)} A${ro} ${ro} 0 0 1 ${cx+ro*Math.cos(ga+0.14)} ${cy+ro*Math.sin(ga+0.14)} L${cx+ri*Math.cos(ga+0.2)} ${cy+ri*Math.sin(ga+0.2)} Z" fill="#FFFFFF" opacity="0.22"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r*0.33}" fill="${ROSE}"/><circle cx="${cx}" cy="${cy}" r="${r*0.04}" fill="#0F0F15"/>`;
  g+=`<line x1="${cx+r*0.1*Math.cos(rot)}" y1="${cy+r*0.1*Math.sin(rot)}" x2="${cx+r*0.27*Math.cos(rot)}" y2="${cy+r*0.27*Math.sin(rot)}" stroke="#F5F5F7" stroke-width="3" stroke-linecap="round"/>`;
  return g;
}
function clock(cx,cy,r,p,col){ // 시간 원: p(0~1)만큼 채움
  const a=-Math.PI/2, b=a+Math.PI*2*Math.max(0.001,Math.min(0.999,p)), big=p>0.5?1:0;
  let g=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="10"/>`;
  g+=`<path d="M${cx+r*Math.cos(a)} ${cy+r*Math.sin(a)} A${r} ${r} 0 ${big} 1 ${cx+r*Math.cos(b)} ${cy+r*Math.sin(b)}" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round"/>`;
  return g;
}
function pill(x,y,str,on){ const w=str.length*30+60;
  return `<rect x="${x}" y="${y}" width="${w}" height="64" rx="32" fill="${on?DEEP:'rgba(255,255,255,0.08)'}" stroke="${on?DEEP:'rgba(255,255,255,0.35)'}" stroke-width="2"/>`+
         `<text x="${x+w/2}" y="${y+44}" font-size="34" font-weight="800" text-anchor="middle" fill="${on?'#0A0A0A':INK}" letter-spacing="-0.5">${esc(str)}</text>`;
}
window.EP={cuts:[2.6,11.4,20.2,23.0],beats:[2.6,7.0,11.4,15.8,20.2,23.0],hits:[0.35,15.8],flash:[0.35],
 tag:'LP의 근본  #1',dur:26,ruler:{years:[],keys:[[0,0],[26,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,470,'LP 한 면에 담긴 시간',84,900);
    txt+=stamp(t,0,470,900,ink(80,930,'23분',300,900,{mis:[12,9],fill:DEEP,misc:SAND,ls:-14}));
    if(t>=0.35) txt+=seal(t,0.35,860,585,'1948',56,-9,260);
    if(t>=1.0) txt+=stamp(t,1.0,300,1200,ink(90,1180,'그 전엔 한 면에',100,900)+ink(90,1310,'5분도 안 됐어요',100,900));
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'78회전',150,900,{mis:[9,7]})+ink(560,560,'셸락판',110,900,{fill:GREY}));
    const e=out(pr(stp(u,12),0.1,0.6));
    art+=`<g opacity="${e.toFixed(2)}" transform="translate(${((1-e)*-120).toFixed(1)},0)">`+disc78(330,917,200,tw*3)+`</g>`;
    const p=pr(stp(u,12),0.5,2.4);
    art+=clock(760,900,120,p*0.08,DEEP);
    txt+=`<text x="760" y="925" font-size="88" font-weight="900" text-anchor="middle" fill="${DEEP}" letter-spacing="-3">${u>0.5?'5분':''}</text>`;
    txt+=`<text x="760" y="1080" font-size="34" font-weight="700" text-anchor="middle" fill="${GREY}">한 면에 이게 다</text>`;
    txt+=cap(t,t0+0.3,['12인치 판인데도 한 면에 5분 미만.','노래 한두 곡이면 끝이었어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,roll(t,t0,'1948'),230,900,{mis:[9,7],fill:DEEP,misc:SAND,ls:-8}));
    const e=out(pr(stp(u,12),0.1,0.6));
    art+=`<g opacity="${e.toFixed(2)}" transform="translate(${((1-e)*-120).toFixed(1)},0)">`+vinyl(330,917,210,tw*2.4)+`</g>`;
    const p=pr(stp(u,12),0.6,2.6);
    art+=clock(760,900,120,p*0.38,DEEP);
    txt+=`<text x="760" y="925" font-size="88" font-weight="900" text-anchor="middle" fill="${DEEP}" letter-spacing="-3">${u>0.6?'23분':''}</text>`;
    if(u>1.0) art+=pill(620,1040,'33⅓회전',true);
    if(u>1.4) art+=pill(620,1115,'12인치 비닐',false);
    txt+=cap(t,t0+0.3,['컬럼비아가 내놓은 33⅓회전 LP.','한 면에 23분, 앨범이 시작됐죠.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,roll(t,t0,'1982'),230,900,{mis:[9,7],fill:DEEP,misc:SAND,ls:-8}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.9,1.6));
    art+=`<g opacity="${(1-e2*0.75).toFixed(2)}" transform="translate(${(-e2*160).toFixed(1)},0) scale(${(1-e2*0.3).toFixed(3)})" transform-origin="330 917">`+vinyl(330,917,210,tw*2.4)+`</g>`;
    if(u>0.9) art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*140).toFixed(1)},0)">`+cd(700,917,165,tw*2)+`</g>`;
    if(u>1.6){ art+=pill(560,1105,'12cm',true)+pill(730,1105,'74분',true); art+=sparkle(880,760,24); }
    txt+=cap(t,t0+0.3,['그다음은 CD. 12cm에 74분.','음반은 점점 작아지고 길어졌어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'지금은?',200,900,{mis:[9,7]}));
    const base=1110, e=out(pr(stp(u,12),0.3,1.4));
    // 2024 미국 판매: LP 4,400만 vs CD 3,300만
    const hL=330*e, hC=248*e;
    art+=`<rect x="250" y="${base-hL}" width="190" height="${hL}" rx="14" fill="${DEEP}"/>`;
    art+=`<rect x="640" y="${base-hC}" width="190" height="${hC}" rx="14" fill="rgba(255,255,255,0.22)" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>`;
    art+=`<line x1="150" y1="${base}" x2="930" y2="${base}" stroke="rgba(255,255,255,0.5)" stroke-width="3" stroke-linecap="round"/>`;
    if(u>0.3){
      txt+=`<text x="345" y="${base-hL-26}" font-size="64" font-weight="900" text-anchor="middle" fill="${DEEP}" letter-spacing="-2">${roll(t,t0+0.3,'4,400만',1.0)}</text>`;
      txt+=`<text x="735" y="${base-hC-26}" font-size="64" font-weight="900" text-anchor="middle" fill="${INK}" letter-spacing="-2">${roll(t,t0+0.3,'3,300만',1.0)}</text>`;
      txt+=`<text x="345" y="${base+44}" font-size="34" font-weight="800" text-anchor="middle" fill="${INK}">LP</text><text x="735" y="${base+44}" font-size="34" font-weight="800" text-anchor="middle" fill="${INK}">CD</text>`;
    }
    if(u>1.5) art+=pill(600,720,'18년 연속 성장',true);
    txt+=cap(t,t0+0.3,['2024년 미국에서 LP 4,400만 장.','18년째 늘어 CD보다 많이 팔려요.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'손에도,',150,900,{mis:[9,7]})+ink(560,560,'폰에도',150,900,{fill:DEEP}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.6,1.2)), p=pr(stp(u,12),1.2,2.0);
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-120).toFixed(1)},0)">`+vinyl(220,930,140,tw*2.4)+cd(445,930,110,tw*2)+`</g>`;
    art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*120).toFixed(1)},0)">`+pphone(700,700,210,{ph:tw*6,badge:true,p:0.6})+`</g>`;
    if(u>1.2) art+=plink(560,700,930,p);
    if(u>2.0) art+=sparkle(640,760,24)+sparkle(960,1120,22);
    txt+=cap(t,t0+0.3,['LP, CD, 그리고 이제 앱 음반까지.','음반은 손에도, 폰에도 담깁니다.'],1296,58);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'실물음반과','보다뮤직',tw),{ruler:false});
 }};
