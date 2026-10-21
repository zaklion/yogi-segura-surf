/* =====================================================================
   SITE CONFIG: the ONE place to swap checkout links, form endpoint,
   support email and launch-price dates. Every buy button and the
   waitlist form on every page read from here (via data-link="...").
   ===================================================================== */
window.SITE_CONFIG = {
  links: {
    // Gumroad product links. Replace PLACEHOLDER URLs with the real ones,
    // e.g. "https://yogisegura.gumroad.com/l/surf-course"
    core: "https://gumroad.com/l/PLACEHOLDER-core",          // Core Course ($249 / launch $199)
    analysis: "https://gumroad.com/l/PLACEHOLDER-analysis",  // Course + Pro Video Analysis ($399)
    waitlist: "https://gumroad.com/l/PLACEHOLDER-waitlist",  // Free $0 Gumroad product used as trip waitlist
  },

  // Optional: POST endpoint for the on-page waitlist form (Formspree, Tally,
  // Netlify Forms, ConvertKit, etc). While it contains "PLACEHOLDER" the form
  // shows a "not connected yet" notice and points to the Gumroad waitlist link.
  waitlistFormEndpoint: "https://PLACEHOLDER-FORM-ENDPOINT.example.com/waitlist",

  supportEmail: "support@example.com", // PLACEHOLDER

  launch: {
    regularPrice: 249,
    launchPrice: 199,
    // When the 14-day launch price ends (ISO 8601, Costa Rica time = -06:00).
    // PLACEHOLDER: set to cart-open date + 14 days. After this moment the site
    // automatically shows $249 and hides the countdown. Set to "" to show the
    // regular price only. Remember to change the price on Gumroad too.
    endsAt: "2026-12-01T23:59:00-06:00",
  },
};
