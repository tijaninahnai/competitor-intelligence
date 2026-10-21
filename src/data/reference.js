/* src/data/reference.js — Reference data: metrics, channels, keywords, pages, action plans, AI insights. */
const LCP={1:1.8,2:2.1,3:2.3,4:3.0,5:4.2,6:1.6,7:2.0};
const MET={traffic:['Bezoekers (periode)',c=>c.traffic,NUM,1],bounce:['Bounce rate',c=>c.bounce,v=>v+'%',0],pps:['Pagina’s / sessie',c=>c.pps,v=>v,1],sessie:['Sessieduur',c=>c.smin*60+c.ssec,v=>Math.floor(v/60)+'m '+Math.round(v%60)+'s',1],scroll:['Scroll-diepte',c=>50+Math.floor(c.score/3),v=>v+'%',1],score:['Totaalscore',c=>c.score,v=>v,1],kw:['Keywords',c=>c.kw,NUM,1],bl:['Backlinks',c=>c.bl,NUM,1],lcp:['LCP',c=>LCP[c.id],v=>v+'s',0]};
const CH={Direct:'direct',Organisch:'organic',Betaald:'paid',Sociaal:'social'};
const KW=[{w:'edge.be',p:1,v:227,cpc:'—',diff:67},{w:'ChatGPT',p:2,v:197,cpc:'€1.27',diff:67},{w:'Artificial Intelligence',p:3,v:2276,cpc:'€1.31',diff:67},{w:'AI Chatbot',p:4,v:228,cpc:'€1.31',diff:67},{w:'machine learning',p:5,v:397,cpc:'€1.31',diff:67},{w:'AI marketing automatisering',p:6,v:880,cpc:'€2.10',diff:54},{w:'SEO audit tool',p:7,v:1450,cpc:'€3.05',diff:61},{w:'digitale strategie België',p:8,v:320,cpc:'€1.84',diff:38},{w:'marketing chatbot',p:9,v:590,cpc:'€1.62',diff:49},{w:'AI content generator',p:11,v:2100,cpc:'€1.95',diff:72}];

const PGL=['Homepage','/diensten','/blog','/prijzen','/contact','/over-ons','/cases','/product-pagina','/winkelwagen','/account/registreren'];

const ACT=[['Hero & CTA herschrijven','A/B-test een scherpere waardepropositie boven de vouw en één duidelijke CTA.'],['Laadtijd verlagen','Comprimeer afbeeldingen, lazy-load en zet een CDN in.'],['Interne links toevoegen','Koppel drie gerelateerde pagina’s onderaan voor diepere sessies.'],['Social proof tonen','Reviews, logo’s en cases dicht bij de conversiestap.']];
const AM=['bounce','lcp','pps','scroll'];
const AI=[['Groeikans: organisch zoekverkeer','kw'],['Risico: stijgende bounce rate','bounce'],['Kans: tech stack modernisering','lcp'],['Voorspelling: positieverandering','score']];
