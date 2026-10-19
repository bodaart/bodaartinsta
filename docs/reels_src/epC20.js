// 길거리 음반 #1 — 길보드 (20초판)
function notes(tw,x0,y0,n){ let g='';
  for(let i=0;i<n;i++){ const ph=((tw*0.35+i/n)%1); g+=`<g opacity="${ph<0.85?1:0}">`+note(x0+i*70+Math.sin(ph*6+i)*18, y0-ph*190, 30+ (i%2)*10, i%2?DEEP:INK)+`</g>`; }
  return g; }
const S=[2.4,6.6,10.8,15.0,17.0];
window.EP={tag:'길거리 음반  #1',dur:20,ruler:{years:[],keys:[[0,0],[20,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,560,'빌보드 말고',124,900);
    txt+=ink(90,712,'길보드를',124,900);
    txt+=ink(90,864,'아시나요?',124,900);
    if(t>=0.5) txt+=stamp(t,0.5,300,1180,ink(84,1250,'길보드',300,900,{mis:[12,9],fill:DEEP,misc:SAND}));
    if(t>=1.3) txt+=stamp(t,1.3,860,1330,ink(990,1340,'길 + 빌보드',56,800,{anchor:'end',ls:-1}));
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'90년대',210,900,{mis:[9,7]}));
    const base=1160, e=out(pr(stp(u,12),0.0,0.9));
    art+=ground(base,90,990);
    art+=`<g transform="translate(${(1-e)*-520},0)">`+cart(250,base,470,tw)+speaker(760,base-250,150)+`</g>`;
    if(u>1.0) art+=notes(tw,760,base-290,3);
    txt+=cap(t,t0+0.5,['길거리 리어카에서','최신 히트곡 테이프를','크게 틀어놓고 팔았어요.'],1232,56);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,560,'복제',260,900,{mis:[9,7]}));
    art+=cassette(120,760,330,tw*3);
    const n=Math.min(3,Math.floor(pr(stp(u,12),0.5,1.6)*3.99));
    for(let i=0;i<n;i++) art+=cassette(560+i*46,740+i*84,300,tw*3+i);
    if(u>0.4) for(let i=0;i<3;i++) art+=`<path d="M${468+i*22} 840 l22 25 l-22 25" fill="none" stroke="${DEEP}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
    if(u>2.0) txt+=seal(t,t0+2.0,300,1090,'불법',64,-8,240);
    txt+=cap(t,t0+0.6,['하지만 전부 불법 복제.','노래를 만든 사람에게는','한 푼도 가지 않았죠.'],1232,56);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=stamp(t,t0,90,560,ink(86,540,'2000년대',170,900,{mis:[9,7]}));
    const base=1160, e=out(pr(stp(u,12),1.4,2.6));
    art+=ground(base,90,990);
    art+=`<g transform="translate(${e*1250},0)">`+cart(250,base,470,tw*3)+`</g>`;
    txt+=cap(t,t0+0.5,['단속과 MP3에 밀려','리어카는 사라졌어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){
    art+=cd(540,790,240,tw*2.2);
    txt+=cap(t,S[3]+0.1,['거리의 노래는 사라졌지만','음반은 지금도 만들어져요.'],1200,60);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[4],'동네마다 있던','음반 가게',tw),{ruler:false});
 }};
