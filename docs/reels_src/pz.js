// 홍보 릴스(epP5.js)에서 가져온 그림들: USB, 폰(보다코드 뱃지), 연결 빛줄, 작은 이름표
const PDEFS=`<defs><linearGradient id="artg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7C6CFF"/><stop offset="0.6" stop-color="#FF5FA2"/><stop offset="1" stop-color="#FFB86B"/></linearGradient>`+
 `<linearGradient id="usbg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A2A36"/><stop offset="1" stop-color="#15151C"/></linearGradient>`+
 `<linearGradient id="metal" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8E8EE"/><stop offset="0.5" stop-color="#A3A6B3"/><stop offset="1" stop-color="#D5D7E0"/></linearGradient>`+
 `<linearGradient id="linkg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C8FF3D" stop-opacity="0"/><stop offset="0.5" stop-color="#C8FF3D"/><stop offset="1" stop-color="#C8FF3D" stop-opacity="0"/></linearGradient></defs>`;
function pusb(x,y,w,rot){const h=w*0.42,cx=x+w/2,cy=y+h/2;
  let g=`<g transform="rotate(${rot||0} ${cx} ${cy})"><rect x="${x+8}" y="${y+10}" width="${w}" height="${h}" rx="${h*0.3}" fill="rgba(0,0,0,0.55)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w*0.68}" height="${h}" rx="${h*0.3}" fill="url(#usbg)" stroke="rgba(255,255,255,0.45)" stroke-width="2"/>`;
  g+=`<rect x="${x+w*0.66}" y="${y+h*0.18}" width="${w*0.34}" height="${h*0.64}" rx="4" fill="url(#metal)"/>`;
  g+=`<rect x="${x+w*0.74}" y="${y+h*0.32}" width="${w*0.09}" height="${h*0.14}" fill="#5B5E6B"/><rect x="${x+w*0.74}" y="${y+h*0.55}" width="${w*0.09}" height="${h*0.14}" fill="#5B5E6B"/>`;
  g+=`<circle cx="${x+w*0.14}" cy="${cy}" r="${h*0.11}" fill="${DEEP}"/><rect x="${x+w*0.28}" y="${cy-h*0.09}" width="${w*0.3}" height="${h*0.18}" rx="${h*0.09}" fill="rgba(255,255,255,0.18)"/></g>`;
  return g;}
function pphone(x,y,w,o={}){const h=w*2.05,r=w*0.13,p=o.p===undefined?1:o.p;
  let g=`<rect x="${x+10}" y="${y+14}" width="${w}" height="${h}" rx="${r}" fill="rgba(0,0,0,0.6)" filter="url(#b8)"/>`;
  g+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="#111118" stroke="rgba(255,255,255,0.55)" stroke-width="2.5"/>`;
  g+=`<rect x="${x+w*0.3}" y="${y+w*0.05}" width="${w*0.4}" height="${w*0.055}" rx="${w*0.03}" fill="#000"/>`;
  const ax=x+w*0.1,ay=y+w*0.2,aw=w*0.8;
  g+=`<rect x="${ax}" y="${ay}" width="${aw}" height="${aw}" rx="${w*0.05}" fill="url(#artg)"/>`;
  g+=`<circle cx="${ax+aw*0.5}" cy="${ay+aw*0.5}" r="${aw*0.26}" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="${w*0.012}"/><circle cx="${ax+aw*0.5}" cy="${ay+aw*0.5}" r="${aw*0.07}" fill="rgba(255,255,255,0.85)"/>`;
  g+=`<rect x="${ax}" y="${ay+aw+w*0.1}" width="${aw*0.7}" height="${w*0.055}" rx="${w*0.027}" fill="rgba(255,255,255,0.85)"/><rect x="${ax}" y="${ay+aw+w*0.2}" width="${aw*0.45}" height="${w*0.04}" rx="${w*0.02}" fill="rgba(255,255,255,0.35)"/>`;
  const wy=ay+aw+w*0.38; for(let i=0;i<16;i++){const a=Math.abs(Math.sin(i*0.9+(o.ph||0))*Math.cos(i*0.37+(o.ph||0)*0.6)),hh=w*0.03+a*w*0.16;
    g+=`<line x1="${ax+i*aw/16+aw/32}" y1="${wy-hh/2}" x2="${ax+i*aw/16+aw/32}" y2="${wy+hh/2}" stroke="${i%5==2?DEEP:'rgba(255,255,255,0.55)'}" stroke-width="${aw/16*0.45}" stroke-linecap="round"/>`;}
  const py=ay+aw+w*0.55; g+=`<rect x="${ax}" y="${py}" width="${aw}" height="${w*0.03}" rx="${w*0.015}" fill="rgba(255,255,255,0.2)"/><rect x="${ax}" y="${py}" width="${aw*p}" height="${w*0.03}" rx="${w*0.015}" fill="${DEEP}"/>`;
  const cy2=py+w*0.17; g+=`<circle cx="${x+w/2}" cy="${cy2}" r="${w*0.1}" fill="${DEEP}"/><path d="M${x+w/2-w*0.03} ${cy2-w*0.045} L${x+w/2+w*0.045} ${cy2} L${x+w/2-w*0.03} ${cy2+w*0.045} Z" fill="#0A0A0A"/>`;
  if(o.badge){g+=`<rect x="${x+w*0.22}" y="${y+h-w*0.2}" width="${w*0.56}" height="${w*0.13}" rx="${w*0.065}" fill="rgba(200,255,61,0.18)" stroke="${DEEP}" stroke-width="1.5"/><text x="${x+w/2}" y="${y+h-w*0.09}" font-size="${w*0.075}" font-weight="800" text-anchor="middle" fill="${DEEP}" letter-spacing="-0.5">보다코드</text>`;}
  return g;}
function plink(x1,x2,y,p){const xe=x1+(x2-x1)*p;
  return `<rect x="${x1}" y="${y-3}" width="${Math.max(0,xe-x1)}" height="6" rx="3" fill="url(#linkg)"/><rect x="${x1}" y="${y-10}" width="${Math.max(0,xe-x1)}" height="20" rx="10" fill="url(#linkg)" opacity="0.5" filter="url(#b8)"/>`;}
function label(x,y,str){return `<text x="${x}" y="${y}" font-size="30" font-weight="700" text-anchor="middle" fill="${GREY}" letter-spacing="-0.5">${esc(str)}</text>`;}
