(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');

  function closeMenu() {
    if (!menuButton || !mobileNav) return;
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');
    mobileNav.hidden = true;
  }

  menuButton?.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Cerrar menú' : 'Abrir menú');
    mobileNav.hidden = !opening;
  });

  mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -25px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('in-view'));
  }

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const modal = document.getElementById('ig-modal');
  const closeButtons = modal?.querySelectorAll('[data-close-modal]') || [];
  const modalClose = modal?.querySelector('.ig-close');
  let lastFocus = null;
  let modalShown = false;

  function showModal() {
    if (!modal || modalShown || sessionStorage.getItem('sankayu-instagram-seen')) return;
    modalShown = true;
    lastFocus = document.activeElement;
    modal.hidden = false;
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modalClose?.focus();
    sessionStorage.setItem('sankayu-instagram-seen', '1');
  }

  function hideModal() {
    if (!modal || modal.hidden) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocus instanceof HTMLElement) lastFocus.focus();
  }

  closeButtons.forEach(button => button.addEventListener('click', hideModal));
  document.addEventListener('keydown', event => {
    if (!modal || modal.hidden) return;
    if (event.key === 'Escape') hideModal();
    if (event.key === 'Tab') {
      const focusable = Array.from(modal.querySelectorAll('a[href],button:not([disabled])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  if (!sessionStorage.getItem('sankayu-instagram-seen')) {
    window.setTimeout(showModal, 15000);
  }

  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.catalog-card[data-category]');
  filters.forEach(button => button.addEventListener('click', () => {
    const active = button.dataset.filter;
    filters.forEach(item => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    cards.forEach(card => {
      card.hidden = active !== 'all' && card.dataset.category !== active;
    });
  }));

  const mapTabs = document.querySelectorAll('[data-map]');
  const mapFrame = document.querySelector('.map-panel iframe');
  const mapCaption = document.getElementById('map-caption');
  const mapLink = document.getElementById('map-link');
  const addresses = {
    faez: { label: 'FAEZ 470 · VALLENAR', query: 'Faez 470, Vallenar, Chile' },
    serrano: { label: 'SERRANO 882 · VALLENAR', query: 'Serrano 882, Vallenar, Chile' }
  };
  mapTabs.forEach(button => button.addEventListener('click', () => {
    const selected = addresses[button.dataset.map];
    if (!selected || !mapFrame || !mapCaption || !mapLink) return;
    mapTabs.forEach(item => {
      const isActive = item === button;
      item.classList.toggle('is-active', isActive);
      item.setAttribute('aria-pressed', String(isActive));
    });
    mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(selected.query)}&output=embed`;
    mapFrame.title = `Mapa de ${selected.query}`;
    mapCaption.textContent = selected.label;
    mapLink.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selected.query)}`;
  }));

  const routeMarker = document.querySelector('.route-start-marker');
  const routeLane = document.querySelector('.route-lane');
  const routeBike = document.querySelector('.moving-bike');
  const routeProgress = document.querySelector('.route-progress');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let routeFrame = 0;

  function updateRoute() {
    routeFrame = 0;
    if (!routeMarker || !routeLane || !routeBike || !routeProgress) return;
    const start = routeMarker.getBoundingClientRect().top + window.scrollY;
    const main = routeLane.closest('main');
    const mainBottom = main ? main.getBoundingClientRect().bottom + window.scrollY : document.documentElement.scrollHeight;
    const end = Math.max(start + 1, mainBottom - window.innerHeight);
    const fraction = reducedMotion.matches ? 0 : Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
    const travel = Math.max(0, routeLane.clientWidth - routeBike.clientWidth);
    const distance = Math.round(fraction * travel);
    routeBike.style.transform = `translate3d(${distance}px,0,0)`;
    routeProgress.style.width = `${distance + (fraction ? routeBike.clientWidth * 0.45 : 0)}px`;
  }

  function scheduleRouteUpdate() {
    if (!routeFrame) routeFrame = window.requestAnimationFrame(updateRoute);
  }

  if (routeMarker && routeLane && routeBike) {
    window.addEventListener('scroll', scheduleRouteUpdate, { passive: true });
    window.addEventListener('resize', scheduleRouteUpdate);
    window.addEventListener('load', scheduleRouteUpdate);
    reducedMotion.addEventListener?.('change', scheduleRouteUpdate);
    scheduleRouteUpdate();
  }
})();
