window.__mjsOk = true; // signals the inline safety-reveal that main.js loaded

// Film player — click-to-play facade.
// Reads data-yt (YouTube ID) or data-mp4 (file path) from .film-frame.
(function () {
  var frame = document.querySelector('.film-frame');
  if (!frame) return;

  function play() {
    var yt = (frame.getAttribute('data-yt') || '').trim();
    var mp4 = (frame.getAttribute('data-mp4') || '').trim();
    var node;

    if (yt) {
      node = document.createElement('iframe');
      node.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(yt) +
                 '?autoplay=1&rel=0&modestbranding=1&playsinline=1';
      node.title = 'SPA CoCoAroma film';
      node.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
      node.setAttribute('allowfullscreen', '');
    } else if (mp4) {
      node = document.createElement('video');
      node.src = mp4;
      node.controls = true;
      node.autoplay = true;
      node.playsInline = true;
      node.setAttribute('preload', 'metadata');
    } else {
      return; // no source yet — stay in "coming soon" state
    }

    frame.innerHTML = '';
    frame.appendChild(node);
    frame.classList.add('film-playing');
  }

  var hasSource = (frame.getAttribute('data-yt') || '').trim() ||
                  (frame.getAttribute('data-mp4') || '').trim();
  if (hasSource) {
    frame.addEventListener('click', play);
  } else {
    frame.setAttribute('aria-disabled', 'true');
  }
})();

// Analytics events — robust, independent of GA's fragile engagement ping.
(function () {
  function track(name, params) {
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  // 1) WhatsApp click = the number that matters (fires instantly on click)
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var where = a.closest('.wa-float') ? 'floating'
                : a.closest('.card') ? 'treatment_card'
                : a.closest('.hero') ? 'hero'
                : a.closest('.nav') ? 'nav'
                : a.closest('.book') ? 'book_section'
                : 'other';
      track('whatsapp_click', { location: where });
    });
  });

  // 2) Instagram click (secondary contact path)
  document.querySelectorAll('a[href*="instagram.com"]').forEach(function (a) {
    a.addEventListener('click', function () { track('instagram_click', {}); });
  });

  // 3) "Real visit" signal — mark engaged if they stay 10s OR scroll past the hero,
  //    so genuine visits register even when the in-app browser closes abruptly.
  var engaged = false;
  function markEngaged(reason) {
    if (engaged) return;
    engaged = true;
    track('engaged_view', { reason: reason });
  }
  setTimeout(function () { markEngaged('stayed_10s'); }, 10000);
  window.addEventListener('scroll', function onScroll() {
    if (window.scrollY > window.innerHeight * 0.6) {
      markEngaged('scrolled');
      window.removeEventListener('scroll', onScroll);
    }
  }, { passive: true });
})();

// Reveal-on-scroll (respects prefers-reduced-motion via CSS)
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach(function (el) { io.observe(el); });
})();
