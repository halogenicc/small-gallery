document.addEventListener("DOMContentLoaded", function () {
  var page = document.body.dataset.page;
  buildLightbox();

  if (page === "home") initHome();
  if (page === "gallery") initGallery();
  if (page === "painters") initPainters();

  installImageFallback();
});

/* If a Wikimedia filename ever changes or 404s, swap in a soft placeholder
   instead of a broken-image icon, so the layout never looks broken. */
function installImageFallback() {
  document.addEventListener("error", function (e) {
    var img = e.target;
    if (img.tagName !== "IMG" || img.dataset.fallback) return;
    img.dataset.fallback = "1";
    var label = (img.alt || "Untitled").trim();
    var initials = label.split(" ").slice(0, 2).map(function (w) { return w[0] || ""; }).join("").toUpperCase();
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750">' +
      '<rect width="100%" height="100%" fill="#25352c"/>' +
      '<rect x="1" y="1" width="598" height="748" fill="none" stroke="#c49a5a" stroke-opacity="0.4"/>' +
      '<text x="50%" y="46%" font-family="Georgia, serif" font-size="64" fill="#c49a5a" text-anchor="middle">' + initials + '</text>' +
      '<text x="50%" y="58%" font-family="Georgia, serif" font-size="20" fill="#b9b09d" text-anchor="middle">' + label.replace(/&/g, "&amp;") + '</text>' +
      '</svg>';
    img.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }, true);
}

/* ---------------- shared lightbox ---------------- */

function buildLightbox() {
  var box = document.createElement("div");
  box.className = "lightbox";
  box.id = "lightbox";
  box.innerHTML =
    '<div class="lightbox-inner">' +
    '  <button class="lightbox-close" aria-label="Close">&times;</button>' +
    '  <div class="lightbox-frame frame"><img id="lb-img" alt=""></div>' +
    '  <div class="lightbox-copy">' +
    '    <span class="kicker" id="lb-painter"></span>' +
    '    <h3 id="lb-title"></h3>' +
    '    <p class="lb-meta" id="lb-meta"></p>' +
    '    <p id="lb-desc"></p>' +
    '    <a href="painters.html" id="lb-painter-link" class="btn">More about the painter</a>' +
    '  </div>' +
    '</div>';
  document.body.appendChild(box);
  box.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  box.addEventListener("click", function (e) { if (e.target === box) closeLightbox(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLightbox(); });
}

function openLightbox(paintingId) {
  var p = PAINTINGS.find(function (x) { return x.id === paintingId; });
  if (!p) return;
  var painter = painterById(p.painterId);
  document.getElementById("lb-img").src = p.image;
  document.getElementById("lb-img").alt = p.title;
  document.getElementById("lb-painter").textContent = painter.name + " · " + p.year;
  document.getElementById("lb-title").textContent = p.title;
  document.getElementById("lb-meta").textContent = p.location;
  document.getElementById("lb-desc").textContent = p.description;
  document.getElementById("lb-painter-link").href = "painters.html#" + painter.id;
  var box = document.getElementById("lightbox");
  box.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  var box = document.getElementById("lightbox");
  box.classList.remove("open");
  document.body.style.overflow = "";
}

/* ---------------- home page ---------------- */

function initHome() {
  var featured = PAINTINGS.slice(0, 6);
  var hero = document.getElementById("hero-frame");
  var heroTitle = document.getElementById("hero-title");
  var heroMeta = document.getElementById("hero-meta");
  var idx = 0;

  function showHero(i) {
    var p = featured[i];
    var painter = painterById(p.painterId);
    hero.style.opacity = 0;
    setTimeout(function () {
      hero.querySelector("img").src = p.image;
      hero.querySelector("img").alt = p.title;
      heroTitle.textContent = p.title;
      heroMeta.textContent = painter.name + " · " + p.year;
      hero.style.opacity = 1;
    }, 350);
  }

  showHero(idx);
  var timer = setInterval(function () {
    idx = (idx + 1) % featured.length;
    showHero(idx);
  }, 5000);

  document.querySelectorAll(".hero-dot").forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      clearInterval(timer);
      idx = i;
      showHero(idx);
    });
  });

  var dotsWrap = document.getElementById("hero-dots");
  dotsWrap.innerHTML = featured.map(function (_, i) {
    return '<button class="hero-dot' + (i === 0 ? " active" : "") + '" data-i="' + i + '"></button>';
  }).join("");
  dotsWrap.querySelectorAll(".hero-dot").forEach(function (dot, i) {
    dot.addEventListener("click", function () {
      clearInterval(timer);
      idx = i;
      showHero(idx);
      dotsWrap.querySelectorAll(".hero-dot").forEach(function (d) { d.classList.remove("active"); });
      dot.classList.add("active");
    });
  });

  // filmstrip
  var strip = document.getElementById("filmstrip");
  strip.innerHTML = PAINTINGS.map(function (p) {
    var painter = painterById(p.painterId);
    return (
      '<div class="film-card frame" data-id="' + p.id + '">' +
      '  <img src="' + p.image + '" alt="' + p.title + '" loading="lazy">' +
      '  <div class="plate">' + p.title + '</div>' +
      '</div>'
    );
  }).join("");
  strip.querySelectorAll(".film-card").forEach(function (card) {
    card.addEventListener("click", function () { openLightbox(card.dataset.id); });
  });

  // painter tiles
  var tiles = document.getElementById("painter-tiles");
  tiles.innerHTML = PAINTERS.map(function (pt) {
    return (
      '<a class="painter-tile" href="painters.html#' + pt.id + '">' +
      '  <div class="painter-tile-portrait frame"><img src="' + pt.portrait + '" alt="' + pt.name + '" loading="lazy"></div>' +
      '  <h3>' + pt.name + '</h3>' +
      '  <span class="tag">' + pt.years + '</span>' +
      '</a>'
    );
  }).join("");
}

