/* Ramstad Reklame: quote builder with direct enquiry relay; payment remains after agreement */
(function(){
'use strict';
const catalog={
  nettsider:{no:'Nettsider',en:'Websites',items:[
    {id:'onepage',no:'Én-sides nettside',en:'One-page website',price:5900},
    {id:'businesssite',no:'Bedriftsnettside (inntil 6 sider)',en:'Business website (up to 6 pages)',price:12900},
    {id:'customsite',no:'Avansert nettside – fra',en:'Custom website – from',price:19900,from:true},
    {id:'webproject',no:'Annet nettsideprosjekt – fra',en:'Other website project – from',price:9900,from:true},
    {id:'webcare',no:'Vedlikehold av nettside – per måned',en:'Website maintenance – monthly',price:690,monthly:true}
  ]},
  design:{no:'Grafisk design',en:'Graphic design',items:[
    {id:'social',no:'Design av innlegg til sosiale medier',en:'Social media post design',price:590},
    {id:'adgraphic',no:'Design av Facebook/Instagram-annonse',en:'Facebook/Instagram ad design',price:790},
    {id:'logo',no:'Logodesign',en:'Logo design',price:2490},
    {id:'card',no:'Visittkortdesign',en:'Business card design',price:990},
    {id:'flyer1',no:'A5-flyer, én side (design)',en:'A5 flyer, one side (design)',price:1290},
    {id:'flyer2',no:'A5-flyer, to sider (design)',en:'A5 flyer, two sides (design)',price:1790},
    {id:'brochure',no:'Brosjyre 2–4 sider (design)',en:'2–4 page brochure (design)',price:2990},
    {id:'poster',no:'Plakat/banner (design)',en:'Poster/banner (design)',price:1290},
    {id:'designquote',no:'Annet design / trykk – fra',en:'Other design / printing – from',price:990,from:true}
  ]},
  annonsering:{no:'Annonsering',en:'Advertising',items:[
    {id:'campaign',no:'Oppsett av én annonsekampanje',en:'Setup of one ad campaign',price:2490},
    {id:'mgmt',no:'Administrasjon av annonser – per måned',en:'Ads management – monthly',price:3490,monthly:true},
    {id:'startmonthly',no:'Synlighet Start – per måned',en:'Visibility Start – monthly',price:3990,monthly:true},
    {id:'plusmonthly',no:'Synlighet Plus – per måned',en:'Visibility Plus – monthly',price:7990,monthly:true},
    {id:'promonthly',no:'Synlighet Pro – per måned',en:'Visibility Pro – monthly',price:12990,monthly:true},
    {id:'adsquote',no:'Spesialkampanje – fra',en:'Custom campaign – from',price:3990,from:true}
  ]},
  synlighet:{no:'Google og AI-søk',en:'Google and AI search',items:[
    {id:'googleai',no:'Synlighet på Google og i AI-søk – fra',en:'Visibility on Google and in AI search – from',price:4990,from:true},
    {id:'googleprofile',no:'Google bedriftsprofil – oppsett og optimalisering',en:'Google Business Profile setup and optimization',price:2490},
    {id:'local-seo',no:'Lokal SEO og søkevennlig innhold – fra',en:'Local SEO and search-friendly content – from',price:3990,from:true}
  ]},
  innhold:{no:'Bilder og innhold',en:'Photos and content',items:[
    {id:'photo5',no:'Produktfotografering – 5 produkter',en:'Product photography – 5 products',price:3900},
    {id:'photo10',no:'Produktfotografering – 10 produkter',en:'Product photography – 10 products',price:6900},
    {id:'edit',no:'Redigering av kort video fra kundemateriale',en:'Edit a short customer-supplied video',price:1490},
    {id:'reel',no:'Opptak og produksjon av kort Reel',en:'Film and produce a short Reel',price:3900},
    {id:'filmquote',no:'Reklamefilm – fra',en:'Commercial film – from',price:6900,from:true}
  ]},
  pakker:{no:'Startpakker',en:'Starter packages',items:[
    {id:'startpakke',no:'Startpakke',en:'Starter package',price:3990},
    {id:'webpakke',no:'Nettsidepakke',en:'Website package',price:8490},
    {id:'vekst',no:'Vekstpakke',en:'Growth package',price:12990}
  ]}
};
const extras=[
{id:'google',no:'Oppsett og optimalisering av Google bedriftsprofil',en:'Google Business Profile setup and optimization',price:2490},
{id:'extrapage',no:'Én ekstra nettside / underside',en:'One additional website page',price:1990},
{id:'extraprofile',no:'Oppsett av ekstra profil i sosiale medier',en:'Setup of an additional social media profile',price:1490}
];
const root=document.getElementById('rr-offers');
if(!root)return;
const catKey=root.dataset.category||'hjem';
const catOrder=['nettsider','design','annonsering','synlighet','innhold','pakker'];
let chosenCategory=catKey==='hjem'?'nettsider':catKey;
let saved={product:'',extras:[],name:'',company:'',email:'',message:''};
const lang=()=>document.documentElement.lang==='en'?'en':'no';
const L=(no,en)=>lang()==='en'?en:no;
const money=n=>new Intl.NumberFormat(lang()==='en'?'en-NO':'nb-NO',{maximumFractionDigits:0}).format(n)+' kr';
const findProduct=()=>catalog[chosenCategory].items.find(p=>p.id===saved.product);
const option=(value,label,selected)=>'<option value="'+value+'"'+(selected?' selected':'')+'>'+label+'</option>';
const escaped=str=>String(str??'').replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
function capture(){
 let q=id=>root.querySelector('#'+id);
 const p=q('rr-product'); if(p)saved.product=p.value;
 for(const k of ['name','company','email','message']){let el=q('rr-'+k);if(el)saved[k]=el.value}
 saved.extras=[...root.querySelectorAll('[name="rr-extra"]:checked')].map(i=>i.value);
 if(catKey==='hjem'){let c=q('rr-category');if(c)chosenCategory=c.value}
}

function renderVisiblePrices(){
 const sections=catKey==='hjem'?catOrder:[chosenCategory];
 let section=document.getElementById('rr-visible-prices');
 if(!section){
   section=document.createElement('section');
   section.id='rr-visible-prices';
   section.className='rr-price-section';
   root.insertAdjacentElement('beforebegin',section);
   section.addEventListener('click',event=>{
     const pick=event.target.closest('[data-price-pick]');
     if(!pick)return;
     event.preventDefault();
     chosenCategory=pick.getAttribute('data-price-group');
     saved.product=pick.getAttribute('data-price-pick');
     create();
     root.scrollIntoView({behavior:'smooth',block:'start'});
   });
 }
 function card(key,p){
   const tag=p.quote?L('Etter avtale','By quotation'):(p.from?L('Fra ','From '):'')+money(p.price)+(p.monthly?L(' / mnd',' / mo'):'');
   return '<a class="rr-price-card" href="#rr-offers" data-price-group="'+key+'" data-price-pick="'+escaped(p.id)+'"><span>'+escaped(p[lang()])+'</span><strong>'+escaped(tag)+'</strong></a>';
 }
 const parts=sections.map(key=>{
   const info=catalog[key];
   const cards=info.items.map(p=>card(key,p)).join('');
   if(catKey==='hjem'){
     return '<details class="rr-price-group"><summary>'+escaped(info[lang()])+' <span>'+L('Se priser','See prices')+' ↓</span></summary><div class="rr-price-cards">'+cards+'</div></details>';
   }
   return '<div class="rr-price-cards">'+cards+'</div>';
 }).join('');
 section.innerHTML='<div class="rr-price-wrap"><h2>'+L('Priser på våre tjenester','Our service prices')+'</h2><p>'+L('Velg en tjeneste for å se prisen og gå direkte til forespørselen. Alle priser er veiledende i NOK. Annonsebudsjett, trykk og eksterne kostnader kommer i tillegg ved behov. MVA legges til når det er aktuelt.','Choose a service to see its price and go straight to the enquiry. Indicative prices in NOK. Ad spend, printing and external costs are additional where needed. VAT applies when required.')+'</p>'+parts+'</div>';
 if(catKey!=='hjem'){
   const hero=document.querySelector('.hero-actions, .hero .actions, .hero .cta');
   if(hero&&!hero.querySelector('a[href="#rr-visible-prices"]')){
     const style=hero.classList.contains('cta')?'btn secondary':hero.classList.contains('actions')?'btn alt':'btn btn-outline';
     hero.insertAdjacentHTML('beforeend','<a class="'+style+' rr-prices-hero" href="#rr-visible-prices">'+L('Se priser','See prices')+' ↘</a>');
   }
 }
}

function create(){
 const selected=catalog[chosenCategory];
 const categories=catKey==='hjem'?'<label class="rr-field rr-wide"><span>'+L('Velg tjenesteområde','Choose service category')+'</span><select id="rr-category" name="category">'+catOrder.map(k=>option(k,catalog[k][lang()],k===chosenCategory)).join('')+'</select></label>':'';
 const products=selected.items.map(p=>option(p.id,p[lang()]+(p.price?' · '+money(p.price)+(p.monthly?L(' / mnd',' / mo'):''):'')+(p.quote?'':p.from?L(' (fra-pris)',' (starting price)'):''),saved.product===p.id)).join('');
 const extraHtml=extras.filter(e=>!(chosenCategory==='synlighet'&&e.id==='google')).map(e=>'<label class="rr-extra"><input name="rr-extra" type="checkbox" value="'+e.id+'"'+(saved.extras.includes(e.id)?' checked':'')+'><span><strong>'+escaped(e[lang()])+'</strong><small>+ '+money(e.price)+'</small></span></label>').join('');
 root.innerHTML='<div class="rr-wrap"><span class="rr-badge">'+L('VELG · TILPASS · SEND','CHOOSE · CUSTOMIZE · ENQUIRE')+'</span>'+
 '<h2 class="rr-title" id="rr-title">'+L('Velg tjeneste og se pris','Choose a service and see a price')+'</h2>'+
 '<p class="rr-intro">'+L('Velg en tjeneste og se veiledende pris. Send en uforpliktende forespørsel – ingen betaling på denne siden. Endelig pris avtales skriftlig.','Choose a service and see an indicative price. Send a no-obligation enquiry – no payment is made on this page. We agree the final price in writing.')+'</p>'+
 '<div class="rr-payment-flow" aria-label="'+L('Slik fungerer bestilling og betaling','How enquiries and payments work')+'"><div><b>1</b><span>'+L('Send forespørsel','Send enquiry')+'</span></div><div><b>2</b><span>'+L('Avtal pris og omfang','Agree price and scope')+'</span></div><div><b>3</b><span>'+L('Motta Stripe-lenke','Receive Stripe link')+'</span></div><div><b>4</b><span>'+L('Betal sikkert','Pay securely')+'</span></div></div>'+ 
 '<div class="rr-grid"><form id="rr-form" class="rr-panel"><h3>'+L('Din bestilling – uten betalingsplikt','Your enquiry – no payment obligation')+'</h3><div class="rr-fields">'+categories+
 '<label class="rr-field rr-wide"><span>'+L('Tjeneste / pakke','Service / package')+'</span><select id="rr-product" name="service" required><option value="">'+L('Velg tjeneste','Choose a service')+'</option>'+products+'</select></label>'+
 '<label class="rr-field"><span>'+L('Navn','Name')+'</span><input id="rr-name" name="name" maxlength="120" autocomplete="name" required value="'+escaped(saved.name)+'" placeholder="'+L('Ditt navn','Your name')+'"></label>'+
 '<label class="rr-field"><span>'+L('Bedrift (valgfritt)','Company (optional)')+'</span><input id="rr-company" name="company" maxlength="120" autocomplete="organization" value="'+escaped(saved.company)+'" placeholder="'+L('Bedriftsnavn','Company name')+'"></label>'+
 '<label class="rr-field rr-wide"><span>'+L('E-postadresse','Email address')+'</span><input id="rr-email" name="email" type="email" required maxlength="200" autocomplete="email" value="'+escaped(saved.email)+'" placeholder="navn@bedrift.no"></label>'+
 '<label class="rr-field rr-wide"><span>'+L('Fortell om prosjektet (valgfritt)','Tell us about the project (optional)')+'</span><textarea id="rr-message" name="message" maxlength="5000" placeholder="'+L('Hva ønsker du å få laget?','What would you like us to create?')+'">'+escaped(saved.message)+'</textarea></label></div>'+
 '<details class="rr-extras"'+(saved.extras.length?' open':'')+'><summary>'+L('Valgfrie tillegg','Optional extras')+'</summary><p>'+L('Velg bare det du har behov for. Tillegg kan fjernes før innsending.','Select only what you need. Extras can be removed before you submit.')+'</p>'+extraHtml+'</details>'+
 '<p class="rr-privacy-note">'+L('Vi bruker opplysningene for å følge opp din forespørsel. Les vår ','We use your details to follow up on your enquiry. Read our ')+'<a href="personvern.html">'+L('personvernerklæring','privacy policy')+'</a>.</p><div id="rr-form-status" class="rr-status" role="status" aria-live="polite"></div></form>'+
 '<aside class="rr-summary" aria-live="polite"><h3>'+L('Oppsummering','Summary')+'</h3><div id="rr-summary-lines"></div><div class="rr-summary-total"><span>'+L('Veiledende sum','Indicative total')+'</span><strong id="rr-total">–</strong></div>'+
 '<small id="rr-summary-terms"></small><div class="rr-chip">'+L('Ingen betaling før skriftlig avtale','No payment before written agreement')+'</div>'+
 '<button class="rr-action" type="submit" form="rr-form">'+L('Gjennomgå forespørsel','Review enquiry')+' ↗</button>'+
 '<div class="rr-hint">'+L('Forespørselen sendes direkte fra nettstedet. Vi kontakter deg dersom vi trenger flere detaljer, og avtaler pris før eventuell betaling.','Your enquiry is submitted from this website. We will contact you if we need more details and agree the price before any payment.')+'</div><a class="rr-payment-info" href="betaling.html">'+L('Les om sikker betaling etter avtale ↗','Learn about secure payment after agreement ↗')+'</a></aside></div></div>'+
 '<dialog class="rr-dialog" id="rr-dialog" aria-labelledby="rr-review-title"><div class="rr-dialog-inner"><h3 id="rr-review-title">'+L('Kontroller forespørselen','Review your enquiry')+'</h3><p>'+L('Er opplysningene riktige? Du kan gå tilbake og endre før du sender forespørselen.','Are the details correct? You can go back and make changes before submitting your enquiry.')+'</p><div class="rr-review" id="rr-review-text"></div>'+
 '<p>'+L('Ved innsending sendes opplysningene via Web3Forms til oss. Dette er ikke betaling eller bindende kjøp.','When submitted, the information is forwarded to us via Web3Forms. This is not a payment or binding purchase.')+'</p>'+
 '<div class="rr-status" id="rr-dialog-status" role="status" aria-live="polite"></div><div class="rr-dialog-actions"><button type="button" class="rr-secondary" id="rr-edit">'+L('Gå tilbake','Go back')+'</button><button type="button" class="rr-action" id="rr-send">'+L('Send din forespørsel','Send your request')+'</button></div></div></dialog>';
const form=root.querySelector('#rr-form');
form.addEventListener('input',()=>{capture();summary()});
form.addEventListener('change',e=>{
 if(e.target.id==='rr-category'){capture();chosenCategory=e.target.value;saved.product='';create();return}
 capture();summary();
});
form.addEventListener('submit',e=>{e.preventDefault();capture();if(!form.reportValidity())return;if(!findProduct())return;
 const d=root.querySelector('#rr-dialog');root.querySelector('#rr-review-text').textContent=makeBody();d.showModal();
});
root.querySelector('#rr-edit').addEventListener('click',()=>root.querySelector('#rr-dialog').close());
root.querySelector('#rr-send').addEventListener('click',async()=>{
  const button=root.querySelector('#rr-send');
  const edit=root.querySelector('#rr-edit');
  const status=root.querySelector('#rr-dialog-status');
  if(button.disabled)return;
  status.className='rr-status';
  try {
    capture();
    const product=findProduct();
    if(!product || !saved.name.trim() || !saved.email.trim() || !form.reportValidity()){
      throw new Error('FORM_DATA_MISSING');
    }
    const completeMessage=makeBody();
    if(!completeMessage.trim() || !completeMessage.includes(saved.email.trim()) ||
       !completeMessage.includes(product[lang()])){
      throw new Error('ORDER_SUMMARY_MISSING');
    }
    const summaryData=lines();
    const fields={
      name:saved.name.trim(),
      email:saved.email.trim(),
      company:saved.company.trim()||L('Ikke oppgitt','Not provided'),
      service_category:catalog[chosenCategory][lang()],
      service_name:product[lang()],
      service_id:product.id,
      selected_extras:saved.extras.map(id=>extras.find(x=>x.id===id)).filter(Boolean).map(ex=>ex[lang()]+' +'+money(ex.price)).join(' | ')||L('Ingen','None'),
      indicative_total:product.quote?L('Pris etter avtale','Price by quotation'):(summaryData.variable?L('Fra ','From '):'')+money(summaryData.cost),
      customer_message:saved.message.trim()||L('Ingen ekstra kommentar','No additional notes'),
      message:completeMessage,
      subject:('Ramstad Reklame | '+saved.name.trim().slice(0,45)+' | '+product[lang()].slice(0,70)).slice(0,160)
    };
    button.disabled=true;edit.disabled=true;
    status.textContent=L('Sender forespørselen…','Sending your enquiry…');
    await window.RamstadWeb3Forms.send(fields);
    status.className='rr-status rr-success';
    status.textContent=L('Forespørselen er sendt!','Your enquiry was sent!');
    window.location.assign('takk.html?type=offer');
  }catch(err){
    console.error('Order delivery failed',err);
    status.className='rr-status rr-error';
    status.textContent=L('Forespørselen kunne ikke sendes. Prøv igjen eller kontakt post@ramstadreklame.no.','Your enquiry could not be sent. Please try again or email post@ramstadreklame.no.');
    button.disabled=false;edit.disabled=false;
  }
});
summary();
renderVisiblePrices();
}
function lines(){
 const prod=findProduct();let data=[];let cost=0;
 if(prod){data.push({label:prod[lang()]+(prod.monthly?L(' (per måned)',' (per month)'):''),price:prod.price,quote:!!prod.quote,from:!!prod.from});cost+=prod.price||0}
 for(let x of saved.extras){let ex=extras.find(e=>e.id===x);if(ex){data.push({label:ex[lang()],price:ex.price});cost+=ex.price}}
 return {prod,data,cost,variable:!!(prod&&(prod.quote||prod.from||prod.monthly))};
}
function summary(){
 const s=lines();const el=root.querySelector('#rr-summary-lines');
 el.innerHTML=s.data.length?s.data.map(x=>'<div class="rr-summary-line"><span>'+escaped(x.label)+'</span><strong>'+(x.quote?L('Etter avtale','By quotation'):(x.from?L('Fra ','From '):'')+money(x.price))+'</strong></div>').join(''):'<p style="color:#b9d6ec">'+L('Velg en tjeneste for å se prisen.','Choose a service to view the price.')+'</p>';
 root.querySelector('#rr-total').textContent=s.prod?(s.prod.quote?L('Avklares i tilbud','To be quoted'):(s.variable?L('Fra ','From '):'')+money(s.cost)):'–';
 root.querySelector('#rr-summary-terms').textContent=L('Veiledende priser i NOK. MVA tilkommer bare når virksomheten er MVA-registrert og avgiften er pålagt. Trykk, annonsebudsjett, domene og hosting er ikke inkludert med mindre annet er avtalt. Endelig omfang og sum bekreftes skriftlig.','Indicative NOK prices. VAT applies only when the business is VAT registered and the tax is due. Printing, ad spend, domain and hosting are excluded unless agreed otherwise. Final scope and total are confirmed in writing.')+(s.variable?L(' Valgt tjeneste krever særskilt avtale.',' Selected service requires a separate agreement.'):'');
}
function makeBody(){
 const s=lines();const fmt=x=>x.quote?L('Pris etter avtale','Price by quotation'):(x.from?L('Fra ','From '):'')+money(x.price);
 return [L('FORESPØRSEL – RAMSTAD REKLAME','ENQUIRY – RAMSTAD REKLAME'),
  L('Tjenesteområde','Category')+': '+catalog[chosenCategory][lang()],
  L('Valgte tjenester','Selected services')+':',
  ...s.data.map(x=>'- '+x.label+': '+fmt(x)),
  L('Veiledende sum','Indicative total')+': '+(s.prod?(s.prod.quote?L('Pris etter avtale','Price by quotation'):(s.variable?L('Fra ','From '):'')+money(s.cost)):'–'),
  L('MVA: legges til hvis aktuelt. Endelig pris avtales skriftlig.','VAT: added if applicable. Final price confirmed in writing.'),
  '',L('Navn','Name')+': '+saved.name,L('Bedrift','Company')+': '+saved.company,L('E-post','Email')+': '+saved.email,
  '',L('Prosjektbeskrivelse','Project details')+':',saved.message].join('\n');
}
create();
let oldLang=lang();new MutationObserver(()=>{const n=lang();if(n!==oldLang){capture();oldLang=n;create()}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();