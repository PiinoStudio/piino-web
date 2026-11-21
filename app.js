/* piino studio — Interaktion: Sprache, Theme, Navigation, Reveal.
   Kein Framework, keine Abhängigkeiten. */
(function () {
  'use strict';

  var root = document.documentElement;
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---- Sprache ---- */
  function applyLang(lang) {
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-lang-btn') === lang));
    });
    var title = document.querySelector('meta[name="title-' + lang + '"]');
    if (title) document.title = title.getAttribute('content');
    var desc = document.querySelector('meta[name="description-' + lang + '"]');
    var metaDesc = document.querySelector('meta[name="description"]');
    if (desc && metaDesc) metaDesc.setAttribute('content', desc.getAttribute('content'));
  }

  document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var lang = btn.getAttribute('data-lang-btn');
      store.set('piino-lang', lang);
      applyLang(lang);
    });
  });
  applyLang(root.getAttribute('data-lang') || 'de');

  /* ---- Hell / Dunkel ---- */
  function currentTheme() {
    var set = root.getAttribute('data-theme');
    if (set) return set;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store.set('piino-theme', next);
      btn.setAttribute('aria-label', next === 'dark' ? 'Helles Design' : 'Dunkles Design');
    });
  });

  /* ---- Mobile Navigation ---- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.getAttribute('data-open') === 'true';
      nav.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Header-Zustand beim Scrollen ---- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.setAttribute('data-scrolled', String(window.scrollY > 8));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Sanftes Einblenden ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(function (el) { el.setAttribute('data-visible', 'true'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-visible', 'true');
            io.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---- Jahreszahl im Footer ---- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
