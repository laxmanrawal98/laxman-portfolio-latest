(() => {
  "use strict";

  const data = window.LR_DATA;
  if (!data) return;

  const esc = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  /* ---------- Boot ---------- */
  const reveal = () => document.body.classList.add("loaded");
  if (document.readyState === "complete") setTimeout(reveal, 450);
  else {
    window.addEventListener("load", () => setTimeout(reveal, 450));
    setTimeout(reveal, 2400);
  }

  /* ---------- Scroll chrome ---------- */
  const bar = document.querySelector(".progress i");
  let lastY = window.scrollY;
  let ticking = false;
  const onScroll = () => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    document.body.classList.toggle("nav-solid", y > 40);
    if (y > 160 && y > lastY + 4) document.body.classList.add("nav-hidden");
    else if (y < lastY - 4 || y <= 160) document.body.classList.remove("nav-hidden");
    lastY = y;
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---------- Reveal + skill bars ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
  );
  document.querySelectorAll("[data-reveal], .skill-card").forEach((el) => io.observe(el));

  /* ---------- Hero ---------- */
  if (data.hero) {
    const h = data.hero;
    const connectEl = document.getElementById("hero-connect");
    const photoEl = document.getElementById("hero-photo");
    const nameEl = document.getElementById("hero-name");
    const roleEl = document.getElementById("hero-role");
    const bioEl = document.getElementById("hero-bio");
    if (nameEl) nameEl.textContent = h.name;
    if (roleEl) roleEl.textContent = h.role;
    if (bioEl) bioEl.textContent = h.bio;
    if (photoEl && h.photo) {
      photoEl.src = h.photo;
      photoEl.onerror = () => {
        photoEl.src = "assets/profile.png";
      };
    }
    if (connectEl && h.connect) {
      connectEl.innerHTML = `
        <p class="hero-connect-label">${esc(h.connect.label)}</p>
        <a href="mailto:${esc(h.connect.email)}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#e8480c" style="margin-right:4px; vertical-align:middle; position:relative; top:-1px;"><path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/></svg>${esc(h.connect.email)}</a>
        <a href="${esc(h.connect.linkedin)}" target="_blank" rel="noopener"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" fill="#0a66c2" style="margin-right:4px; vertical-align:middle; position:relative; top:-1px;"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>LinkedIn ↗</a>
      `;
    }
  }

  /* ---------- Career roadmap ---------- */
  const timeline = document.querySelector(".timeline");
  const panel = document.querySelector(".career-panel");
  let careerIndex = 0;

  const renderCareerPanel = (item) => {
    panel.innerHTML = `
      <article class="career-card">
        <div class="career-card-top">
          <div>
            <h3>${item.role} <span>@ ${item.company}</span></h3>
            <p class="career-meta">${item.dates} · ${item.location}</p>
          </div>
          <span class="tl-tag">${item.tag}</span>
        </div>
        <p class="career-summary">${item.summary}</p>
        <p class="career-impacts-label">Key impact &amp; accomplishments</p>
        <ul class="career-impacts">
          ${item.impacts.map((t) => `<li>${t}</li>`).join("")}
        </ul>
        <div class="career-skills">
          <span>Core competencies</span>
          ${item.skills.map((s) => `<span class="pill">${s}</span>`).join("")}
        </div>
      </article>
    `;
  };

  const renderTimeline = () => {
    timeline.innerHTML = data.career
      .map(
        (c, i) => `
      <button class="tl-stop${i === careerIndex ? " is-active" : ""}" type="button" role="tab" aria-selected="${i === careerIndex}" data-i="${i}">
        <div class="tl-date">${c.dates}</div>
        <div class="tl-dot" aria-hidden="true"></div>
        <div class="tl-company">${c.company}</div>
        <div class="tl-role">${c.role}</div>
        <span class="tl-tag">${c.tag}</span>
      </button>`
      )
      .join("");
    renderCareerPanel(data.career[careerIndex]);
  };

  timeline.addEventListener("click", (e) => {
    const btn = e.target.closest(".tl-stop");
    if (!btn) return;
    careerIndex = Number(btn.dataset.i);
    renderTimeline();
  });
  renderTimeline();

  /* ---------- Portfolio carousel + filters ---------- */
  let filtered = [...data.projects];
  let projectIndex = 0;
  const cardEl = document.getElementById("project-card");
  const indexEl = document.getElementById("project-index");
  const totalEl = document.getElementById("project-total");

  const renderProject = () => {
    if (!filtered.length) {
      cardEl.innerHTML = `<div class="project-info"><p class="desc">No projects in this filter.</p></div>`;
      totalEl.textContent = "0";
      indexEl.textContent = "0";
      return;
    }
    if (projectIndex >= filtered.length) projectIndex = 0;
    const p = filtered[projectIndex];
    const briefPreview = p.brief ? p.brief.split(/\n\n+/)[0] : "";
    totalEl.textContent = String(filtered.length);
    indexEl.textContent = String(projectIndex + 1);
    cardEl.innerHTML = `
      <div class="project-info">
        <div class="project-badges">
          <span class="badge badge-accent">${p.niche}</span>
          <span class="badge badge-mute">${p.filter}</span>
        </div>
        <h3>${p.title}</h3>
        ${p.subtitle ? `<p class="sub">${p.subtitle}</p>` : ""}
        ${briefPreview ? `<p class="desc">${esc(briefPreview)}</p>` : ""}
        ${
          p.metrics.length
            ? `<div class="project-metrics">
          ${p.metrics
            .slice(0, 3)
            .map(
              (m) => `<div><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`
            )
            .join("")}
        </div>`
            : ""
        }
        <div class="project-actions">
          <button class="btn btn-accent" type="button" data-open="${p.id}">Know more →</button>
          ${
            p.links[0]
              ? `<a class="btn btn-ghost" href="${p.links[0].href}" target="_blank" rel="noopener">${p.links[0].label} ↗</a>`
              : ""
          }
        </div>
      </div>
      <div class="project-visual" aria-hidden="true">
        <div class="project-visual-mark">${String(projectIndex + 1).padStart(2, "0")}</div>
        <div class="project-visual-foot">
          <span>Industry · ${p.niche}</span>
          <span>${projectIndex + 1} / ${filtered.length}</span>
        </div>
      </div>
    `;
  };

  document.querySelector(".filters").addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    document.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const f = btn.dataset.filter;
    filtered = f === "all" ? [...data.projects] : data.projects.filter((p) => p.filter === f);
    projectIndex = 0;
    renderProject();
  });

  document.querySelector(".stage-prev").addEventListener("click", () => {
    if (!filtered.length) return;
    projectIndex = (projectIndex - 1 + filtered.length) % filtered.length;
    renderProject();
  });
  document.querySelector(".stage-next").addEventListener("click", () => {
    if (!filtered.length) return;
    projectIndex = (projectIndex + 1) % filtered.length;
    renderProject();
  });

  cardEl.addEventListener("click", (e) => {
    const open = e.target.closest("[data-open]");
    if (open) openModal(open.dataset.open);
  });

  renderProject();

  /* ---------- Modal ---------- */
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");

  const withBreaks = (s) => esc(s).replace(/\n/g, "<br>");
  const briefHtml = (b) =>
    b
      .split(/\n\n+/)
      .filter(Boolean)
      .map((p) => `<p>${esc(p)}</p>`)
      .join("");

  const youtubeId = (url) => {
    const m = String(url).match(/(?:shorts\/|youtu\.be\/|embed\/|v=)([\w-]+)/);
    return m ? m[1] : "";
  };

  const renderVideoEmbed = (v) => {
    if (v.platform === "youtube" && v.url) {
      const id = youtubeId(v.url);
      return id
        ? `<iframe src="https://www.youtube.com/embed/${id}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen title="${esc(v.label)}" loading="lazy"></iframe>`
        : "";
    }
    if (v.platform === "drive" && v.id) {
      return `<iframe src="https://drive.google.com/file/d/${v.id}/preview" allow="autoplay" title="${esc(v.label)}" loading="lazy"></iframe>`;
    }
    return "";
  };

  const renderVideoBlocks = (videos) =>
    videos
      .map((v) => {
        const copy = v.description
          ? v.description
              .split(/\n\n+/)
              .map((p) => `<p>${esc(p)}</p>`)
              .join("")
          : "";
        return `
        <article class="video-block">
          <h4>${esc(v.label)}</h4>
          <figure>
            ${renderVideoEmbed(v)}
          </figure>
          ${copy ? `<div class="video-block-copy">${copy}</div>` : ""}
        </article>`;
      })
      .join("");

  const renderShowcaseBlocks = (items) =>
    items
      .map((item) => {
        if (item.type === "video" || item.platform) {
          return `
        <article class="video-block">
          ${item.label ? `<h4>${esc(item.label)}</h4>` : ""}
          <figure>${renderVideoEmbed(item)}</figure>
          ${
            item.description
              ? `<div class="video-block-copy">${item.description
                  .split(/\n\n+/)
                  .map((p) => `<p>${esc(p)}</p>`)
                  .join("")}</div>`
              : ""
          }
        </article>`;
        }
        if (item.type === "image" || item.src) {
          return `
        <figure class="showcase-image">
          <img src="${esc(item.src)}" alt="${esc(item.caption || item.label || "")}" loading="lazy" />
          ${item.caption ? `<figcaption>${esc(item.caption)}</figcaption>` : ""}
        </figure>`;
        }
        return "";
      })
      .join("");

  const openModal = (id) => {
    const p = data.projects.find((x) => x.id === id);
    if (!p) return;
    modalBody.innerHTML = `
      <div class="modal-hero">
        <div class="project-badges">
          <span class="badge badge-accent">${p.niche}</span>
          ${p.subtitle ? `<span class="badge badge-mute">${p.subtitle}</span>` : ""}
        </div>
        <h2 id="modal-title">${p.title}</h2>
        ${p.subtitle ? `<p class="sub">${p.subtitle}</p>` : ""}
      </div>
      ${
        p.metrics.length
          ? `<div class="modal-metrics">
        ${p.metrics.map((m) => `<div><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join("")}
      </div>`
          : ""
      }
      ${
        p.brief
          ? `<div class="modal-section">
        <h3>Company brief</h3>
        <div class="modal-copy">${briefHtml(p.brief)}</div>
      </div>`
          : ""
      }
      ${
        p.problems.length
          ? `<div class="modal-section">
        <h3>Problem statement</h3>
        <ul class="modal-list">${p.problems.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </div>`
          : ""
      }
      ${
        p.solutions.length
          ? `<div class="modal-section">
        <h3>Solution</h3>
        <ul class="modal-list">${p.solutions.map((t) => `<li class="solution-block">${withBreaks(t)}</li>`).join("")}</ul>
      </div>`
          : ""
      }
      ${
        p.impacts.length
          ? `<div class="modal-section">
        <h3>Impact</h3>
        <ul class="modal-list">${p.impacts.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
      </div>`
          : ""
      }
      ${
        p.receipt.length
          ? `<div class="modal-section">
              <h3>Impact / before / after</h3>
              <table class="receipt">
                <thead><tr><th>Impact area</th><th>Before</th><th>After</th><th>Net</th></tr></thead>
                <tbody>
                  ${p.receipt
                    .map(
                      (r) =>
                        `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td><td>${esc(r[2])}</td><td>${esc(r[3])}</td></tr>`
                    )
                    .join("")}
                </tbody>
              </table>
            </div>`
          : ""
      }
      ${
        p.images && p.images.length
          ? `<div class="modal-section">
              <h3>Case study visuals</h3>
              <div class="modal-images">
                ${p.images
                  .map(
                    (img) => `
                  <figure>
                    <img src="${esc(img.src)}" alt="${esc(img.caption || "")}" loading="lazy" />
                    ${img.caption ? `<figcaption>${esc(img.caption)}</figcaption>` : ""}
                  </figure>`
                  )
                  .join("")}
              </div>
            </div>`
          : ""
      }
      ${
        p.showcase && p.showcase.length
          ? `<div class="modal-section">
              <div class="modal-showcase">
                ${renderShowcaseBlocks(p.showcase)}
              </div>
            </div>`
          : ""
      }
      ${
        p.videos.length
          ? `<div class="modal-section">
              <h3>Related videos</h3>
              <div class="modal-videos zigzag">
                ${renderVideoBlocks(p.videos)}
              </div>
            </div>`
          : ""
      }
      ${
        p.links.length
          ? `<div class="modal-section">
              <h3>Live demo</h3>
              <a class="btn btn-accent" href="${esc(p.links[0].href)}" target="_blank" rel="noopener">${esc(p.links[0].label)} ↗</a>
            </div>`
          : ""
      }
    `;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.hidden = true;
    document.body.style.overflow = "";
    modalBody.innerHTML = "";
  };

  modal.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });

  /* ---------- Skills ---------- */
  const skillsGrid = document.querySelector(".skills-grid");
  skillsGrid.innerHTML = data.skills
    .map((s) => {
      if (s.type === "list") {
        return `
    <article class="skill-card skill-card-list">
      <h3>${esc(s.title)}</h3>
      <ul class="competency-list">
        ${s.items.map((item) => `<li>${esc(item)}</li>`).join("")}
      </ul>
    </article>`;
      }
      if (s.type === "bubbles") {
        return `
    <article class="skill-card skill-card-bubbles">
      <h3>${esc(s.title)}</h3>
      <div class="bubble-arena" id="bubble-arena" role="application" aria-label="Draggable tech stack logos"></div>
    </article>`;
      }
      return "";
    })
    .join("");
  document.querySelectorAll(".skill-card").forEach((el) => io.observe(el));

  /* ---------- Tech dock (balloon physics bubbles) ---------- */
  const arena = document.getElementById("bubble-arena");

  if (arena && data.techBubbles) {
    const count = data.techBubbles.length;
    const cols = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / cols);
    const startPositions = data.techBubbles.map((_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      return {
        x: ((col + 0.5) / cols) * 0.86 + 0.07,
        y: ((row + 0.5) / rows) * 0.86 + 0.07,
      };
    });

    arena.innerHTML = data.techBubbles
      .map((t, i) => {
        const shape = t.shape === "oval" ? " float-bubble-oval" : "";
        const inner = t.icon
          ? `<img src="${esc(t.icon)}" alt="${esc(t.name)}" draggable="false" />`
          : `<span class="float-bubble-text" style="background:${t.color || "var(--ink)"}">${esc(t.label || t.name)}</span>`;
        return `
      <div class="float-bubble${shape}" data-i="${i}" title="${esc(t.name)}" role="button" tabindex="0" aria-label="${esc(t.name)}">
        <div class="float-bubble-glass" aria-hidden="true"></div>
        <div class="float-bubble-logo">${inner}</div>
      </div>`;
      })
      .join("");

    const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
    const readPad = () => parseFloat(getComputedStyle(arena).paddingLeft) || 20;

    const bubbles = [...arena.querySelectorAll(".float-bubble")].map((el, i) => {
      const pos = startPositions[i] || { x: 0.2 + i * 0.08, y: 0.3 + i * 0.05 };
      return {
        el,
        x: 0,
        y: 0,
        vx: (Math.random() - 0.5) * 55,
        vy: (Math.random() - 0.5) * 40,
        radius: 0,
        dragging: false,
        dragOffsetX: 0,
        dragOffsetY: 0,
        lastPointerX: 0,
        lastPointerY: 0,
        lastMoveTime: 0,
        throwVX: 0,
        throwVY: 0,
        startRatio: pos,
      };
    });

    const bounds = () => {
      const pad = readPad();
      const w = arena.clientWidth;
      const h = arena.clientHeight;
      return { w, h, pad };
    };

    const layoutBubble = (b) => {
      const { w, h } = bounds();
      b.radius = Math.max(b.el.offsetWidth, b.el.offsetHeight) * 0.5;
      if (!b.placed) {
        b.x = padCenter(w, b.startRatio.x, b.radius);
        b.y = padCenter(h, b.startRatio.y, b.radius);
        b.placed = true;
      }
    };

    const padCenter = (size, ratio, radius) => {
      const pad = readPad();
      const min = pad + radius;
      const max = size - pad - radius;
      return clamp(ratio * size, min, max);
    };

    const wallBounce = (b, minX, maxX, minY, maxY) => {
      const restitution = 0.68;
      if (b.x < minX) {
        b.x = minX;
        b.vx = Math.abs(b.vx) * restitution;
      } else if (b.x > maxX) {
        b.x = maxX;
        b.vx = -Math.abs(b.vx) * restitution;
      }
      if (b.y < minY) {
        b.y = minY;
        b.vy = Math.abs(b.vy) * restitution;
      } else if (b.y > maxY) {
        b.y = maxY;
        b.vy = -Math.abs(b.vy) * restitution;
      }
    };

    const resolvePair = (a, b) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      let dist = Math.hypot(dx, dy);
      const minDist = a.radius + b.radius;
      if (dist >= minDist || dist === 0) return;

      const nx = dx / (dist || 1);
      const ny = dy / (dist || 1);
      const overlap = minDist - dist;

      if (a.dragging && b.dragging) return;

      if (a.dragging) {
        b.x += nx * overlap;
        b.y += ny * overlap;
        b.vx += nx * 90;
        b.vy += ny * 90;
        return;
      }
      if (b.dragging) {
        a.x -= nx * overlap;
        a.y -= ny * overlap;
        a.vx -= nx * 90;
        a.vy -= ny * 90;
        return;
      }

      a.x -= nx * overlap * 0.5;
      a.y -= ny * overlap * 0.5;
      b.x += nx * overlap * 0.5;
      b.y += ny * overlap * 0.5;

      const dvx = b.vx - a.vx;
      const dvy = b.vy - a.vy;
      const dvn = dvx * nx + dvy * ny;
      if (dvn >= 0) return;

      const impulse = (-(1 + 0.62) * dvn) / 2;
      a.vx -= impulse * nx;
      a.vy -= impulse * ny;
      b.vx += impulse * nx;
      b.vy += impulse * ny;
    };

    const renderBubble = (b) => {
      b.el.style.left = `${b.x}px`;
      b.el.style.top = `${b.y}px`;
      const speed = Math.hypot(b.vx, b.vy);
      const squash = Math.min(speed / 180, 0.14);
      const tilt = clamp(b.vx * 0.04, -8, 8);
      b.el.style.transform = `translate(-50%, -50%) scale(${1 + squash * 0.35}, ${1 - squash * 0.45}) rotate(${tilt}deg)`;
    };

    const tick = (now) => {
      const dt = Math.min((now - (tick.prev || now)) / 1000, 0.032);
      tick.prev = now;
      const { w, h, pad } = bounds();

      bubbles.forEach(layoutBubble);

      bubbles.forEach((b) => {
        if (b.dragging) return;

        b.vy -= 14 * dt;
        b.vx += (Math.random() - 0.5) * 22 * dt;
        b.vy += (Math.random() - 0.5) * 16 * dt;

        const drag = Math.pow(0.988, dt * 60);
        b.vx *= drag;
        b.vy *= drag;

        b.x += b.vx * dt;
        b.y += b.vy * dt;

        const minX = pad + b.radius;
        const maxX = w - pad - b.radius;
        const minY = pad + b.radius;
        const maxY = h - pad - b.radius;
        wallBounce(b, minX, maxX, minY, maxY);
      });

      for (let i = 0; i < bubbles.length; i++) {
        for (let j = i + 1; j < bubbles.length; j++) {
          resolvePair(bubbles[i], bubbles[j]);
        }
      }

      bubbles.forEach(renderBubble);
      requestAnimationFrame(tick);
    };

    requestAnimationFrame((now) => {
      bubbles.forEach(layoutBubble);
      tick.prev = now;
      requestAnimationFrame(tick);
    });

    bubbles.forEach((b) => {
      b.el.addEventListener("pointerdown", (e) => {
        b.dragging = true;
        b.vx = 0;
        b.vy = 0;
        b.el.classList.add("is-dragging");
        b.el.setPointerCapture(e.pointerId);
        const bubbleRect = b.el.getBoundingClientRect();
        b.dragOffsetX = e.clientX - (bubbleRect.left + bubbleRect.width / 2);
        b.dragOffsetY = e.clientY - (bubbleRect.top + bubbleRect.height / 2);
        b.lastPointerX = e.clientX;
        b.lastPointerY = e.clientY;
        b.lastMoveTime = performance.now();
        b.throwVX = 0;
        b.throwVY = 0;
        e.preventDefault();
      });

      b.el.addEventListener("pointermove", (e) => {
        if (!b.dragging) return;
        const arenaRect = arena.getBoundingClientRect();
        const { w, h, pad } = bounds();
        layoutBubble(b);
        const minX = pad + b.radius;
        const maxX = w - pad - b.radius;
        const minY = pad + b.radius;
        const maxY = h - pad - b.radius;
        const centerX = e.clientX - b.dragOffsetX - arenaRect.left;
        const centerY = e.clientY - b.dragOffsetY - arenaRect.top;
        b.x = clamp(centerX, minX, maxX);
        b.y = clamp(centerY, minY, maxY);

        const now = performance.now();
        const dt = Math.max((now - b.lastMoveTime) / 1000, 0.008);
        b.throwVX = (e.clientX - b.lastPointerX) / dt;
        b.throwVY = (e.clientY - b.lastPointerY) / dt;
        b.lastPointerX = e.clientX;
        b.lastPointerY = e.clientY;
        b.lastMoveTime = now;
        renderBubble(b);
      });

      const stopDrag = (e) => {
        if (!b.dragging) return;
        b.dragging = false;
        b.el.classList.remove("is-dragging");
        b.vx = clamp(b.throwVX * 0.45, -260, 260);
        b.vy = clamp(b.throwVY * 0.45, -260, 260);
        try {
          b.el.releasePointerCapture(e.pointerId);
        } catch (_) {}
      };

      b.el.addEventListener("pointerup", stopDrag);
      b.el.addEventListener("pointercancel", stopDrag);
    });

    window.addEventListener("resize", () => {
      bubbles.forEach((b) => {
        const { w, h } = bounds();
        layoutBubble(b);
        const pad = readPad();
        b.x = clamp(b.x, pad + b.radius, w - pad - b.radius);
        b.y = clamp(b.y, pad + b.radius, h - pad - b.radius);
      });
    });
  }
})();
