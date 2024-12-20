// import '../scss/app.scss';

/* Your JS Code goes here */

// remember original settings


const perunica = () => 'Perunica version 1.0.1';

// eslint-disable-next-line no-console
console.log(perunica());

const contrastBtn = document.getElementById("contrast-btn");
const contrastImg = document.getElementById("contrast-img");
const textImg = document.getElementById("text-img");
const lineImg = document.getElementById("linia");
const lineImg1 = document.getElementById("linia1");
const fbImg = document.getElementById("fb-img");
const igImg = document.getElementById("ig-img");
const lineImg2 = document.getElementById("linia2");
const fbFooter = document.getElementById("fb-gold");
const igFooter = document.getElementById("ig-gold");
const body = document.body;


const savedHighContrast = localStorage.getItem("highContrast");
if (savedHighContrast === "true") {
  document.body.classList.add("high-contrast");
  contrastImg.src = "src/images/content/high-contrast-white.png";
  textImg.src = "src/images/content/text-size-white.png";
  lineImg.src = "src/images/content/line4-c.png";
  lineImg1.src = "src/images/content/line4-c.png";
  fbImg.src = "src/images/content/logo-fb-simple-white.png";
  igImg.src = "src/images/content/logo-instagram-white.png";
  lineImg2.src = "src/images/content/line4-c.png";
  fbFooter.src = "src/images/content/logo-fb-simple-white.png";
  igFooter.src = "src/images/content/logo-instagram-white.png";
}

let isHighContrast = savedHighContrast === "true";

contrastBtn.addEventListener("click", function () {

  document.body.classList.toggle("high-contrast");


  if (isHighContrast) {
    contrastImg.src = "src/images/content/high-contrast.png";
    textImg.src = "src/images/content/text-size.png";
    lineImg.src = "src/images/content/line4.png";
    lineImg1.src = "src/images/content/line4.png";
    fbImg.src = "src/images/content/logo-fb-simple1.png";
    igImg.src = "src/images/content/logo-instagram1.png";
    lineImg2.src = "src/images/content/line-1.jpg";
    fbFooter.src = "src/images/content/logo-fb-simple-gold.png";
    igFooter.src = "src/images/content/logo-instagram-gold.png";
    isHighContrast = false;
  } else {
    contrastImg.src = "src/images/content/high-contrast-white.png";
    textImg.src = "src/images/content/text-size-white.png";
    lineImg.src = "src/images/content/line4-c.png";
    lineImg1.src = "src/images/content/line4-c.png";
    fbImg.src = "src/images/content/logo-fb-simple-white.png";
    igImg.src = "src/images/content/logo-instagram-white.png";
    lineImg2.src = "src/images/content/line4-c.png";
    fbFooter.src = "src/images/content/logo-fb-simple-white.png";
    igFooter.src = "src/images/content/logo-instagram-white.png";
    isHighContrast = true;
  }


  localStorage.setItem("highContrast", isHighContrast);
});



var button = document.getElementById("text-img");
var paragraphs = document.getElementsByTagName("p");

button.addEventListener("click", function() {
  for (var i = 0; i < paragraphs.length; i++) {
    if (paragraphs[i].classList.contains("enlarge")) {
      paragraphs[i].classList.remove("enlarge");
    } else {
      paragraphs[i].classList.add("enlarge");
    }
  }
});

var scrollToTopBtn = document.getElementById("scrollToTopBtn");

scrollToTopBtn.addEventListener("click", function() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

window.addEventListener("scroll", function() {
  if (window.scrollY > 200) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});


const cookieBanner = document.getElementById('cookie-banner');
const cookieAcceptButton = document.getElementById('cookie-accept');

cookieAcceptButton.addEventListener('click', () => {
  cookieBanner.style.display = 'none';
  localStorage.setItem('cookiesAccepted', 'true');
});

if (localStorage.getItem('cookiesAccepted')) {
  cookieBanner.style.display = 'none';
} else {
  cookieBanner.style.display = 'block';
}


// Pobierz elementy obrazków z nawigacji
const navImages = document.querySelectorAll('.navbar img');


function toggleImageURLs() {
  if (window.innerWidth < 767) {
    // Zmiana URL obrazków dla mniejszych ekranów
    navImages.forEach(image => {
      if (image.id === 'fb-img') {
        image.src = 'src/images/content/logo-fb-simple-white.png';
      } else if (image.id === 'ig-img') {
        image.src = 'src/images/content/logo-instagram-white.png';
      } else if (image.id === 'contrast-img') {
        image.src = 'src/images/content/high-contrast-white.png';
      } else if (image.id === 'text-img') {
        image.src = 'src/images/content/text-size-white.png';
      }
    });
  } else {
    // Przywrócenie oryginalnych URL obrazków dla większych ekranów
    navImages.forEach(image => {
      if (image.id === 'fb-img') {
        image.src = 'src/images/content/logo-fb-simple1.png';
      } else if (image.id === 'ig-img') {
        image.src = 'src/images/content/logo-instagram1.png';
      } else if (image.id === 'contrast-img') {
        image.src = 'src/images/content/high-contrast.png';
      } else if (image.id === 'text-img') {
        image.src = 'src/images/content/text-size.png';
      }
    });
  }
}

// Wywołaj funkcję toggleImageURLs przy załadowaniu strony oraz przy zmianie szerokości okna
window.addEventListener('load', toggleImageURLs);
window.addEventListener('resize', toggleImageURLs);
