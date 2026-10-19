// 포토카드 이야기 #1 (20초판 v4: 전환·타격감, 속도 조절, 장면 4개)
const S=[2.2,5.5,8.8,12.1,15.4,17.0];
window.EP={cuts:[2.2,8.8,15.4,17.0],beats:[2.2,5.5,8.8,12.1,15.4,17.0],hits:[0.35,7.4,12.7],flash:[0.35],
 tag:'포토카드 이야기  #1',dur:20,ruler:{years:[],keys:[[0,0],[20,0]]},
 scene(t,tw){
  let art='',txt='';
  if(t<S[0]){
    txt+=ink(90,560,'앨범을 샀는데',116,900);
    txt+=ink(90,706,'노래보다',116,900);
    txt+=ink(90,852,'카드가 먼저?',116,900);
    if(t>=0.35) txt+=stamp(t,0.35,300,1180,ink(84,1250,'포카',340,900,{mis:[12,9],fill:DEEP,misc:SAND}));
    if(t>=1.0) txt+=stamp(t,1.0,860,1330,ink(990,1340,'포토카드',60,800,{anchor:'end',ls:-1}));
    art+=pcard(880,640,150,10+Math.sin(tw*3)*3,true,1);
    return {art,txt};
  }
  if(t<S[1]){ const t0=S[0],u=t-t0;
    txt+=year(t,t0,'2010');
    const e=out(pr(stp(u,12),0.35,1.1));
    art+=pcard(470+e*310,950-e*30,190,e*12,true,0);
    art+=`<rect x="120" y="750" width="460" height="405" fill="${F4}"/>`+jewel(120,750,460);
    txt+=cap(t,t0+0.35,['소녀시대 앨범에 멤버 카드가','한 장씩 들어간 게','시작으로 알려져 있어요.'],1232,54);
    return {art,txt};
  }
  if(t<S[2]){ const t0=S[1],u=t-t0;
    txt+=word(t,t0,'랜덤');
    const pick=Math.min(8,Math.floor(pr(stp(u,6),0.3,1.7)*9));
    for(let i=0;i<9;i++){ const c=i%3,r=Math.floor(i/3); const done=u>1.8, face=done&&i===4;
      const hot=!done&&i===pick;
      art+=pcard(300+c*150,760+r*150,96+(face?40:0)+(hot?10:0),(rnd(i)-.5)*8+(hot?8:0),face,i); }
    if(u>1.9) txt+=seal(t,t0+1.9,790,880,'누구?',64,7,260);
    txt+=cap(t,t0+0.35,['누가 나올지 모르는 한 장.','뜯어봐야 알 수 있었죠.'],1296,58);
    return {art,txt};
  }
  if(t<S[3]){ const t0=S[2],u=t-t0;
    txt+=word(t,t0,'수집');
    const n=Math.min(5,1+Math.floor(pr(stp(u,12),0.4,1.8)*4.99));
    for(let i=0;i<5;i++){ const a=(i-2)*13; const on=i<n;
      if(on) art+=pcard(540+(i-2)*120,940+Math.abs(i-2)*26,170,a,true,i);
      else art+=`<g transform="rotate(${a} ${540+(i-2)*120} ${940+Math.abs(i-2)*26})"><rect x="${540+(i-2)*120-85}" y="${940+Math.abs(i-2)*26-132}" width="170" height="264" rx="15" fill="none" stroke="${TAUPE}" stroke-width="4" stroke-dasharray="10 10"/></g>`; }
    txt+=cap(t,t0+0.35,['다 모으려면 여러 장을 사거나','팬끼리 바꿔야 했어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[4]){ const t0=S[3],u=t-t0;
    txt+=stamp(t,t0,90,540,ink(86,520,'듣는 물건',130,900,{fill:TAUPE}));
    if(u>0.6){ const sw=out(cl((u-0.6)*FPS/7,0,1)); txt+=`<line x1="80" y1="478" x2="${80+580*sw}" y2="478" stroke="${DEEP}" stroke-width="10" stroke-linecap="round"/>`;
      txt+=stamp(t,t0+0.6,90,660,ink(86,668,'모으는 물건',130,900,{mis:[8,6]})); }
    art+=cd(250,960,110,tw*2);
    art+=pcard(560,950,150,-8,true,0)+pcard(700,960,150,5,true,1)+pcard(840,950,150,14,true,2);
    txt+=cap(t,t0+1.0,['앨범은 듣는 물건에서','모으는 물건이 됐어요.'],1296,58);
    return {art,txt};
  }
  if(t<S[5]){
    art+=`<rect x="250" y="620" width="400" height="352" fill="${F4}"/>`+jewel(250,620,400)+pcard(760,800,170,9+Math.sin(tw*3)*3,true,1);
    txt+=cap(t,S[4]+0.2,['그래서 요즘 앨범은 CD와 함께','카드와 인쇄물도 같이 만들어요.'],1200,56);
    return {art,txt};
  }
  return Object.assign(endcard(t,S[5],'포토카드 한 장이','만들어지는 과정',tw),{ruler:false});
 }};
