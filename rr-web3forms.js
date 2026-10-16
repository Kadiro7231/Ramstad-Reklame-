/* One transport for all Ramstad Reklame contact and quote forms. */
(function(){
  'use strict';
  const endpoint='https://api.web3forms.com/submit';
  function isConfigured(){
    const key=window.RAMSTAD_WEB3FORMS_ACCESS_KEY;
    return typeof key==='string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(key.trim());
  }
  async function send(fields){
    if(!isConfigured()) throw new Error('WEB3FORMS_NOT_CONFIGURED');
    if(!fields || !String(fields.name||'').trim() || !String(fields.email||'').trim() || !String(fields.message||'').trim()){
      throw new Error('FORM_DATA_MISSING');
    }
    const payload={...fields,access_key:window.RAMSTAD_WEB3FORMS_ACCESS_KEY.trim(),from_name:'Ramstad Reklame'};
    const response=await fetch(endpoint,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify(payload)
    });
    const result=await response.json();
    if(!response.ok || !result || result.success!==true){
      throw new Error('WEB3FORMS_REJECTED: '+(result && result.message || response.status));
    }
    return result;
  }
  window.RamstadWeb3Forms={send,isConfigured};
})();