/* ---------------- gallery page ---------------- */

function initGallery() {
  var grid = document.getElementById("gallery-grid");
  var filterBar = document.getElementById("filter-bar");

  var filters = [{ id: "all", name: "All painters" }].concat(
    PAINTERS.map(function (p) { return { id: p.id, name: p.name }; })
  );

  filterBar.innerHTML = filters.map(function (f, i) {
    return '<button class="filter-btn' + (i === 0 ? " active" : "") + '" data-filter="' + f.id + '">' + f.name + '</button>';
  }).join("");

  function render(filter) {
    var list = filter === "all" ? PAINTINGS : paintingsByPainter(filter);
    grid.innerHTML = list.map(function (p, i) {
      var painter = painterById(p.painterId);
      var sizeClass = ["span-tall", "span-wide", "span-normal"][i % 3];
      return (
        '<figure class="gallery-item ' + sizeClass + '" data-id="' + p.id + '">' +
        '  <div class="frame">' +
        '    <img src="' + p.image + '" alt="' + p.title + '" loading="lazy">' +
        '    <div class="plate">' + painter.name + '</div>' +
        '  </div>' +
        '  <figcaption>' +
        '    <h3>' + p.title + '</h3>' +
        '    <span class="tag">' + painter.name + ' · ' + p.year + '</span>' +
        '  </figcaption>' +
        '</figure>'
      );
    }).join("");
    grid.querySelectorAll(".gallery-item").forEach(function (item) {
      item.addEventListener("click", function () { openLightbox(item.dataset.id); });
    });
  }

  render("all");

  filterBar.querySelectorAll(".filter-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      render(btn.dataset.filter);
    });
  });
}

/* ---------------- painters page ---------------- */

function initPainters() {
  var list = document.getElementById("painter-list");

  list.innerHTML = PAINTERS.map(function (p, i) {
    var works = paintingsByPainter(p.id);
    return (
      '<div class="painter-entry" id="' + p.id + '">' +
      '  <button class="painter-row" data-id="' + p.id + '" aria-expanded="false">' +
      '    <span class="painter-row-name">' + p.name + '</span>' +
      '    <span class="painter-row-years">' + p.years + '</span>' +
      '    <span class="painter-row-icon">+</span>' +
      '  </button>' +
      '  <div class="painter-panel">' +
      '    <div class="painter-panel-inner">' +
      '      <div class="painter-portrait frame"><img src="' + p.portrait + '" alt="' + p.name + '" loading="lazy"></div>' +
      '      <div class="painter-copy">' +
      '        <span class="tag">' + p.origin + '</span>' +
      '        <p>' + p.bio + '</p>' +
      '        <div class="painter-works">' +
      works.map(function (w) {
        return '<div class="mini-frame frame" data-id="' + w.id + '"><img src="' + w.image + '" alt="' + w.title + '" loading="lazy"><div class="plate">' + w.title + '</div></div>';
      }).join("") +
      '        </div>' +
      '      </div>' +
      '    </div>' +
      '  </div>' +
      '</div>'
    );
  }).join("");

  var rows = list.querySelectorAll(".painter-row");
  rows.forEach(function (row) {
    row.addEventListener("click", function () {
      var isOpen = row.classList.contains("open");
      rows.forEach(function (r) {
        r.classList.remove("open");
        r.setAttribute("aria-expanded", "false");
        r.nextElementSibling.style.maxHeight = null;
      });
      if (!isOpen) {
        row.classList.add("open");
        row.setAttribute("aria-expanded", "true");
        var panel = row.nextElementSibling;
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  });

  list.querySelectorAll(".mini-frame").forEach(function (mf) {
    mf.addEventListener("click", function (e) {
      e.stopPropagation();
      openLightbox(mf.dataset.id);
    });
  });

  // open the painter linked in the URL hash, if any
  if (location.hash) {
    var target = document.querySelector(location.hash + " .painter-row");
    if (target) target.click();
  }
}
