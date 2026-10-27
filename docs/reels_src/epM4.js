// 보다뮤직 이야기 #1 — 음반 1장을 만들면 2개가 생겨요 (실물음반 × 보다뮤직 연동, 20초판, 트렌디판용)
// 사실 근거: 홈페이지 모바일 음반 안내(보다아트에서 CD·USB 음반을 만들면 앱 음반을 함께 받음, 보다코드로 폰에 받음, 받은 기기에서 인터넷·서버 없이 재생,
//           스트리밍처럼 사라지지 않음, 계약 기간 동안 소장). 가격·조건 숫자는 쓰지 않음. QR·NFC 표현 금지, "보다코드"로만.
const S=[2.6,7.0,11.4,15.8,20.2,23.0];   // 장면 4.4초(내레이션용 26초판)
function pill2(x,y,str,on){ const w=str.length*30+60;
  return `<rect x="${x}" y="${y}" width="${w}" height="64" rx="32" fill="${on?DEEP:'rgba(255,255,255,0.08)'}" stroke="${on?DEEP:'rgba(255,255,255,0.35)'}" stroke-width="2"/>`+
         `<text x="${x+w/2}" y="${y+44}" font-size="34" font-weight="800" text-anchor="middle" fill="${on?'#0A0A0A':INK}" letter-spacing="-0.5">${esc(str)}</text>`;
}
function codecard(x,y,w,e){ // 음반 안에 든 보다코드 카드 (코드는 글자 알약으로만 표현)
  const h=w*0.62;
  let g=`<rect x="${x+8}" y="${y+10}" width="${w}" height="${h}" rx="14" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="rgba(255,255,255,0.10)" stroke="rgba(255,255,255,0.5)" stroke-width="2"/>`;
  g+=`<rect x="${x+w*0.08}" y="${y+h*0.14}" width="${w*0.5}" height="${h*0.12}" rx="6" fill="rgba(255,255,255,0.8)"/><rect x="${x+w*0.08}" y="${y+h*0.34}" width="${w*0.32}" height="${h*0.08}" rx="4" fill="rgba(255,255,255,0.35)"/>`;
  g+=`<rect x="${x+w*0.08}" y="${y+h*0.58}" width="${w*0.62}" height="${h*0.26}" rx="${h*0.13}" fill="rgba(200,255,61,${(0.18+0.6*e).toFixed(2)})" stroke="${DEEP}" stroke-width="2"/>`;
  g+=`<text x="${x+w*0.39}" y="${y+h*0.76}" font-size="${h*0.15}" font-weight="800" text-anchor="middle" fill="${e>0.5?'#0A0A0A':DEEP}" letter-spacing="-0.5">보다코드</text>`;
  return g;
}
function nowifi(cx,cy,r){ // 인터넷 없음 표시
  let g='';
  for(let i=1;i<=3;i++){const rr=r*i/3; g+=`<path d="M${cx-rr*0.78} ${cy-rr*0.62} A${rr} ${rr} 0 0 1 ${cx+rr*0.78} ${cy-rr*0.62}" fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="7" stroke-linecap="round"/>`;}
  g+=`<circle cx="${cx}" cy="${cy}" r="8" fill="rgba(255,255,255,0.7)"/>`;
  g+=`<line x1="${cx-r*0.9}" y1="${cy-r*0.95}" x2="${cx+r*0.7}" y2="${cy+r*0.25}" stroke="${DEEP}" stroke-width="10" stroke-linecap="round"/>`;
  return g;
}
window.EP={cuts:[2.6,11.4,20.2,23.0],beats:[2.6,7.0,11.4,15.8,20.2,23.0],hits:[0.35,11.4],flash:[0.35],
 tag:'보다뮤직 이야기  #1',dur:26,ruler:{years:[],keys:[[0,0],[26,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,470,'음반 1장을 만들면',84,900);
    txt+=stamp(t,0,470,900,ink(80,930,'2개',300,900,{mis:[12,9],fill:DEEP,misc:SAND,ls:-14}));
    if(t>=0.35) txt+=seal(t,0.35,860,585,'실물 + 앱',56,-9,300);
    if(t>=1.0) txt+=stamp(t,1.0,300,1200,ink(90,1180,'손에 쥐는 음반과',100,900)+ink(90,1310,'폰 속 음반이 같이',100,900));
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'CD·USB',150,900,{mis:[9,7]})+ink(640,560,'음반',150,900,{fill:DEEP}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.5,1.0)), e3=out(pr(stp(u,12),1.1,1.6));
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-120).toFixed(1)},0)">`+cd(250,900,130,tw*2)+`</g>`;
    art+=`<g opacity="${e2.toFixed(2)}" transform="translate(0,${((1-e2)*80).toFixed(1)})">`+pusb(420,860,260,-6)+`</g>`;
    if(u>1.1) art+=`<g opacity="${e3.toFixed(2)}" transform="translate(${((1-e3)*120).toFixed(1)},0)">`+pphone(760,720,200,{ph:tw*6,p:0.4})+`</g>`;
    if(u>1.6) txt+=`<text x="860" y="1150" font-size="34" font-weight="800" text-anchor="middle" fill="${DEEP}">+ 앱 음반</text>`;
    txt+=cap(t,t0+0.3,['보다아트에서 CD나 USB 음반을 만들면','디지털 앱 음반이 함께 와요.'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'보다코드',200,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.8,1.3)), p=pr(stp(u,12),1.3,2.1);
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-120).toFixed(1)},0)">`+codecard(130,800,360,e2)+`</g>`;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*120).toFixed(1)},0)">`+pphone(720,700,210,{ph:tw*6,badge:true,p:p})+`</g>`;
    if(u>1.3) art+=plink(500,720,930,p);
    if(u>2.1) art+=sparkle(640,780,24)+sparkle(960,1130,22);
    txt+=cap(t,t0+0.3,['음반 안의 보다코드로','폰에 받으면 끝이에요.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'인터넷',150,900,{mis:[9,7]})+ink(500,560,'없이도',150,900,{fill:DEEP}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.7,1.1));
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-120).toFixed(1)},0)">`+pphone(230,700,210,{ph:tw*6,p:0.7})+`</g>`;
    if(u>0.7){ art+=`<g opacity="${e2.toFixed(2)}" transform="scale(${(0.8+0.2*e2).toFixed(3)})" transform-origin="720 880">`+nowifi(720,900,120)+`</g>`;
      art+=pill2(600,1030,'서버 없이',true); }
    if(u>1.3) art+=pill2(600,1100,'비행기에서도',false);
    txt+=cap(t,t0+0.3,['받은 폰에선 인터넷도 서버도 없이','계속 재생돼요.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'사라지지',150,900,{mis:[9,7]})+ink(600,560,'않아요',150,900,{fill:DEEP}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.9,1.5));
    art+=PDEFS;
    // 왼쪽: 스트리밍 — 흐려지며 사라지는 음표들
    for(let i=0;i<4;i++){ const f=cl(1-e2*1.2+i*0.15,0,1); art+=`<g opacity="${(0.9*f).toFixed(2)}" transform="translate(0,${(-(1-f)*60).toFixed(1)})">`+note(200+i*70,880+(i%2)*60,70,'rgba(255,255,255,0.75)')+`</g>`; }
    if(u>0.9) txt+=`<text x="300" y="1030" font-size="34" font-weight="700" text-anchor="middle" fill="${GREY}">스트리밍은 사라져도</text>`;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*120).toFixed(1)},0)">`+pphone(720,700,210,{ph:tw*6,badge:true,p:0.9})+`</g>`;
    if(u>1.5) art+=pill2(120,1080,'계약 기간 동안 소장',true)+sparkle(960,760,22);
    txt+=cap(t,t0+0.3,['스트리밍처럼 사라지지 않고','계약 기간 동안 내 폰에 소장해요.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){ const t0=S[4],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'실물 + 디지털',150,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    const e1=out(pr(stp(u,12),0.1,0.6)), e2=out(pr(stp(u,12),0.5,1.0)), p=pr(stp(u,12),1.0,1.8);
    art+=PDEFS;
    art+=`<g opacity="${e1.toFixed(2)}" transform="translate(${((1-e1)*-120).toFixed(1)},0)">`+cd(230,900,120,tw*2)+pusb(360,890,200,-8)+`</g>`;
    art+=`<g opacity="${e2.toFixed(2)}" transform="translate(${((1-e2)*120).toFixed(1)},0)">`+pphone(720,700,210,{ph:tw*6,badge:true,p:0.6})+`</g>`;
    if(u>1.0) art+=plink(560,720,930,p);
    if(u>1.8) art+=sparkle(640,770,24)+sparkle(960,1120,22);
    txt+=cap(t,t0+0.3,['실물음반과 디지털음반의 공유.','당신의 앨범을 더 새롭게.'],1296,58);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'보다뮤직이','뭐냐면',tw),{ruler:false});
 }};
