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
