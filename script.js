/* IzuTech: language switch (French first, English available) and contact form. */
(function () {
  "use strict";

  var EN = {
    "skip": "Skip to content",
    "navLabel": "Main navigation",
    "langAria": "Passer en français",
    "nav.offers": "Services",
    "nav.workshop": "Workshop",
    "nav.method": "How it works",
    "nav.about": "About",
    "nav.faq": "Questions",
    "nav.cta": "Contact me",

    "hero.kicker": "Izumi Bérat, engineer based in Pau, France. AI automation for small and mid-sized businesses.",
    "hero.title": "Less data entry, more time for your clients.",
    "hero.lead": "I help small businesses hand repetitive work to AI: invoices to re-type, answers to dig out of documents, support replies. Fixed price, first prototype in two weeks. And if it isn't worth it for you, I'll tell you.",
    "hero.cta": "Request a free call",
    "hero.secondary": "See services and prices",
    "hero.note": "Free call, no commitment, by video or in Pau.",

    "sectors.title": "Where AI actually helps",
    "sectors.lead": "No big “transformation” plan. We start from one specific task that costs you time every week. A few examples:",
    "sectors.s1.t": "Accounting firms",
    "sectors.s1.d": "Invoices and statements received as PDFs are read and entered into your accounting software. You check instead of typing.",
    "sectors.s2.t": "Insurance brokers",
    "sectors.s2.d": "An assistant finds the right clause in policies and terms, with a reference to the source document.",
    "sectors.s3.t": "Logistics and transport",
    "sectors.s3.d": "Delivery notes are read and matched to orders without re-typing. Mismatches are flagged for you.",
    "sectors.s4.t": "Software companies",
    "sectors.s4.d": "Every support ticket arrives with a draft reply in your tone. Your team reviews and sends.",
    "sectors.s5.t": "Healthcare administration",
    "sectors.s5.d": "Incoming letters and requests are sorted and summarised before they reach the right desk.",

    "offers.title": "Services",
    "offers.lead": "Each service has a clear scope. The listed price is a starting point. After the audit, you get a fixed quote.",
    "offers.from": "from",
    "offers.exampleLabel": "Example:",
    "offers.o1.t": "Automated data processing",
    "offers.o1.d": "Your invoices, purchase orders or forms arrive by email or as PDFs. The tool reads the information, puts it into your software or spreadsheet, and flags anything that needs checking. You keep the final say.",
    "offers.o1.e": "supplier invoices entered straight into your accounting software.",
    "offers.o2.t": "Internal assistant for your documents",
    "offers.o2.d": "Your procedures, contracts and notes are scattered. The assistant answers your team’s questions from your own documents, and shows where each answer comes from.",
    "offers.o2.e": "a new hire finds out how to handle a case without interrupting colleagues.",
    "offers.o3.t": "Customer support co-pilot",
    "offers.o3.d": "The tool drafts a reply inside your support tool (Zendesk, Intercom, Freshdesk…), in your brand’s voice. Your team reviews, edits if needed, and sends.",
    "offers.o3.e": "common billing questions have a reply ready to review.",
    "offers.foot": "Included with every service: a prototype on your real data, documentation, team training and 30 days of support.",

    "workshop.tag": "New",
    "workshop.title": "Workshop: build your own agent with Claude",
    "workshop.p1": "Would you rather learn to do it yourself? In half a day, we build an agent together that handles a real task from your week: sorting emails, preparing meeting notes, keeping a tracking sheet up to date.",
    "workshop.p2": "You leave with an agent that works, and a simple method to build more. No technical background needed.",
    "workshop.f1.k": "Length",
    "workshop.f1.v": "Half a day, plus a 1-hour follow-up two weeks later",
    "workshop.f2.k": "For",
    "workshop.f2.v": "Business owners and teams, up to 6 people",
    "workshop.f3.k": "Where",
    "workshop.f3.v": "At your office in Pau, or by video",
    "workshop.f4.k": "Price",
    "workshop.cta": "Ask about the workshop",

    "method.title": "How we work",
    "method.s1.t": "A 30-minute call",
    "method.s1.d": "Free. You tell me what takes up your time. I tell you honestly whether AI can help.",
    "method.s2.t": "The audit",
    "method.s2.d": "We look at one specific task together: how long it takes, what can be automated, what should stay human. You get a fixed quote.",
    "method.s3.t": "A prototype in 1 to 2 weeks",
    "method.s3.d": "It runs on your real data. You try it, and you decide whether to go further.",
    "method.s4.t": "Rollout in 4 to 8 weeks",
    "method.s4.d": "Connection to your tools, documentation and team training.",
    "method.s5.t": "30 days of support",
    "method.s5.d": "I adjust whatever needs adjusting. After that, ongoing maintenance is available if you want it.",

    "doubts.title": "What I often hear",
    "doubts.q1": "“We tried ChatGPT. It stayed a gadget.”",
    "doubts.a1": "That’s expected without access to your documents and tools. I connect AI to your real work, for one specific task.",
    "doubts.q2": "“I’m not technical.”",
    "doubts.a2": "You don’t need to be. You know your business. I handle the technical side and explain everything in plain words.",
    "doubts.q3": "“Our data is sensitive.”",
    "doubts.a3": "We choose together where it is processed. GDPR is built in from the start, and you always know where your data goes.",
    "doubts.q4": "“What if the AI gets it wrong?”",
    "doubts.a4": "It happens. That’s why a person always checks before anything goes to a client or into the accounts.",

    "about.title": "Who is behind IzuTech",
    "about.role": "Founder of IzuTech, Pau",
    "about.photoAlt": "Portrait of Izumi Bérat",
    "about.p1": "I’m Izumi Bérat, an engineer by training. I started at the European Space Agency, on the BepiColombo mission to Mercury, working with European and Japanese teams.",
    "about.p2": "I then spent several years in New York in IT and product: banking infrastructure migration, then Director for Web Initiatives at Columbia University, where I led the move of a fundraising platform to AWS and Salesforce. More recently, I led a small technical support team for clients in Europe, the US and Japan.",
    "about.p3": "In between, I took several years to travel with my family across Asia and Europe. Today I live in Pau with my wife and our three boys. I work in French, English and Japanese.",
    "about.p5": "In 2024, back in a technical support role, I spent so many hours at the screen that my body had seized up: I struggled to put my socks on. I started yoga, meditation and running, every day. It changed everything, including how I see technology: it should help us focus on what really matters.",
    "about.p4": "What drives me: removing friction, so teams can spend their time on what matters.",
    "about.seniors": "I also help seniors in Pau with technology, at home: <a href=\"https://seniors.izutech.fr/\">seniors.izutech.fr</a> (in French)",

    "faq.title": "Questions",
    "faq.q1": "What does it cost in the end?",
    "faq.a1": "Listed prices are starting points for a defined scope. After the audit, you get a fixed quote. It doesn’t change along the way without your agreement.",
    "faq.q2": "Which tools can you work with?",
    "faq.a2": "The ones you already use: accounting software, CRM, Google Workspace or Microsoft 365, your support tool. If a tool is hard to connect, I’ll tell you during the audit.",
    "faq.q3": "What happens after delivery?",
    "faq.a3": "30 days of support are included. You get the documentation, and your team is trained. After that, maintenance is available if you want it.",
    "faq.q4": "Do you only work in Pau?",
    "faq.a4": "I’m based in Pau and happy to travel within Nouvelle-Aquitaine. For the rest of France and abroad, remote works very well.",
    "faq.q5": "Do I need a subscription to an AI tool?",
    "faq.a5": "Often yes, at a modest monthly cost. I include it in the quote so you know the full cost before you decide.",

    "contact.title": "Is one task eating hours of your week?",
    "contact.lead": "Describe it in a few lines. I’ll reply in writing within two working days with a concrete idea. It’s free and there’s no commitment.",
    "contact.or": "Would you rather talk it through? Say so in your message and I’ll suggest a time for a call.",
    "contact.mail": "By email:",

    "form.name": "Your name",
    "form.email": "Your email",
    "form.company": "Company",
    "form.optional": "(optional)",
    "form.task": "The task that takes you the most time",
    "form.taskPh": "For example: every Monday we re-type about forty delivery notes by hand.",
    "form.submit": "Send my request",
    "form.sending": "Sending…",
    "form.ok": "Thank you. Your request is on its way. I’ll reply within two working days.",
    "form.err": "Sending didn’t work. Please write to me directly at contact@izutech.fr.",
    "form.missing": "Please fill in your name, a valid email and the task.",

    "footer.where": "AI automation for small businesses. Pau, Pyrénées-Atlantiques, France.",
    "footer.seniors": "Tech help for seniors (in French)",
    "footer.web": "Websites for small businesses",
    "footer.events": "Event dashboards",
    "footer.legal": "Legal notice and privacy (in French)",

    "meta.title": "IzuTech · AI automation for small businesses, Pau",
    "meta.description": "I help small businesses automate repetitive work with AI: invoice entry, document search, support replies. Fixed prices, prototype in 2 weeks. Based in Pau, France."
  };

  var FR_EXTRA = {
    "langAria": "Switch to English",
    "navLabel": "Navigation principale",
    "form.sending": "Envoi en cours…",
    "form.ok": "Merci. Votre demande est bien partie. Je vous réponds sous deux jours ouvrés.",
    "form.err": "L'envoi n'a pas fonctionné. Écrivez-moi directement à contact@izutech.fr.",
    "form.missing": "Merci d'indiquer votre nom, un email valide et la tâche."
  };

  var STORE_KEY = "izutech-lang";
  var FR = {};
  var current = "fr";

  function store(get, value) {
    try {
      if (get) return window.localStorage.getItem(STORE_KEY);
      window.localStorage.setItem(STORE_KEY, value);
    } catch (e) { return null; }
    return null;
  }

  // French is the page's own text; capture it once so we can switch back.
  function captureFrench() {
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      if (!(k in FR)) FR[k] = el.innerHTML;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      FR[el.getAttribute("data-i18n-placeholder")] = el.getAttribute("placeholder");
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      FR[el.getAttribute("data-i18n-alt")] = el.getAttribute("alt");
    });
    FR["meta.title"] = document.title;
    var md = document.querySelector('meta[name="description"]');
    if (md) FR["meta.description"] = md.getAttribute("content");
    Object.keys(FR_EXTRA).forEach(function (k) { FR[k] = FR_EXTRA[k]; });
  }

  function t(key) {
    var dict = current === "en" ? EN : FR;
    return dict[key] != null ? dict[key] : (FR[key] || "");
  }

  function apply(lang) {
    current = lang === "en" ? "en" : "fr";
    var dict = current === "en" ? EN : FR;
    document.documentElement.lang = current;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (v != null) el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n-placeholder")];
      if (v != null) el.setAttribute("placeholder", v);
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n-alt")];
      if (v != null) el.setAttribute("alt", v);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n-aria")];
      if (v != null) el.setAttribute("aria-label", v);
    });
    if (dict["meta.title"]) document.title = dict["meta.title"];
    var md = document.querySelector('meta[name="description"]');
    if (md && dict["meta.description"]) md.setAttribute("content", dict["meta.description"]);
    var btn = document.getElementById("lang-toggle");
    if (btn) btn.textContent = current === "en" ? "FR" : "EN";
  }

  // French unless the visitor asked for English, or their device is set to a language other than French.
  function initialLanguage() {
    var param = null;
    try { param = new URLSearchParams(window.location.search).get("lang"); } catch (e) {}
    if (param === "en" || param === "fr") return param;
    var saved = store(true);
    if (saved === "en" || saved === "fr") return saved;
    var langs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || "fr"];
    var primary = String(langs[0] || "fr").toLowerCase();
    return primary.indexOf("fr") === 0 ? "fr" : "en";
  }

  function setupForm() {
    var form = document.getElementById("lead-form");
    if (!form) return;
    var status = document.getElementById("form-status");
    var submit = document.getElementById("f-submit");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      var name = form.elements.name, email = form.elements.email, task = form.elements.message;
      var bad = false;
      [name, email, task].forEach(function (f) {
        var invalid = !f.value.trim() || (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.value.trim()));
        f.setAttribute("aria-invalid", invalid ? "true" : "false");
        if (invalid) bad = true;
      });
      if (bad) { status.textContent = t("form.missing"); status.classList.add("err"); return; }

      submit.disabled = true;
      var label = submit.textContent;
      submit.textContent = t("form.sending");
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { "Accept": "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error("status " + r.status);
          form.reset();
          status.textContent = t("form.ok");
          status.classList.add("ok");
        })
        .catch(function () {
          status.textContent = t("form.err");
          status.classList.add("err");
        })
        .finally(function () { submit.disabled = false; submit.textContent = label; });
    });
  }

  function init() {
    captureFrench();
    apply(initialLanguage());
    var btn = document.getElementById("lang-toggle");
    if (btn) btn.addEventListener("click", function () {
      var next = current === "en" ? "fr" : "en";
      apply(next);
      store(false, next);
    });
    setupForm();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
