// 케이스의 역사 #1 — 주얼케이스 (20초판)
const S=[2.4,6.6,10.8,15.0,17.0];
window.EP={tag:'케이스의 역사  #1',dur:20,ruler:{years:[],keys:[[0,0],[20,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,560,'CD 케이스에',116,900);
    txt+=ink(90,706,'왜 ‘보석’이란',116,900);
    txt+=ink(90,852,'이름이 붙었을까',108,900);
    if(t>=0.5) txt+=stamp(t,0.5,300,1180,ink(84,1250,'주얼',340,900,{mis:[12,9],fill:DEEP,misc:SAND}));
    if(t>=1.3) txt+=stamp(t,1.3,860,1330,ink(990,1340,'jewel case',56,800,{anchor:'end',ls:0}));
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=year(t,t0,'1982');
    const e=out(pr(stp(u,12),0.4,1.1));
    art+=cd(440+e*320,950,165,tw*2);
    art+=`<rect x="120" y="750" width="460" height="405" fill="${F4}"/>`+jewel(120,750,460);
    txt+=cap(t,t0+0.5,['CD와 같이 세상에 나온','투명한 플라스틱 케이스.','이름은 주얼케이스예요.'],1232,56);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'왜 보석?',190,900,{mis:[9,7]}));
    art+=`<rect x="300" y="720" width="480" height="422" fill="${F4}"/>`+jewel(300,720,480);
    const k=Math.floor(tw*12/2);
    for(let i=0;i<4;i++){ if((k+i)%3!==0) art+=sparkle(250+rnd(i+k*0.01)*20, 770+i*100, 16+((k+i)%2)*8); }
    art+=sparkle(830,740,26);
    txt+=cap(t,t0+0.5,['옆면 줄무늬가 빛을 받아','보석처럼 반짝여서라는','이야기가 전해져요.'],1232,56);
    txt+=src('다른 설명: 설계가 흠잡을 데 없어서');
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,540,'142×125',170,900,{mis:[9,7],ls:-6}));
    txt+=ink(96,640,'× 10 mm',60,800,{fill:DEEP,ls:0});
    art+=`<rect x="250" y="760" width="430" height="378" fill="${F4}"/>`+jewel(250,760,430);
    if(u>0.6){ art+=dim(250,720,680,720); txt+=ink(465,706,'142',36,800,{anchor:'middle',fill:DEEP,ls:0}); }
    if(u>0.9){ art+=dim(730,760,730,1138); txt+=ink(752,962,'125',36,800,{fill:DEEP,ls:0}); }
    txt+=cap(t,t0+1.0,['40년 넘게 크기가 그대로라','안에 들어가는 자켓 크기도','늘 같아요.'],1232,56);
    return {art,txt};
  }
  if(t<S[4]){
    art+=`<rect x="320" y="620" width="440" height="387" fill="${F4}"/>`+jewel(320,620,440);
    art+=`<path d="M300 700 l-34 -20 M298 740 l-40 6 M304 664 l-22 -34" stroke="${DEEP}" stroke-width="6" stroke-linecap="round"/>`;
    txt+=cap(t,S[3]+0.1,['약점도 있어요.','경첩이 잘 부러지죠.'],1200,60);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[4],'종이로 만든','케이스, 디지팩',tw),{ruler:false});
 }};
