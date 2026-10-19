// 6편 — 한국에 CD가 들어온 이야기
window.EP={tag:'CD의 근본  #6',dur:28,
 ruler:{years:[[1986,0],[1987,0.33],[1993,0.66],[2004,1]],keys:[[3.2,0],[9.0,0],[9.8,0.33],[14.0,0.33],[14.8,0.66],[19.5,0.66],[20.3,1],[28,1]]},
 scene(t,tw){
  let art='',txt='';
  if(t<3.2){
    txt+=ink(90,560,'한국 첫 CD는',124,900);
    txt+=ink(90,712,'가요가',124,900);
    txt+=ink(90,864,'아니었어요',124,900);
    if(t>=0.9) txt+=stamp(t,0.9,300,1180,ink(84,1250,'가곡',330,900,{mis:[12,9],fill:DEEP,misc:SAND}));
    if(t>=2.0) txt+=stamp(t,2.0,860,1150,ink(990,1196,'1986',64,800,{anchor:'end',ls:0}));
    art+=cd(860,905,115,tw*1.6);
    return {art,txt,ruler:false};
  }
  if(t<9.0){ const u=t-3.2;
    txt+=year(t,3.2,'1986');
    txt+=ink(990,690,'11월 12일',44,800,{anchor:'end',fill:DEEP,ls:0});
    const e=out(pr(stp(u,12),0.8,1.8));
    art+=cd(430+e*330,945,170,tw*2);
    art+=`<rect x="110" y="745" width="470" height="414" fill="${F4}"/>`+jewel(110,745,470);
    txt+=ink(385,910,'한국 가곡',58,800,{anchor:'middle'});
    txt+=ink(385,990,'제1집',46,700,{anchor:'middle',fill:DEEP});
    txt+=`<line x1="300" y1="1030" x2="470" y2="1030" stroke="${INK}" stroke-width="3"/>`;
    txt+=ink(385,1076,'SKC',30,800,{anchor:'middle',ls:6});
    txt+=cap(t,3.2+1.0,['SKC가 필립스와 손잡고 낸','《한국 가곡 제1집》.','우리나라 첫 CD였어요.'],1232,56);
    return {art,txt,ruler:true};
  }
  if(t<14.0){ const u=t-9.0;
    txt+=year(t,9.0,'1987');
    const base=1150;
    art+=ground(base);
    art+=factory(120,base,520);
    art+=smoke(562,base-520*0.42-520*0.16*1.5-20,Math.floor(tw*12));
    // 줄지어 나오는 CD
    for(let i=0;i<4;i++){const ph=((tw*0.55+i*0.25)%1);const x=640+ph*380;
      if(u>0.6) art+=cd(x,base-52,46,tw*3+i);}
    txt+=cap(t,9.0+0.9,['국내 공장에서 CD를','본격적으로 찍기 시작했어요.'],1290,60);
    return {art,txt,ruler:true};
  }
  if(t<19.5){ const u=t-14.0;
    txt+=year(t,14.0,'1993');
    const e=out(pr(stp(u,12),1.0,2.2));
    const ang=-0.2+e*0.4, cx=540, cy=1030, L=330;
    const ex=Math.cos(ang)*L, ey=Math.sin(ang)*L;
    art+=`<path d="M${cx-70} 1150 L${cx} ${cy+6} L${cx+70} 1150 Z" fill="${SAND}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
    art+=ground(1150,300,780);
    art+=`<line x1="${cx-ex}" y1="${cy-ey}" x2="${cx+ex}" y2="${cy+ey}" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>`;
    const r=118, nx=Math.sin(ang), ny=-Math.cos(ang);
    art+=lp(cx-ex*0.72+nx*(r+8), cy-ey*0.72+ny*(r+8), r, tw*2);
    art+=cd(cx+ex*0.72+nx*(r+8), cy+ey*0.72+ny*(r+8), r, tw*2);
    txt+=ink(cx-240,1206,'LP',40,900,{anchor:'middle',ls:1});
    txt+=ink(cx+240,1206,'CD',40,900,{anchor:'middle',ls:1,fill:DEEP});
    txt+=cap(t,14.0+2.3,['이 무렵부터 한국에서도','CD가 LP보다 많이 팔렸어요.'],1296,58);
    return {art,txt,ruler:true};
  }
  if(t<24.0){ const u=t-19.5;
    txt+=year(t,19.5,'2004');
    art+=lp(320,930,205,tw*(u<1.4?2.2:0)+ (u<1.4?0:1.4*2.2));
    txt+=seal(t,19.5+1.4,775,900,'생산 중단',66,-9,400);
    txt+=cap(t,19.5+0.7,['국내에 하나 남았던','LP 공장이 문을 닫았어요.'],1290,60);
    return {art,txt,ruler:true};
  }
  const u=t-24.0;
  if(u<2.0){
    art+=cd(540,790,250,tw*2.2);
    txt+=cap(t,24.1,['첫 CD가 나오고 18년.','음반의 주인이 바뀌었어요.'],1200,60);
    return {art,txt,ruler:false};
  }
  return Object.assign(endcard(t,26.0,'집에서 CD를','굽기 시작한 날',tw),{ruler:false});
 }};
