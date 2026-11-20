import contrastWhite from '../images/content/high-contrast-white.png';
import textWhite from '../images/content/text-size-white.png';
import lineWhite from '../images/content/line4-c.png';
import facebookWhite from '../images/content/logo-fb-simple-white.png';
import instagramWhite from '../images/content/logo-instagram-white.png';

const body = document.body;
const contrastButton = document.getElementById('contrast-btn');
const textButton = document.getElementById('text-img');

if (contrastButton) {
  const mobile = window.matchMedia('(max-width: 766px)');
  const icons = [
    ['contrast-img', contrastWhite, true],
    ['text-img', textWhite, true],
    ['linia', lineWhite],
    ['linia1', lineWhite],
    ['linia2', lineWhite],
    ['fb-img', facebookWhite, true],
    ['ig-img', instagramWhite, true],
    ['fb-gold', facebookWhite],
    ['ig-gold', instagramWhite]
  ].map(([id, white, onMobile]) => {
    const element = document.getElementById(id);
    return element && { element, white, onMobile, original: element.src };
  }).filter(Boolean);

  function updateContrast(enabled) {
    body.classList.toggle('high-contrast', enabled);
    contrastButton.setAttribute('aria-pressed', String(enabled));

    for (const { element, white, onMobile, original } of icons) {
      const next = enabled || (onMobile && mobile.matches) ? white : original;
      if (element.getAttribute('src') !== next && element.src !== next) {
        element.src = next;
      }
    }
  }

  updateContrast(localStorage.getItem('highContrast') === 'true');
  contrastButton.addEventListener('click', event => {
    event.preventDefault();
    const enabled = !body.classList.contains('high-contrast');
    updateContrast(enabled);
    localStorage.setItem('highContrast', String(enabled));
  });
  mobile.addEventListener('change', () => updateContrast(body.classList.contains('high-contrast')));
}

if (textButton) {
  let enlarged = false;
  textButton.closest('a').addEventListener('click', event => {
    event.preventDefault();
    enlarged = !enlarged;
    document.querySelectorAll('p').forEach(paragraph => paragraph.classList.toggle('enlarge', enlarged));
  });
}

const scrollButton = document.getElementById('scrollToTopBtn');
if (scrollButton) {
  scrollButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  let wasVisible;
  const updateScrollButton = () => {
    const visible = window.scrollY > 200;
    if (visible !== wasVisible) {
      scrollButton.style.display = visible ? 'block' : 'none';
      wasVisible = visible;
    }
  };
  updateScrollButton();
  window.addEventListener('scroll', updateScrollButton, { passive: true });
}


  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        loadFeed();
      }
    }, { rootMargin: '500px' });
    observer.observe(feed.parentElement);
  } else {
    loadFeed();
  }
}
