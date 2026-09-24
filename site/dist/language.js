(() => {
  const switches = [...document.querySelectorAll('.language-switch [data-lang]')];
  if (!switches.length) return;

  // French remains in the HTML for search engines and for visitors without JavaScript.
  const translations = [
    ['.skip-link', 'Skip to content'],
    ['.header nav a[href="#la-maison"]', 'The space'],
    ['.header nav a[href="#la-carte"]', 'Menu'],
    ['.header-actions .visit-link', 'Visit'],
    ['.hero .eyebrow', 'THE TASTE OF GOOD DAYS'],
    ['#hero-title', 'A coffee.<br>A sweet treat.<br><em>A little sunshine.</em>', 'html'],
    ['.hero .intro', 'Homemade cakes, a good coffee, and time to savour it all. Welcome to Josephine, your little meeting place in Nice.'],
    ['.hero .button', 'Step inside'],
    ['.hero-footnote', '9 Rue Blacas, Nice <span aria-hidden="true">·</span> Enjoy here or take away', 'html'],
    ['.photo-topline span:first-child', 'WELCOME IN'],
    ['.storefront figcaption span:first-child', 'The little yellow door.'],
    ['.storefront figcaption span:last-child', 'MON — SAT &nbsp; 9:30 — 17:30', 'html'],
    ['.maison .section-label span:first-child', '01 / THE SPACE'],
    ['.maison .section-label span:last-child', 'TAKE YOUR TIME.'],
    ['#maison-title', 'Little pleasures<br>make <em>beautiful days.</em>', 'html'],
    ['.maison-layout > div:first-child > p:nth-of-type(1)', 'A sunny yellow façade. The smell of homemade cake. A warm cup in your hands. At Josephine, simple pleasures have an address.'],
    ['.maison-layout > div:first-child > p:nth-of-type(2)', 'Come by for a coffee, stay for a break. A moment to yourself, or one to share, in the heart of Nice.'],
    ['.maison-layout .text-link', 'We have a seat for you'],
    ['.maison-note .note-kicker', 'AT JOSEPHINE'],
    ['.maison-note p', '“Sometimes happiness<br>fits inside <em>a cup.</em>”', 'html'],
    ['.maison-note .note-footer', 'COFFEE, MATCHA & HOMEMADE TREATS'],
    ['.room-section .section-label span:first-child', '02 / INSIDE THE CAFÉ'],
    ['.room-section .section-label span:last-child', 'JOSEPHINE’S RECORD CORNER'],
    ['.room-intro .eyebrow', 'TAKE A LOOK INSIDE'],
    ['#room-title', 'Choose a record.<br><em>Set the mood.</em>', 'html'],
    ['.room-intro > p', 'A nod to the café’s record corner: take your time, change the record and play with the light.'],
    ['.room-stage-caption', 'A CORNER OF JOSEPHINE · NICE'],
    ['.room-control-label', 'YOUR TURN'],
    ['.room-controls h3', 'Today’s selection'],
    ['.room-record[data-record-choice="matin"] strong', 'Morning'],
    ['.room-record[data-record-choice="matin"] small', '01 / GENTLE START'],
    ['.room-record[data-record-choice="soleil"] strong', 'Sunshine'],
    ['.room-record[data-record-choice="soleil"] small', '02 / LOVELY DAY'],
    ['.room-record[data-record-choice="soir"] strong', 'Evening'],
    ['.room-record[data-record-choice="soir"] small', '03 / LAST COFFEE'],
    ['.room-note', 'A visual experience; sound will come later.'],
    ['.menu-section .section-label span:first-child', '03 / AT THE COUNTER'],
    ['.menu-section .section-label span:last-child', 'THERE IS ALWAYS A GOOD REASON.'],
    ['#menu-title', 'A little something<br><em>for every mood.</em>', 'html'],
    ['.section-heading > p', 'Morning coffee, afternoon matcha,<br>and a sweet treat that needs no excuse.', 'html'],
    ['.category[data-category="coffee"] h3', 'Coffee'],
    ['.category[data-category="coffee"] p', 'A coffee, a latte. Your favourite ritual.'],
    ['.category[data-category="coffee"] .category-tag', 'A GOOD START'],
    ['.category[data-category="matcha"] h3', 'Matcha'],
    ['.category[data-category="matcha"] p', 'A gentle pause in green.'],
    ['.category[data-category="matcha"] .category-tag', 'SOMETHING DIFFERENT'],
    ['.category[data-category="cakes"] h3', 'Homemade cakes'],
    ['.category[data-category="cakes"] p', 'Made here. Enjoy every last crumb.'],
    ['.category[data-category="cakes"] .category-tag', 'A LITTLE PLEASURE'],
    ['.menu-note', 'Our selection changes from day to day. Discover today’s treats and prices at the counter.'],
    ['.menu-fallback #menu-coffee h3', 'Coffees'],
    ['.menu-fallback #menu-coffee p', 'Coffee · Latte'],
    ['.menu-fallback #menu-matcha h3', 'Matcha'],
    ['.menu-fallback #menu-matcha p', 'Matcha · Rose matcha'],
    ['.menu-fallback #menu-cakes h3', 'Homemade cakes'],
    ['.menu-fallback #menu-cakes p', 'Carrot cake · Matcha & white chocolate cake'],
    ['.visit-section .section-label span:first-child', '04 / COME SEE US'],
    ['.visit-section .section-label span:last-child', 'SEE YOU SOON.'],
    ['.visit-layout .eyebrow', 'LOOK FOR THE LITTLE YELLOW FAÇADE.'],
    ['#visit-title', 'Your next<br><em>Nice little break.</em>', 'html'],
    ['.visit-layout .button', 'Get directions'],
    ['.visit-details > div:first-child h3', 'Find us'],
    ['.visit-details > div:nth-child(2) h3', 'Opening hours'],
    ['.visit-details > div:nth-child(2) p', 'Monday — Saturday <span>9:30 — 17:30</span><br>Sunday <span>Closed</span>', 'html'],
    ['.visit-details .text-link', 'A little Josephine every day'],
    ['.footer-bottom > span:first-child', 'COFFEE, SUNSHINE & LOVE.'],
    ['.close-menu', 'Close'],
    ['.dialog-aside > p', 'Come in.<br><em>Take your time.</em>', 'html'],
    ['.dialog-content .eyebrow', 'WELCOME TO THE COUNTER'],
    ['#dialog-title', 'A little joy<br><em>on the menu.</em>', 'html'],
    ['.menu-tabs [data-tab="coffee"]', 'Coffee'],
    ['.menu-tabs [data-tab="matcha"]', 'Matcha'],
    ['.menu-tabs [data-tab="cakes"]', 'Homemade cakes'],
    ['#panel-coffee .panel-intro', 'The pleasure of a coffee break.'],
    ['#panel-coffee .menu-item:first-of-type h3', 'Coffee'],
    ['#panel-coffee .menu-item:first-of-type span', 'A little ritual'],
    ['#panel-coffee .menu-item:nth-of-type(2) h3', 'Latte'],
    ['#panel-coffee .menu-item:nth-of-type(2) span', 'Smooth and gentle'],
    ['#panel-matcha .panel-intro', 'See the day in green.'],
    ['#panel-matcha .menu-item:first-of-type h3', 'Matcha'],
    ['#panel-matcha .menu-item:first-of-type span', 'The favourite'],
    ['#panel-matcha .menu-item:nth-of-type(2) h3', 'Rose matcha'],
    ['#panel-matcha .menu-item:nth-of-type(2) span', 'A floral pause'],
    ['#panel-cakes .panel-intro', 'Homemade cakes, every day.'],
    ['#panel-cakes .menu-item:first-of-type h3', 'Carrot cake'],
    ['#panel-cakes .menu-item:first-of-type span', 'A slice of happiness'],
    ['#panel-cakes .menu-item:nth-of-type(2) h3', 'Matcha & white chocolate'],
    ['#panel-cakes .menu-item:nth-of-type(2) span', 'The lovely pair'],
    ['.dialog-note', 'A glimpse of our drinks and treats.<br>Discover today’s selection and prices at the counter, subject to availability.', 'html'],
    ['.dialog-content .text-link', 'Café news on Instagram']
  ];

  const entries = translations.map(([selector, english, kind]) => {
    const element = document.querySelector(selector);
    return element && { element, english, kind, french: kind === 'html' ? element.innerHTML : element.textContent };
  }).filter(Boolean);
  const attributes = [
    ['.header > .wordmark', 'aria-label', 'Josephine Café, home'],
    ['.header nav', 'aria-label', 'Main navigation'],
    ['.room-records', 'aria-label', 'Choose a record'],
    ['#cafe-room', 'aria-label', 'Interactive record corner at Josephine Café: records, radio and pendant lamps'],
    ['.facade-link', 'aria-label', 'Step inside Josephine and explore the menu'],
    ['.facade', 'alt', 'The yellow front of Josephine Café at 9 Rue Blacas in Nice, with its open door and wooden benches.'],
    ['.close-menu', 'aria-label', 'Close the menu'],
    ['.menu-tabs', 'aria-label', 'Menu categories'],
    ['meta[name="description"]', 'content', 'A sunny break at Josephine Café in Nice. Coffee, matcha and homemade cakes at 9 Rue Blacas, Monday to Saturday, 9:30–17:30.']
  ].map(([selector, name, english]) => {
    const element = document.querySelector(selector);
    return element && { element, name, english, french: element.getAttribute(name) };
  }).filter(Boolean);
  const frenchTitle = document.title;

  function setLanguage(lang) {
    const english = lang === 'en';
    entries.forEach(({ element, kind, french, english: translated }) => {
      if (kind === 'html') element.innerHTML = english ? translated : french;
      else element.textContent = english ? translated : french;
    });
    attributes.forEach(({ element, name, french, english: translated }) => element.setAttribute(name, english ? translated : french));
    document.documentElement.lang = english ? 'en' : 'fr';
    document.title = english ? 'Josephine Café Nice — Coffee, matcha & homemade cakes · Rue Blacas' : frenchTitle;
    switches.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === (english ? 'en' : 'fr'))));
    try { localStorage.setItem('josephine-language', english ? 'en' : 'fr'); } catch { /* Private browsing can block storage. */ }
    window.dispatchEvent(new CustomEvent('josephine:languagechange', { detail: { lang: english ? 'en' : 'fr' } }));
  }

  switches.forEach(button => button.addEventListener('click', () => setLanguage(button.dataset.lang)));
  let savedLanguage;
  try { savedLanguage = localStorage.getItem('josephine-language'); } catch { /* Use French. */ }
  setLanguage(savedLanguage === 'en' ? 'en' : 'fr');
})();
