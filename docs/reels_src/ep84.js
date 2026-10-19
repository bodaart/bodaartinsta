// 8편 — "CD는 끝났다"던 시절 (20초판 v4: 전환·타격감, 속도 조절)
function grid(n,seedT){ // n = 남은 장수 (0~100)
  let s='';const order=[];for(let i=0;i<100;i++)order.push([rnd(i+900),i]);order.sort((a,b)=>a[0]-b[0]);
  const keep=new Set(order.slice(0,Math.round(n)).map(o=>o[1]));
  for(let i=0;i<100;i++){const c=i%10,r=Math.floor(i/10);s+=mini(140+c*51,712+r*49,20,keep.has(i))}
  return s;
}
const S=[2.2,5.6,8.8,12.0,15.6,17.0];
window.EP={cuts:[2.2, 8.8, 15.6, 17.0],beats:[2.2, 5.6, 8.8, 12.0, 15.6, 17.0],hits:[0.35, 3.4, 6.8, 13.8, 15.9],flash:[0.35, 15.9],tag:'CD의 근본  #8',dur:20,
 ruler:{years:[[2000,0],[2001,0.33],[2008,0.66],[2018,1]],keys:[[2.2,0],[5.6,0],[6.2,0.33],[8.8,0.33],[9.4,0.66],[12.0,0.66],[12.6,1],[20,1]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,560,'CD 100장 중',116,900);
    txt+=ink(90,706,'94장이',116,900);
    txt+=ink(90,852,'사라졌어요',116,900);
    if(t>=0.35) txt+=stamp(t,0.35,300,1180,ink(84,1250,'18',400,900,{mis:[12,9],fill:DEEP,misc:SAND})+ink(520,1250,'년 만에',110,900,{mis:[8,6],fill:DEEP,misc:SAND}));
    return {art,txt,ruler:false};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=year(t,t0,'2000');
    art+=grid(100*pr(stp(u,12),0.2,1.1));
    if(u>1.2){txt+=stamp(t,t0+1.2,820,820,ink(990,800,'정점',110,900,{anchor:'end',mis:[8,6]}));
      txt+=ink(990,870,'이때를 100장으로 치면',30,600,{anchor:'end',fill:GREY,ls:-0.5});}
    txt+=cap(t,t0+0.3,['미국에서 CD가','가장 많이 팔린 해예요.'],1290,60);
    return {art,txt,ruler:true};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=year(t,t0,'2001');
    art+=box(180,700,250,430,IVORY);
    art+=`<rect x="212" y="734" width="186" height="140" rx="6" fill="${SAND}" stroke="${INK}" stroke-width="5"/>`;
    for(let i=0;i<3;i++) art+=`<line x1="230" y1="${770+i*32}" x2="${330+((i*37)%50)}" y2="${770+i*32}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
    art+=`<circle cx="305" cy="1004" r="84" fill="${F4}" stroke="${INK}" stroke-width="6"/><circle cx="305" cy="1004" r="30" fill="${SAND}" stroke="${INK}" stroke-width="5"/>`;
    const a=tw*2.4; art+=`<circle cx="${305+57*Math.cos(a)}" cy="${1004+57*Math.sin(a)}" r="9" fill="${DEEP}"/>`;
    art+=`<path d="M305 700 C305 620 520 660 560 760 S700 900 700 980" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
    art+=`<path d="M560 760 C640 720 780 760 800 860" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;
    art+=`<ellipse cx="700" cy="1000" rx="24" ry="32" fill="${ROSE}" stroke="${INK}" stroke-width="5"/><ellipse cx="804" cy="884" rx="24" ry="32" fill="${ROSE}" stroke="${INK}" stroke-width="5"/>`;
    if(u>1.2) txt+=seal(t,t0+1.2,790,1080,'주머니 속 1,000곡',40,-6,400);
    txt+=cap(t,t0+0.24,['MP3와 아이팟이 나오면서','음악이 파일이 됐어요.'],1290,60);
    return {art,txt,ruler:true};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=year(t,t0,'2008');
    art+=phone(190,690,250);
    art+=`<path d="M285 870 L285 990 L385 930 Z" fill="${DEEP}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
    const k=Math.floor(tw*12/3)%4;
    for(let i=0;i<3;i++){ if(i<k){const r=110+i*75;
      art+=`<path d="M${520+r*Math.cos(-0.6)} ${930+r*Math.sin(-0.6)} A${r} ${r} 0 0 1 ${520+r*Math.cos(0.6)} ${930+r*Math.sin(0.6)}" fill="none" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`}}
    txt+=ink(990,690,'스포티파이 출시',40,800,{anchor:'end',fill:DEEP,ls:0});
    txt+=cap(t,t0+0.24,['스트리밍이 퍼지면서','음악은 빌려 듣는 것이 됐고요.'],1290,58);
    return {art,txt,ruler:true};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=year(t,t0,'2018');
    const n=100-94.5*out(pr(stp(u,12),0.3,1.7));
    art+=grid(Math.max(6,n));
    if(u>1.8){txt+=stamp(t,t0+1.8,820,820,ink(990,820,'6장',150,900,{anchor:'end',mis:[9,7],fill:DEEP,misc:SAND}));
      txt+=ink(990,880,'도 안 남았어요',36,700,{anchor:'end',ls:-0.5});}
    txt+=cap(t,t0+0.3,['미국 CD 판매는','정점의 6%도 안 됐어요.'],1290,60);
    txt+=src('미국 연간 판매량 · RIAA 집계');
    return {art,txt,ruler:true};
  }
  if(t<S[5]){ const u=t-S[4];
    txt+=ink(90,620,'다들 말했어요.',70,800,{fill:DEEP});
    if(u>0.3) txt+=stamp(t,S[4]+0.3,90,900,ink(86,860,'“CD는',170,900,{mis:[10,8]})+ink(86,1060,'끝났다.”',170,900,{mis:[10,8]}));
    return {art,txt,ruler:false};
  }
  return Object.assign(endcard(t,S[5],'그런데 왜','다시 음반일까',tw),{ruler:false});
 }};
