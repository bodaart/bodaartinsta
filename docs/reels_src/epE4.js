// 한 장의 여행 #1 — CD가 말하는 여섯 관문 (20초판 v4: 전환·타격감, 속도 조절)
const STOPS=[
 {n:'1',name:'음원',cap:['녹음실에서 완성된 음원.','아직은 파일이에요.']},
 {n:'2',name:'마스터',cap:['오류를 검증해서','공장용 원본을 만들어요.']},
 {n:'3',name:'틀',cap:['유리 원판에서','틀을 떠요.']},
 {n:'4',name:'프레스',cap:['틀로 꾹 눌러 찍으면','제가 태어나요.']},
 {n:'5',name:'인쇄',cap:['앞면에 그림을 입고','자켓도 인쇄해요.']},
 {n:'6',name:'포장',cap:['케이스에 담고','검수까지 마쳐요.']}];
const T0=2.2, SD=2.3, OUT=T0+6*SD, END=17.0;
window.EP={cuts:[2.2, 16.0, 17.0],beats:[2.2, 4.5, 6.8, 9.1, 11.4, 13.7, 16.0, 17.0],hits:[0.35, 9.45, 10.45, 15.0],flash:[0.35],tag:'한 장의 여행  #1',dur:20,
 ruler:{years:STOPS.map((s,i)=>[s.name,i/5]),keys:(()=>{const k=[[T0,0]];for(let i=1;i<6;i++){k.push([T0+i*SD,(i-1)/5]);k.push([T0+i*SD+0.4,i/5]);}k.push([20,1]);return k})()},
 scene(t,tw){
  let art='',txt='';
  if(t<T0){
    txt+=ink(90,560,'저는 CD예요.',120,900);
    txt+=ink(90,712,'여러분 손에',120,900);
    txt+=ink(90,864,'닿기까지',120,900);
    if(t>=0.35) txt+=stamp(t,0.35,300,1180,ink(84,1250,'6',430,900,{mis:[12,9],fill:DEEP,misc:SAND})+ink(350,1250,'곳을 지나요',112,900,{mis:[8,6],fill:DEEP,misc:SAND}));
    art+=cd(880,790,105,tw*1.6);
    return {art,txt,ruler:false};
  }
  const i=Math.floor((t-T0)/SD);
  if(i<6){ const s=STOPS[i], t0=T0+i*SD, u=t-t0, base=1150;
    txt+=stamp(t,t0,90,610,ink(84,610,s.n,300,900,{mis:[9,7],fill:DEEP,misc:SAND}));
    txt+=stamp(t,t0+0.15,300,560,ink(290,600,s.name,150,900,{mis:[7,5]}));
    if(i===0){ art+=wave(130,930,820,330,tw*5); }
    if(i===1){ art+=cd(330,930,190,tw*2,{plain:true,fill:SAND});
      for(let k=0;k<3;k++){ if(u>0.4+k*0.3){ txt+=`<path d="M620 ${800+k*100} l22 24 l44 -52" fill="none" stroke="${DEEP}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`; txt+=ink(710,818+k*100,['곡 순서','음질','곡 정보'][k],44,800); } } }
    if(i===2){ art+=cd(310,930,190,0,{plain:true,fill:IVORY}); txt+=ink(310,1160,'유리 원판',34,800,{anchor:'middle'});
      const e=out(pr(stp(u,12),0.4,1.0));
      for(let k=0;k<3;k++) art+=`<path d="M${520+k*22} 905 l22 25 l-22 25" fill="none" stroke="${DEEP}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
      if(u>0.4){ art+=`<circle cx="790" cy="930" r="${150*e+20}" fill="${INK}"/>`; for(let k=0;k<12;k++){const a=k*Math.PI/6; art+=`<rect x="${790+Math.cos(a)*(150*e-6)-7}" y="${930+Math.sin(a)*(150*e-6)-7}" width="14" height="14" fill="${ROSE}"/>`} art+=`<circle cx="790" cy="930" r="${22*e+4}" fill="${F4}"/>`; txt+=ink(790,1160,'틀 (스탬퍼)',34,800,{anchor:'middle',fill:DEEP}); } }
    if(i===3){ const cyc=(stp(u,12)%1.0)/1.0, dn=cyc<0.35?out(cyc/0.35):cyc<0.6?1:1-out((cyc-0.6)/0.4), py=720+dn*150;
      art+=`<rect x="330" y="${base-70}" width="420" height="34" rx="6" fill="${SAND}" transform="translate(6,5)"/><rect x="330" y="${base-70}" width="420" height="34" rx="6" fill="none" stroke="${INK}" stroke-width="5"/>`;
      let teeth='';for(let k=0;k<10;k++) teeth+=`<rect x="${350+k*39}" y="${py+150}" width="${k%3==1?26:16}" height="14" fill="${INK}"/>`;
      art+=`<rect x="330" y="${py+50}" width="420" height="100" rx="8" fill="${INK}"/>`+teeth+`<rect x="512" y="${py-60}" width="56" height="112" fill="${INK}"/>`;
      art+=ground(base-30,250,830);
      if(dn>0.95) art+=sparkle(250,base-120,22)+sparkle(830,base-130,22); }
    if(i===4){ const e=pr(stp(u,12),0.3,1.6);
      art+=cd(540,950,180,0,{plain:true,fill:IVORY});
      art+=`<clipPath id="pc"><rect x="350" y="760" width="${380*e}" height="380"/></clipPath>`;
      art+=`<g clip-path="url(#pc)"><circle cx="540" cy="950" r="176" fill="${ROSE}"/><circle cx="540" cy="950" r="176" fill="url(#dots)"/><path d="M400 1010 q70 -120 140 -40 t140 -60" fill="none" stroke="${IVORY}" stroke-width="14" stroke-linecap="round"/><circle cx="540" cy="950" r="60" fill="${IVORY}" stroke="${INK}" stroke-width="4"/><circle cx="540" cy="950" r="24" fill="${F4}" stroke="${INK}" stroke-width="4"/></g>`;
      art+=`<circle cx="540" cy="950" r="180" fill="none" stroke="${INK}" stroke-width="6"/>`;
      art+=`<rect x="${350+380*e-14}" y="740" width="28" height="420" rx="14" fill="${INK}"/>`; }
    if(i===5){ art+=ground(base,150,930);
      const e=out(pr(stp(u,12),0.3,1.0));
      art+=`<rect x="300" y="${base-520+e*300}" width="250" height="220" fill="${F4}"/>`+jewel(300,base-520+e*300,250);
      art+=carton(250,base,420);
      if(u>1.3) txt+=seal(t,t0+1.3,790,690,'검수 완료',52,-8,330); }
    txt+=cap(t,t0+0.21,s.cap,1290,58);
    return {art,txt,ruler:true};
  }
  if(t<END){
    art+=cd(540,800,230,tw*2.2)+sparkle(250,640,26)+sparkle(840,960,22);
    txt+=cap(t,OUT+0.3,['그리고 여러분 손에.'],1240,60);
    return {art,txt,ruler:false};
  }
  return Object.assign(endcard(t,END,'첫 번째 관문,','마스터링',tw),{ruler:false});
 }};
