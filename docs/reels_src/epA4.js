// 사라진 매체들 #1 — 미니디스크 (20초판 v4: 전환·타격감, 속도 조절)
const S=[2.2,5.8,9.2,13.0,17.0];
window.EP={cuts:[2.2, 9.2, 17.0],beats:[2.2, 5.8, 9.2, 13.0, 17.0],hits:[0.35, 9.7, 10.1, 13.8],flash:[0.35],tag:'사라진 매체들  #1',dur:20,
 ruler:{years:[[1992,0],[1998,0.5],[2013,1]],keys:[[2.2,0],[9.2,0],[9.8,0.5],[13.0,0.5],[13.6,1],[20,1]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,560,'CD보다 작고',116,900);
    txt+=ink(90,706,'녹음도 됐는데',116,900);
    txt+=ink(90,852,'왜 사라졌을까',116,900);
    if(t>=0.35) txt+=stamp(t,0.35,300,1180,ink(84,1250,'MD',380,900,{mis:[12,9],fill:DEEP,misc:SAND}));
    if(t>=1.0) txt+=stamp(t,1.0,860,1330,ink(990,1340,'미니디스크',60,800,{anchor:'end',ls:-1}));
    return {art,txt,ruler:false};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=year(t,t0,'1992');
    art+=md(130,720,400);
    const e=out(pr(stp(u,12),0.5,1.1));
    if(u>0.5){ art+=cd(790,930,60+e*120,tw*2);
      txt+=ink(330,1150,'MD',34,900,{anchor:'middle',ls:1,fill:DEEP}); txt+=ink(790,1150,'CD',34,900,{anchor:'middle',ls:1}); }
    txt+=cap(t,t0+0.24,['소니의 미니디스크.','CD 절반 크기에','음악이 74분 들어갔어요.'],1232,56);
    return {art,txt,ruler:true};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=word(t,t0,'녹음');
    art+=md(540,720,400);
    art+=wave(110,930,330,190,tw*5);
    const k=Math.floor(tw*12/3)%3;
    for(let i=0;i<=k;i++) art+=`<path d="M${452+i*22} 905 l22 25 l-22 25" fill="none" stroke="${DEEP}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
    txt+=cap(t,t0+0.24,['CD는 듣기만 했지만','MD는 직접 녹음하고','지우고 다시 쓸 수 있었죠.'],1232,56);
    return {art,txt,ruler:true};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=year(t,t0,'1998');
    art+=cd(250,920,150,tw*2,{fill:SAND});
    art+=md(590,790,290);
    txt+=ink(250,1140,'공CD',36,900,{anchor:'middle'}); txt+=ink(735,1140,'공MD',36,900,{anchor:'middle'});
    if(u>0.5) txt+=tag(t,t0+0.5,150,720,'$1 아래',-7);
    if(u>0.9) txt+=tag(t,t0+0.9,640,720,'$2 넘게',-7);
    txt+=cap(t,t0+0.72,['빈 디스크 값은 두 배,','MP3 플레이어까지 나왔죠.'],1290,58);
    return {art,txt,ruler:true};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=year(t,t0,'2013');
    art+=md(120,740,380);
    txt+=seal(t,t0+0.8,770,900,'마지막 출하',60,-8,400);
    if(u<2.3) txt+=cap(t,t0+0.24,['소니가 마지막 MD 플레이어를','내보낸 해예요.'],1290,58);
    else txt+=cap(t,t0+2.3,['좋은 기술이 꼭','이기는 건 아니더라고요.'],1290,58);
    return {art,txt,ruler:true};
  }
  return Object.assign(endcard(t,S[4],'LP만큼 컸던','영화 디스크, LD',tw),{ruler:false});
 }};
