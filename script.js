/* ══════════════════════════════════════════════════════
   Kavin T.S — Portfolio Script
   ══════════════════════════════════════════════════════ */

(function () {
    'use strict';

    // ── Intersection Observer for scroll-triggered reveal ──
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // ── Navbar scroll styling ──
    const navbar = document.getElementById('navbar');

    function handleNavScroll() {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    // ── Mobile hamburger menu ──
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ── Smooth scroll for all anchor links (fallback for older browsers) ──
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ── Active nav link highlighting ──
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY + 120;

        sections.forEach((section) => {
            const id = section.getAttribute('id');
            const top = section.offsetTop;
            const height = section.offsetHeight;

            const link = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (!link) return;

            if (scrollY >= top && scrollY < top + height) {
                link.style.color = '#fff';
            } else {
                link.style.color = '';
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink, { passive: true });

})();
