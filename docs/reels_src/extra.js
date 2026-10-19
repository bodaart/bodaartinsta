// 새 서사용 그림들
function word(t,t0,str,size){ size=size||230; return stamp(t,t0,90,600,ink(84,600,str,size,900,{ls:-0.03*size,mis:[9,7]})); }
function md(x,y,s){            // 미니디스크
  const h=s*0.94;
  let g=`<rect x="${x+8}" y="${y+7}" width="${s}" height="${h}" rx="16" fill="${SAND}"/>`;
  g+=`<rect x="${x}" y="${y}" width="${s}" height="${h}" rx="16" fill="none" stroke="${INK}" stroke-width="6"/>`;
  g+=`<rect x="${x+s*0.08}" y="${y+h*0.06}" width="${s*0.84}" height="${h*0.1}" rx="5" fill="${IVORY}" stroke="${INK}" stroke-width="4"/>`;
  const cx=x+s*0.4, cy=y+h*0.58, r=s*0.3;
  g+=`<circle cx="${cx+5}" cy="${cy+4}" r="${r}" fill="url(#dots)"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${INK}" stroke-width="5"/>`;
  g+=`<circle cx="${cx}" cy="${cy}" r="${r*0.3}" fill="${F4}" stroke="${INK}" stroke-width="4"/>`;
  g+=`<rect x="${x+s*0.52+5}" y="${y+h*0.22+4}" width="${s*0.4}" height="${h*0.7}" rx="6" fill="${IVORY}"/>`;
  g+=`<rect x="${x+s*0.52}" y="${y+h*0.22}" width="${s*0.4}" height="${h*0.7}" rx="6" fill="none" stroke="${INK}" stroke-width="5"/>`;
  g+=`<rect x="${x+s*0.62}" y="${y+h*0.34}" width="${s*0.12}" height="${h*0.46}" rx="5" fill="${INK}"/>`;
  return g;
}
function note(x,y,s,c){ c=c||INK;
  return `<ellipse cx="${x}" cy="${y}" rx="${s*0.36}" ry="${s*0.27}" fill="${c}" transform="rotate(-22 ${x} ${y})"/><line x1="${x+s*0.32}" y1="${y-2}" x2="${x+s*0.32}" y2="${y-s*1.25}" stroke="${c}" stroke-width="${s*0.13}" stroke-linecap="round"/><path d="M${x+s*0.32} ${y-s*1.25} q${s*0.5} ${s*0.12} ${s*0.42} ${s*0.6}" fill="none" stroke="${c}" stroke-width="${s*0.13}" stroke-linecap="round"/>`;
}
function tape(x,y,w,c){ const h=w*0.62;
  return `<rect x="${x+4}" y="${y+3}" width="${w}" height="${h}" rx="5" fill="${c||ROSE}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="5" fill="none" stroke="${INK}" stroke-width="4"/><rect x="${x+w*0.2}" y="${y+h*0.32}" width="${w*0.6}" height="${h*0.3}" rx="${h*0.15}" fill="${INK}"/>`;
}
function speaker(x,y,w){ const h=w*1.35;
  return box(x,y,w,h,BEIGE)+`<circle cx="${x+w/2}" cy="${y+h*0.66}" r="${w*0.3}" fill="${F4}" stroke="${INK}" stroke-width="5"/><circle cx="${x+w/2}" cy="${y+h*0.66}" r="${w*0.12}" fill="${INK}"/><circle cx="${x+w/2}" cy="${y+h*0.22}" r="${w*0.13}" fill="${F4}" stroke="${INK}" stroke-width="4"/>`;
}
function cart(x,base,w,tw){     // 리어카
  const bh=w*0.2, by=base-w*0.2-bh;
  let g='';
  g+=`<line x1="${x-w*0.2}" y1="${by+bh*0.3}" x2="${x}" y2="${by+bh*0.3}" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><line x1="${x-w*0.2}" y1="${by+bh*0.3-20}" x2="${x-w*0.2}" y2="${by+bh*0.3+20}" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;
  g+=`<rect x="${x+8}" y="${by+7}" width="${w}" height="${bh}" rx="6" fill="${SAND}"/><rect x="${x}" y="${by}" width="${w}" height="${bh}" rx="6" fill="none" stroke="${INK}" stroke-width="6"/>`;
  for(const k of [0.26,0.76]){const cx=x+w*k, r=w*0.14;
    g+=`<circle cx="${cx}" cy="${base-r}" r="${r}" fill="${F4}" stroke="${INK}" stroke-width="7"/>`;
    for(let i=0;i<4;i++){const a=tw*1.5+i*Math.PI/2; g+=`<line x1="${cx}" y1="${base-r}" x2="${cx+r*Math.cos(a)}" y2="${base-r+r*Math.sin(a)}" stroke="${INK}" stroke-width="4"/>`}
    g+=`<circle cx="${cx}" cy="${base-r}" r="${r*0.2}" fill="${INK}"/>`}
  // 테이프 진열
  const cols=5, tw2=w*0.15, C=[ROSE,TAUPE,IVORY,DEEP,BEIGE];
  for(let r=0;r<3;r++) for(let c=0;c<cols-(r==2?2:0);c++){
    g+=tape(x+w*0.05+c*(tw2+w*0.022)+(r%2)*w*0.03, by-(r+1)*(tw2*0.62+7), tw2, C[(c+r*2)%5]) }
  return g;
}
function pcard(cx,cy,w,rot,face,k){  // 포토카드 (앞: 실루엣 / 뒤: 줄무늬)
  const h=w*1.55, x=cx-w/2, y=cy-h/2; k=k||0;
  let g=`<g transform="rotate(${rot} ${cx} ${cy})">`;
  g+=`<rect x="${x+7}" y="${y+6}" width="${w}" height="${h}" rx="${w*0.09}" fill="${face?BEIGE:ROSE}"/>`;
  if(face){
    g+=`<rect x="${x+w*0.08}" y="${y+w*0.08}" width="${w*0.84}" height="${h-w*0.16}" rx="${w*0.05}" fill="url(#dots)"/>`;
    g+=`<circle cx="${cx}" cy="${y+h*0.38}" r="${w*0.2}" fill="${[INK,DEEP,TAUPE][k%3]}"/>`;
    g+=`<path d="M${cx-w*0.36} ${y+h-w*0.08} Q${cx-w*0.36} ${y+h*0.6} ${cx} ${y+h*0.6} Q${cx+w*0.36} ${y+h*0.6} ${cx+w*0.36} ${y+h-w*0.08} Z" fill="${[INK,DEEP,TAUPE][k%3]}"/>`;
  } else {
    for(let i=1;i<6;i++) g+=`<line x1="${x+w*0.14}" y1="${y+h*i/6}" x2="${x+w*0.86}" y2="${y+h*i/6}" stroke="${IVORY}" stroke-width="5" stroke-linecap="round"/>`;
    g+=`<circle cx="${cx}" cy="${cy}" r="${w*0.17}" fill="${IVORY}" stroke="${INK}" stroke-width="4"/>`;
  }
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w*0.09}" fill="none" stroke="${INK}" stroke-width="5"/></g>`;
  return g;
}
function wave(x,cy,w,h,ph){ let g='';const n=26;
  for(let i=0;i<n;i++){const a=Math.abs(Math.sin(i*0.9+ph)*Math.cos(i*0.37+ph*0.6)); const hh=14+a*h; const xx=x+i*w/n;
    g+=`<line x1="${xx}" y1="${cy-hh/2}" x2="${xx}" y2="${cy+hh/2}" stroke="${i%5==2?DEEP:INK}" stroke-width="${w/n*0.5}" stroke-linecap="round"/>`}
  return g;
}
function sparkle(x,y,r,c){ c=c||DEEP; return `<path d="M${x-r} ${y} L${x+r} ${y} M${x} ${y-r} L${x} ${y+r} M${x-r*0.55} ${y-r*0.55} L${x+r*0.55} ${y+r*0.55} M${x-r*0.55} ${y+r*0.55} L${x+r*0.55} ${y-r*0.55}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`; }
function carton(x,base,w){ const h=w*0.62;
  let g=`<rect x="${x+8}" y="${base-h+7}" width="${w}" height="${h}" fill="${SAND}"/><rect x="${x}" y="${base-h}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  g+=`<path d="M${x} ${base-h} L${x-w*0.12} ${base-h-w*0.2} M${x+w} ${base-h} L${x+w*1.12} ${base-h-w*0.2}" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`;
  g+=`<line x1="${x+w*0.5}" y1="${base-h}" x2="${x+w*0.5}" y2="${base-h+h*0.3}" stroke="${INK}" stroke-width="4"/>`;
  return g;
}
function dim(x1,y1,x2,y2,label,lx,ly){
  const v=(x1==x2);
  let g=`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${DEEP}" stroke-width="4"/>`;
  g+= v? `<line x1="${x1-14}" y1="${y1}" x2="${x1+14}" y2="${y1}" stroke="${DEEP}" stroke-width="4"/><line x1="${x1-14}" y1="${y2}" x2="${x1+14}" y2="${y2}" stroke="${DEEP}" stroke-width="4"/>`
        : `<line x1="${x1}" y1="${y1-14}" x2="${x1}" y2="${y1+14}" stroke="${DEEP}" stroke-width="4"/><line x1="${x2}" y1="${y1-14}" x2="${x2}" y2="${y1+14}" stroke="${DEEP}" stroke-width="4"/>`;
  return g;
}
