/* Minimal progressive enhancement. The site works without JS. */
(function () {
  "use strict";
  var C = window.SITE_CONFIG || {};
  var links = C.links || {};

  // 1. Checkout / waitlist links from config
  document.querySelectorAll("[data-link]").forEach(function (a) {
    var url = links[a.getAttribute("data-link")];
    if (url) a.setAttribute("href", url);
  });

  // 2. Support email
  if (C.supportEmail) {
    document.querySelectorAll("[data-support-email]").forEach(function (a) {
      a.href = "mailto:" + C.supportEmail;
      a.textContent = C.supportEmail;
    });
  }

  // 3. Launch price + countdown (honest: switches to the regular price at the deadline)
  var L = C.launch || {};
  var end = L.endsAt ? new Date(L.endsAt).getTime() : 0;
  var root = document.documentElement;
  function fmt(ms) {
    var s = Math.max(0, Math.floor(ms / 1000));
    var d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
    function p(n) { return (n < 10 ? "0" : "") + n; }
    return (d > 0 ? d + "d " : "") + p(h) + "h " + p(m) + "m " + p(sec) + "s";
  }
  function regular() {
    root.classList.add("launch-over");
    document.querySelectorAll("[data-price-core]").forEach(function (el) { el.textContent = "$" + L.regularPrice; });
  }
  var timers = document.querySelectorAll("[data-countdown]");
  function tick() {
    var left = end - Date.now();
    if (left <= 0) { regular(); return false; }
    timers.forEach(function (el) { el.textContent = fmt(left); });
    return true;
  }
  if (!end) regular();
  else if (tick()) { var iv = setInterval(function () { if (!tick()) clearInterval(iv); }, 1000); }

  // 4. Sticky mobile CTA: show after the hero, hide while pricing/final CTA is on screen
  var bar = document.querySelector(".sticky-cta");
  var hero = document.querySelector(".hero");
  if (bar && hero && "IntersectionObserver" in window) {
    var heroVisible = true, blockers = 0;
    var update = function () { bar.classList.toggle("is-visible", !heroVisible && blockers === 0); };
    new IntersectionObserver(function (e) { heroVisible = e[0].isIntersecting; update(); }).observe(hero);
    var seen = new Map();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { seen.set(en.target, en.isIntersecting); });
      blockers = 0; seen.forEach(function (v) { if (v) blockers++; });
      update();
    });
    document.querySelectorAll("[data-hide-sticky]").forEach(function (el) { io.observe(el); });
  }

  // 5. Waitlist form (placeholder-safe)
  var form = document.querySelector("[data-waitlist-form]");
  if (form) {
    var ep = C.waitlistFormEndpoint || "";
    var status = form.querySelector("[role=status]");
    if (ep && ep.indexOf("PLACEHOLDER") === -1) form.action = ep;
    form.addEventListener("submit", function (ev) {
      if (!ep || ep.indexOf("PLACEHOLDER") !== -1) {
        ev.preventDefault();
        status.hidden = false;
        var es = (document.documentElement.lang || "").indexOf("es") === 0;
        var href = links.waitlist || "#";
        status.innerHTML = es
          ? 'El formulario de la lista de espera todav\u00eda no est\u00e1 conectado. Por favor usa el <a href="' + href + '">registro gratuito en Gumroad</a>.'
          : 'The waitlist form isn\u2019t connected yet. Please use the <a href="' + href + '">free Gumroad waitlist signup</a> instead.';
        status.querySelector("a").focus();
      }
    });
  }

  // 6. Footer year
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
