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
    ['.section-heading > p', 'Morning coffee, afternoon matcha,<br> and a sweet treat that needs no excuse.', 'html'],
    ['.category[data-category="coffee"] h3', 'Coffee'],
    ['.category[data-category="coffee"] p', 'A coffee, a latte. Your favourite ritual.'],
    ['.category[data-category="coffee"] .category-tag', 'A GOOD START'],
    ['.category[data-category="specials"] h3', 'Specials'],
    ['.category[data-category="specials"] p', 'Flavoured lattes and gently spiced treats.'],
    ['.category[data-category="specials"] .category-tag', 'TO DISCOVER'],
    ['.category[data-category="matcha"] h3', 'Matcha'],
    ['.category[data-category="matcha"] p', 'Ceremonial grade, in several variations.'],
    ['.category[data-category="matcha"] .category-tag', 'SOMETHING DIFFERENT'],
    ['.category[data-category="cakes"] h3', 'Homemade cakes'],
    ['.category[data-category="cakes"] p', 'Five recipes, each with its own story.'],
    ['.category[data-category="cakes"] .category-tag', 'A LITTLE PLEASURE'],
    ['.category[data-category="others"] h3', 'Other drinks'],
    ['.category[data-category="others"] p', 'Tea, chocolate, water and chilled drinks.'],
    ['.category[data-category="others"] .category-tag', 'FOR EVERY TASTE'],
    ['.category[data-category="extras"] h3', 'Extras'],
    ['.category[data-category="extras"] p', 'Make it yours, hot or iced.'],
    ['.category[data-category="extras"] .category-tag', 'A LITTLE EXTRA'],
    ['.menu-note', 'Explore the full menu and prices in each category. Availability may vary.'],
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
    ['#dialog-title', 'The menu<br><em>at Josephine.</em>', 'html'],
    ['.dialog-content .text-link', 'Café news on Instagram']
  ];

  const entries = translations.map(([selector, english, kind]) => {
    const element = document.querySelector(selector);
    return element && { element, english, kind, french: kind === 'html' ? element.innerHTML : element.textContent };
  }).filter(Boolean);
  const menuEntries = [...document.querySelectorAll('#menu-dialog [data-en]')].map(element => ({
    element, french: element.textContent, english: element.dataset.en
  }));
  const menuPrices = [...document.querySelectorAll('#menu-dialog .menu-price[data-price]')];
  const attributes = [
    ['.header > .wordmark', 'aria-label', 'Josephine Café, home'],
    ['.header nav', 'aria-label', 'Main navigation'],
    ['.room-records', 'aria-label', 'Choose a record'],
    ['#cafe-room', 'aria-label', 'Interactive record corner at Josephine Café: records, radio and pendant lamps'],
    ['.facade-link', 'aria-label', 'Step inside Josephine and explore the menu'],
    ['.facade', 'alt', 'The yellow front of Josephine Café at 9 Rue Blacas in Nice, with its open door and wooden benches.'],
    ['.close-menu', 'aria-label', 'Close the menu'],
    ['.menu-tabs', 'aria-label', 'Menu categories'],
    ['meta[name="description"]', 'content', 'Explore Josephine Café’s menu and prices in Nice: espresso, matcha, homemade cakes and specials. 9 Rue Blacas, Monday to Saturday.']
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
    menuEntries.forEach(({ element, french, english: translated }) => { element.textContent = english ? translated : french; });
    menuPrices.forEach(element => {
      const amount = Number(element.dataset.price);
      const decimals = Number.isInteger(amount) ? 0 : 2;
      const formatted = new Intl.NumberFormat(english ? 'en-GB' : 'fr-FR', {
        minimumFractionDigits: decimals, maximumFractionDigits: decimals
      }).format(amount);
      element.textContent = `${element.dataset.extra ? '+' : ''}${english ? `€${formatted}` : `${formatted} €`}`;
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
