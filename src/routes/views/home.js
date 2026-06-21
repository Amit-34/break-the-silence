/**
 * Home view — hero, feature cards, and a live API-driven section.
 * `render()` returns the markup; `mount()` wires up the dynamic posts.
 */
import { initPosts } from '../../js/components/posts.js';
import {
  renderCompaniesSlider,
  initCompaniesSlider,
} from '../../js/components/companiesSlider.js';

export const title = 'Acme — Production-Ready Frontend Starter';
export const meta = {
  description:
    'A scalable, accessible frontend starter built with HTML5, Tailwind CSS, and Vanilla JavaScript.',
};

export function render() {
  return /* html */ `
    <!-- Hero -->
    <section class="relative overflow-hidden bg-background-5 pt-6 lg:pt-10 pb-6 lg:pb-[0px]">
      <div class="container">
        <div class="grid items-center gap-4 lg:grid-cols-2 lg:gap-12">
          <!-- Illustration: stacked on top for mobile, right column on desktop -->
          <div class="order-first lg:order-last">
            <img
              src="assets/images/heal.png"
              alt="HEAL — a workplace mental health awareness campaign illustration of women surrounded by flowers"
              class="mx-auto w-full max-w-md lg:ml-auto lg:max-w-none"
              loading="eager"
              decoding="async"
            />
          </div>

          <!-- Copy -->
          <div class="lg:max-w-xl text-center lg:text-left">
            <p class="text-2xl  text-neutral-7 sm:text-4xl ">
              A workplace mental health awareness campaign by
              <span class="font-bold text-primary-1">Quest Global</span> and
              <span class="font-semibold text-primary-1">YourDOST</span>, inviting Indian
              companies to respond to pregnancy loss with policy, empathy, resources,
              and visible leadership.
            </p>
            <div class="mt-4 lg:mt-8">
              <a
                href="/contact"
                data-link
                class="btn-pill btn-cta-primary"
              >
                Get Involved
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Committed / invited companies — responsive Swiper carousel -->
    ${renderCompaniesSlider()}

    <!-- Why this silence costs more than words — research / proof section -->
    <section class="relative bg-background-1 py-10 lg:py-20" aria-labelledby="research-heading ">
    <div class="max-w-24 lg:max-w-[230px] mx-auto absolute right-2 -bottom-4 lg:bottom-[-30px]">
<img src="assets/images/lotus-1.png"
                alt="lotus"
                class="h-auto w-full  object-cover"
                loading="lazy"
                decoding="async"
              />
    </div>
      <div class="container">
        <div class="grid items-center gap-8 lg:grid-cols-[minmax(0,476px)_1fr] lg:gap-10">
          <!-- Illustration: bordered frame, stacked on top for mobile -->
          <div class="order-first">
            <div class="overflow-hidden rounded-lg ">
              <img
                src="assets/images/woman-with-lily-mask.jpg"
                alt="Illustration of a woman surrounded by lilies, eyes closed in quiet reflection"
                width="476"
                height="570"
                class="h-auto w-full rounded-lg object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          <!-- Copy + statistics -->
          <div>
            <h2
              id="research-heading"
              class="text-3xl font-bold text-neutral-7 lg:text-4xl "
            >
              Why this silence costs more than words
            </h2>
            <p class="mt-3 max-w-prose text-lg lg:text-xl text-neutral-8">
              Following the reference structure, the research proof appears immediately after the
              hero so the campaign moves from emotion to evidence before asking companies to act.
            </p>

            <!-- 2x2 statistics grid -->
            <dl class="mt-8 grid grid-cols-1 gap-x-10 gap-y-8 sm:grid-cols-2">
              <div>
                <dt class="font-bold text-primary-1 text-4xl  lg:text-[82px] lg:leading-[82px]">
                  1 in 4
                </dt>
                <dd class="mt-3 max-w-xs  text-neutral-8">
                  Pregnancy loss is common, yet rarely named in workplace policy.
                </dd>
              </div>

              <div>
                <dt class="font-bold text-primary-1 text-4xl  lg:text-[82px] lg:leading-[82px]">
                  72%
                </dt>
                <dd class="mt-3 max-w-xs  text-neutral-8">
                  Women may return to work quickly without structured support.
                </dd>
              </div>

              <div>
                <dt class="font-bold text-primary-1 text-4xl  lg:text-[82px] lg:leading-[82px]">
                  3&times;
                </dt>
                <dd class="mt-3 max-w-xs  text-neutral-8">
                  Unsupported loss can affect engagement, productivity, and trust.
                </dd>
              </div>

              <div>
                <dt class="font-bold text-primary-1 text-4xl  lg:text-[82px] lg:leading-[82px]">
                  89%
                </dt>
                <dd class="mt-3 max-w-xs  text-neutral-8">
                  Clear policy signals that people do not have to grieve alone.
                </dd>
              </div>
            </dl>

            <!-- Source attribution -->
            <div class="mt-8 flex flex-col gap-1.5">
              <span
                class="inline-flex w-fit items-center rounded-md border border-neutral-4 bg-background-1 px-2.5 py-1 text-sm font-bold tracking-tight text-accent-error"
              >
                YouGov
              </span>
              <p class="text-xs text-neutral-3">*Statistics Source</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What the campaign is, and who it is for — audience cards -->
    <section class="bg-background-2 py-10 lg:py-20" aria-labelledby="audience-heading">
      <div class="container">
        <h2 id="audience-heading" class="text-3xl font-bold text-neutral-7 lg:text-4xl ">
          What the campaign is, and who it is for(40)
        </h2>
        <p class="mt-3 text-lg lg:text-xl text-neutral-8">
          Break the Silence is structured as a public awareness, resource, and company-participation campaign. It is designed for women who have experienced loss, HR leaders, managers, CEOs, colleagues, and allies(196).
        </p>

        <ul class="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          ${[
      {
        title: 'For individuals',
        copy: 'Read stories, share anonymously, find helplines, and connect to Safe Circle support.',
        img: 'assets/images/campaign-1.jpg',
      },
      {
        title: 'For companies',
        copy: 'Join the program, receive resources, implement policy, and be publicly recognised without a sales-heavy tone.',
        img: 'assets/images/campaign-2.jpg',
      },
      {
        title: 'For artists and allies',
        copy: 'Submit artwork or messages that help the campaign become visible in offices and social channels.',
        img: 'assets/images/campaign-3.jpg',
      },
    ]
      .map(
        ({ title, copy, img }) => /* html */ `
            <li class="group relative aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src="${img}"
                alt=""
                class="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
              <!-- Plum gradient overlay keeps the white text readable -->
              <div
                class="absolute inset-0 bg-[linear-gradient(180deg,rgba(102,102,102,0.45)_32.06%,rgba(94,35,85,0.9)_91.51%)]"
                aria-hidden="true"
              ></div>
              <div class="absolute inset-x-0 bottom-0 p-5 lg:p-6">
                <h3 class="text-xl font-bold text-neutral-6 lg:text-2xl">${title}</h3>
                <p class="mt-1.5 max-w-xs font-regular text-neutral-6">${copy}</p>
              </div>
            </li>`,
      )
      .join('')}
        </ul>
      </div>
    </section>

    <!-- Three ways to stand with the campaign — staggered cards + photos -->
    <section class="relative bg-background-1 py-10 lg:py-20" aria-labelledby="ways-heading">
        <div class="max-w-16 lg:max-w-[126px] z-10 mx-auto absolute right-2 lg:right-28 -bottom-4 lg:bottom-[-42px]">
<img src="assets/images/decorative-flower.png"
                alt="lotus"
                class="h-auto w-full  object-cover"
                loading="lazy"
                decoding="async"
              />
    </div>
      <div class="container">
        <div class="grid gap-8 lg:grid-cols-[minmax(0,300px)_1fr] lg:gap-12 xl:gap-16">
          <!-- Left: heading + intro -->
          <div class="lg:pt-2">
            <h2 id="ways-heading" class="text-3xl font-bold text-neutral-7 lg:text-4xl ">
              Three ways to stand with the campaign
            </h2>
            <p class="mt-3 max-w-md text-lg lg:text-xl text-neutral-8">
              The campaign should feel welcoming and movement-led, not sales-led. Companies are
              invited into a shared commitment, not pushed through a transactional sign-up.
            </p>
          </div>

          <!-- Right: masonry-style content -->
          <div>
            <div class="flex flex-col gap-4 lg:flex-row lg:gap-5">
              <!-- Column 1: card 01 + photo -->
              <div class="flex flex-col-reverse lg:flex-col gap-4 lg:flex-1 lg:gap-5">
                <article class="rounded-lg bg-background-4 p-5 lg:min-h-[380px]">
                  <span class="text-5xl font-bold leading-none text-neutral-7 lg:text-[82px] lg:leading-[82px]">01</span>
                  <div class="mt-6 lg:mt-12">
                    <h3 class="text-xl font-bold text-neutral-7 lg:text-2xl">Share a story</h3>
                    <p class="mt-2 text-base text-neutral-2">
                      Anonymous or named submission flow with consent, moderation, and optional
                      image upload.
                    </p>
                  </div>
                </article>
                <div class="overflow-hidden rounded-lg">
                  <img
                    src="assets/images/campaign/share-story.jpg"
                    alt="A woman writing notes at her desk"
                    class="aspect-[4/3] h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              <!-- Column 2: photo + card 02 -->
              <div class="flex flex-col gap-4 lg:flex-1 lg:gap-5">
                <div class="overflow-hidden rounded-lg">
                  <img
                    src="assets/images/campaign/workplace.jpg"
                    alt="Colleagues collaborating around a laptop"
                    class="aspect-[4/3] h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <article class="rounded-lg bg-background-4 p-5 lg:min-h-[380px]">
                  <span class="text-5xl font-bold leading-none text-neutral-7 lg:text-[82px] lg:leading-[82px]">02</span>
                  <div class="mt-6 lg:mt-12">
                    <h3 class="text-xl font-bold text-neutral-7 lg:text-2xl">Welcome your workplace</h3>
                    <p class="mt-2 text-base text-neutral-2">
                      Invite your organisation to be part of the campaign with workplace details,
                      location, leadership contact, and participation context.
                    </p>
                  </div>
                </article>
              </div>

              <!-- Column 3: card 03 + photo -->
              <div class="flex flex-col-reverse lg:flex-col gap-4 lg:flex-1 lg:gap-5">
                <article class="rounded-lg bg-background-4 p-5 lg:min-h-[380px]">
                  <span class="text-5xl font-bold leading-none text-neutral-7 lg:text-[82px] lg:leading-[82px]">03</span>
                  <div class="mt-6 lg:mt-12">
                    <h3 class="text-xl font-bold text-neutral-7 lg:text-2xl">Access support</h3>
                    <p class="mt-2 text-base text-neutral-2">
                      Helpline, Safe Circle, and YourDOST support routes for people who need help
                      now.
                    </p>
                  </div>
                </article>
                <div class="overflow-hidden rounded-lg">
                  <img
                    src="assets/images/campaign/support.jpg"
                    alt="A woman on a phone call while working at her laptop"
                    class="aspect-[4/3] h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div class="mt-8">
              <a
                href="/contact"
                data-link
                class="btn-pill btn-cta-primary"
              >
                Get Involved
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

  

    <!-- Tools to make support visible — resource hub cards -->
    <section class="relative bg-background-2 py-10 lg:py-20" aria-labelledby="tools-heading">
      <div class="container">
        <h2 id="tools-heading" class="text-3xl font-bold text-neutral-7 lg:text-4xl ">
          Tools to make support visible
        </h2>
        <p class="mt-3 text-lg lg:text-xl text-neutral-8">
          The resource hub combines downloadable posters, HR materials, helpline options, Safe
          Circle connection, and artist-led awareness. This follows the uploaded reference
          structure while adding the latest client feedback.
        </p>

        <ul class="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 ">
          ${[
      {
        title: 'Office posters',
        copy: 'Six artwork placeholders with final image, caption, download state, and office-use guidance.',
        icon: /* html */ `office-posters`,
      },
      {
        title: 'HR materials',
        copy: 'Policy template, manager scripts, webinar recording, and response checklist.',
        icon: /* html */ `hr-materials`,
      },
      {
        title: 'Helplines',
        copy: 'Tap-to-call cards for urgent and non-urgent emotional support routes.',
        icon: /* html */ `helplines`,
      },
      {
        title: 'Safe Circle',
        copy: 'Consent-led intake and warm handoff to the YourDOST support ecosystem.',
        icon: /* html */ `safe-circle`,
      },
    ]
      .map(
        ({ title, copy, icon }) => /* html */ `
            <li class="flex flex-col rounded-lg bg-background-1 p-6 ">
              <span
                class="inline-flex h-16 w-16 items-center justify-center rounded-lg bg-primary-4 text-neutral-6"
                aria-hidden="true"
              >
               <img src="assets/images/${icon}.svg" alt="" aria-hidden="true" class="h-8 w-8" />
              </span>
              <h3 class="mt-4 text-xl font-bold text-neutral-7 lg:text-2xl">${title}</h3>
              <p class="mt-2 text-base text-neutral-8">${copy}</p>
            </li>`,
      )
      .join('')}
        </ul>

        <!-- CTA -->
        <div class="mt-7 flex justify-center">
          <a
            href="/contact"
            data-link
            class="btn-pill btn-cta-primary"
          >
            Access All Resource
          </a>
        </div>
      </div>

         <div class="max-w-24 lg:max-w-[218px] z-10 mx-auto absolute left-4 -bottom-4 lg:bottom-[-30px]">
<img src="assets/images/lotus-2.png"
                alt="lotus"
                class="h-auto w-full  object-cover"
                loading="lazy"
                decoding="async"
              />
    </div>
    </section>


      <!-- Stories that break the silence — testimonial circles -->
    <section class="relative overflow-hidden bg-background-1 py-10 lg:py-20" aria-labelledby="stories-heading">
      <div class="container">
        <h2 id="stories-heading" class="text-3xl font-bold text-neutral-7 lg:text-4xl">
          Stories that break the silence<span class="text-xl lg:text-2xl">(30)</span>
        </h2>
        <p class="mt-3 text-lg lg:text-xl text-neutral-8">
          The reference file places stories before resources so the user first hears lived
          experience, then receives tools for change.<span class="text-base">(124)</span>
        </p>

        <!-- Story circles -->
        <div class="relative mt-4 lg:mt-6">
     

          <ul class="relative grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            ${[
      {
        quote:
          'I went back to work before I had words for what happened. A policy would have made the silence easier to break.',
        firstName: 'Priya',
        lastName: 'Chowdhary',
      },
      {
        quote:
          'As an HR manager, I needed language, not just sympathy. The campaign gives us a way to respond.',
        firstName: 'Sonia',
        lastName: 'Agarwal',
      },
      {
        quote:
          'When our company named pregnancy loss in policy, people finally knew they were allowed to ask for support.',
        firstName: 'Anonymous',
        lastName: 'Employee',
      },
    ]
      .map(
        ({ quote, firstName, lastName }) => /* html */ `
            <li class="relative mx-auto flex w-full max-w-[300px] flex-col items-center">
              <!-- Yellow circle holding the quote -->
              <div class="relative flex aspect-square w-full items-center justify-center rounded-full bg-background-4">
                <p class="px-8 text-base font-semibold  text-neutral-7 text-left">
                  &ldquo;${quote}&rdquo;
                </p>

             
              </div>

              <div class="absolute -bottom-7 right-2">
                 <!-- Avatar overlapping the bottom-right edge -->
                <img
                  src="assets/images/user.png"
                  alt="Portrait of ${firstName} ${lastName}"
                  width="90"
                  height="90"
                  class=" h-16 w-16 rounded-full border-8 border-white object-cover lg:h-[90px] sm:w-[90px]"
                  loading="lazy"
                  decoding="async"
                />

                  <!-- Name sits below the avatar -->
              <p class="text-left text-sm font-bold leading-tight text-neutral-7 pl-2">
                ${firstName}<br />${lastName}
              </p>
              </div>

            
            </li>`,
      )
      .join('')}
          </ul>
        </div>

        <!-- CTA -->
        <div class="mt-16 flex justify-center">
          <button type="button" class="btn-pill btn-cta-primary">
            Read More Stories
          </button>
        </div>
      </div>
    </section>

    <!-- The organisations behind the campaign — founding sponsor cards on a soft pink panel -->
    <section
      class="org-panel relative overflow-hidden bg-background-3 py-16 lg:py-28"
      aria-labelledby="organisations-heading"
    >
      <!-- Curved white edges (broad, shallow sweep — see home.css) -->
      <div class="org-panel__curve org-panel__curve--top" aria-hidden="true">
      </div>
      <div class="org-panel__curve org-panel__curve--bottom" aria-hidden="true"></div>

      <!-- Decorative marigold cluster (top center) -->
      <div class="pointer-events-none absolute left-1/2 top-0 lg:top-11 z-[1] w-full max-w-[85px] -translate-x-1/2  lg:max-w-28">
        <img
          src="assets/images/flower-3.png"
          alt=""
          aria-hidden="true"
          class="h-auto w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>

      <!-- Decorative blue flowers (top right) -->
      <div class="pointer-events-none absolute right-4 top-3 z-[1] w-16 lg:right-16 lg:top-5 lg:w-24">
        <img
          src="assets/images/flower-2.png"
          alt=""
          aria-hidden="true"
          class="h-auto w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>

      <!-- Decorative faint lotus (bottom left) -->
      <div class="absolute bottom-0 lg:-bottom-2 left-2 z-[1] w-full lg:left-10 max-w-[80px] lg:max-w-[248px]">
        <img
          src="assets/images/lotus-3.png"
          alt=""
          aria-hidden="true"
          class="h-auto w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div class="container relative z-10 py-8 lg:py-20">
        <h2
          id="organisations-heading"
          class="text-center text-2xl font-bold text-neutral-7 sm:text-3xl lg:text-4xl"
        >
          The organisations behind the campaign<span class="text-lg lg:text-2xl">(37)</span>
        </h2>

        <ul class="mx-auto mt-10 grid  grid-cols-1 gap-8 sm:grid-cols-2 lg:mt-14 lg:gap-12">
          ${[
      {
        name: 'Quest Global',
        logo: 'assets/images/comapnies/quest.png',
        lead: 'Co-founder and founding sponsor.',
        copy: 'The header gives Quest Global slightly stronger visual prominence while positioning the program as an India-wide campaign that other companies are warmly invited to stand with the campaign.(222)',
      },
      {
        name: 'YourDOST',
        logo: 'assets/images/comapnies/your-dost.png',
        lead: 'Co-founder and founding sponsor.',
        copy: 'YourDOST is represented equally in the campaign role, with emphasis on counselling, Safe Circle support, and HR wellbeing resources.',
      },
    ]
      .map(
        ({ name, logo, lead, copy }) => /* html */ `
          <li class="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-start sm:gap-5 sm:text-left">
            <!-- Concentric logo ring: gray outer → faint pink → white inner disc -->
            <div
              class="grid h-28 w-28 shrink-0 place-items-center rounded-full bg-[#E9E9E9] lg:h-[185px] lg:w-[185px]"
            >
              <div class="grid h-[76%] w-[76%] place-items-center rounded-full bg-background-3">
                <div
                  class="grid h-[86%] w-[86%] place-items-center rounded-full bg-background-1"
                >
                  <img
                    src="${logo}"
                    alt="${name} logo"
                    class="h-auto w-full max-w-[85px] object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            <!-- Copy -->
            <div class="sm:pt-2">
              <h3 class="font-bold text-neutral-7 lg:text-2xl">${name}</h3>
              <p class="mt-1.5 text-base text-neutral-7">
                <span class="font-bold text-neutral-7">${lead}</span> ${copy}
              </p>
            </div>
          </li>`,
      )
      .join('')}
        </ul>
      </div>
    </section>

    
  `;
}

export function mount() {
  // Populate the [data-posts] grid after the view markup is in the DOM.
  initPosts();

  // Spin up the companies logo carousel.
  initCompaniesSlider();
}
