// 케이스의 역사 #1 — 주얼케이스 (20초판 v4: 전환·타격감, 속도 조절, 장면 4개)
const S=[2.2,5.5,8.8,12.1,15.4,17.0];
window.EP={cuts:[2.2,8.8,15.4,17.0],beats:[2.2,5.5,8.8,12.1,15.4,17.0],hits:[0.35],flash:[0.35],
 tag:'케이스의 역사  #1',dur:20,ruler:{years:[],keys:[[0,0],[20,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,560,'CD 케이스에',116,900);
    txt+=ink(90,706,'왜 ‘보석’이란',116,900);
    txt+=ink(90,852,'이름이 붙었을까',108,900);
    if(t>=0.35) txt+=stamp(t,0.35,300,1180,ink(84,1250,'주얼',340,900,{mis:[12,9],fill:DEEP,misc:SAND}));
    if(t>=1.0) txt+=stamp(t,1.0,860,1330,ink(990,1340,'jewel case',56,800,{anchor:'end',ls:0}));
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=year(t,t0,'1982');
    const e=out(pr(stp(u,12),0.3,0.9));
    art+=cd(440+e*320,950,165,tw*2);
    art+=`<rect x="120" y="750" width="460" height="405" fill="${F4}"/>`+jewel(120,750,460);
    txt+=cap(t,t0+0.35,['CD와 함께 나온 투명한 케이스.','이름은 주얼케이스예요.'],1296,58);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,540,'세 조각',200,900,{mis:[9,7]}));
    const e=out(pr(stp(u,12),0.35,1.1)), s=250, h=s*0.88, y=820;
    const xs=[120+(1-e)*290, 415, 710-(1-e)*290];
    art+=box(xs[2],y,s,h,BEIGE);
    art+=box(xs[1],y,s,h,SAND)+`<circle cx="${xs[1]+s/2}" cy="${y+h/2}" r="${s*0.36}" fill="none" stroke="${INK}" stroke-width="4"/><circle cx="${xs[1]+s/2}" cy="${y+h/2}" r="${s*0.07}" fill="${INK}"/>`;
    art+=`<rect x="${xs[0]}" y="${y}" width="${s}" height="${h}" fill="${F4}"/>`+jewel(xs[0],y,s);
    if(u>1.2){ txt+=ink(xs[0]+s/2,y+h+52,'뚜껑',34,800,{anchor:'middle'}); txt+=ink(xs[1]+s/2,y+h+52,'트레이',34,800,{anchor:'middle',fill:DEEP}); txt+=ink(xs[2]+s/2,y+h+52,'바닥',34,800,{anchor:'middle'}); }
    txt+=cap(t,t0+0.5,['뚜껑, 트레이, 바닥.','딱 세 조각이에요.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'왜 보석?',190,900,{mis:[9,7]}));
    art+=`<rect x="300" y="720" width="480" height="422" fill="${F4}"/>`+jewel(300,720,480);
    const k=Math.floor(tw*12/2);
    for(let i=0;i<4;i++){ if((k+i)%3!==0) art+=sparkle(250+rnd(i+k*0.01)*20, 770+i*100, 16+((k+i)%2)*8); }
    art+=sparkle(830,740,26);
    txt+=cap(t,t0+0.35,['옆면 줄무늬가 빛을 받아','보석처럼 반짝여서래요.'],1296,58);
    txt+=src('다른 설명: 설계가 흠잡을 데 없어서');
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,540,'142×125',170,900,{mis:[9,7],ls:-6}));
    txt+=ink(96,640,'× 10 mm',60,800,{fill:DEEP,ls:0});
    art+=`<rect x="250" y="760" width="430" height="378" fill="${F4}"/>`+jewel(250,760,430);
    if(u>0.6){ art+=dim(250,720,680,720); txt+=ink(465,706,'142',36,800,{anchor:'middle',fill:DEEP,ls:0}); }
    if(u>1.0){ art+=dim(730,760,730,1138); txt+=ink(752,962,'125',36,800,{fill:DEEP,ls:0}); }
    txt+=cap(t,t0+0.8,['40년 넘게 크기가 그대로라','자켓 크기도 늘 같아요.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){
    art+=`<rect x="320" y="620" width="440" height="387" fill="${F4}"/>`+jewel(320,620,440);
    art+=`<path d="M300 700 l-34 -20 M298 740 l-40 6 M304 664 l-22 -34" stroke="${DEEP}" stroke-width="6" stroke-linecap="round"/>`;
    txt+=cap(t,S[4]+0.2,['약점도 있어요.','경첩이 잘 부러지죠.'],1200,60);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'두꺼운 종이 상자,','싸바리',tw),{ruler:false});
 }};
