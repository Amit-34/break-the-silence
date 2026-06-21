/**
 * Companies logo carousel.
 *
 * Renders a responsive Swiper of partner / invited company logos.
 * Logo images live in `assets/images/comapnies/` — add or remove entries in
 * the `COMPANIES` array below and drop the matching file in that folder.
 *
 * Swiper itself is loaded globally via CDN in index.html (`window.Swiper`).
 */
import { qs } from '../utils/dom.js';

/** @typedef {{ name: string, file: string, url?: string }} Company */

/** @type {Company[]} */
export const COMPANIES = [
  { name: 'Quest Global', file: 'quest.png' },
  { name: 'YourDOST', file: 'your-dost.png' },
  { name: 'TCS', file: 'tcs.png' },
  { name: 'Wipro', file: 'wipro.png' },
  { name: 'Wipro', file: 'wipro.png' },
  { name: 'Wipro', file: 'wipro.png' },
  { name: 'Wipro', file: 'wipro.png' },
  { name: 'Razorpay', file: 'razorpay.png' },
];

const LOGO_BASE = 'assets/images/comapnies/';

/** Build the markup for a single slide. */
function slide({ name, file, url }) {
  const img = /* html */ `
    <img
      src="${LOGO_BASE}${file}"
      alt="${name} logo"
      class="companies-logo"
      loading="lazy"
      decoding="async"
    />`;

  const inner = url
    ? /* html */ `<a href="${url}" target="_blank" rel="noopener noreferrer" class="companies-card" aria-label="${name}">${img}</a>`
    : /* html */ `<div class="rounded-lg w-full h-full flex items-center justify-center bg-background-1 companies-card" role="img" aria-label="${name}">${img}</div>`;

  return /* html */ `<div class="swiper-slide">${inner}</div>`;
}

/**
 * Returns the full companies section markup (heading + Swiper container).
 * @param {Company[]} [companies]
 */
// Loop mode needs noticeably more slides than are visible at once, otherwise
// Swiper disables looping. Duplicate the logo list until we have enough.
const MIN_LOOP_SLIDES = 12;

export function renderCompaniesSlider(companies = COMPANIES) {
  let displayList = companies;
  if (companies.length > 0 && companies.length < MIN_LOOP_SLIDES) {
    const repeats = Math.ceil(MIN_LOOP_SLIDES / companies.length);
    displayList = Array.from({ length: repeats }, () => companies).flat();
  }
  const slides = displayList.map(slide).join('');

  return /* html */ `
    <section class="bg-background-6 py-10 lg:py-20 overflow-hidden" aria-labelledby="companies-heading">
      <div class="w-full lg:w-[calc(100%-6%)] ml-auto">
        <div class="grid items-center gap-6 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-10">
          <!-- Heading -->
          <h2 id="companies-heading" class="text-center lg:text-left text-3xl font-bold text-neutral-7 lg:text-4xl px-4 lg:px-0">
            Committed /<br class="hidden sm:block" />
            invited companies<span class="text-xl lg:text-2xl">(${companies.length})</span>
          </h2>

          <!-- Logo carousel: bleeds off the right edge of the viewport -->
          <div class="companies-slider w-full swiper" data-companies-slider>
            <div class="swiper-wrapper">
              ${slides}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

let instance = null;

/** Create the Swiper, replacing any previous instance. */
function createSwiper(el) {
  // Destroy any previous instance (e.g. on SPA re-navigation) to avoid leaks.
  if (instance) {
    instance.destroy(true, true);
    instance = null;
  }

  instance = new window.Swiper(el, {
    slidesPerView: 1.5,
    spaceBetween: 16,
    loop: true,
    loopAdditionalSlides: 3,
    slidesPerGroup: 1,
    centeredSlides: false,
    slidesOffsetBefore: 0,
    grabCursor: true,
    autoplay: {
      delay: 2200,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      480: { slidesPerView: 2.5, spaceBetween: 16 },
      768: { slidesPerView: 3.5, spaceBetween: 20 },
      // Desktop: show 4.5 cards (half of the next one peeks/crops on the right).
      1024: { slidesPerView: 4.5, spaceBetween: 24 },
    },
  });

  return instance;
}

/**
 * Initialize the Swiper instance for the companies slider.
 * Safe to call when the element is absent (returns early). If the Swiper CDN
 * script hasn't executed yet, it polls briefly until `window.Swiper` exists.
 */
export function initCompaniesSlider() {
  const el = qs('[data-companies-slider]');
  if (!el) {
    return;
  }

  if (typeof window.Swiper !== 'undefined') {
    return createSwiper(el);
  }

  // CDN script may not have executed yet — retry for ~4s before giving up.
  let tries = 0;
  const timer = setInterval(() => {
    if (typeof window.Swiper !== 'undefined') {
      clearInterval(timer);
      createSwiper(el);
    } else if (++tries > 40) {
      clearInterval(timer);
      console.warn('Swiper failed to load from CDN — companies slider stays static.');
    }
  }, 100);
}
