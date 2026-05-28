document.addEventListener("DOMContentLoaded", function() {

    // --- Header & Mobile Menu ---
    const header = document.querySelector('.header');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelectorAll('.nav__link, .header__btn');

    function updateHeaderState() {
        const isScrolled = window.scrollY > 50;
        if (isScrolled) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    }

    window.addEventListener('scroll', updateHeaderState);

    if (burger) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('is-active');
            header.classList.toggle('header--menu-open');
        });
    }

    // Закрытие меню при клике на ссылку (на мобильных)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 768) {
                burger.classList.remove('is-active');
                header.classList.remove('header--menu-open');
            }
        });
    });

    // --- Cookie Consent Logic (GDPR/CCPA) ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');

    // Проверяем, есть ли запись в localStorage
    if (!localStorage.getItem('sierra_cookies_accepted')) {
        // Показываем баннер с задержкой в 1 секунду для плавности
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    // Обработка клика "Accept"
    if (acceptCookiesBtn) {
        acceptCookiesBtn.addEventListener('click', () => {
            localStorage.setItem('sierra_cookies_accepted', 'true');
            cookieBanner.classList.remove('show');
        });
    }

    // --- Register GSAP ScrollTrigger ---
    gsap.registerPlugin(ScrollTrigger);

    // --- Hero Intro Animation ---
    const heroTl = gsap.timeline({ delay: 0.1 });
    heroTl.from('.hero__title', { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" })
          .from('.hero__subtitle', { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" }, '-=0.5')
          .from('.hero__actions', { y: 20, opacity: 0, duration: 0.6, ease: "power2.out", clearProps: "all" }, '-=0.4')
          .from('.hero__large-logo', { scale: 0.95, opacity: 0, duration: 1, ease: "power2.out", clearProps: "all" }, '-=0.8');

    // --- Subtle Hero Parallax ---
    gsap.to(".hero__bg-image", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
            trigger: ".paralax-hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // --- How It Works Progress Line ---
    if (window.innerWidth > 768) {
        gsap.to('.flow-line__progress-wrap', {
            height: '100%', ease: 'none',
            scrollTrigger: { trigger: '.flow-wrapper', start: 'top 75%', end: 'bottom 85%', scrub: true }
        });
    }

    const flowSteps = document.querySelectorAll('.flow-step');
    flowSteps.forEach((step, index) => {
        const icon = step.querySelector('.flow-step__icon-wrap');
        const content = step.querySelector('.flow-step__content');
        
        const isMobile = window.innerWidth <= 768;
        const isEven = index % 2 !== 0; 
        
        gsap.set(content, { 
            x: isMobile ? 0 : (isEven ? 30 : -30), 
            y: isMobile ? 30 : 0, 
            opacity: 0 
        }); 
        gsap.set(icon, { scale: 0.8, opacity: 0 });

        const stepTl = gsap.timeline({
            scrollTrigger: { trigger: step, start: 'top 85%', once: true }
        });

        stepTl.to(icon, { 
                scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.5)",
                onStart: () => step.classList.add('flow-step--active')
            })
            .to(content, { x: 0, y: 0, opacity: 1, duration: 0.5, ease: "power2.out", clearProps: "all" }, "-=0.3");
    });

    // --- Reveal Animations for Blocks ---
    const revealElements = document.querySelectorAll('.brand-heart__block, .mv-card, .solutions-header, .solution-card, .core-values__header, .value-item, .contact__content, .contact__form-wrap');

    revealElements.forEach((el) => {
        gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true, 
                clearProps: "all"
            }
        });
    });

    // --- Footer Animation ---
    gsap.from('.footer__col', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: '.footer__inner',
            start: "top 95%",
            once: true
        }
    });
    
    window.addEventListener('resize', () => {
        ScrollTrigger.refresh();
    });

});