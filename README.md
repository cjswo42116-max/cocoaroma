# SPA CoCoAroma — website

Single-page responsive site for SPA CoCoAroma, a private aroma spa near Hamdeok Beach, Jeju.
Built for foreign visitors arriving via Google Maps: understand the treatments and book via WhatsApp in a few taps.

- **Stack:** plain HTML + CSS + vanilla JS (no build step)
- **Hosting:** GitHub Pages
- **Booking:** WhatsApp deep links (prefilled message)
- **Film:** YouTube embed (click-to-play facade)

## Edit notes

- **Add / change the film:** in `index.html`, set `data-yt="<youtube-id>"` on `.film-frame`
  (or drop an mp4 at `assets/video/` and set `data-mp4="assets/video/…"`).
- **Prices / menu:** edit the `.rows` lists inside `#treatments`.
- **Photos:** replace files in `assets/img/` (keep the same filenames, or update the `src`).

Managed with the SPA CoCoAroma knowledge base.
