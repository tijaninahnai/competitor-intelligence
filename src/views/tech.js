/* src/views/tech.js — Technology section. */
function renderTech(){
  const data=[
    {n:"BrightMind Agency",host:"AWS",cms:"Custom",fw:"Next.js",ttfb:"0.32s",lcp:"1.8s",cls:"0.01",mob:98,score:97,color:"#E8A520",isYou:false},
    {n:"NexaCore AI",host:"GCP",cms:"Headless",fw:"Nuxt",ttfb:"0.38s",lcp:"2.1s",cls:"0.02",mob:95,score:91,color:"#818CF8",isYou:false},
    {n:"Pixel & Code",host:"Netlify",cms:"Gatsby",fw:"Gatsby",ttfb:"0.41s",lcp:"2.3s",cls:"0.05",mob:91,score:92,color:"#94A3B8",isYou:false},
    {n:"Edge.be",host:"Vercel",cms:"WordPress",fw:"React",ttfb:"0.62s",lcp:"3.0s",cls:"0.12",mob:78,score:90,color:"#D91F41",isYou:true},
    {n:"RoboNXT Solutions",host:"Hosting2",cms:"WP",fw:"jQuery",ttfb:"0.89s",lcp:"4.2s",cls:"0.18",mob:62,score:87,color:"#64748B",isYou:false},
    {n:"ConversionDock",host:"Cloudflare",cms:"Webflow",fw:"Custom",ttfb:"0.29s",lcp:"1.6s",cls:"0.01",mob:96,score:85,color:"#14B8A6",isYou:false},
    {n:"DesignX",host:"Netlify",cms:"Contentful",fw:"Svelte",ttfb:"0.35s",lcp:"2.0s",cls:"0.03",mob:94,score:83,color:"#A78BFA",isYou:false},
  ];
  return `
  <div class="page-hd">
    <div><div class="page-title">Technisch &amp; Prestaties</div><div class="page-sub">Core Web Vitals, tech stack en snelheidsvergelijking</div></div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:16px">Web Vitals radar — Edge.be vs BrightMind Agency</div>
    <div class="cwrap" style="height:260px"><canvas id="chart-radar"></canvas></div>
  </div>
  <div class="card">
    <div class="card-title" style="margin-bottom:14px">Tech stack &amp; prestaties — alle bedrijven</div>
    <div class="tw"><table class="dt">
      <thead><tr><th>Bedrijf</th><th>Hosting</th><th>Framework</th><th>TTFB</th><th>LCP</th><th>CLS</th><th>Mobiel</th><th>Score</th></tr></thead>
      <tbody>
        ${data.map(d=>`<tr class="${d.isYou?'you-row':''} ck" data-d="m:${COS.find(c=>c.name===d.n).id}:lcp">
          <td><div style="display:flex;align-items:center;gap:7px"><span class="co-dot" style="background:${d.color}"></span><div style="font-weight:500;color:${d.isYou?'var(--red2)':'var(--tx)'}">${d.n}${d.isYou?'<br>'+youTag():''}</div></div></td>
          <td><span class="badge b-info">${d.host}</span></td>
          <td style="font-size:12px;color:var(--tx2)">${d.fw}</td>
          <td style="font-family:'DM Mono',monospace;font-size:12px"><span class="${parseFloat(d.ttfb)>.6?'t-dn':parseFloat(d.ttfb)<.4?'t-up':''}">${d.ttfb}</span></td>
          <td style="font-family:'DM Mono',monospace;font-size:12px"><span class="${parseFloat(d.lcp)>2.5?'t-dn':parseFloat(d.lcp)<2?'t-up':''}">${d.lcp}</span></td>
          <td style="font-family:'DM Mono',monospace;font-size:12px"><span class="${parseFloat(d.cls)>.1?'t-dn':parseFloat(d.cls)<.05?'t-up':''}">${d.cls}</span></td>
          <td><div style="font-family:'DM Mono',monospace;font-size:12px">${d.mob}<span style="color:var(--tx3)">/100</span></div></td>
          <td>${scoreRing(d.score,16,2.8)}</td>
        </tr>`).join('')}
      </tbody>
    </table></div>
  </div>
  ${insights(['Edge.be\'s LCP van 3.0s overschrijdt de Google-grenswaarde van 2.5s. Optimaliseer hero-images en serverresponstijden voor een directe rankingwinst.','ConversionDock heeft de snelste TTFB (0.29s) dankzij Cloudflare\'s edge-netwerk. Overweeg een CDN-upgrade voor Edge.be.','De CLS-score van 0.12 bij Edge.be veroorzaakt merkbare visuele verschuivingen op mobiel — dit beïnvloedt direct de gebruikerservaring en het rankingsignaal.'])}`;
}
