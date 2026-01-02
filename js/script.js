// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Hero Section Animations (On Load) ---
    const tlHero = gsap.timeline();
    
    tlHero.from('.hero-text h6', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('.hero-text h1', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-text p', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-text .btn', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-image', {
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
    }, '-=1')
    .from('.stats-card', {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: 'back.out(1.7)'
    }, '-=0.5');

    // --- Reveal Animations for Sections ---
    const sectionHeaders = gsap.utils.toArray('.section-header');
    sectionHeaders.forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 40,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Staggered reveal for Mission Cards
    gsap.from('.mission-card', {
        scrollTrigger: {
            trigger: '#missions .row',
            start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
    });

    // Reveal for Testimonials
    gsap.from('.testimonial-content', {
        scrollTrigger: {
            trigger: '#testimonials',
            start: 'top 80%',
        },
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
    });

    // --- Impact Counters ---
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        
        gsap.to(counter, {
            scrollTrigger: {
                trigger: counter,
                start: 'top 90%',
            },
            innerHTML: target,
            duration: 2.5,
            snap: { innerHTML: 1 },
            ease: 'power1.inOut',
            onUpdate: function() {
                // If it's a large number, add commas
                if (target >= 1000) {
                    counter.innerHTML = Math.floor(this.targets()[0].innerHTML).toLocaleString();
                }
            }
        });
    });

    // --- Parallax Effect on Hero Image ---
    gsap.to('.main-hero-img', {
        scrollTrigger: {
            trigger: '#hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: 100,
        ease: 'none'
    });

    // --- Floating animation for CTA shapes ---
    gsap.to('.shape-1', {
        y: 20,
        x: 10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.shape-2', {
        y: -15,
        x: -15,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // --- Smooth Scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Hover Effect for Mission Cards (GSAP enhanced) ---
    const missionCards = document.querySelectorAll('.mission-card');
    missionCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.icon-box i'), {
                scale: 1.2,
                rotation: 5,
                duration: 0.3
            });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.icon-box i'), {
                scale: 1,
                rotation: 0,
                duration: 0.3
            });
        });
    });
});
