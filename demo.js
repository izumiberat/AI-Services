/* IzuTech demo page: site assistant, document reading, time-saved calculator.
   The two AI demos call the Cloudflare Worker whose address is in <body data-api="">.
   The calculator runs entirely in the browser. */
(function () {
  "use strict";

  var BOOKING = "https://calendar.app.google/Y9YtHrf6hDHfdrVC7";
  var API = String(document.body.getAttribute("data-api") || "").trim().replace(/\/+$/, "");

  var TXT = {
    fr: {
      thinking: "Je cherche dans le site…",
      sources: "Sources :",
      book: "Réserver un appel de 30 min",
      slow_down: "Doucement : vous avez envoyé beaucoup de demandes. Réessayez dans une minute.",
      busy: "Beaucoup de monde essaie la démo en ce moment. Réessayez dans une minute.",
      daily_cap: "La démo a atteint sa limite du jour. Revenez demain, ou écrivez-moi à contact@izutech.fr.",
      chat_err: "Je n'ai pas pu répondre. Réessayez dans un instant, ou écrivez à contact@izutech.fr.",
      reading: "Lecture en cours…",
      reading_file: "Lecture du fichier en cours. Ça peut prendre une vingtaine de secondes…",
      bad_type: "Ce type de fichier n'est pas pris en charge. Envoyez un PDF, un JPG ou un PNG.",
      too_big: "Le fichier dépasse 4 Mo.",
      doc_err: "La lecture n'a pas fonctionné. Réessayez, ou essayez avec la facture d'exemple.",
      empty_document: "Je n'ai trouvé aucun texte dans ce fichier.",
      done: "Voilà ce que l'outil a lu.",
      read: "Ce que l'outil a lu",
      type: "Type", emetteur: "Émetteur", destinataire: "Client", reference: "Numéro",
      date: "Date", echeance: "Échéance",
      line: "Désignation", qty: "Qté", unit: "PU", amount: "Montant",
      ht: "Total HT", tva: "TVA", ttc: "Total TTC",
      check: "À vérifier",
      checks_none: "Rien à signaler. Une personne vérifie quand même avant l'envoi en comptabilité.",
      missing: "—",
      offers: {
        invoices: ["traitement automatique de données", 900],
        delivery: ["traitement automatique de données", 900],
        search: ["assistant sur vos documents", 1200],
        support: ["copilote pour le support client", 1800]
      },
      now: "Aujourd'hui : <b>{h}</b> par mois sur cette tâche.",
      saved: "Temps libéré : <b>{h}</b> par mois, soit environ <b>{d}</b> de travail par an.",
      value: "Valeur nette : <b>{v}</b> par mois, abonnement déduit.",
      payback: "Avec l'offre « {o} » (à partir de {p}), le projet serait rentabilisé en <b>{m}</b> environ.",
      long: "C'est long. À ce volume, l'automatisation ne vaut peut-être pas la peine, et je vous le dirai franchement.",
      not_worth: "À ce volume, l'automatisation ne vaut sans doute pas la peine. Je vous le dirais aussi lors de l'appel.",
      hours: function (n) { return fmt(n, 1) + " h"; },
      days: function (n) { var r = Math.round(n); return r + (r > 1 ? " jours" : " jour"); },
      months: function (n) { var r = Math.max(1, Math.ceil(n)); return r + " mois"; }
    },
    en: {
      thinking: "Looking through the site…",
      sources: "Sources:",
      book: "Book a 30-minute call",
      slow_down: "Easy there: that's a lot of requests. Please try again in a minute.",
      busy: "Lots of people are trying the demo right now. Please try again in a minute.",
      daily_cap: "The demo has reached its daily limit. Come back tomorrow, or write to contact@izutech.fr.",
      chat_err: "I couldn't answer. Please try again shortly, or write to contact@izutech.fr.",
      reading: "Reading…",
      reading_file: "Reading your file. This can take about twenty seconds…",
      bad_type: "This file type isn't supported. Please send a PDF, JPG or PNG.",
      too_big: "The file is larger than 4 MB.",
      doc_err: "Reading didn't work. Please try again, or use the sample invoice.",
      empty_document: "I couldn't find any text in this file.",
      done: "Here's what the tool read.",
      read: "What the tool read",
      type: "Type", emetteur: "From", destinataire: "Client", reference: "Number",
      date: "Date", echeance: "Due",
      line: "Item", qty: "Qty", unit: "Unit", amount: "Amount",
      ht: "Total before tax", tva: "VAT", ttc: "Total",
      check: "To check",
      checks_none: "Nothing to flag. A person still checks before it goes into the accounts.",
      missing: "—",
      offers: {
        invoices: ["automated data processing", 900],
        delivery: ["automated data processing", 900],
        search: ["internal assistant for your documents", 1200],
        support: ["customer support co-pilot", 1800]
      },
      now: "Today: <b>{h}</b> a month on this task.",
      saved: "Time freed up: <b>{h}</b> a month, or about <b>{d}</b> of work a year.",
      value: "Net value: <b>{v}</b> a month, after the subscription.",
      payback: "With the “{o}” service (from {p}), the project would pay for itself in about <b>{m}</b>.",
      long: "That's a long time. At this volume, automation may not be worth it, and I'll tell you so.",
      not_worth: "At this volume, automation probably isn't worth it. I'd tell you that on the call too.",
      hours: function (n) { return fmt(n, 1) + " h"; },
      days: function (n) { var r = Math.round(n); return r + (r === 1 ? " day" : " days"); },
      months: function (n) { var r = Math.max(1, Math.ceil(n)); return r + (r === 1 ? " month" : " months"); }
    }
  };

  function lang() { return document.documentElement.lang === "en" ? "en" : "fr"; }
  function T() { return TXT[lang()]; }
  function fmt(n, digits) {
    var d = n < 10 ? digits : 0;
    return new Intl.NumberFormat(lang() === "en" ? "en-GB" : "fr-FR", { maximumFractionDigits: d, minimumFractionDigits: 0 }).format(n);
  }
  // exact = true keeps the cents (invoice amounts); otherwise round for estimates.
  function euros(n, exact) {
    var d = exact ? 2 : (n >= 100 ? 0 : 2);
    return new Intl.NumberFormat(lang() === "en" ? "en-GB" : "fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: exact ? 2 : 0, maximumFractionDigits: d }).format(n);
  }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  // Escape first, then turn plain URLs and the contact address into links.
  function linkify(text) {
    return esc(text)
      .replace(/https?:\/\/[^\s<)]+[^\s<).,;:!?]/g, function (u) {
        var label = u === BOOKING ? esc(T().book.toLowerCase()) : u;
        return '<a href="' + u + '" target="_blank" rel="noopener">' + label + "</a>";
      })
      .replace(/contact@izutech\.fr/g, '<a href="mailto:contact@izutech.fr">contact@izutech.fr</a>')
      .replace(/\n/g, "<br>");
  }

  function post(path, payload) {
    return fetch(API + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (data) {
        if (!r.ok) { var e = new Error("http " + r.status); e.code = data && data.error; throw e; }
        return data;
      });
    });
  }

  function switchOff(panel) {
    panel.querySelectorAll("form, .chips, .doc-actions, .doc-status").forEach(function (el) { el.hidden = true; });
    var off = panel.querySelector(".panel-off");
    if (off) off.hidden = false;
  }

  /* ---------- Assistant ---------- */
  function setupChat() {
    var panel = document.getElementById("chat");
    if (!panel) return;
    if (!API) { switchOff(panel); return; }

    var log = document.getElementById("chat-log");
    var form = document.getElementById("chat-form");
    var input = document.getElementById("chat-input");
    var send = document.getElementById("chat-send");
    var chips = document.getElementById("chat-chips");
    var history = [];
    var busy = false;

    function add(role, html) {
      var div = document.createElement("div");
      div.className = "msg " + (role === "user" ? "msg-user" : "msg-bot");
      div.innerHTML = html;
      log.appendChild(div);
      log.scrollTop = log.scrollHeight;
      return div;
    }

    function ask(text) {
      text = String(text || "").trim().slice(0, 1000);
      if (!text || busy) return;
      busy = true; send.disabled = true; input.value = "";
      chips.hidden = true;
      add("user", "<p>" + esc(text) + "</p>");
      history.push({ role: "user", content: text });
      var wait = add("bot", '<p class="msg-wait">' + esc(T().thinking) + "</p>");

      post("/chat", { messages: history.slice(-10), lang: lang() })
        .then(function (data) {
          history.push({ role: "assistant", content: data.answer || "" });
          var html = "<p>" + linkify(data.answer || "") + "</p>";
          if (data.sources && data.sources.length) {
            html += '<p class="msg-sources">' + esc(T().sources) + " " + data.sources.map(function (s) {
              return '<a href="' + esc(s.url) + '">' + esc(s.title) + "</a>";
            }).join(" · ") + "</p>";
          }
          if (data.book_call) {
            html += '<p><a class="btn btn-small" href="' + BOOKING + '" target="_blank" rel="noopener">' + esc(T().book) + "</a></p>";
          }
          wait.innerHTML = html;
        })
        .catch(function (e) {
          history.pop();
          wait.innerHTML = "<p>" + linkify(T()[e.code] || T().chat_err) + "</p>";
        })
        .finally(function () {
          busy = false; send.disabled = false;
          log.scrollTop = log.scrollHeight;
          input.focus();
        });
    }

    form.addEventListener("submit", function (e) { e.preventDefault(); ask(input.value); });
    chips.querySelectorAll(".chip").forEach(function (b) {
      b.addEventListener("click", function () { ask(b.textContent); });
    });
  }

  /* ---------- Document ---------- */
  function setupDocument() {
    var panel = document.getElementById("doc");
    if (!panel) return;
    if (!API) { switchOff(panel); return; }

    var status = document.getElementById("doc-status");
    var result = document.getElementById("doc-result");
    var sampleBtn = document.getElementById("doc-sample");
    var fileInput = document.getElementById("doc-file");
    var sample = document.getElementById("sample-invoice").textContent;
    var busy = false;

    function start(message) {
      busy = true; sampleBtn.disabled = true; fileInput.disabled = true;
      status.className = "doc-status"; status.textContent = message;
      result.hidden = true;
    }
    function stop() { busy = false; sampleBtn.disabled = false; fileInput.disabled = false; }
    function fail(code) { status.textContent = T()[code] || T().doc_err; status.classList.add("err"); }

    function run(payload, message) {
      if (busy) return;
      start(message);
      payload.lang = lang();
      post("/extract", payload)
        .then(function (data) { render(data.fields || {}); status.textContent = T().done; })
        .catch(function (e) { fail(e.code); })
        .finally(stop);
    }

    sampleBtn.addEventListener("click", function () { run({ text: sample }, T().reading); });

    fileInput.addEventListener("change", function () {
      var f = fileInput.files && fileInput.files[0];
      fileInput.value = "";
      if (!f) return;
      if (!/^(application\/pdf|image\/(png|jpeg|webp))$/.test(f.type)) { status.className = "doc-status"; return fail("bad_type"); }
      if (f.size > 4 * 1024 * 1024) { status.className = "doc-status"; return fail("too_big"); }
      var reader = new FileReader();
      reader.onload = function () {
        var data = String(reader.result).split(",")[1] || "";
        run({ file: { name: f.name, type: f.type, data: data } }, T().reading_file);
      };
      reader.onerror = function () { fail("doc_err"); };
      reader.readAsDataURL(f);
    });

    function money(n) { return n == null ? T().missing : euros(n, true); }
    function val(v) {
      if (v == null || v === "") return T().missing;
      var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
      if (m) {
        var d = new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString(lang() === "en" ? "en-GB" : "fr-FR", { day: "numeric", month: "long", year: "numeric" });
        return esc(lang() === "fr" ? d.replace(/^1 /, "1er ") : d);
      }
      return esc(v);
    }

    function render(f) {
      var t = T();
      var rows = ["type_document", "emetteur", "destinataire", "reference", "date", "echeance"].map(function (k) {
        var label = t[k === "type_document" ? "type" : k];
        return "<div><dt>" + esc(label) + "</dt><dd>" + val(f[k]) + "</dd></div>";
      }).join("");

      var lines = (f.lignes || []).map(function (l) {
        return "<tr><td>" + esc(l.description) + '</td><td class="num">' + (l.quantite == null ? t.missing : esc(fmt(l.quantite, 2))) +
          '</td><td class="num">' + money(l.prix_unitaire) + '</td><td class="num">' + money(l.montant) + "</td></tr>";
      }).join("");
      var table = lines ? '<div class="table-scroll"><table><thead><tr><th>' + esc(t.line) + '</th><th class="num">' + esc(t.qty) +
        '</th><th class="num">' + esc(t.unit) + '</th><th class="num">' + esc(t.amount) + "</th></tr></thead><tbody>" + lines +
        "</tbody><tfoot>" +
        '<tr><th colspan="3">' + esc(t.ht) + '</th><td class="num">' + money(f.total_ht) + "</td></tr>" +
        '<tr><th colspan="3">' + esc(t.tva) + '</th><td class="num">' + money(f.tva) + "</td></tr>" +
        '<tr><th colspan="3">' + esc(t.ttc) + '</th><td class="num">' + money(f.total_ttc) + "</td></tr>" +
        "</tfoot></table></div>" : "";

      var seen = {};
      var checks = (f.checks || []).concat(f.a_verifier || []).filter(function (c) {
        var k = String(c).toLowerCase(); if (seen[k]) return false; seen[k] = true; return true;
      });
      var checkHtml = checks.length
        ? '<div class="checks"><h3>' + esc(t.check) + "</h3><ul>" + checks.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul></div>"
        : '<p class="checks checks-ok">' + esc(t.checks_none) + "</p>";

      result.innerHTML = checkHtml + "<h3>" + esc(t.read) + '</h3><dl class="doc-fields">' + rows + "</dl>" + table;
      result.hidden = false;
    }
  }

  /* ---------- Calculator ---------- */
  var PRESETS = {
    invoices: { volume: 200, minutes: 4 },
    delivery: { volume: 150, minutes: 5 },
    search: { volume: 60, minutes: 10 },
    support: { volume: 300, minutes: 8 }
  };

  function setupCalc() {
    var form = document.getElementById("calc");
    if (!form) return;
    var task = document.getElementById("c-task");
    var volume = document.getElementById("c-volume");
    var minutes = document.getElementById("c-minutes");
    var rate = document.getElementById("c-rate");
    var tool = document.getElementById("c-tool");
    var share = document.getElementById("c-share");
    var shareOut = document.getElementById("c-share-out");
    var out = document.getElementById("calc-out");

    function n(el) { var v = parseFloat(String(el.value).replace(",", ".")); return isFinite(v) && v > 0 ? v : 0; }
    function fill(tpl, map) { return tpl.replace(/\{(\w)\}/g, function (_, k) { return map[k]; }); }

    function update() {
      var t = T();
      var s = n(share) / 100;
      shareOut.textContent = Math.round(s * 100) + " %";
      var hoursNow = n(volume) * n(minutes) / 60;
      var saved = hoursNow * s;
      var net = saved * n(rate) - n(tool);
      var offer = t.offers[task.value] || t.offers.invoices;

      var html = "<p>" + fill(t.now, { h: t.hours(hoursNow) }) + "</p>" +
        "<p>" + fill(t.saved, { h: t.hours(saved), d: t.days(saved * 12 / 7) }) + "</p>";
      if (net > 0) {
        var months = offer[1] / net;
        html += "<p>" + fill(t.value, { v: euros(net) }) + "</p>" +
          '<p class="calc-key">' + fill(t.payback, { o: esc(offer[0]), p: euros(offer[1]), m: t.months(months) }) + "</p>";
        if (months > 24) html += "<p>" + esc(t.long) + "</p>";
      } else {
        html += '<p class="calc-key">' + esc(t.not_worth) + "</p>";
      }
      out.innerHTML = html;
    }

    task.addEventListener("change", function () {
      var p = PRESETS[task.value];
      if (p) { volume.value = p.volume; minutes.value = p.minutes; }
      update();
    });
    form.addEventListener("input", update);
    form.addEventListener("submit", function (e) { e.preventDefault(); });
    // Re-render the result when the visitor switches language.
    new MutationObserver(update).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
    update();
  }

  function init() { setupChat(); setupDocument(); setupCalc(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
