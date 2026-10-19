// 7편 — 집에서 CD를 굽기 시작한 날 (구운 CD와 찍은 CD)
window.EP={tag:'CD의 근본  #7',dur:29,
 ruler:{years:[[1988,0],[1990,0.5],[1995,1]],keys:[[3.2,0],[8.0,0],[8.8,0.5],[13.5,0.5],[14.3,1],[29,1]]},
 scene(t,tw){
  let art='',txt='';
  if(t<3.2){
    txt+=ink(90,560,'CD 굽는 기계가',112,900);
    txt+=ink(90,700,'세탁기만',112,900);
    txt+=ink(90,840,'했다고요?',112,900);
    if(t>=0.9) txt+=stamp(t,0.9,400,1150,ink(84,1200,'3만 5천',200,900,{mis:[11,8],fill:DEEP,misc:SAND})+ink(745,1200,'달러',110,900,{mis:[8,6],fill:DEEP,misc:SAND}));
    if(t>=2.0) txt+=stamp(t,2.0,860,1330,ink(990,1330,'1990년 무렵',52,800,{anchor:'end',ls:0}));
    return {art,txt,ruler:false};
  }
  if(t<8.0){ const u=t-3.2;
    txt+=year(t,3.2,'1988');
    art+=cd(330,920,225,tw*2,{fill:SAND});
    if(u>1.2) txt+=seal(t,3.2+1.2,760,860,'기록 가능',60,-7,360);
    if(u>1.6) txt+=ink(760,1010,'CD-R',96,900,{anchor:'middle',mis:[7,5]});
    txt+=cap(t,3.2+0.8,['일본 다이요유덴이','내가 직접 기록할 수 있는','CD를 처음 만들었어요.'],1232,56);
    return {art,txt,ruler:true};
  }
  if(t<13.5){ const u=t-8.0;
    txt+=year(t,8.0,'1990');
    const base=1150;
    art+=ground(base);
    // 세탁기
    art+=box(130,base-330,270,322,BEIGE);
    art+=`<circle cx="265" cy="${base-150}" r="86" fill="${F4}" stroke="${INK}" stroke-width="6"/><circle cx="265" cy="${base-150}" r="58" fill="none" stroke="${INK}" stroke-width="4"/>`;
    art+=`<circle cx="170" cy="${base-292}" r="10" fill="${INK}"/><circle cx="204" cy="${base-292}" r="10" fill="none" stroke="${INK}" stroke-width="4"/>`;
    txt+=ink(265,base+52,'세탁기',36,700,{anchor:'middle',fill:GREY});
    // 기록 장비
    if(u>0.7){
      art+=box(520,base-420,350,412,SAND);
      art+=`<line x1="520" y1="${base-210}" x2="870" y2="${base-210}" stroke="${INK}" stroke-width="5"/>`;
      art+=`<rect x="570" y="${base-360}" width="250" height="26" rx="6" fill="${INK}"/>`;
      art+=`<circle cx="610" cy="${base-280}" r="16" fill="none" stroke="${INK}" stroke-width="5"/><circle cx="670" cy="${base-280}" r="16" fill="none" stroke="${INK}" stroke-width="5"/>`;
      for(let i=0;i<5;i++) art+=`<line x1="${590+i*52}" y1="${base-150}" x2="${590+i*52}" y2="${base-60}" stroke="${INK}" stroke-width="4"/>`;
      txt+=ink(695,base+52,'CD 기록 장비',36,800,{anchor:'middle'});
    }
    if(u>2.0) txt+=tag(t,8.0+2.0,610,690,'$35,000',-6);
    txt+=cap(t,8.0+2.6,['처음엔 세탁기만 한 장비에','값은 3만 5천 달러였어요.'],1296,56);
    return {art,txt,ruler:true};
  }
  if(t<18.5){ const u=t-13.5;
    txt+=year(t,13.5,'1995');
    const base=1100;
    art+=ground(base,160,920);
    art+=box(250,base-128,520,120,SAND);
    art+=`<rect x="290" y="${base-92}" width="340" height="18" rx="5" fill="${INK}"/><circle cx="700" cy="${base-70}" r="14" fill="none" stroke="${INK}" stroke-width="5"/>`;
    const e=out(pr(stp(u,12),0.8,1.6));
    art+=`<rect x="300" y="${base-100-e*4}" width="${320}" height="10" fill="${INK}"/>`;
    art+=cd(460,base-128-90*e-30,120*1,tw*2.4,{fill:SAND});
    if(u>1.8) txt+=tag(t,13.5+1.8,700,760,'$995',-7);
    txt+=cap(t,13.5+0.9,['HP가 1,000달러도 안 되는','기록기를 내놨어요.','집에서 CD를 굽기 시작했죠.'],1232,56);
    return {art,txt,ruler:true};
  }
  if(t<24.5){ const u=t-18.5;
    txt+=stamp(t,18.5,90,560,ink(86,540,'굽기',190,900,{mis:[9,7]}));
    if(u>0.5) txt+=stamp(t,19.0,600,560,ink(1000,540,'찍기',190,900,{mis:[9,7],anchor:'end'}));
    txt+=ink(540,520,'와',70,800,{anchor:'middle',fill:DEEP});
    // 왼쪽: 굽기 — 레이저가 한 점씩
    const ly=840;
    art+=`<rect x="100" y="${ly}" width="390" height="34" rx="6" fill="${SAND}" transform="translate(6,5)"/><rect x="100" y="${ly}" width="390" height="34" rx="6" fill="none" stroke="${INK}" stroke-width="5"/>`;
    const ph=pr(stp(u,12),0.8,4.6), hx=120+ph*350;
    for(let i=0;i<9;i++){const x=130+i*40; if(x<hx) art+=`<rect x="${x}" y="${ly+9}" width="${i%3==1?26:16}" height="16" rx="6" fill="${DEEP}"/>`}
    art+=`<path d="M${hx-34} 1060 L${hx} ${ly+34} L${hx+34} 1060 Z" fill="${ROSE}" opacity="${(Math.floor(tw*12)%2)?0.95:0.6}"/>`;
    art+=box(hx-58,1060,116,70,BEIGE);
    txt+=ink(295,1196,'레이저 열로 색을 바꿔요',34,700,{anchor:'middle',ls:-0.5});
    // 오른쪽: 찍기 — 틀로 한 번에
    if(u>0.5){
      const cyc=((stp(u,12)-0.5)%1.6)/1.6, dn=cyc<0.35?out(cyc/0.35):cyc<0.6?1:1-out((cyc-0.6)/0.4);
      const py=690+dn*112;
      art+=`<rect x="590" y="${ly+12}" width="390" height="34" rx="6" fill="${SAND}" transform="translate(6,5)"/><rect x="590" y="${ly+12}" width="390" height="34" rx="6" fill="none" stroke="${INK}" stroke-width="5"/>`;
      let teeth='';for(let i=0;i<9;i++){teeth+=`<rect x="${612+i*40}" y="${py+34}" width="${i%3==1?26:16}" height="14" fill="${INK}"/>`}
      art+=`<rect x="590" y="${py-60}" width="390" height="94" rx="8" fill="${INK}"/>`+teeth;
      art+=`<rect x="760" y="${py-150}" width="50" height="92" fill="${INK}"/>`;
      art+=ground(ly+50,570,1000);
      txt+=ink(785,1196,'틀로 눌러서 홈을 내요',34,700,{anchor:'middle',ls:-0.5});
    }
    txt+=cap(t,18.5+2.2,['겉은 같은 CD지만','만드는 방법은 전혀 달라요.'],1296,58);
    return {art,txt,ruler:false};
  }
  const u=t-24.5;
  if(u<2.5){
    txt+=ink(90,560,'보다아트는',70,800,{fill:DEEP});
    txt+=stamp(t,24.6,90,760,ink(86,760,'200장',170,900,{mis:[9,7]})+ink(640,760,'까지는',64,800));
    txt+=ink(90,850,'한 장 한 장 구워요.',60,700);
    if(u>0.9){
      txt+=stamp(t,25.4,90,1090,ink(86,1090,'300장',170,900,{mis:[9,7],fill:DEEP,misc:SAND})+ink(640,1090,'부터는',64,800));
      txt+=ink(90,1180,'틀을 만들어 찍어내요.',60,700);
    }
    return {art,txt,ruler:false};
  }
  return Object.assign(endcard(t,27.0,'“CD는 끝났다”','고 하던 시절',tw),{ruler:false});
 }};
