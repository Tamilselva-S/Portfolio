
document.addEventListener("DOMContentLoaded", () => {

  // Elements
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navigationLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section[id]");
  const backToTop = document.getElementById("back-to-top");


  // Mobile navigation
  menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

  });


  // Smooth scrolling and close mobile menu
  navigationLinks.forEach(link => {

    link.addEventListener("click", event => {

      const target = document.querySelector(
        link.getAttribute("href")
      );

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      }

    });

  });


  // Active navigation highlighting
  const sectionObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const currentId = entry.target.id;

        navigationLinks.forEach(link => {

          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + currentId
          );

        });

      }

    });

  }, {
    rootMargin: "-25% 0px -65% 0px",
    threshold: 0
  });


  sections.forEach(section => {
    sectionObserver.observe(section);
  });


  // Reveal animations
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("show");

        revealObserver.unobserve(entry.target);

      }

    });

  }, {
    threshold: 0.12
  });


  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  // Back to top button
  window.addEventListener("scroll", () => {

    if (window.scrollY > 450) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }

  }, { passive: true });


  backToTop.addEventListener("click", () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  });


  // Automatically update copyright year
  document.getElementById("year").textContent =
    new Date().getFullYear();


  // Close mobile menu when clicking outside
  document.addEventListener("click", event => {

    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {

      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");

    }

  });

});
