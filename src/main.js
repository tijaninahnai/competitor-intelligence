/* src/main.js — Bootstrap. */
document.getElementById('bot-nav').innerHTML=[['overview','🏆','Ranking'],['traffic','📊','Verkeer'],['sources','🔀','Bronnen'],['seo','🔍','SEO'],['tech','⚡','Tech'],['conv','🎯','Conversie'],['ai','🔮','AI'],['diff','⚖️','Verschil']].map(([s,i,l])=>`<div class="bn-item${s==='overview'?' active':''}" data-sec="${s}" onclick="showSection('${s}')"><span class="bn-ico">${i}</span>${l}</div>`).join('');

/* INIT */
document.getElementById('screen-landing').style.display='block';
