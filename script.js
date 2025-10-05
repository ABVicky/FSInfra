// Wait for DOM to load
document.addEventListener("DOMContentLoaded", () => {

    // ===== Mobile Navigation Toggle =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
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
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        if (testimonials.length === 0) return;
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.toggle('active', i === index);
        });
    }

    if (nextBtn && prevBtn && testimonials.length > 0) {
        nextBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        prevBtn.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });

        // Auto-slide testimonials every 5 seconds
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);

        showTestimonial(0); // Initialize
    }

    // ===== Contact Form Handling =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Thank you for your message! We'll get back to you soon.\n(This is a demo — integrate backend for real submissions.)");
            contactForm.reset();
        });
    }

});

// ----------------------------Project Counter--------------
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;

    const increment = Math.ceil(target / 500); // slower increment

    if (count < target) {
      counter.innerText = count + increment;
      setTimeout(updateCount, 20); // increase delay to slow it further
    } else {
      counter.innerText = target;
    }
  };

  // Trigger when visible
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateCount();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(counter);
});

// ----------------------------End of Project Counter--------------
// ------------------------testimonial slider------------------------

