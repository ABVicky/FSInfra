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

    // Close mobile menu on link click
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
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    }
  });

  // ===== Testimonial Slider (Owl Carousel) =====
  $(document).ready(function () {
    $("#testimonial-slider").owlCarousel({
      items: 2,
      itemsDesktop: [1000, 2],
      itemsDesktopSmall: [980, 1],
      itemsTablet: [768, 1],
      pagination: true,
      navigation: true,
      navigationText: ["<", ">"],
      autoPlay: true
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
    const increment = Math.ceil(target / 500);

    if (count < target) {
      counter.innerText = count + increment;
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };

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

// ======================== Appointment Modal ========================
const modal = document.getElementById("contactModal");
const btn = document.getElementById("bookBtn");
const close = document.querySelector(".close");
const cards = document.querySelectorAll(".contact-card");

const confirmModal = document.getElementById("confirmModal");
const confirmMsg = document.getElementById("confirmMsg");
const confirmYes = document.getElementById("confirmYes");
const confirmNo = document.getElementById("confirmNo");

let redirectLink = "";

// Open Contact Modal
btn.onclick = () => modal.classList.add("show");

// Close Contact Modal
close.onclick = () => modal.classList.remove("show");

// Close modals if clicking outside
window.onclick = e => {
  if (e.target === modal) modal.classList.remove("show");
  if (e.target === confirmModal) confirmModal.classList.remove("show");
};

// Card click → Confirmation
cards.forEach(card => {
  card.addEventListener("click", () => {
    const type = card.getAttribute("data-type");
    redirectLink = card.getAttribute("data-link");

    let msg = "";
    if (type === "call") msg = "This will open your phone app to make a call. Proceed?";
    else if (type === "email") msg = "This will open your email client. Proceed?";
    else if (type === "map") msg = "This will open Google Maps. Proceed?";

    confirmMsg.textContent = msg;
    confirmModal.classList.add("show");
  });
});

// Confirm modal actions
confirmYes.onclick = () => {
  window.location.href = redirectLink;
  confirmModal.classList.remove("show");
};

confirmNo.onclick = () => confirmModal.classList.remove("show");

// ======================== Services Section Tabs ========================
const categories = {
  interior: {
    title: "Interior Design Services",
    services: [
      { icon: "fa-bed", name: "Bedroom Design", desc: "Personalized bedroom spaces for comfort and style." },
      { icon: "fa-utensils", name: "Kitchen Design", desc: "Modern and practical kitchen layouts." },
      { icon: "fa-bath", name: "Bathroom Design", desc: "Clean, luxurious spaces built for relaxation." },
      { icon: "fa-chair", name: "Dining Design", desc: "Inviting dining spaces blending comfort and aesthetics." },
      { icon: "fa-briefcase", name: "Office Design", desc: "Optimized workplaces for productivity and creativity." },
      { icon: "fa-store", name: "Shop & Showroom Design", desc: "Engaging commercial interiors for better experiences." },
      { icon: "fa-hotel", name: "Hotel & Resort Design", desc: "Luxurious hospitality spaces that create memories." },
      { icon: "fa-hospital", name: "Hospital & Nursing Home Design", desc: "Safe and efficient healthcare environments." },
    ],
  },
  building: {
    title: "Building Plan & Design",
    services: [
      { icon: "fa-building", name: "Architectural Design", desc: "Sustainable and innovative architectural planning." },
      { icon: "fa-drafting-compass", name: "Plan & Elevation", desc: "Accurate designs tailored to your requirements." },
      { icon: "fa-vector-square", name: "2D & 3D Layouts", desc: "Detailed visualizations for clarity and precision." },
      { icon: "fa-sun", name: "Roof Top Design", desc: "Transforming rooftops into functional outdoor areas." },
      { icon: "fa-tree", name: "Landscape Design", desc: "Merging nature with modern design elements." },
      { icon: "fa-archway", name: "Facade Design", desc: "Timeless and visually striking exteriors." },
    ],
  },
  architecture: {
    title: "Architectural & Creative Solutions",
    services: [
      { icon: "fa-city", name: "Corporate Design", desc: "Spaces that reflect your brand and identity." },
      { icon: "fa-drafting-compass", name: "Architectural Design & Solution", desc: "Complete solutions from concept to execution." },
      { icon: "fa-paint-brush", name: "Business Logo Design", desc: "Meaningful logos that express brand identity." },
      { icon: "fa-id-card", name: "Visiting Card Design", desc: "Elegant and professional visiting cards." },
      { icon: "fa-cube", name: "Product Design", desc: "Turning ideas into functional products." },
      { icon: "fa-chair", name: "Furniture Design", desc: "Custom furniture built for your taste." },
      { icon: "fa-user-tie", name: "Design Consultancy", desc: "Expert design guidance for every project." },
      { icon: "fa-hard-hat", name: "Civil Solution", desc: "Reliable civil engineering with precision." },
    ],
  },
};

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupServices = document.getElementById("popupServices");
const closeBtn = document.getElementById("closePopup");

document.querySelectorAll(".category-card").forEach(card => {
  card.addEventListener("click", () => {
    const category = categories[card.dataset.category];
    popupTitle.textContent = category.title;
    popupServices.innerHTML = category.services.map(service => `
      <div class="service-card">
        <i class="fas ${service.icon}"></i>
        <h3>${service.name}</h3>
        <p>${service.desc}</p>
      </div>
    `).join("");
    popup.classList.add("active");
  });
});

closeBtn.addEventListener("click", () => popup.classList.remove("active"));
popup.addEventListener("click", e => {
  if (e.target === popup) popup.classList.remove("active");
});
