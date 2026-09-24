(() => {
  const dialog = document.querySelector('#menu-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  document.documentElement.classList.add('js');
  const tabs = [...dialog.querySelectorAll('[data-tab]')];
  let opener;
  const selectCategory = (category, focus = false) => {
    tabs.forEach(tab => {
      const selected = tab.dataset.tab === category;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      document.getElementById(tab.getAttribute('aria-controls')).hidden = !selected;
      if (selected && focus) tab.focus();
    });
  };
  document.querySelectorAll('[data-open-menu]').forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      opener = link;
      selectCategory(link.dataset.category || 'coffee');
      dialog.showModal();
      document.body.classList.add('menu-open');
      dialog.querySelector('.close-menu').focus();
    });
  });
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectCategory(tab.dataset.tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectCategory(tabs[next].dataset.tab, true);
      }
    });
  });
  dialog.querySelector('.close-menu').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('menu-open');
    opener?.focus({ preventScroll: true });
  });
})();

(() => {
  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const elements = document.querySelectorAll([
    '.maison .section-label',
    '.maison-layout > *',
    '.room-section .section-label',
    '.room-intro',
    '.room-layout > *',
    '.menu-section .section-label',
    '.section-heading',
    '.menu-categories .category',
    '.menu-note',
    '.visit-section .section-label',
    '.visit-layout > *',
    'footer > *'
  ].join(', '));

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

  elements.forEach(element => {
    element.classList.add('scroll-reveal');
    observer.observe(element);
  });
  document.documentElement.classList.add('reveal-enabled');
})();

(() => {
  const room = document.querySelector('.room-section');
  if (!room) return;

  const records = [...room.querySelectorAll('[data-record-choice]')];
  const radioButton = room.querySelector('[data-toggle-radio]');
  const lightsButton = room.querySelector('[data-toggle-lights]');
  const status = room.querySelector('.room-status');
  const state = { record: 'matin', radio: false, lights: true };
  const names = {
    fr: { matin: 'Le matin', soleil: 'Le soleil', soir: 'Le soir' },
    en: { matin: 'Morning', soleil: 'Sunshine', soir: 'Evening' }
  };

  function updateRoom() {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'fr';
    room.dataset.record = state.record;
    room.dataset.radio = state.radio ? 'on' : 'off';
    room.dataset.lights = state.lights ? 'on' : 'off';
    records.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.recordChoice === state.record)));
    radioButton.setAttribute('aria-pressed', String(state.radio));
    lightsButton.setAttribute('aria-pressed', String(state.lights));
    radioButton.textContent = lang === 'fr' ? (state.radio ? 'Éteindre la radio' : 'Allumer la radio') : (state.radio ? 'Turn radio off' : 'Turn radio on');
    lightsButton.textContent = lang === 'fr' ? (state.lights ? 'Éteindre les lampes' : 'Allumer les lampes') : (state.lights ? 'Turn lights off' : 'Turn lights on');
    status.textContent = lang === 'fr'
      ? `${names.fr[state.record]} sélectionné · Radio ${state.radio ? 'allumée' : 'éteinte'} · Lampes ${state.lights ? 'allumées' : 'éteintes'}.`
      : `${names.en[state.record]} selected · Radio ${state.radio ? 'on' : 'off'} · Lights ${state.lights ? 'on' : 'off'}.`;
    window.dispatchEvent(new CustomEvent('josephine:roomchange', { detail: { ...state } }));
  }

  records.forEach(button => button.addEventListener('click', () => {
    state.record = button.dataset.recordChoice;
    updateRoom();
  }));
  radioButton.addEventListener('click', () => { state.radio = !state.radio; updateRoom(); });
  lightsButton.addEventListener('click', () => { state.lights = !state.lights; updateRoom(); });
  window.addEventListener('josephine:languagechange', updateRoom);
  updateRoom();
})();
