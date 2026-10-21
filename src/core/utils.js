/* src/core/utils.js — Pure helpers: seeded random, formatters and HTML template helpers. */
/* ============ UTILS ============ */
function scoreRing(score,r=19,sw=3.2){
  const circ=2*Math.PI*r,fill=circ*(score/100);
  const col=score>=90?'#E8A520':score>=75?'#14B8A6':'#D91F41';
  const sz=(r+sw)*2;
  return `<svg class="score-ring" width="${sz}" height="${sz}" viewBox="0 0 ${sz} ${sz}">
    <circle cx="${r+sw}" cy="${r+sw}" r="${r}" fill="none" stroke="rgba(255,255,255,.06)" stroke-width="${sw}"/>
    <circle cx="${r+sw}" cy="${r+sw}" r="${r}" fill="none" stroke="${col}" stroke-width="${sw}" stroke-dasharray="${fill} ${circ-fill}" stroke-dashoffset="${circ/4}" stroke-linecap="round" transform="rotate(0 ${r+sw} ${r+sw})"/>
    <text x="${r+sw}" y="${r+sw}" text-anchor="middle" dominant-baseline="central" font-family="DM Mono,monospace" font-size="10" font-weight="500" fill="${col}">${score}</text>
  </svg>`;
}
function rbadge(rank,isYou){
  const cls=isYou?'ry':(rank<=3?'r'+rank:'rn');
  return `<span class="rb ${cls}">${rank}</span>`;
}
function coDot(co){return `<span class="co-dot" style="background:${co.color}"></span>`;}
function youTag(){return `<div style="font-family:'DM Mono',monospace;font-size:9px;color:var(--red2);letter-spacing:.06em">JOUW BEDRIJF</div>`;}


const rnd=s=>{const x=Math.sin(s*127.1+311.7)*43758.5453;return x-Math.floor(x)};
const hs=s=>{let a=7;for(const c of String(s))a=(a*31+c.charCodeAt(0))&65535;return a};
const CO=i=>COS.find(c=>c.id==i)||COS[0];

const kpos=(k,c)=>c.isYou?k.p:Math.max(1,Math.round(k.p+(c.rank-4)*1.8+rnd(hs(k.w)+c.id)*5-1));
const KWS=c=>KW.map(k=>({...k,p:kpos(k,c)}));

const pgs=(c,s)=>PGL.map((p,i)=>({p,v:Math.round(c.traffic*(.28-i*.022+rnd(s+i)*.03))}));

const W=Array.from({length:12},(_,i)=>'W'+(i+1));
const trn=(b,s)=>Array.from({length:12},(_,i)=>+(b*(.9+.1*i/11+(rnd(s+i)-.5)*.07)).toFixed(2));
const trk=(p,s)=>Array.from({length:12},(_,i)=>Math.max(1,Math.round(p*(1.25-.25*i/11)+(rnd(s+i)-.5)*2)));
const dev=s=>{const m=38+Math.floor(rnd(s)*20),x=6+Math.floor(rnd(s+1)*5);return[['Mobiel',m],['Desktop',100-m-x],['Tablet',x]]};

const stc=(l,v)=>`<div class="sc"><div class="sl">${l}</div><div class="sv sm">${v}</div></div>`;
const rowl=(d,a,b,c='→')=>`<div class="ck" data-d="${d}" style="display:grid;grid-template-columns:1fr auto 18px;gap:10px;align-items:center;padding:10px;border-bottom:1px solid var(--bdr);font-size:12px;color:var(--tx2)"><span style="min-width:0;overflow:hidden;text-overflow:ellipsis">${a}</span><span style="font-family:'DM Mono',monospace;color:var(--tx)">${b}</span><span class="t-up">${c}</span></div>`;
const sec=(t,h,s='')=>`<div class="card" style="padding:16px"><div class="card-hd" style="margin-bottom:8px"><div class="card-title">${t}</div><div class="card-sub">${s}</div></div>${h}</div>`;
const cv=h=>`<div class="cwrap" style="height:${h}px"><canvas id="dr-c"></canvas></div>`;
const bar=(l,p)=>`<div class="sdr"><div class="sdl" style="min-width:90px">${l}</div><div class="sdt"><div class="sdf" style="width:${p}%"></div></div><div class="sdp">${p}%</div></div>`;
const actl=cid=>ACT.map(([h,d],i)=>`<details style="border-bottom:1px solid var(--bdr);padding:9px 2px"><summary style="cursor:pointer;font-size:12.5px;color:var(--tx)">${i+1}. ${h} <span class="badge ${i<2?'b-up':'b-warn'}" style="margin-left:6px">${i<2?'hoge impact':'quick win'}</span></summary><div style="font-size:12px;color:var(--tx2);padding:8px 0 2px">${d}</div><button class="btn btn-ghost btn-sm" style="margin-top:8px" data-d="m:${cid}:${AM[i]}">Bekijk ${MET[AM[i]][0]} →</button></details>`).join('');
const hd=(t,sub)=>`<div class="page-title">${t}</div><div class="page-sub" style="margin-bottom:12px">${sub}</div>`;
