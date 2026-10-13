/* Responsive homepage navigation: reuse canonical header links in a mobile overlay. */
(() => {
  'use strict';
  if (window.__allyMobileNavigationReady) return;

  const mobile = matchMedia('(max-width: 739px)');
  const init = () => {
    const header = document.querySelector('.editorial-header');
    const desktopNav = header?.querySelector('nav');
    const links = desktopNav ? [...desktopNav.querySelectorAll('a[href]')] : [];
    if (!header || !links.length || header.querySelector('.portfolio-mobile-menu-toggle')) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'portfolio-mobile-menu-toggle';
    toggle.setAttribute('aria-label', 'Open navigation menu');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-controls', 'portfolio-mobile-navigation');
    toggle.innerHTML = '<span></span><span></span>';

    const overlay = document.createElement('div');
    overlay.id = 'portfolio-mobile-navigation';
    overlay.className = 'portfolio-mobile-navigation';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.inert = true;

    const panel = document.createElement('div');
    panel.className = 'portfolio-mobile-navigation-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-modal', 'true');
    panel.setAttribute('aria-label', 'Site navigation');

    const closeButton = document.createElement('button');
    closeButton.className = 'portfolio-mobile-menu-close';
    closeButton.type = 'button';
    closeButton.setAttribute('aria-label', 'Close navigation menu');
    closeButton.innerHTML = '<span aria-hidden="true">×</span>';

    const nav = document.createElement('nav');
    nav.className = 'portfolio-mobile-navigation-links';
    nav.setAttribute('aria-label', 'Mobile sections');

    const numerals = ['①', '②', '③', '④', '⑤'];
    links.forEach((source, index) => {
      const item = document.createElement('a');
      item.href = source.href;
      const label = source.textContent.trim().replace(/^[①②③④⑤⑥⑦⑧⑨⑩\s\d.\/–—-]+/, '').trim();
      item.innerHTML = '<span class="portfolio-mobile-link-label"></span><sup></sup>';
      item.querySelector('span').textContent = label || source.getAttribute('aria-label') || 'Section';
      item.querySelector('sup').textContent = numerals[index] || String(index + 1).padStart(2, '0');
      if (source.target) item.target = source.target;
      if (source.rel) item.rel = source.rel;
      nav.appendChild(item);
    });

    const footer = document.createElement('div');
    footer.className = 'portfolio-mobile-navigation-footer';

    const headerContact = header.querySelector('.header-contact');
    const contactAnchor = headerContact?.matches?.('a[href]')
      ? headerContact
      : headerContact?.querySelector?.('a[href]');
    const sectionContact = document.querySelector('a[href="#contact"], a[href="#connect"], a[href^="mailto:"]');
    const destination = contactAnchor || sectionContact;

    const footerLabel = document.createElement('p');
    footerLabel.className = 'portfolio-mobile-contact-eyebrow';
    footerLabel.textContent = '✦  HAVE A PROJECT OR AN IDEA?  ✦';
    footer.appendChild(footerLabel);

    if (destination) {
      const contactLink = document.createElement('a');
      contactLink.className = 'portfolio-mobile-contact-link';
      contactLink.href = destination.href;
      contactLink.textContent = 'LET’S CONNECT';
      if (destination.target) contactLink.target = destination.target;
      if (destination.rel) contactLink.rel = destination.rel;
      footer.appendChild(contactLink);
    }

    const emailSource = document.querySelector('footer a[href^="mailto:"], .contact a[href^="mailto:"], a[href^="mailto:"]');
    if (emailSource) {
      const email = document.createElement('a');
      email.className = 'portfolio-mobile-email';
      email.href = emailSource.href;
      email.textContent = decodeURIComponent(emailSource.getAttribute('href').replace(/^mailto:/i, '').split('?')[0]);
      footer.appendChild(email);
    }

    const socials = document.createElement('div');
    socials.className = 'portfolio-mobile-socials';
    const socialDestinations = [
      ['LINKEDIN', 'linkedin.com'],
      ['BEHANCE', 'behance.net'],
      ['INSTAGRAM', 'instagram.com']
    ];
    socialDestinations.forEach(([label, domain]) => {
      const original = [...document.querySelectorAll('a[href]')]
        .find(a => {
          try { return new URL(a.href).hostname.endsWith(domain); }
          catch { return false; }
        });
      if (!original) return;
      const a = document.createElement('a');
      a.href = original.href;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = label;
      socials.appendChild(a);
    });
    if (socials.childElementCount) footer.insertBefore(socials, footerLabel);

    panel.append(closeButton, nav, footer);
    overlay.appendChild(panel);
    header.appendChild(toggle);
    document.body.appendChild(overlay);

    let previousFocus = null;
    const open = () => {
      if (!mobile.matches) return;
      previousFocus = document.activeElement;
      overlay.inert = false;
      overlay.setAttribute('aria-hidden', 'false');
      overlay.classList.add('is-open');
      document.documentElement.classList.add('portfolio-mobile-menu-open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Close navigation menu');
      closeButton.focus();
    };
    const close = () => {
      if (!overlay.classList.contains('is-open')) return;
      overlay.classList.remove('is-open');
      document.documentElement.classList.remove('portfolio-mobile-menu-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      overlay.setAttribute('aria-hidden', 'true');
      overlay.inert = true;
      if (mobile.matches && previousFocus?.isConnected) previousFocus.focus();
      previousFocus = null;
    };

    toggle.addEventListener('click', () => {
      overlay.classList.contains('is-open') ? close() : open();
    });
    closeButton.addEventListener('click', close);
    nav.addEventListener('click', event => {
      if (event.target.closest('a')) close();
    });
    footer.addEventListener('click', event => {
      if (event.target.closest('a')) close();
    });
    panel.addEventListener('click', event => {
      if (event.target === panel) close();
    });

    document.addEventListener('keydown', event => {
      if (!overlay.classList.contains('is-open')) return;
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'Tab') {
        const focusable = [...overlay.querySelectorAll('button, a[href]')]
          .filter(element => !element.hasAttribute('disabled'));
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
    mobile.addEventListener?.('change', () => {
      if (!mobile.matches) close();
    });
    window.__allyMobileNavigationReady = true;
    document.documentElement.classList.add('portfolio-mobile-menu-ready');
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
