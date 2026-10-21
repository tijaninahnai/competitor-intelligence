/* src/data/companies.js — Company dataset, loading steps and advanced filter groups. */
/* ============ DATA ============ */
const COS=[
  {id:1,name:"BrightMind Agency",short:"BrightMind",rank:1,score:97,traffic:40222,returning:8444,newV:31566,bounce:21.2,smin:9,ssec:32,pps:8.2,direct:37390,organic:20500,paid:18500,social:4500,type:"Buitenland",color:"#E8A520",url:"brightmind.agency",sector:"SEO, mail automation",kw:312,bl:4200,isYou:false},
  {id:2,name:"NexaCore AI",short:"NexaCore",rank:2,score:91,traffic:26862,returning:8444,newV:18418,bounce:24.7,smin:8,ssec:32,pps:7.5,direct:30000,organic:15000,paid:12000,social:3500,type:"Buitenland",color:"#818CF8",url:"nexacore.ai",sector:"Robotics & Automation",kw:243,bl:3100,isYou:false},
  {id:3,name:"Pixel & Code",short:"Pixel&Code",rank:3,score:92,traffic:31442,returning:8444,newV:22998,bounce:51.0,smin:6,ssec:32,pps:5.8,direct:11311,organic:12000,paid:9000,social:2800,type:"Binnenland",color:"#94A3B8",url:"pixelandcode.studio",sector:"Webdesign, Front-end Dev",kw:189,bl:2800,isYou:false},
  {id:4,name:"Edge.be",short:"Edge.be",rank:4,score:90,traffic:20350,returning:11566,newV:8444,bounce:61.7,smin:5,ssec:32,pps:3.5,direct:32722,organic:9000,paid:7000,social:2100,type:"Jouw bedrijf",color:"#D91F41",url:"edge.be",sector:"AI, online marketing",kw:186,bl:1900,isYou:true},
  {id:5,name:"RoboNXT Solutions",short:"RoboNXT",rank:5,score:87,traffic:14300,returning:9150,newV:5150,bounce:69.1,smin:3,ssec:32,pps:4.2,direct:2311,organic:5000,paid:4000,social:1200,type:"Buitenland",color:"#64748B",url:"robonxt.tech",sector:"Robotics & Automation",kw:142,bl:1200,isYou:false},
  {id:6,name:"ConversionDock",short:"ConvDock",rank:6,score:85,traffic:18980,returning:6845,newV:6680,bounce:44.2,smin:4,ssec:18,pps:5.1,direct:8500,organic:9000,paid:7500,social:1800,type:"Buitenland",color:"#14B8A6",url:"conversiondock.com",sector:"CRO, Performance",kw:167,bl:1650,isYou:false},
  {id:7,name:"DesignX",short:"DesignX",rank:7,score:83,traffic:10725,returning:9758,newV:987,bounce:52.8,smin:3,ssec:55,pps:4.8,direct:5000,organic:4500,paid:3500,social:900,type:"Binnenland",color:"#A78BFA",url:"designx.be",sector:"Design Systems",kw:98,bl:890,isYou:false},
];
const YOU=COS.find(c=>c.isYou);

const LD_STEPS=["URL ophalen & valideren","Sector & tags bepalen","Concurrenten identificeren","Verkeer & SEO data laden","Scores berekenen","Rapport samenstellen"];
const ADV_GROUPS=[
  {t:"Verkeer & Bezoekers",i:["Aantal bezoekers","Unieke bezoekers","Pagina's per sessie","Scroll diepte","Geografische locatie","Bounce rate","Sessieduur"]},
  {t:"Verkeersbronnen & Kanalen",i:["Direct verkeer","Organisch via zoekmachines","Betaald zoekverkeer","Sociale media","Influencer verkeer","Referral verkeer"]},
  {t:"Conversie & Betrokkenheid",i:["CTA click-through rate","Formulier voltooipercentage","Algemene conversiepercentage","Snelst converterende pagina's","Exit rate per pagina"]},
  {t:"SEO & Metingen",i:["Aantal backlinks","Verwijzende domeinen","Zoekwoordposities","Zoekvolume per zoekwoord","CTR per keyword","Keyword moeilijkheidsgraad"]},
  {t:"Technisch & Prestaties",i:["Laadtijd","Serverlocatie","JavaScript/CSS frameworks","Mobile optimalisatiestatus","Time To First Byte (TTFB)","Core Web Vitals"]},
  {t:"AI- & Voorspellende Metingen",i:["Verwachte concurrentiepositie","Toekomstige verkeersgroei","Contentgap-analyse","Seizoenspatronen"]},
];
