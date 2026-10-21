/* src/core/state.js — Global UI state, period scaling and number formatting. */
/* ============ STATE ============ */
let _charts={};
const NUM=n=>n.toLocaleString('nl-BE');

let ST=[],CUR='overview',PF=1,SRC='all',KWT='Alle',MK=0;
const BASE=COS.map(c=>({...c})),PN=()=>({0.25:'week',1:'maand',3:'3 maanden',12:'jaar'})[PF];
const shr=c=>{const t=c.organic+c.direct+c.paid+c.social;return[c.organic,c.direct,c.paid,c.social].map(x=>Math.round(x/t*95)).concat(5)};
function applyPer(f){PF=f;COS.forEach((c,i)=>['traffic','returning','newV','direct','organic','paid','social'].forEach(k=>c[k]=Math.round(BASE[i][k]*f)))}
function setPer(f){applyPer(f);const s=document.getElementById('traffic-sel'),k=s&&s.value;showSection(CUR);if(k&&k!=='totaal'){document.getElementById('traffic-sel').value=k;switchTrafficMetric(k)}}
function setSrc(v){SRC=v;showSection('sources')}
