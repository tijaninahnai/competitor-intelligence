/* src/views/overview.js — Ranking overview and table filter. */
/* ============ RENDER FUNCTIONS ============ */

function renderOverview(){
  return `
  <div class="page-hd">
    <div><div class="page-title">Algemene Ranking</div><div class="page-sub">Volledig concurrentieoverzicht — ${COS.length} bedrijven</div></div>
    <div class="pctl">
      <select class="sel" onchange="filterTable(this.value)"><option value="all">Alle bedrijven</option><option value="Binnenland">Binnenland</option><option value="Buitenland">Buitenland</option></select>
      <button class="btn btn-ghost btn-sm" data-d="ex:ov">↓ Export</button>
    </div>
  </div>
  <div class="card">
    <div class="card-hd">
      <div><div class="card-title">Vergelijkingsresultaten</div><div class="card-sub">Klik op een bedrijf voor het volledige rapport</div></div>
    </div>
    <div class="tw">
      <table class="dt" id="ov-table">
        <thead><tr><th>#</th><th>Score</th><th>Bedrijf</th><th>Sector</th><th>Bezoekers/mnd</th><th>Terugkerend</th><th>Bounce</th><th>Sessieduur</th><th>URL</th><th></th></tr></thead>
        <tbody>
          ${COS.map(co=>`<tr class="${co.isYou?'you-row':''}" style="cursor:pointer" onclick="openReport(${co.id})">
            <td>${rbadge(co.rank,co.isYou)}</td>
            <td>${scoreRing(co.score)}</td>
            <td>
              <div style="display:flex;align-items:center;gap:8px">
                ${coDot(co)}
                <div>
                  <div style="font-weight:500;color:${co.isYou?'var(--red2)':'var(--tx)'}">${co.name}</div>
                  ${co.isYou?youTag():''}
                  <span class="badge b-neu" style="font-size:9px">${co.type}</span>
                </div>
              </div>
            </td>
            <td style="font-size:12px;color:var(--tx3)">${co.sector}</td>
            <td><span style="font-family:'DM Mono',monospace">${NUM(co.traffic)}</span><br><span class="t-up">↑${Math.floor(rnd(co.id)*20+2)}%</span></td>
            <td><span style="font-family:'DM Mono',monospace">${NUM(co.returning)}</span></td>
            <td><span class="${co.bounce>50?'t-dn':'t-up'}" style="font-family:'DM Mono',monospace;font-size:13px">${co.bounce}%</span></td>
            <td style="font-family:'DM Mono',monospace;font-size:12px">${co.smin}m ${co.ssec}s</td>
            <td><a class="uc" href="#" onclick="event.stopPropagation();event.preventDefault();openReport(${co.id})">${co.url}</a></td>
            <td><button class="btn-icon" onclick="event.stopPropagation();openReport(${co.id})">→</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:14px">Overzicht score — alle bedrijven</div>
    <div class="hbl">
      ${COS.map(co=>`<div class="hbr ck" data-d="m:${co.id}:score">
        <div class="hbn ${co.isYou?'you':''}">${coDot(co)}<span>${co.short}</span></div>
        <div class="hbt"><div class="hbf" style="width:${co.score}%;background:${co.color}"></div></div>
        <div class="hbv">${co.score}<span style="color:var(--tx3)">/100</span></div>
      </div>`).join('')}
    </div>
  </div>
  <div class="ins-wrap">
    <div class="ins-ttl">Uitgelichte inzichten</div>
    <div class="ins"><div class="ins-n">1</div><div>BrightMind Agency blinkt uit met zowel hoog organisch verkeer als de laagste bounce rate (21.2%). Dit duidt op sterke contentrelevantie en een goede UX-structuur.</div></div>
    <div class="ins"><div class="ins-n">2</div><div><strong style="color:var(--red2)">Edge.be</strong> staat op positie #4 maar heeft de hoogste terugkeer van bezoekers (11.566) — een sterk signaal van merkloyaliteit en klanttevredenheid.</div></div>
    <div class="ins"><div class="ins-n">3</div><div>ConversionDock (+6) en DesignX (+1) laten de sterkste positiestijgingen zien. Monitor hun aanpak op het gebied van betaald verkeer en SEO-optimalisatie.</div></div>
  </div>`;
}

function filterTable(v){
  document.querySelectorAll('#ov-table tbody tr').forEach(tr=>{
    const c=CO(tr.getAttribute('onclick').match(/\d+/)[0]);
    tr.style.display=(v==='all'||c.isYou||c.type===v)?'':'none';
  });
}
