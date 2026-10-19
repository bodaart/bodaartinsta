// 사라진 매체들 #1 — 미니디스크
window.EP={tag:'사라진 매체들  #1',dur:28,
 ruler:{years:[[1992,0],[1998,0.5],[2013,1]],keys:[[3.2,0],[13.5,0],[14.3,0.5],[19.2,0.5],[20.0,1],[28,1]]},
 scene(t,tw){
  let art='',txt='';
  if(t<3.2){
    txt+=ink(90,560,'CD보다 작고',116,900);
    txt+=ink(90,706,'녹음도 됐는데',116,900);
    txt+=ink(90,852,'왜 사라졌을까',116,900);
    if(t>=0.9) txt+=stamp(t,0.9,300,1180,ink(84,1250,'MD',380,900,{mis:[12,9],fill:DEEP,misc:SAND}));
    if(t>=2.0) txt+=stamp(t,2.0,860,1330,ink(990,1340,'미니디스크',60,800,{anchor:'end',ls:-1}));
    return {art,txt,ruler:false};
  }
  if(t<8.4){ const u=t-3.2;
    txt+=year(t,3.2,'1992');
    art+=md(130,720,400);
    const e=out(pr(stp(u,12),1.0,1.8));
    if(u>1.0){ art+=cd(790,930,60+e*120,tw*2);
      txt+=ink(330,1150,'MD',34,900,{anchor:'middle',ls:1,fill:DEEP}); txt+=ink(790,1150,'CD',34,900,{anchor:'middle',ls:1}); }
    txt+=cap(t,3.2+0.8,['소니가 내놓은 미니디스크.','CD의 절반만 한 디스크에','음악이 74분 들어갔어요.'],1232,56);
    return {art,txt,ruler:true};
  }
  if(t<13.5){ const u=t-8.4;
    txt+=word(t,8.4,'녹음');
    art+=md(540,720,400);
    art+=wave(110,930,330,190,tw*5);
    const k=Math.floor(tw*12/3)%3;
    for(let i=0;i<=k;i++) art+=`<path d="M${452+i*22} 905 l22 25 l-22 25" fill="none" stroke="${DEEP}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`;
    txt+=cap(t,8.4+0.8,['CD는 듣기만 했지만','MD는 내가 직접 녹음했어요.','지우고 다시 쓸 수도 있었죠.'],1232,56);
    return {art,txt,ruler:true};
  }
  if(t<19.2){ const u=t-13.5;
    txt+=year(t,13.5,'1998');
    art+=cd(250,920,150,tw*2,{fill:SAND});
    art+=md(590,790,290);
    txt+=ink(250,1140,'공CD',36,900,{anchor:'middle'}); txt+=ink(735,1140,'공MD',36,900,{anchor:'middle'});
    if(u>0.9) txt+=tag(t,13.5+0.9,150,720,'$1 아래',-7);
    if(u>1.5) txt+=tag(t,13.5+1.5,640,720,'$2 넘게',-7);
    txt+=cap(t,13.5+2.0,['빈 디스크 값이 두 배였어요.','게다가 MP3 플레이어까지','세상에 나왔죠.'],1232,56);
    return {art,txt,ruler:true};
  }
  if(t<24.0){ const u=t-19.2;
    txt+=year(t,19.2,'2013');
    art+=md(120,740,380);
    txt+=seal(t,19.2+1.3,770,900,'마지막 출하',60,-8,400);
    txt+=cap(t,19.2+0.7,['소니가 마지막 MD 플레이어를','내보낸 해예요.'],1290,58);
    return {art,txt,ruler:true};
  }
  const u=t-24.0;
  if(u<2.0){
    art+=md(350,640,380);
    txt+=cap(t,24.1,['좋은 기술이 꼭','이기는 건 아니더라고요.'],1200,60);
    return {art,txt,ruler:false};
  }
  return Object.assign(endcard(t,26.0,'LP만큼 컸던','영화 디스크, LD',tw),{ruler:false});
 }};
