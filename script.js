// ======================== DOM READY ========================
document.addEventListener("DOMContentLoaded", () => {

    // ===== Mobile Navigation Toggle =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on any link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // ===== Testimonial Slider =====
    $(document).ready(function(){
        $("#testimonial-slider").owlCarousel({
            items:2,
            itemsDesktop:[1000,2],
            itemsDesktopSmall:[980,1],
            itemsTablet:[768,1],
            pagination:true,
            navigation:true,
            navigationText:["<",">"],
            autoPlay:true
        });
    });




    // ===== Contact Form Handling =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert(
                "Thank you for your message! We'll get back to you soon.\n" +
                "(This is a demo — integrate backend for real submissions.)"
            );
            contactForm.reset();
        });
    }

});

// ======================== Project Counters ========================
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const increment = Math.ceil(target / 500); // slower increment

        if (count < target) {
            counter.innerText = count + increment;
            setTimeout(updateCount, 20); // delay to control speed
        } else {
            counter.innerText = target;
        }
    };

    // Trigger counter when element is visible in viewport
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCount();
                observer.unobserve(entry.target); // stop observing once counted
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counter);
});

// ======================== Floating Contact Button ========================
const contactBtn = document.querySelector('.contact-btn');
const contactOptions = document.querySelector('.contact-options');

if (contactBtn && contactOptions) {
    contactBtn.addEventListener('mouseenter', () => {
        contactOptions.style.opacity = '1';
        contactOptions.style.transform = 'translateY(0)';
        contactOptions.style.pointerEvents = 'auto';
    });

    contactBtn.addEventListener('mouseleave', () => {
        contactOptions.style.opacity = '0';
        contactOptions.style.transform = 'translateY(20px)';
        contactOptions.style.pointerEvents = 'none';
    });
}

