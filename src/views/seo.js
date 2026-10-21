/* src/views/seo.js — SEO section and keyword table behaviour. */
function renderSEO(){
  const kws=[{w:"edge.be",p:1,v:227,cpc:"—",diff:67},{w:"ChatGPT",p:2,v:197,cpc:"€1.27",diff:67},{w:"Artificial Intelligence",p:3,v:2276,cpc:"€1.31",diff:67},{w:"AI Chatbot",p:4,v:228,cpc:"€1.31",diff:67},{w:"machine learning",p:5,v:397,cpc:"€1.31",diff:67},{w:"AI marketing automatisering",p:6,v:880,cpc:"€2.10",diff:54},{w:"SEO audit tool",p:7,v:1450,cpc:"€3.05",diff:61},{w:"digitale strategie België",p:8,v:320,cpc:"€1.84",diff:38},{w:"marketing chatbot",p:9,v:590,cpc:"€1.62",diff:49},{w:"AI content generator",p:11,v:2100,cpc:"€1.95",diff:72}];
  return `
  <div class="page-hd">
    <div><div class="page-title">SEO &amp; Metingen</div><div class="page-sub">Zoekwoordanalyse en organische zichtbaarheidsvergelijking</div></div>
    <button class="btn btn-ghost btn-sm" data-d="ex:kw">↓ Export keywords</button>
  </div>
  <div class="sg">
    <div class="sc ck" data-d="m:${YOU.id}:kw"><div class="sl">Organische keywords</div><div class="sv">${YOU.kw}</div><span class="badge b-neu">top-3 Google: 23</span></div>
    <div class="sc ck" data-d="m:${YOU.id}:bl"><div class="sl">Backlinks</div><div class="sv">${NUM(YOU.bl)}</div><span class="badge b-up">↑8%</span></div>
    <div class="sc"><div class="sl">Zoekvolume (mnd)</div><div class="sv sm">~30.000</div><span class="badge b-neu">top-10 keywords</span></div>
    <div class="sc"><div class="sl">Zoekimpressies</div><div class="sv sm">45.068</div><span class="badge b-up">↑12%</span></div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:14px">Organische keywords &amp; backlinks — vergelijking</div>
    <div class="cwrap" style="height:210px"><canvas id="chart-seo-bar"></canvas></div>
  </div>
  <div class="card">
    <div class="card-hd">
      <div class="card-title">Top keywords — Edge.be</div>
      <div style="display:flex;gap:8px">
        <input id="kw-q" oninput="kwFilter()" type="text" placeholder="Zoek keyword…" style="background:var(--sf2);border:1px solid var(--bdr);border-radius:var(--r);padding:6px 10px;font-size:12px;color:var(--tx);outline:none;font-family:'Outfit',sans-serif">
        <div class="tabg"><button class="tabt active" onclick="kwType('Alle')">Alle</button><button class="tabt" onclick="kwType('Organisch')">Organisch</button><button class="tabt" onclick="kwType('Betaald')">Betaald</button></div>
      </div>
    </div>
    <div class="tw"><table class="dt">
      <thead><tr><th>Keyword</th><th>Positie</th><th>Zoekvolume</th><th>CPC</th><th>CTR</th><th>Moeilijkheid</th></tr></thead>
      <tbody>
        ${kws.map(k=>`<tr class="ck" data-d="kw:${k.w}">
          <td style="font-weight:500;color:var(--tx)">${k.w}</td>
          <td><span style="background:var(--red);color:#fff;border-radius:4px;padding:1px 7px;font-family:'DM Mono',monospace;font-size:11px;font-weight:500">#${k.p}</span></td>
          <td style="font-family:'DM Mono',monospace;font-size:12px">${NUM(k.v)}</td>
          <td style="font-family:'DM Mono',monospace;font-size:12px">${k.cpc}</td>
          <td style="font-family:'DM Mono',monospace;font-size:12px">8%</td>
          <td><div class="dfb"><div class="dft"><div class="dff" style="width:${k.diff}%"></div></div><span class="badge b-dn" style="font-size:10px">${k.diff}% Hoog</span></div></td>
        </tr>`).join('')}
      </tbody>
    </table></div>
    <div style="text-align:center;margin-top:12px"><button class="btn btn-ghost btn-sm" onclick="moreKw(this)">Alle ${YOU.kw} keywords bekijken</button></div>
  </div>
  ${insights(['Je rankt met 23 keywords in de top-3. BrightMind Agency rankt 4.4x meer keywords organisch — focus op long-tail keywords voor snellere wins.','Je domeinautoriteit (gebaseerd op 1.900 backlinks) is significant lager dan de top-2. Link-building campagne aanbevolen.','ChatGPT en AI-gerelateerde zoektermen genereren het meeste volume. Creëer diepgaande contentpagina\'s rondom deze termen.'])}`;
}


function kwFilter(){const q=((document.getElementById('kw-q')||{}).value||'').toLowerCase();document.querySelectorAll('#dash-main .dt tbody tr').forEach(r=>{const w=r.dataset.d.slice(3),ty=hs(w)%4?'Organisch':'Betaald';if(!r.dataset.t){r.dataset.t=1;r.cells[0].insertAdjacentHTML('beforeend',` <span class="badge b-neu" style="margin-left:6px;font-size:9px">${ty}</span>`)}r.style.display=(!q||w.toLowerCase().includes(q))&&(KWT==='Alle'||ty===KWT)?'':'none'})}
function kwType(t){KWT=t;kwFilter()}
const kwRow=k=>`<tr class="ck" data-d="kw:${k.w}"><td style="font-weight:500;color:var(--tx)">${k.w}</td><td><span style="background:var(--red);color:#fff;border-radius:4px;padding:1px 7px;font-family:'DM Mono',monospace;font-size:11px;font-weight:500">#${k.p}</span></td><td style="font-family:'DM Mono',monospace;font-size:12px">${NUM(k.v)}</td><td style="font-family:'DM Mono',monospace;font-size:12px">${k.cpc}</td><td style="font-family:'DM Mono',monospace;font-size:12px">${Math.max(1,Math.round(30/k.p))}%</td><td><div class="dfb"><div class="dft"><div class="dff" style="width:${k.diff}%"></div></div><span class="badge b-dn" style="font-size:10px">${k.diff}% Hoog</span></div></td></tr>`;
function moreKw(b){const tb=document.querySelector('#dash-main .dt tbody'),A=['AI','SEO','marketing','chatbot','automatisering','content','analytics','strategie'],B=['tool','bureau','België','kosten','software','voorbeelden'];let h='';for(let i=0,n=Math.min(15,YOU.kw-tb.rows.length);i<n;i++,MK++){const w=A[MK%8]+' '+B[Math.floor(MK/8)%6]+(MK>=48?' '+(2024+Math.floor(MK/48)):'');h+=kwRow({w,p:3+hs(w)%35,v:80+hs(w)%2900,cpc:'€'+(1+hs(w)%250/100).toFixed(2),diff:25+hs(w)%60})}tb.insertAdjacentHTML('beforeend',h);kwFilter();const r=tb.rows.length;b.textContent=r>=YOU.kw?'Alle keywords getoond':'Toon meer · '+r+' van '+YOU.kw}
