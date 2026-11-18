# Raport optymalizacji SEO Perunica.pl

Raport dotyczy obecnej wersji na lokalnej gałęzi `zmiany-pod-audyt-seo` publicznego repozytorium `Kabelek-design/PERUNICA-projekt-main`. Obejmuje optymalizację SEO i ponowny pomiar po przywróceniu dwóch zdjęć na stronie głównej. Zmiany nie zostały wdrożone na produkcję.

## Audyt i architektura

Projekt buduje statyczne podstrony HTML i jeden wspólny pakiet JavaScript oraz SCSS przy użyciu Webpacka 4. Katalog `dist/` zawiera gotowe pliki. Katalogi `old-test/` i `main-page/` nie są osobnymi wejściami bieżącej kompilacji. Katalog `src/pdfqr/` zawiera pliki udostępniane także za pomocą kodów QR. Zachowałem ich adresy i nazwy.

Audyt zgłaszał m.in. powielone tytuły, brak opisów, nieprawidłową hierarchię nagłówków, 56 grafik powyżej 100 KB oraz brak mapy witryny i pliku robots. Podane w audycie wyniki PageSpeed to 57 punktów na telefonie i 73 na komputerze. Szczegółowe pomiary PageSpeed i dane Google Search Console nie były dostępne w udostępnionym raporcie. [Audyt Pikseo](https://doc.pikseo.pl/audyty/e81261e8-163e-48d4-901e-28d11070454a/)

Odczyt produkcji przed zmianami potwierdził HTTP 404 dla `robots.txt`, `sitemap.xml` i `/index.php`, HTTP 200 dla duplikatu `/index.html` i przekierowanie HTTP na HTTPS dla domeny bez `www`. Wersja HTTPS z `www` nie przeszła weryfikacji nazwy w certyfikacie TLS. Serwer przedstawiał się jako Apache.

## Wprowadzone zmiany

| Obszar | Zmiana |
| --- | --- |
| Indeksowanie | Dziewięć publicznych stron ma indywidualne tytuły, opisy, kanoniczne adresy HTTPS bez `www` i metadane Open Graph. Strona demonstracyjna ma `noindex`. Użyteczna strona z materiałami PDF pozostała dostępna i trafiła do mapy witryny. |
| Struktura | Jeden H1 na stronę, H2 dla głównych sekcji i właściwe nagłówki kart. Połączono dwuwierszowe tytuły bez rezygnacji z ich typografii. Usunięto powtórzone identyfikatory HTML i poprawiono odnośniki do strony głównej. |
| Sitemap i robots | `sitemap.xml` zawiera dziewięć adresów kanonicznych. `robots.txt` podaje adres mapy i pozwala robotom odczytać zasoby oraz stronę demonstracyjną z deklaracją `noindex`. Oba pliki trafiają do katalogu głównego `dist/`. |
| Przekierowania | Dołączono reguły Apache 301 dla HTTP, wariantu `www` oraz jawnych aliasów `/index.html` i `/index.php`. Reguły zachowują parametry i kierują do HTTPS bez `www`. Adresy podstron `.html` pozostają aktualne. |
| Schema.org | Dodano JSON-LD dla `LocalBusiness` z logo i danymi Spółdzielni Socjalnej Perunica, `WebSite`, właściwych typów stron i `BreadcrumbList` dla podstron. |
| Grafiki i układ | Większe grafiki przekonwertowano do WebP, a 18 zdjęć otrzymało wariant mobilny 768 px. Na ekranach do 474 px przeglądarka pobiera węższy wycinek tła. Przezroczysta runa używa bezstratnego WebP. Dwa zdjęcia na stronie głównej korzystają ponownie z oryginalnych JPEG i tych samych reguł rozmiaru co przed zmianami. |
| CSS i JS | Kompilacja produkcyjna minifikuje CSS i JS oraz nadaje plikom nazwy zależne od zawartości. WOFF2 jest wydzielony z CSS, a fonty z najczęściej używanymi znakami łacińskimi i polskimi mają preload. Pełne fonty obsługują pozostałe znaki. Usunięto nadmiarowe kopie jQuery, zachowując jedną na stronach galerii. Widżety aktualności ładują się po przewinięciu w stronę sekcji. Zasoby przełącznika kontrastu emituje Webpack. |
| Serwer | Plik `.htaccess` zawiera reguły cache dla wersjonowanych zasobów i kompresji tekstu, gdy Apache ma załadowane odpowiednie moduły. |

## Testy i wyniki

- Czysta instalacja z lockfile i kompilacja produkcyjna przeszły na Node.js 22. Sass zgłasza ostrzeżenia z dotychczasowego pakietu siatki dotyczące przestarzałego operatora dzielenia.
- Sprawdziłem zgodność wszystkich 9 adresów z mapą, unikalność metadanych, jeden H1, składnię JSON-LD, ścieżki grafik, odnośniki HTML i PDF oraz kotwice. Kompilacja nie zawiera uszkodzonych lokalnych odnośników ani powtórzonych identyfikatorów na tych stronach.
- Porównałem pliki dwóch przywróconych zdjęć z wersją sprzed optymalizacji. JPEG-i są identyczne bajt w bajt, a ich znaczniki ponownie używają tych samych klas CSS bez dodatkowych wymiarów ani wariantów mobilnych.
- W Edge sprawdziłem 9 stron przy szerokościach 390 i 1440 px, działanie galerii Slick, kontrastu, powiększania tekstu i banera cookies. Na stronie głównej sprawdziłem także załadowanie widżetów aktualności po przewinięciu. W osobnym teście z prawdziwymi skryptami osadziły się dwie ramki dostawców.
- Porównałem lokalne kompilacje strony głównej sprzed optymalizacji i po przywróceniu zdjęć. Obie wersje korzystały z gzip dla zasobów tekstowych. W widoku mobilnym emulowałem łącze 1,6 Mb/s, opóźnienie 100 ms i spowolnienie CPU 4×. Na komputerze użyłem łącza 10 Mb/s i opóźnienia 35 ms. LCP i CLS to mediany z trzech wczytań każdej wersji z pustą pamięcią podręczną. Na czas pomiaru wyłączyłem zewnętrzne widżety aktualności.

| Wskaźnik | Przed optymalizacją | Obecna wersja z oryginalnymi zdjęciami |
| --- | ---: | ---: |
| Grafiki emitowane przez kompilację, z wariantami mobilnymi | 42,27 MB | 10,66 MB |
| Wspólny CSS, bez kompresji HTTP | 1,50 MB | 121,0 KB |
| Wspólny JS, bez bibliotek z CDN | 4,4 KB | 5,1 KB |
| Transfer lokalnych zasobów strony głównej, telefon | 4,36 MB | 0,82 MB |
| Transfer lokalnych zasobów strony głównej, komputer | 4,67 MB | 0,80 MB |
| LCP, telefon | 18,680 s | 2,488 s |
| LCP, komputer | 3,048 s | 0,436 s |
| CLS, telefon | 0,000 | 0,000 |
| CLS, komputer | 0,436 | 0,000 |

Po przywróceniu zdjęć mobilny LCP wzrósł z 1,52 s w poprzednim teście z mniejszymi obrazami do 2,488 s. Obecna wersja mieści się w celu 2,5 s z zapasem 12 ms w tych warunkach. Transfer zasobów obejmuje pliki z lokalnego hosta pobrane podczas próby i pomija sam dokument HTML oraz zasoby CDN. Większy wspólny JS obejmuje obsługę widżetów i ikon.

Wyniki opisują test laboratoryjny, nie wyniki PageSpeed z audytu ani pomiary rzeczywistych użytkowników. Pomiar na publicznym hostingu, potwierdzenie kompresji HTTP i dane INP pozostają do sprawdzenia.

## Podgląd i weryfikacja serwera

Podgląd z automatycznym odświeżaniem działa pod adresem [127.0.0.1:8081](http://127.0.0.1:8081/). W katalogu projektu można uruchomić `npm ci`, `npm run build` lub `npm run dev -- --host 127.0.0.1 --port 8081`. Pliki z kompilacji produkcyjnej pozostają dostępne równolegle w `dist/`.

Reguły Apache są częścią `dist/.htaccess`. Lokalny Webpack Dev Server ich nie wykonuje. Serwer Apache musi mieć aktywne `mod_rewrite` i zezwalać na użycie dyrektyw w `.htaccess` albo dostać równoważne reguły w konfiguracji vhosta. Certyfikat musi obsługiwać również `www.perunica.pl`, zanim przeglądarka będzie mogła otrzymać przekierowanie HTTPS z tej domeny. Przy terminacji TLS przed Apache regułę HTTPS trzeba dopasować do zaufanej konfiguracji proxy.

Po uzyskaniu zgody na wdrożenie sprawdzenia serwerowe obejmują odpowiedzi 301 i końcowe 200, zasoby i typy MIME, odczyt mapy w Google Search Console oraz powtórzenie PageSpeed na publicznym adresie. Bieżące testy obejmują pliki z kompilacji i lokalny podgląd.
