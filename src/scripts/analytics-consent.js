// Basic Consent Mode: do not contact GTM until analytics consent is granted.
const containerId = 'GTM-N7SFFV89';
const storageKey = 'perunica.analyticsConsent.v1';
const maxAge = 180 * 24 * 60 * 60 * 1000;
let loaded = false;
let choice = null;

window.dataLayer = window.dataLayer || [];
window.gtag = window.gtag || function () {
  window.dataLayer.push(arguments);
};
window.gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});

try {
  const saved = JSON.parse(window.localStorage.getItem(storageKey));
  if (saved && (saved.value === 'granted' || saved.value === 'denied') &&
      saved.savedAt <= Date.now() && Date.now() - saved.savedAt < maxAge) {
    choice = saved.value;
  }
} catch (error) {
  // Unavailable storage means we ask again, without enabling analytics.
}

function loadAnalytics() {
  if (loaded) return;
  loaded = true;
  window.gtag('consent', 'update', { analytics_storage: 'granted' });
  window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtm.js?id=' + containerId;
  document.head.appendChild(script);
}

function saveChoice(value) {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify({ value, savedAt: Date.now() }));
    return true;
  } catch (error) {
    // Never reload into a previously saved grant after a failed withdrawal.
    try {
      window.localStorage.removeItem(storageKey);
      return true;
    } catch (removeError) {
      return false;
    }
  }
}

function clearAnalyticsCookies() {
  const domains = window.location.hostname.split('.');
  const paths = window.location.pathname.split('/');
  document.cookie.split(';').forEach(cookie => {
    const name = cookie.split('=')[0].trim();
    if (!/^(_ga($|_)|_gid$|_gat($|_))/.test(name)) return;
    // Remove GA cookies for the current host and parent domains/paths.
    for (let pathIndex = 1; pathIndex <= paths.length; pathIndex += 1) {
      const path = paths.slice(0, pathIndex).join('/') || '/';
      const expired = name + '=; Max-Age=0; path=' + path;
      document.cookie = expired;
      for (let domainIndex = 0; domainIndex < domains.length - 1; domainIndex += 1) {
        document.cookie = expired + '; domain=' + domains.slice(domainIndex).join('.');
      }
    }
  });
}

function setupConsent() {
  const banner = document.createElement('section');
  banner.id = 'cookie-banner';
  banner.setAttribute('aria-label', 'Zgoda na analitykę');
  banner.innerHTML = '<p id="cookie-description">Za Twoją zgodą korzystamy z Google Analytics przez Google Tag Manager, aby mierzyć odwiedziny i zdarzenia na stronie. Możesz odmówić lub później wycofać zgodę w ustawieniach analityki. '
    + '<a target="_blank" rel="noopener noreferrer" href="https://docs.google.com/document/d/1aShXTdfV-lcXDtMd0T40C84NwSKvymOcUyF1CcT01VA/edit?usp=sharing">Polityka prywatności</a>.</p>'
    + '<button type="button" id="cookie-accept">Zgadzam się na analitykę</button> '
    + '<button type="button" id="cookie-reject">Odrzucam / wycofuję zgodę</button>'
    + '<button type="button" id="cookie-close">Zamknij</button>'
    + '<p id="cookie-error" role="alert" hidden>Nie udało się zapisać wyboru. Zezwól na dostęp do pamięci strony i spróbuj ponownie.</p>';
  banner.hidden = choice !== null;
  document.body.appendChild(banner);

  const settings = document.createElement('button');
  settings.type = 'button';
  settings.id = 'analytics-settings';
  settings.textContent = 'Ustawienia analityki';
  settings.setAttribute('aria-controls', 'cookie-banner');
  settings.setAttribute('aria-expanded', String(!banner.hidden));
  document.body.appendChild(settings);

  const accept = document.getElementById('cookie-accept');
  const reject = document.getElementById('cookie-reject');
  const close = document.getElementById('cookie-close');
  close.hidden = choice === null;

  function hideBanner() {
    banner.hidden = true;
    settings.setAttribute('aria-expanded', 'false');
    settings.focus();
  }

  settings.addEventListener('click', () => {
    banner.hidden = false;
    close.hidden = choice === null;
    settings.setAttribute('aria-expanded', 'true');
    accept.focus();
  });
  close.addEventListener('click', hideBanner);
  accept.addEventListener('click', () => {
    saveChoice('granted');
    choice = 'granted';
    hideBanner();
    loadAnalytics();
  });
  reject.addEventListener('click', () => {
    if (!saveChoice('denied') && loaded) {
      document.getElementById('cookie-error').hidden = false;
      return;
    }
    choice = 'denied';
    clearAnalyticsCookies();
    // Reload also stops tags already running inside the container.
    if (loaded) window.location.reload();
    else hideBanner();
  });

  // Synchronize a changed/withdrawn choice across open tabs.
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) window.location.reload();
  });
  if (choice === 'granted') loadAnalytics();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupConsent, { once: true });
} else {
  setupConsent();
}
