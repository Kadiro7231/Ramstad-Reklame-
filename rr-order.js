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

/* Clear, bilingual explanations for every selectable service. */
const serviceInfo={
 "onepage":{no:["En profesjonell nettside med alt det viktigste på én side.","Mobiltilpasset design og presentasjon av bedriften.","Kontaktseksjon med tydelige knapper.","Domene, hosting og vedlikehold avtales separat."],en:["A professional website with everything essential on one page.","Mobile-friendly design and business presentation.","Contact section with clear action buttons.","Domain, hosting and maintenance are agreed separately."]},
 "businesssite":{no:["En komplett bedriftspresentasjon med opptil seks nettsider.","Struktur for forside, tjenester, om oss og kontakt.","Mobilvennlig design og tydelig navigasjon.","Tekster, spesialfunksjoner, domene og hosting avtales separat."],en:["A business website with up to six pages.","Structure for home, services, about and contact pages.","Mobile-friendly design and clear navigation.","Copywriting, special features, domain and hosting are agreed separately."]},
 "customsite":{no:["Skreddersydd nettside til spesielle behov.","Vi planlegger struktur og ønskede funksjoner sammen.","Design og leveranser avklares i et tilbud.","Dette er en fra-pris; endelig omfang prises separat."],en:["A custom website for individual needs.","We plan the structure and desired features together.","Design and deliverables are specified in a quote.","Starting price only; final scope is quoted separately."]},
 "webproject":{no:["For andre typer nettsideprosjekter.","Vi kartlegger behov og foreslår en løsning.","Oppgaver og leveranser avtales før oppstart.","Dette er en fra-pris; omfanget bestemmer prisen."],en:["For other types of website projects.","We discuss your needs and propose a solution.","Tasks and deliverables are agreed before work starts.","Starting price; scope determines the final price."]},
 "webcare":{no:["Månedlig oppfølging av en eksisterende nettside.","Vedlikeholdsoppgaver etter avtalt plan.","Mindre oppdateringer innenfor avtalt omfang.","Oppgaver, responstid og tredjepartskostnader avklares i avtalen."],en:["Monthly support for an existing website.","Maintenance tasks under the agreed plan.","Minor updates within the agreed scope.","Tasks, response times and third-party fees are defined in the agreement."]},
 "social":{no:["Et visuelt innlegg til bedriftens sosiale medier.","Design etter merkevare og budskap.","En publiseringsklar fil i avtalt format.","Publisering og flere varianter er ikke automatisk inkludert."],en:["One visual post for your business social media.","Design based on your brand and message.","One ready-to-publish file in the agreed format.","Publishing and extra versions are not automatically included."]},
 "adgraphic":{no:["Et annonsebilde for Facebook eller Instagram.","Design med et tydelig budskap.","Annonsegrafikk i avtalt format.","Kampanjeoppsett og annonsebudsjett kommer i tillegg."],en:["An ad creative for Facebook or Instagram.","Design with a clear message.","Ad graphic in the agreed format.","Campaign setup and ad spend are separate."]},
 "logo":{no:["Et logodesign tilpasset bedriften din.","Vi avklarer stil og visuell retning.","Logofiler i formater vi avtaler.","Antall forslag og revisjoner spesifiseres i tilbudet."],en:["A logo design tailored to your business.","We agree on style and visual direction.","Logo files in agreed formats.","Number of concepts and revisions is specified in the quote."]},
 "card":{no:["Design av visittkort til din bedrift.","Layout for kontaktinformasjon og profil.","Trykklar fil etter avtalte spesifikasjoner.","Fysisk trykking er ikke inkludert."],en:["Business card design for your company.","Layout for contact details and branding.","Print-ready file to agreed specifications.","Physical printing is not included."]},
 "flyer1":{no:["Design av en A5-flyer med én side.","Tydelig layout og budskap.","Trykklar designfil.","Trykking og distribusjon prises separat."],en:["Design of a single-sided A5 flyer.","Clear layout and message.","Print-ready design file.","Printing and distribution are priced separately."]},
 "flyer2":{no:["Design av en dobbeltsidig A5-flyer.","Layout for forside og bakside.","Trykklar designfil.","Trykking og distribusjon prises separat."],en:["Design of a double-sided A5 flyer.","Front and back layout.","Print-ready design file.","Printing and distribution are priced separately."]},
 "brochure":{no:["Design av en brosjyre på 2–4 sider.","Oppsett av bilder, tekst og budskap.","Trykklar fil i avtalt format.","Trykk og produksjon betales separat."],en:["Design of a 2–4 page brochure.","Layout for images, copy and message.","Print-ready file in the agreed format.","Printing and production are separate."]},
 "poster":{no:["Design av plakat eller banner.","Tydelig budskap tilpasset brukssted.","Ferdig designfil i avtalt størrelse.","Trykking og eventuell plassering er ikke inkludert."],en:["Poster or banner design.","Clear message for the intended placement.","Finished design file at the agreed size.","Printing and placement are not included."]},
 "designquote":{no:["For grafiske oppdrag utenfor standardprislisten.","Vi avklarer hva du vil lage.","Du får forslag til format og leveranse.","Fra-pris; trykk og spesielle behov prises etter avtale."],en:["For design work outside our standard list.","We clarify what you would like created.","You receive a proposed format and deliverables.","Starting price; printing and special needs are quoted separately."]},
 "campaign":{no:["Oppsett av én digital annonsekampanje.","Plan for målgruppe og annonseoppsett.","Klargjøring av kampanjen i avtalt kanal.","Annonsebudsjett, innholdsproduksjon og videre drift avtales separat."],en:["Setup of one digital advertising campaign.","Audience planning and campaign configuration.","Preparing the campaign in the agreed channel.","Ad spend, creative production and ongoing management are separate."]},
 "mgmt":{no:["Månedlig administrasjon av annonser.","Oppfølging og justeringer etter avtalt plan.","Oversikt over kampanjens resultater.","Annonsebudsjett og omfanget av administrasjon avtales separat."],en:["Monthly advertising management.","Monitoring and adjustments under the agreed plan.","Overview of campaign performance.","Ad spend and management scope are agreed separately."]},
 "startmonthly":{no:["En månedlig startpakke for synlighet.","Vi velger relevante tiltak ut fra bedriftens mål.","Aktiviteter og oppfølging avtales på forhånd.","Kanaler, leveranser og annonsebudsjett fastsettes i tilbudet."],en:["A monthly starter package for visibility.","We choose relevant actions based on your goals.","Activities and follow-up are agreed in advance.","Channels, deliverables and ad budget are specified in the quote."]},
 "plusmonthly":{no:["En utvidet månedlig pakke for synlighet.","Planlegging og oppfølging av avtalte markedsføringstiltak.","Tydelig oversikt over hvilke aktiviteter vi leverer.","Kanaler, volum og annonsebudsjett fastsettes i tilbudet."],en:["An expanded monthly visibility package.","Planning and follow-up of agreed marketing activities.","Clear overview of delivered activities.","Channels, volume and ad spend are specified in the quote."]},
 "promonthly":{no:["En omfattende månedlig pakke for markedsføring.","Vi planlegger en løsning rundt bedriftens behov.","Omfang og oppfølging beskrives skriftlig.","Leveranser, kanaler og annonsebudsjett avklares i tilbudet."],en:["A comprehensive monthly marketing package.","We plan a solution around your business needs.","Scope and follow-up are described in writing.","Deliverables, channels and ad spend are specified in the quote."]},
 "adsquote":{no:["En spesialtilpasset reklamekampanje.","Vi kartlegger målgruppe, budskap og kanaler.","Du får forslag til gjennomføring og leveranser.","Fra-pris; annonseplass og mediebudsjett kommer eventuelt i tillegg."],en:["A tailored advertising campaign.","We clarify audience, message and channels.","You receive a proposed plan and deliverables.","Starting price; media placement and spend may be additional."]},
 "googleai":{no:["Tiltak som gjør informasjon om bedriften lettere å finne på nett.","Vi vurderer nettstedets struktur og søkevennlig innhold.","Vi foreslår forbedringer for søkemotorer og AI-søk.","Synlighet og plassering kan ikke garanteres; omfanget avtales i tilbudet."],en:["Improvements to help people find your business online.","We review your website structure and search-friendly content.","We propose enhancements for search engines and AI search.","Visibility and rankings cannot be guaranteed; scope is quoted."]},
 "googleprofile":{no:["Hjelp med bedriftens Google-profil.","Oppsett eller forbedring av relevant profilinformasjon.","Gjennomgang av kategorier, bilder og kontaktdata.","Opprettelse og verifisering avhenger av Googles vilkår."],en:["Help with your Google Business Profile.","Setup or improvement of relevant profile information.","Review of categories, images and contact details.","Creation and verification depend on Google's requirements."]},
 "local-seo":{no:["Tiltak for bedre lokal synlighet i søk.","Gjennomgang av relevante søkeord og sidetekster.","Forslag til lokalt relevant innhold og forbedringer.","Fra-pris; søkeplasseringer garanteres ikke."],en:["Measures to improve local search visibility.","Review of relevant keywords and page copy.","Suggestions for locally relevant content and improvements.","Starting price; search rankings are not guaranteed."]},
 "photo5":{no:["Produktfotografering av fem produkter.","Plan for bildeuttrykk og avtalt bakgrunn.","Utvalgte ferdig redigerte bilder etter avtale.","Antall sluttbilder, lokasjon og eventuell frakt avtales på forhånd."],en:["Product photography for five products.","Planning of visual style and agreed backdrop.","Selected edited photos as agreed.","Final image count, location and shipping are agreed in advance."]},
 "photo10":{no:["Produktfotografering av ti produkter.","Plan for bildeuttrykk og avtalt bakgrunn.","Utvalgte ferdig redigerte bilder etter avtale.","Antall sluttbilder, lokasjon og eventuell frakt avtales på forhånd."],en:["Product photography for ten products.","Planning of visual style and agreed backdrop.","Selected edited photos as agreed.","Final image count, location and shipping are agreed in advance."]},
 "edit":{no:["En kort video redigert fra materiale du allerede har.","Klipping og enkel tilpasning til avtalt format.","En ferdig videofil etter avtale.","Opptak og mer omfattende effekter er ikke inkludert."],en:["A short video edited from footage you provide.","Cutting and basic adaptation to the agreed format.","One finished video file as agreed.","Filming and complex effects are not included."]},
 "reel":{no:["Opptak og produksjon av en kort Reel.","En enkel plan for innhold og opptak.","Redigert video i avtalt format.","Varighet, lokasjon og eventuelle tillegg avtales før oppstart."],en:["Filming and production of one short Reel.","Basic content and filming plan.","Edited video in the agreed format.","Length, location and extras are agreed before work starts."]},
 "filmquote":{no:["Produksjon av reklamevideo til bedriften.","Vi avklarer konsept, opptak og ønsket bruk.","Forslag til produksjonsplan og sluttprodukt.","Dette er en fra-pris; omfang, opptaksdager og rettigheter avtales separat."],en:["Production of a commercial video for your business.","We clarify the concept, filming and intended use.","Proposed production plan and finished result.","Starting price; scope, filming days and rights are agreed separately."]},
 "startpakke":{no:["En enkel start for bedriftens visuelle profil.","Vi finner en passende kombinasjon av grunnleggende designbehov.","Innhold og antall leveranser avklares i tilbudet.","Pakkenes konkrete innhold bekreftes før bestilling."],en:["A simple start for your business visual identity.","We agree on a suitable mix of basic design needs.","Content and number of deliverables are defined in the quote.","Exact package contents are confirmed before ordering."]},
 "webpakke":{no:["En samlet pakke for bedriftens tilstedeværelse på nett.","Vi avklarer hvilke nettside- og designelementer du trenger.","Du får en tydelig leveransebeskrivelse før oppstart.","Antall sider, funksjoner, domene og hosting bekreftes i tilbudet."],en:["A combined package for your business online presence.","We clarify which website and design elements you need.","You get a clear scope of deliverables before work starts.","Pages, features, domain and hosting are confirmed in the quote."]},
 "vekst":{no:["En pakke for bedrifter som ønsker å utvikle markedsføringen.","Vi prioriterer tjenester ut fra mål og behov.","Du får skriftlig oversikt over leveransene.","Annonsebudsjett, kanaler og tidsperiode avklares separat."],en:["A package for businesses looking to grow their marketing.","We prioritize services based on goals and needs.","You receive a written overview of deliverables.","Ad spend, channels and time period are agreed separately."]}
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

function create(){
 const selected=catalog[chosenCategory];
 const categories=catKey==='hjem'?'<label class="rr-field rr-wide"><span>'+L('Velg tjenesteområde','Choose service category')+'</span><select id="rr-category" name="category">'+catOrder.map(k=>option(k,catalog[k][lang()],k===chosenCategory)).join('')+'</select></label>':'';
  const products=selected.items.map(p=>option(p.id,p[lang()],saved.product===p.id)).join('');
 const extraHtml=extras.filter(e=>!(chosenCategory==='synlighet'&&e.id==='google')).map(e=>'<label class="rr-extra"><input name="rr-extra" type="checkbox" value="'+e.id+'"'+(saved.extras.includes(e.id)?' checked':'')+'><span><strong>'+escaped(e[lang()])+'</strong><small>+ '+money(e.price)+'</small></span></label>').join('');
 root.innerHTML='<div class="rr-wrap"><span class="rr-badge">'+L('VELG · TILPASS · SEND','CHOOSE · CUSTOMIZE · ENQUIRE')+'</span>'+
 '<h2 class="rr-title" id="rr-title">'+L('Velg tjeneste og se pris','Choose a service and see the price')+'</h2>'+
 '<p class="rr-intro">'+L('Velg en tjeneste og se veiledende pris. Send en uforpliktende forespørsel – ingen betaling på denne siden. Endelig pris avtales skriftlig.','Choose a service and see an indicative price. Send a no-obligation enquiry – no payment is made on this page. We agree the final price in writing.')+'</p>'+
 '<div class="rr-payment-flow" aria-label="'+L('Slik fungerer bestilling og betaling','How enquiries and payments work')+'"><div><b>1</b><span>'+L('Send forespørsel','Send enquiry')+'</span></div><div><b>2</b><span>'+L('Avtal pris og omfang','Agree price and scope')+'</span></div><div><b>3</b><span>'+L('Motta Stripe-lenke','Receive Stripe link')+'</span></div><div><b>4</b><span>'+L('Betal sikkert','Pay securely')+'</span></div></div>'+ 
 '<div class="rr-grid"><form id="rr-form" class="rr-panel"><h3>'+L('Din forespørsel – ingen betaling','Your enquiry – no payment')+'</h3><div class="rr-fields">'+categories+
 '<label class="rr-field rr-wide"><span>'+L('Tjeneste / pakke','Service / package')+'</span><select id="rr-product" name="service" required><option value="">'+L('Velg tjeneste','Choose a service')+'</option>'+products+'</select></label>'+
 '<div class="rr-service-info rr-wide" id="rr-service-info" hidden aria-live="polite"></div>'+ 
 '<div class="rr-no-payment rr-wide"><strong>✓ '+L('Ingen betaling nå','No payment now')+'</strong><span>'+L('Dette er kun en gratis og uforpliktende forespørsel. Vi sender et skriftlig tilbud først. Du betaler bare hvis du godkjenner tilbudet.','This is only a free, no-obligation enquiry. We send a written quote first. You only pay if you accept the quote.')+'</span></div>'+
  '<div class="rr-mobile-price" id="rr-mobile-price" aria-live="polite"><span>'+L('Veiledende pris','Indicative price')+'</span><strong id="rr-mobile-price-amount">'+L('Velg tjeneste','Choose a service')+'</strong></div>'+
 '<label class="rr-field"><span>'+L('Navn','Name')+'</span><input id="rr-name" name="name" maxlength="120" autocomplete="name" required value="'+escaped(saved.name)+'" placeholder="'+L('Ditt navn','Your name')+'"></label>'+
 '<label class="rr-field"><span>'+L('Bedrift (valgfritt)','Company (optional)')+'</span><input id="rr-company" name="company" maxlength="120" autocomplete="organization" value="'+escaped(saved.company)+'" placeholder="'+L('Bedriftsnavn','Company name')+'"></label>'+
 '<label class="rr-field rr-wide"><span>'+L('E-postadresse','Email address')+'</span><input id="rr-email" name="email" type="email" required maxlength="200" autocomplete="email" value="'+escaped(saved.email)+'" placeholder="navn@bedrift.no"></label>'+
 '<label class="rr-field rr-wide"><span>'+L('Fortell om prosjektet (valgfritt)','Tell us about the project (optional)')+'</span><textarea id="rr-message" name="message" maxlength="5000" placeholder="'+L('Hva ønsker du å få laget?','What would you like us to create?')+'">'+escaped(saved.message)+'</textarea></label></div>'+
  '<details class="rr-extras"'+(saved.extras.length?' open':'')+'><summary><span class="rr-extras-plus" aria-hidden="true">＋</span><span class="rr-extras-label"><strong>'+L('Valgfrie tillegg','Optional extras')+'</strong><small>'+L('Trykk her for å se og velge ekstra tjenester','Tap here to see and choose extra services')+'</small></span><span id="rr-extras-count" class="rr-extras-count" hidden></span><span class="rr-extras-chevron" aria-hidden="true">⌄</span></summary><p>'+L('Velg bare det du har behov for. Tillegg kan fjernes før innsending.','Select only what you need. Extras can be removed before you submit.')+'</p>'+extraHtml+'</details>'+
 '<p class="rr-privacy-note">'+L('Vi bruker opplysningene for å følge opp din forespørsel. Les vår ','We use your details to follow up on your enquiry. Read our ')+'<a href="personvern.html">'+L('personvernerklæring','privacy policy')+'</a>.</p><div id="rr-form-status" class="rr-status" role="status" aria-live="polite"></div></form>'+
 '<aside class="rr-summary" aria-live="polite"><h3>'+L('Oppsummering','Summary')+'</h3><div id="rr-summary-lines"></div><div class="rr-summary-total"><span>'+L('Veiledende sum','Indicative total')+'</span><strong id="rr-total">–</strong></div>'+
 '<small id="rr-summary-terms"></small><div class="rr-chip">'+L('Ingen betaling før skriftlig avtale','No payment before written agreement')+'</div>'+
 '<button class="rr-action" type="submit" form="rr-form">'+L('Gjennomgå forespørsel','Review enquiry')+' ↗</button>'+
 '<div class="rr-hint">'+L('Forespørselen sendes direkte fra nettstedet. Vi kontakter deg dersom vi trenger flere detaljer, og avtaler pris før eventuell betaling.','Your enquiry is submitted from this website. We will contact you if we need more details and agree the price before any payment.')+'</div><a class="rr-payment-info" style="display:inline-block;margin:12px 0;color:#f1f7ff;text-decoration:underline" href="mailto:adrian.ramstad1@gmail.com?subject=Ramstad%20Reklame%20-%20Foresporsel">'+L('Alternativ: Kontakt oss direkte på e-post ↗','Alternative: Email us directly ↗')+'</a><a class="rr-payment-info" href="betaling.html">'+L('Les om sikker betaling etter avtale ↗','Learn about secure payment after agreement ↗')+'</a></aside></div></div>'+
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
    status.innerHTML=L('Forespørselen kunne ikke sendes. <a href="mailto:adrian.ramstad1@gmail.com">Send oss en e-post direkte</a>.','Your enquiry could not be sent. <a href="mailto:adrian.ramstad1@gmail.com">Email us directly</a>.');
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
function updateServiceInfo(product){
 const box=root.querySelector('#rr-service-info');
 if(!box)return;
 const info=product&&serviceInfo[product.id]&&serviceInfo[product.id][lang()];
 if(!info){box.hidden=true;box.innerHTML='';return;}
 box.hidden=false;
 box.innerHTML='<div class="rr-info-heading">'+L('Hva får du med denne tjenesten?','What do you get with this service?')+'</div>'+
 '<p>'+escaped(info[0])+'</p><ul><li>'+escaped(info[1])+'</li><li>'+escaped(info[2])+'</li></ul>'+
 '<div class="rr-info-note"><strong>'+L('Viktig å vite:','Good to know:')+'</strong> '+escaped(info[3])+'</div>';
}
function summary(){
 const s=lines();
 updateServiceInfo(s.prod);const el=root.querySelector('#rr-summary-lines');
 el.innerHTML=s.data.length?s.data.map(x=>'<div class="rr-summary-line"><span>'+escaped(x.label)+'</span><strong>'+(x.quote?L('Etter avtale','By quotation'):(x.from?L('Fra ','From '):'')+money(x.price))+'</strong></div>').join(''):'<p style="color:#b9d6ec">'+L('Velg en tjeneste for å se prisen.','Choose a service to view the price.')+'</p>';
  const totalText=s.prod?(s.prod.quote?L('Avklares i tilbud','To be quoted'):(s.variable?L('Fra ','From '):'')+money(s.cost)):'–';
  root.querySelector('#rr-total').textContent=totalText;
  const mobilePrice=root.querySelector('#rr-mobile-price-amount');
  if(mobilePrice)mobilePrice.textContent=s.prod?totalText:L('Velg tjeneste','Choose a service');
  const extrasCount=root.querySelector('#rr-extras-count');
  if(extrasCount){extrasCount.hidden=saved.extras.length===0;extrasCount.textContent=saved.extras.length+' '+L('valgt','selected');}
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