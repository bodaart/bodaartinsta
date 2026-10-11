// 포토카드 이야기 #1
window.EP={tag:'포토카드 이야기  #1',dur:28.5,ruler:{years:[],keys:[[0,0],[29,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<3.2){
    txt+=ink(90,560,'앨범을 샀는데',116,900);
    txt+=ink(90,706,'노래보다',116,900);
    txt+=ink(90,852,'카드가 먼저?',116,900);
    if(t>=0.9) txt+=stamp(t,0.9,300,1180,ink(84,1250,'포카',340,900,{mis:[12,9],fill:DEEP,misc:SAND}));
    if(t>=2.0) txt+=stamp(t,2.0,860,1330,ink(990,1340,'포토카드',60,800,{anchor:'end',ls:-1}));
    art+=pcard(880,640,150,10,true,1);
    return {art,txt};
  }
  if(t<8.6){ const u=t-3.2;
    txt+=year(t,3.2,'2010');
    const e=out(pr(stp(u,12),0.8,1.8));
    art+=pcard(470+e*310,950-e*30,190,e*12,true,0);
    art+=`<rect x="120" y="750" width="460" height="405" fill="${F4}"/>`+jewel(120,750,460);
    txt+=cap(t,3.2+0.9,['소녀시대 앨범에 멤버 사진 카드가','한 장씩 들어간 게','시작으로 알려져 있어요.'],1232,54);
    return {art,txt};
  }
  if(t<14.2){ const u=t-8.6;
    txt+=word(t,8.6,'랜덤');
    const pick=Math.min(8,Math.floor(pr(stp(u,6),0.6,2.6)*9));
    for(let i=0;i<9;i++){ const c=i%3,r=Math.floor(i/3); const done=u>2.7, face=done&&i===4;
      const hot=!done&&i===pick;
      art+=pcard(300+c*150,760+r*150,96+(face?40:0),(rnd(i)-.5)*8+(hot?6:0),face,i); }
    if(u>2.8) txt+=seal(t,8.6+2.8,790,880,'누구?',64,7,260);
    txt+=cap(t,8.6+0.8,['누가 나올지 모르는 한 장.','뜯어봐야 알 수 있었죠.'],1296,58);
    return {art,txt};
  }
  if(t<19.6){ const u=t-14.2;
    txt+=word(t,14.2,'수집');
    const n=Math.min(5,1+Math.floor(pr(stp(u,12),0.5,2.6)*4.99));
    for(let i=0;i<5;i++){ const a=(i-2)*13; const on=i<n;
      if(on) art+=pcard(540+(i-2)*120,940+Math.abs(i-2)*26,170,a,true,i);
      else art+=`<g transform="rotate(${a} ${540+(i-2)*120} ${940+Math.abs(i-2)*26})"><rect x="${540+(i-2)*120-85}" y="${940+Math.abs(i-2)*26-132}" width="170" height="264" rx="15" fill="none" stroke="${TAUPE}" stroke-width="4" stroke-dasharray="10 10"/></g>`; }
    txt+=cap(t,14.2+0.8,['다 모으려면 여러 장을 사거나','팬끼리 바꿔야 했어요.'],1296,58);
    return {art,txt};
  }
  if(t<24.6){ const u=t-19.6;
    txt+=stamp(t,19.6,90,540,ink(86,520,'듣는 물건',130,900,{fill:TAUPE}));
    if(u>0.9){ txt+=`<line x1="80" y1="478" x2="660" y2="478" stroke="${DEEP}" stroke-width="10" stroke-linecap="round"/>`;
      txt+=stamp(t,19.6+0.9,90,660,ink(86,668,'모으는 물건',130,900,{mis:[8,6]})); }
    art+=cd(250,960,110,tw*2);
    art+=pcard(560,950,150,-8,true,0)+pcard(700,960,150,5,true,1)+pcard(840,950,150,14,true,2);
    txt+=cap(t,19.6+1.6,['앨범은 듣는 물건에서','모으는 물건이 됐어요.'],1296,58);
    return {art,txt};
  }
  const u=t-24.6;
  if(u<2.0){
    art+=`<rect x="250" y="620" width="400" height="352" fill="${F4}"/>`+jewel(250,620,400)+pcard(760,800,170,9,true,1);
    txt+=cap(t,24.7,['그래서 요즘 앨범은 CD와 함께','카드와 인쇄물도 같이 만들어요.'],1200,56);
    return {art,txt};
  }
  return Object.assign(endcard(t,26.6,'포토카드 한 장이','만들어지는 과정',tw),{ruler:false});
 }};
