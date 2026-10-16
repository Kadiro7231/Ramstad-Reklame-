/* Ramstad Reklame — optional Google Analytics 4, enabled only with consent. */
(function () {
  'use strict';
  const measurementId = 'G-0QTWKHY90V';
  const key = 'rr_analytics_consent_v1';
  const consentLifetime = 180 * 24 * 60 * 60 * 1000;
  let loaded = false;
  let banner = null;

  function english() {
    return document.documentElement.lang === 'en';
  }
  function tr(no, en) {
    return english() ? en : no;
  }
  function getConsent() {
    try {
      const item = JSON.parse(localStorage.getItem(key) || 'null');
      if (item && Date.now() < item.expires && (item.value === 'accepted' || item.value === 'rejected')) {
        return item.value;
      }
    } catch (e) {}
    return null;
  }
  function saveConsent(value) {
    try {
      localStorage.setItem(key, JSON.stringify({ value: value, expires: Date.now() + consentLifetime }));
    } catch (e) {}
  }
  function clearAnalyticsCookies() {
    const host = location.hostname;
    const domains = ['', host, '.' + host, 'ramstadreklame.no', '.ramstadreklame.no'];
    document.cookie.split(';').forEach(function (pair) {
      const name = pair.trim().split('=')[0];
      if (!/^_ga(?:_|$)/.test(name) && name !== '_gid') return;
      domains.forEach(function (domain) {
        document.cookie = name + '=; Max-Age=0; path=/; SameSite=Lax' + (domain ? '; domain=' + domain : '');
      });
    });
  }
  function loadAnalytics() {
    if (loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(measurementId);
    document.head.appendChild(tag);
  }
  function addStyles() {
    const style = document.createElement('style');
    style.textContent =
      '#rr-cookie-banner{position:fixed;bottom:14px;left:14px;right:14px;max-width:620px;margin:auto;z-index:10000;background:#fff;color:#10233c;border:1px solid #c7dff6;box-shadow:0 16px 55px #061a3566;border-radius:17px;padding:20px 22px;font-family:Inter,Arial,sans-serif;line-height:1.5}' +
      '#rr-cookie-banner h2{font-size:16px;margin:0 0 6px;color:#082d57;font-weight:800}' +
      '#rr-cookie-banner p{font-size:13px;line-height:1.55;margin:0 0 13px;color:#3f5570}' +
      '#rr-cookie-banner a{color:#096ad5;text-decoration:underline}' +
      '#rr-cookie-banner .rr-cookie-actions{display:flex;gap:10px;flex-wrap:wrap}' +
      '#rr-cookie-banner button{cursor:pointer;flex:1;min-width:130px;border-radius:9px;padding:11px 13px;font:700 13px Inter,Arial,sans-serif}' +
      '#rr-cookie-yes{background:#087cff;border:1px solid #087cff;color:#fff}' +
      '#rr-cookie-no{background:#fff;border:1px solid #8ba9c9;color:#183c62}' +
      '#rr-cookie-settings{border:0;background:none;color:inherit;font:inherit;font-size:12px;text-decoration:underline;cursor:pointer;padding:3px 6px;margin:5px 0;opacity:.85}' +
      '@media(max-width:480px){#rr-cookie-banner{padding:16px;bottom:8px;left:8px;right:8px}#rr-cookie-banner button{min-width:0}}';
    document.head.appendChild(style);
  }
  function closeBanner() {
    if (banner) banner.remove();
    banner = null;
  }
  function selectConsent(value) {
    const previous = getConsent();
    saveConsent(value);
    closeBanner();
    if (value === 'accepted') {
      loadAnalytics();
    } else {
      clearAnalyticsCookies();
      if (loaded || previous === 'accepted') location.reload();
    }
  }
  function showBanner() {
    if (banner) return;
    banner = document.createElement('section');
    banner.id = 'rr-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Valg av analyseinformasjonskapsler');
    banner.innerHTML = '<h2 id="rr-cookie-heading"></h2><p id="rr-cookie-description"></p><div class="rr-cookie-actions"><button type="button" id="rr-cookie-no"></button><button type="button" id="rr-cookie-yes"></button></div>';
    document.body.appendChild(banner);
    banner.querySelector('#rr-cookie-no').addEventListener('click', function () { selectConsent('rejected'); });
    banner.querySelector('#rr-cookie-yes').addEventListener('click', function () { selectConsent('accepted'); });
    translateBanner();
  }
  function translateBanner() {
    if (!banner) return;
    banner.setAttribute('aria-label', tr('Valg av analyseinformasjonskapsler', 'Analytics cookie choices'));
    banner.querySelector('#rr-cookie-heading').textContent = tr('Hjelp oss å forbedre nettstedet', 'Help us improve this website');
    const description = banner.querySelector('#rr-cookie-description');
    description.textContent = tr('Med ditt samtykke bruker vi Google Analytics til å telle besøk og forstå hvilke sider som brukes. Du kan si nei uten at nettstedet påvirkes. ', 'With your consent, we use Google Analytics to count visits and see which pages are used. You can decline without affecting the website. ');
    const link = document.createElement('a');
    link.href = 'personvern.html';
    link.textContent = tr('Les personvernerklæringen.', 'Read our privacy policy.');
    description.appendChild(link);
    banner.querySelector('#rr-cookie-no').textContent = tr('Avslå', 'Decline');
    banner.querySelector('#rr-cookie-yes').textContent = tr('Godta analyse', 'Accept analytics');
  }
  function addSettings() {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const button = document.createElement('button');
    button.id = 'rr-cookie-settings';
    button.type = 'button';
    button.addEventListener('click', showBanner);
    footer.appendChild(button);
    function setLabel() { button.textContent = tr('Informasjonskapsler', 'Cookie settings'); }
    setLabel();
    new MutationObserver(setLabel).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
  function init() {
    addStyles();
    addSettings();
    const choice = getConsent();
    if (choice === 'accepted') loadAnalytics();
    if (choice === null) showBanner();
    new MutationObserver(translateBanner).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
