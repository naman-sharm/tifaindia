document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.classList.toggle("is-open", open);
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open"); menuBtn.setAttribute("aria-expanded", "false");
    }));
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target, target = Number(el.dataset.count || 0), suffix = el.dataset.suffix || "";
      const duration = 1500, start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.floor(target * eased).toLocaleString("en-IN") + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick); countObserver.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll("[data-count]").forEach(el => countObserver.observe(el));

  document.querySelectorAll(".filter").forEach(btn => btn.addEventListener("click", () => {
    document.querySelectorAll(".filter").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".course-card").forEach(card => {
      const show = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hide", !show);
    });
  }));

  document.querySelectorAll("[data-course]").forEach(link => link.addEventListener("click", () => {
    const select = document.querySelector("#course");
    if (select) select.value = link.dataset.course;
  }));

  const form = document.querySelector("#enquiryForm");
  if (form) form.addEventListener("submit", e => {
    e.preventDefault();
    if (!form.reportValidity()) return;
    const name = document.querySelector("#name").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const course = document.querySelector("#course").value;
    const message = document.querySelector("#message").value.trim();
    const text = `Hello TIFA Education,%0A%0AMy name is ${encodeURIComponent(name)}.%0AMobile: ${encodeURIComponent(phone)}%0ACourse: ${encodeURIComponent(course)}%0AMessage: ${encodeURIComponent(message || "Please share more details.")}`;
    window.open(`https://wa.me/917793844555?text=${text}`, "_blank", "noopener");
  });

  const topBtn = document.querySelector(".to-top");
  window.addEventListener("scroll", () => {
    if (topBtn) topBtn.classList.toggle("show", window.scrollY > 550);
  }, { passive: true });
  if (topBtn) topBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
});