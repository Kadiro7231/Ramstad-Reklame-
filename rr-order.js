/* Ramstad Reklame: quote builder with direct enquiry relay; payment remains after agreement */
(function(){
'use strict';
const catalog={
  nettsider:{no:'Nettsider',en:'Websites',items:[
    {id:'onepage',no:'Én-sides nettside',en:'One-page website',price:5900},
    {id:'businesssite',no:'Bedriftsnettside (inntil 6 sider)',en:'Business website (up to 6 pages)',price:12900},
    {id:'customsite',no:'Avansert nettside – fra',en:'Custom website – from',price:19900,from:true},
    {id:'webproject',no:'Annet nettsideprosjekt – pris etter avtale',en:'Other website project – by quotation',quote:true},
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
    {id:'designquote',no:'Annet design / trykk – pris etter avtale',en:'Other design / printing – by quotation',quote:true}
  ]},
  annonsering:{no:'Annonsering',en:'Advertising',items:[
    {id:'campaign',no:'Oppsett av én annonsekampanje',en:'Setup of one ad campaign',price:2490},
    {id:'mgmt',no:'Administrasjon av annonser – per måned',en:'Ads management – monthly',price:3490,monthly:true},
    {id:'startmonthly',no:'Synlighet Start – per måned',en:'Visibility Start – monthly',price:3990,monthly:true},
    {id:'plusmonthly',no:'Synlighet Plus – per måned',en:'Visibility Plus – monthly',price:7990,monthly:true},
    {id:'promonthly',no:'Synlighet Pro – per måned',en:'Visibility Pro – monthly',price:12990,monthly:true},
    {id:'adsquote',no:'Spesialkampanje – pris etter avtale',en:'Custom campaign – by quotation',quote:true}
  ]},
  innhold:{no:'Bilder og innhold',en:'Photos and content',items:[
    {id:'photo5',no:'Produktfotografering – 5 produkter',en:'Product photography – 5 products',price:3900},
    {id:'photo10',no:'Produktfotografering – 10 produkter',en:'Product photography – 10 products',price:6900},
    {id:'edit',no:'Redigering av kort video fra kundemateriale',en:'Edit a short customer-supplied video',price:1490},
    {id:'reel',no:'Opptak og produksjon av kort Reel',en:'Film and produce a short Reel',price:3900},
    {id:'filmquote',no:'Reklamefilm – pris etter avtale',en:'Commercial film – by quotation',quote:true}
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
const catOrder=['nettsider','design','annonsering','innhold','pakker'];
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
function create(){
 const selected=catalog[chosenCategory];
 const categories=catKey==='hjem'?'<label class="rr-field rr-wide"><span>'+L('Velg tjenesteområde','Choose service category')+'</span><select id="rr-category" name="category">'+catOrder.map(k=>option(k,catalog[k][lang()],k===chosenCategory)).join('')+'</select></label>':'';
 const products=selected.items.map(p=>option(p.id,p[lang()]+(p.price?' · '+money(p.price)+(p.monthly?L(' / mnd',' / mo'):''):'')+(p.quote?'':p.from?L(' (fra-pris)',' (starting price)'):''),saved.product===p.id)).join('');
 const extraHtml=extras.map(e=>'<label class="rr-extra"><input name="rr-extra" type="checkbox" value="'+e.id+'"'+(saved.extras.includes(e.id)?' checked':'')+'><span><strong>'+escaped(e[lang()])+'</strong><small>+ '+money(e.price)+'</small></span></label>').join('');
 root.innerHTML='<div class="rr-wrap"><span class="rr-badge">'+L('VELG · TILPASS · SEND','CHOOSE · CUSTOMIZE · ENQUIRE')+'</span>'+
 '<h2 class="rr-title" id="rr-title">'+L('Sett sammen din forespørsel','Build your enquiry')+'</h2>'+
 '<p class="rr-intro">'+L('Velg tjenesten du trenger, legg til valgfrie tillegg og send oss en forespørsel. Vi avtaler endelig pris og leveranse skriftlig før du får en personlig og sikker betalingslenke via Stripe. Du betaler ikke på denne siden.','Choose your service, add any extras and send us an enquiry. We agree on the final price and delivery in writing before sending you a personal secure Stripe payment link. You do not pay on this site.')+'</p>'+
 '<div class="rr-payment-flow" aria-label="'+L('Slik fungerer bestilling og betaling','How enquiries and payments work')+'"><div><b>1</b><span>'+L('Send forespørsel','Send enquiry')+'</span></div><div><b>2</b><span>'+L('Avtal pris og omfang','Agree price and scope')+'</span></div><div><b>3</b><span>'+L('Motta Stripe-lenke','Receive Stripe link')+'</span></div><div><b>4</b><span>'+L('Betal sikkert','Pay securely')+'</span></div></div>'+ 
 '<div class="rr-grid"><form id="rr-form" class="rr-panel"><h3>'+L('Din bestilling – uten betalingsplikt','Your enquiry – no payment obligation')+'</h3><div class="rr-fields">'+categories+
 '<label class="rr-field rr-wide"><span>'+L('Tjeneste / pakke','Service / package')+'</span><select id="rr-product" required><option value="">'+L('Velg tjeneste','Choose a service')+'</option>'+products+'</select></label>'+
 '<label class="rr-field"><span>'+L('Navn','Name')+'</span><input id="rr-name" name="name" maxlength="120" autocomplete="name" required value="'+escaped(saved.name)+'" placeholder="'+L('Ditt navn','Your name')+'"></label>'+
 '<label class="rr-field"><span>'+L('Bedrift (valgfritt)','Company (optional)')+'</span><input id="rr-company" name="company" maxlength="120" autocomplete="organization" value="'+escaped(saved.company)+'" placeholder="'+L('Bedriftsnavn','Company name')+'"></label>'+
 '<label class="rr-field rr-wide"><span>'+L('E-postadresse','Email address')+'</span><input id="rr-email" name="email" type="email" required maxlength="200" autocomplete="email" value="'+escaped(saved.email)+'" placeholder="navn@bedrift.no"></label>'+
 '<label class="rr-field rr-wide"><span>'+L('Fortell om prosjektet (valgfritt)','Tell us about the project (optional)')+'</span><textarea id="rr-message" name="message" maxlength="5000" placeholder="'+L('Hva ønsker du å få laget?','What would you like us to create?')+'">'+escaped(saved.message)+'</textarea></label></div>'+
 '<div class="rr-extras"><h3>'+L('Valgfrie tillegg','Optional extras')+'</h3><p>'+L('Velg bare det du har behov for. Tillegg kan fjernes før innsending.','Select only what you need. Extras can be removed before you submit.')+'</p>'+extraHtml+'</div>'+
 '<p class="rr-privacy-note">'+L('Vi bruker opplysningene for å følge opp din forespørsel. Les vår ','We use your details to follow up on your enquiry. Read our ')+'<a href="personvern.html">'+L('personvernerklæring','privacy policy')+'</a>.</p><div id="rr-form-status" class="rr-status" role="status" aria-live="polite"></div></form>'+
 '<aside class="rr-summary" aria-live="polite"><h3>'+L('Oppsummering','Summary')+'</h3><div id="rr-summary-lines"></div><div class="rr-summary-total"><span>'+L('Veiledende sum','Indicative total')+'</span><strong id="rr-total">–</strong></div>'+
 '<small id="rr-summary-terms"></small><div class="rr-chip">'+L('Ingen betaling før skriftlig avtale','No payment before written agreement')+'</div>'+
 '<button class="rr-action" type="submit" form="rr-form">'+L('Gjennomgå forespørsel','Review enquiry')+' ↗</button>'+
 '<div class="rr-hint">'+L('Forespørselen sendes direkte fra nettstedet. Vi kontakter deg dersom vi trenger flere detaljer, og avtaler pris før eventuell betaling.','Your enquiry is submitted from this website. We will contact you if we need more details and agree the price before any payment.')+'</div><a class="rr-payment-info" href="betaling.html">'+L('Les om sikker betaling etter avtale ↗','Learn about secure payment after agreement ↗')+'</a></aside></div></div>'+
 '<dialog class="rr-dialog" id="rr-dialog" aria-labelledby="rr-review-title"><div class="rr-dialog-inner"><h3 id="rr-review-title">'+L('Kontroller forespørselen','Review your enquiry')+'</h3><p>'+L('Er opplysningene riktige? Du kan gå tilbake og endre før du sender forespørselen.','Are the details correct? You can go back and make changes before submitting your enquiry.')+'</p><div class="rr-review" id="rr-review-text"></div>'+
 '<p>'+L('Ved innsending sendes opplysningene via FormSubmit.co til oss. Dette er ikke betaling eller bindende kjøp.','When submitted, the information is forwarded to us via FormSubmit.co. This is not a payment or binding purchase.')+'</p>'+
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
  button.disabled=true;edit.disabled=true;
  status.className='rr-status';
  status.textContent=L('Sender forespørselen…','Sending your enquiry…');
  try{
    // Native HTML form POST lets FormSubmit receive the order as standard form fields.
    const submission=document.createElement('form');
    submission.method='POST';
    submission.action='https://formsubmit.co/post@ramstadreklame.no';
    submission.acceptCharset='UTF-8';
    submission.style.display='none';
    const fields={
      _subject:'Ramstad Reklame – '+L('Forespørsel','Enquiry')+' – '+findProduct()[lang()],
      _replyto:saved.email.trim(),
      _template:'basic',
      name:saved.name.trim(),
      company:saved.company.trim()||'–',
      email:saved.email.trim(),
      category:catalog[chosenCategory][lang()],
      service:findProduct()[lang()],
      message:makeBody()
    };
    Object.entries(fields).forEach(([key,value])=>{
      const input=document.createElement('input');
      input.type='hidden';
      input.name=key;
      input.value=String(value);
      submission.appendChild(input);
    });
    document.body.appendChild(submission);
    // The browser navigates to FormSubmit's own confirmation/CAPTCHA page.
    submission.submit();
  }catch(err){
    status.className='rr-status rr-error';
    status.textContent=L('Forespørselen kunne ikke sendes. Prøv igjen eller skriv til post@ramstadreklame.no.','The enquiry could not be submitted. Please retry or email post@ramstadreklame.no.');
    button.disabled=false;edit.disabled=false;
  }
});
summary();
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