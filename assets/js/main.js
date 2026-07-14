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
