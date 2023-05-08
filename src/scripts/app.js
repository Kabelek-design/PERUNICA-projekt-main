// import '../scss/app.scss';

/* Your JS Code goes here */

// remember original settings


const perunica = () => 'Perunica version 1.0.0';

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
let isHighContrast = false;


contrastBtn.addEventListener("click", function() {
    // toggle the "high-contrast" class on the body element
    document.body.classList.toggle("high-contrast");
  
    // change the image displayed in the button
    if (isHighContrast) {
        contrastImg.src = "src/images/content/high-contrast.png";
        textImg.src = "src/images/content/text-size.png";
        lineImg.src = "src/images/content/line4.png";
        lineImg1.src = "src/images/content/line4.png";
        fbImg.src = "src/images/content/logo-fb-simple1.png";
        igImg.src = "src/images/content/logo-instagram1.png";
        // 
        lineImg2.src = "src/images/content/line1.png";
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
        // 
        lineImg2.src = "src/images/content/line4-c.png";
        fbFooter.src = "src/images/content/logo-fb-simple-white.png";
        igFooter.src = "src/images/content/logo-instagram-white.png";
        // 
        isHighContrast = true;
      }
  
});


// Znajdź element przycisku
const textButton = document.querySelector('#text-img');

// Przechowaj oryginalny rozmiar czcionki w zmiennej
const originalFontSize = window.getComputedStyle(document.body).getPropertyValue('font-size');

// Dodaj event listener do przycisku
textButton.addEventListener('click', function() {
  // Dodaj klasę do elementu body
  document.body.classList.toggle('opis1-index');

  // Sprawdź, czy element body ma klasę 'opis1-index'
  if (document.body.classList.contains('opis1-index')) {
    // Zwiększ rozmiar czcionki dla elementów z klasą 'opis1-index'
    const elementsWithLargerFont = document.querySelectorAll('*');
    elementsWithLargerFont.forEach(function(element) {
      const fontSize = window.getComputedStyle(element).getPropertyValue('font-size');
      const newFontSize = parseInt(fontSize) * 1.1 + 'px';
      element.style.fontSize = newFontSize;
    });
  } else {
    // Zmień rozmiar czcionki na oryginalny dla elementów z klasą 'opis1-index'
    const elementsWithLargerFont = document.querySelectorAll('*');
    elementsWithLargerFont.forEach(function(element) {
      element.style.fontSize = originalFontSize;
    });
  }
});
