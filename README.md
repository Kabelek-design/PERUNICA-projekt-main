<div align="center">
  <img width="220" height="220" src="https://webpack.js.org/assets/icon-square-big.svg">
  <h1>Webpack-Babel-Sass Boilerplate</h1>
  <p>A webpack boilerplate with Babel and Sass/ SCSS</p>
</div>

## Features
* Webpack 4 bundling
* ES6 support
* Sass support
* Live reload using Webpack Dev Server
* HTML Loader
* File Loader
* HTML Webpack Plugin
* Mini CSS Extract Plugin to extract CSS into separate files
* Clean Webpack Plugin to clean dist folder

## Requirement
Install [Node.js](https://nodejs.org/en/).

## Usage

### Getting Started

Clone the repo into a new project folder, e.g. `MyApp`.

```bash
$ git clone https://github.com/nadiannis/webpack-babel-sass-boilerplate.git MyApp
$ cd MyApp
```

Delete the old `.git` history, then initialize new `.git` repo.

```bash
$ rm -rf .git
$ git init
```

### Setup
Install the dependencies.
```bash
$ npm install
```

### Development
Run the local webpack-dev-server & open [http://localhost:8080/](http://localhost:8080/)
```bash
$ npm run dev
```

### Production
Build the application.
```bash
$ npm run build
```

## Analityka i zgoda

Wspólny moduł [analytics-consent.js](./src/scripts/analytics-consent.js) ładuje
kontener `GTM-N7SFFV89` dopiero po wyraźnej zgodzie na analitykę (Basic Consent
Mode). GA i zdarzenia konfiguruje się w kontenerze GTM; nie należy dodawać
osobnego skryptu GA ani bezwarunkowego iframe `noscript` GTM.

Baner oraz przycisk „Ustawienia analityki” są dodawane na wszystkich stronach
korzystających ze wspólnego wejścia Webpack. Wybór jest przechowywany przez
180 dni pod nowym kluczem `perunica.analyticsConsent.v1`. Dawna flaga
`cookiesAccepted` nie jest zgodą na analitykę. Przy niedostępnej pamięci zgoda
obowiązuje tylko na bieżącej stronie. Wycofanie usuwa dostępne cookies GA
(`_ga`, `_ga_*`, `_gid`, `_gat`, `_gat_*`) i przeładowuje stronę, aby zatrzymać
już uruchomione tagi. Zmiana wyboru jest synchronizowana między kartami.

Zgody reklamowe (`ad_storage`, `ad_user_data`, `ad_personalization`) pozostają
`denied`. Tagi niestandardowe w GTM muszą respektować te ustawienia.
Przed wdrożeniem należy sprawdzić opublikowany kontener w Tag Assistant:
brak żądań GTM/GA przed zgodą i po odmowie, pojedyncza odsłona po zgodzie,
oczekiwane zdarzenia oraz brak ponownego ładowania GTM po wycofaniu zgody.
Treść polityki prywatności powinna odpowiadać konfiguracji kontenera.

## License

MIT © [Annisa Nadia](https://github.com/nadiannis)
