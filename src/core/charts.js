/* src/core/charts.js — Chart.js helpers, per-section chart setup and the drawer line chart. */
/* ============ CHART HELPERS ============ */
function _killCharts(){Object.values(_charts).forEach(c=>c.destroy());_charts={};}
function _mkChart(id,cfg){
  const el=document.getElementById(id);if(!el)return;
  if(cfg.type==='bar'&&cfg.data.labels.length===COS.length){cfg.options.onClick=(e,a)=>{if(!a.length)return;const T=id.includes('src')?['ch','Direct']:['m',id.includes('seo')?'kw':'traffic'];drill(T[0],COS[a[0].index].id,T[1])};cfg.options.onHover=(e,a)=>{e.native.target.style.cursor=a.length?'pointer':'default'}}
  if(id==='chart-exit-pie'){cfg.options.onClick=(e,a)=>{if(a.length)drill('pg',YOU.id,cfg.data.labels[a[0].index])};cfg.options.onHover=(e,a)=>{e.native.target.style.cursor=a.length?'pointer':'default'}}
  if(_charts[id])_charts[id].destroy();
  _charts[id]=new Chart(el,cfg);
}
Chart.defaults.color='#4A5668';
Chart.defaults.borderColor='rgba(255,255,255,.04)';
Chart.defaults.font.family="'DM Mono',monospace";
Chart.defaults.font.size=10;


