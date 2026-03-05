/**
 * ProductX v2 — Main JavaScript
 * Dark mode, scroll animations, header, hamburger
 */

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // 1. DARK MODE TOGGLE
    // =========================================================================
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
        toggle.addEventListener('click', () => {
            const isDark = document.documentElement.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // =========================================================================
    // 2. HEADER SCROLL EFFECT
    // =========================================================================
    const header = document.getElementById('header');
    if (header) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    header.classList.toggle('is-scrolled', window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // =========================================================================
    // 3. HAMBURGER MENU
    // =========================================================================
    const hamburger = document.getElementById('js-hamburger');
    const nav = document.getElementById('nav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', () => {
            const isActive = hamburger.classList.toggle('is-active');
            nav.classList.toggle('is-active');
            hamburger.setAttribute('aria-expanded', isActive);
            hamburger.setAttribute('aria-label', isActive ? 'メニューを閉じる' : 'メニューを開く');
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close on nav link click
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('is-active');
                nav.classList.remove('is-active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('is-active')) {
                hamburger.classList.remove('is-active');
                nav.classList.remove('is-active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                hamburger.focus();
            }
        });
    }

    // =========================================================================
    // 4. SCROLL REVEAL ANIMATIONS
    // =========================================================================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all elements
        revealElements.forEach(el => el.classList.add('is-visible'));
    }

    // =========================================================================
    // 5. SMOOTH SCROLL FOR ANCHOR LINKS
    // =========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
