/* src/views/diff.js — Differences section. */
function renderDiff(){
  return `
  <div class="page-hd">
    <div><div class="page-title">Concurrentieverschillen</div><div class="page-sub">Klik op een bedrijf voor gedetailleerde vergelijking</div></div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:14px">Selecteer concurrent voor vergelijking</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px">
      ${COS.filter(c=>!c.isYou).map(co=>`<button onclick="openReport(${co.id})" style="display:flex;align-items:center;gap:7px;padding:8px 14px;background:var(--sf2);border:1px solid var(--bdr2);border-radius:var(--rl);font-size:13px;color:var(--tx2);cursor:pointer;font-family:'Outfit',sans-serif;transition:.15s" onmouseover="this.style.background='var(--sf3)'" onmouseout="this.style.background='var(--sf2)'">${coDot(co)}<span>${co.name}</span></button>`).join('')}
    </div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:14px">Kop-op-kop vergelijking — Edge.be vs alle concurrenten</div>
    <div class="cwrap" style="height:220px"><canvas id="chart-diff-radar"></canvas></div>
  </div>
  ${COS.filter(c=>!c.isYou).slice(0,3).map(co=>`
  <div class="card" style="cursor:pointer" onclick="openReport(${co.id})">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap">
      ${scoreRing(co.score,20,3)}
      <div>
        <div style="font-weight:600;font-size:14px;color:var(--tx)">${co.name}</div>
        <div style="font-size:11px;color:var(--tx3)">${co.sector} — <a class="uc" href="#">${co.url}</a></div>
      </div>
      <button class="btn btn-ghost btn-sm" style="margin-left:auto">Volledig rapport →</button>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px">
      ${[
        {l:"Bezoekers vs Edge",v:co.traffic>YOU.traffic?`+${NUM(co.traffic-YOU.traffic)}`:NUM(co.traffic-YOU.traffic),pos:co.traffic<YOU.traffic},
        {l:"Bounce vs Edge",v:co.bounce>YOU.bounce?`+${(co.bounce-YOU.bounce).toFixed(1)}%`:`${(co.bounce-YOU.bounce).toFixed(1)}%`,pos:co.bounce>YOU.bounce},
        {l:"Sessieduur vs Edge",v:co.smin>YOU.smin?`+${co.smin-YOU.smin}m`:co.smin===YOU.smin?'=':'-${YOU.smin-co.smin}m',pos:co.smin<YOU.smin},
        {l:"Keywords vs Edge",v:co.kw>YOU.kw?`+${co.kw-YOU.kw}`:`${co.kw-YOU.kw}`,pos:co.kw<YOU.kw},
      ].map(m=>`<div class="sc" style="padding:10px"><div class="sl" style="font-size:9px">${m.l}</div><div class="sv" style="font-size:16px;color:${m.pos?'var(--green)':'#F87171'}">${m.v}</div></div>`).join('')}
    </div>
  </div>`).join('')}
  ${insights(['BrightMind Agency heeft 97.5% meer organisch verkeer dan Edge.be — de grootste kloof in je markt.','Je retentierate (56.8%) is de sterkste in het segment. Dit is je concurrentievoordeel ten opzichte van ConversionDock (36%) en DesignX (91% maar laag volume).','Pixel & Code en DesignX kampen met slechte bounce rates (51-52%), vergelijkbaar met jou — focus op snelheidsverbeteringen die beide bedrijven nog niet doorgevoerd hebben.'])}`;
}