/* ============ CHARTS ============ */
function initCharts(section){
  const cDark={color:'#4A5668',borderColor:'rgba(255,255,255,.04)'};
  if(section==='overview'){}
  if(section==='traffic'){
    const sel=document.getElementById('traffic-sel');
    if(sel)initTrafficChart(sel.value||'totaal');
  }
  if(section==='sources'){
    _mkChart('chart-src-bar',{type:'bar',data:{
      labels:COS.map(c=>c.short),
      datasets:[
        ...Object.entries(CH).filter(([l,f])=>SRC==='all'||SRC===f).map(([l,f],i)=>({label:l,data:COS.map(c=>c[f]),backgroundColor:COS.map(c=>c.color+['CC','88','55','33'][i]),borderWidth:0,borderRadius:3})),
        
      ]
    },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{stacked:true,grid:{display:false}},y:{stacked:true,grid:{color:'rgba(255,255,255,.04)'}}}}});
  }
  if(section==='seo'){kwFilter();
    _mkChart('chart-seo-bar',{type:'bar',data:{
      labels:COS.map(c=>c.short),
      datasets:[
        {label:'Keywords',data:COS.map(c=>c.kw),backgroundColor:COS.map(c=>c.color+'CC'),borderWidth:0,borderRadius:3,yAxisID:'y'},
        {label:'Backlinks',data:COS.map(c=>Math.floor(c.bl/100)),backgroundColor:COS.map(c=>c.color+'44'),borderWidth:0,borderRadius:3,yAxisID:'y2'},
      ]
    },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{grid:{color:'rgba(255,255,255,.04)'},title:{display:true,text:'Keywords',color:'#4A5668'}},y2:{position:'right',grid:{display:false},title:{display:true,text:'Backlinks ×100',color:'#4A5668'}},x:{grid:{display:false}}}}});
  }
  if(section==='tech'){
    _mkChart('chart-radar',{type:'radar',data:{
      labels:['Laadsnelheid','LCP','CLS','Mobiel','TTFB','Toegankelijkheid'],
      datasets:[
        {label:'Edge.be',data:[70,65,78,78,60,72],borderColor:'#D91F41',backgroundColor:'rgba(217,31,65,.1)',pointBackgroundColor:'#D91F41',pointRadius:4},
        {label:'BrightMind',data:[92,90,95,98,90,91],borderColor:'#E8A520',backgroundColor:'rgba(232,165,32,.08)',pointBackgroundColor:'#E8A520',pointRadius:4},
        {label:'ConvDock',data:[95,95,97,96,95,94],borderColor:'#14B8A6',backgroundColor:'rgba(20,184,166,.06)',pointBackgroundColor:'#14B8A6',pointRadius:3},
      ]
    },options:{responsive:true,maintainAspectRatio:false,scales:{r:{beginAtZero:true,max:100,grid:{color:'rgba(255,255,255,.05)'},pointLabels:{color:'#8694A8',font:{size:10}},ticks:{display:false}}},plugins:{legend:{display:false}}}});
  }
  if(section==='conv'){
    _mkChart('chart-exit-pie',{type:'doughnut',data:{
      labels:['/product','/blog','/winkel','/details','/account'],
      datasets:[{data:[68.7,54.3,49.8,48.7,35.2],backgroundColor:['#D91F41','#E8A520','#4F8EF0','#22C55E','#64748B'],borderWidth:0}]
    },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},cutout:'58%'}});
  }
  if(section==='ai'){
    _mkChart('chart-ai-forecast',{type:'line',data:{
      labels:['Nu','W2','W4','W6','W8','W10','W12'],
      datasets:[
        {label:'Edge.be (verwacht)',data:[4,3.9,3.7,3.4,3.2,3.0,2.8],borderColor:'#D91F41',borderDash:[5,4],backgroundColor:'rgba(217,31,65,.07)',fill:true,tension:.4,pointBackgroundColor:'#D91F41'},
        {label:'BrightMind',data:[1,1,1,1,1,1,1],borderColor:'#E8A520',tension:.4,fill:false,pointBackgroundColor:'#E8A520'},
        {label:'NexaCore',data:[2,2,2,2,2,2,2],borderColor:'#818CF8',tension:.4,fill:false,pointRadius:3},
      ]
    },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{reverse:true,title:{display:true,text:'Ranking positie',color:'#4A5668'},grid:{color:'rgba(255,255,255,.04)'},ticks:{precision:0}},x:{grid:{display:false}}}}});
  }
  if(section==='diff'){
    _mkChart('chart-diff-radar',{type:'radar',data:{
      labels:['Bezoekers','Bounce (inv)','Sessieduur','Keywords','Backlinks','Score'],
      datasets:COS.map(co=>({
        label:co.short,
        data:[
          Math.round(co.traffic/450),
          Math.round(100-co.bounce),
          Math.round(co.smin*10+co.ssec/6),
          Math.round(co.kw/3.5),
          Math.round(co.bl/45),
          co.score,
        ],
        borderColor:co.color,
        backgroundColor:co.color+'18',
        pointBackgroundColor:co.color,
        borderWidth:co.isYou?2.5:1.5,
        pointRadius:co.isYou?5:3,
      }))
    },options:{responsive:true,maintainAspectRatio:false,scales:{r:{beginAtZero:true,max:100,grid:{color:'rgba(255,255,255,.05)'},pointLabels:{color:'#8694A8',font:{size:10}},ticks:{display:false}}},plugins:{legend:{display:false}}}});
  }
}

function initTrafficChart(m){
  if(m==='totaal'){
    _mkChart('chart-traffic-bar',{type:'bar',data:{
      labels:COS.map(c=>c.short),
      datasets:[{label:'Bezoekers',data:COS.map(c=>c.traffic),backgroundColor:COS.map(c=>c.color+'CC'),borderWidth:0,borderRadius:4}]
    },options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{grid:{color:'rgba(255,255,255,.04)'}},x:{grid:{display:false}}}}});
  }
}


const lc=(sets,rev)=>()=>_mkChart('dr-c',{type:'line',data:{labels:W,datasets:sets.map(([l,d,c,dash])=>({label:l,data:d,borderColor:c,backgroundColor:c+'22',fill:!dash,tension:.4,pointRadius:2,borderDash:dash?[5,4]:[]}))},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:sets.length>1,labels:{boxWidth:8}}},scales:{y:{reverse:!!rev,grid:{color:'rgba(255,255,255,.04)'}},x:{grid:{display:false}}}}});
