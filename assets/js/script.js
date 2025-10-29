'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navbar = document.querySelector("[data-navbar]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");

const navToggleFunc = function () {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

navToggleBtn.addEventListener("click", navToggleFunc);
overlay.addEventListener("click", navToggleFunc);

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navToggleFunc);
}



/**
 * header active on scroll
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  window.scrollY >= 10 ? header.classList.add("active")
    : header.classList.remove("active");
});



/**
 * smooth scrolling for anchor links
 */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});



/**
 * intersection observer for animations
 */

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.featured-car-card, .blog-card, .get-start-card');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
    observer.observe(el);
  });
});



/**
 * form handling
 */

const contactForm = document.getElementById('contact');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('full-name');
    const phone = formData.get('phone');
    const service = formData.get('service');
    
    // Simple validation
    if (!name || !phone || !service) {
      alert('Por favor, completa todos los campos del formulario.');
      return;
    }
    
    // Create WhatsApp message
    const message = `Hola Electrocar Padilla! Me interesa solicitar una cotización para: ${service}\n\nNombre: ${name}\nTeléfono: ${phone}`;
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    this.reset();
    
    // Show success message
    alert('¡Gracias! Te hemos redirigido a WhatsApp para continuar con tu solicitud.');
  });
}



/**
 * service cards click handling
 */

document.querySelectorAll('.featured-car-card .btn:not(.fav-btn)').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const serviceCard = this.closest('.featured-car-card');
    const serviceName = serviceCard.querySelector('.card-title a').textContent;
    
    // Scroll to contact form
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Pre-fill service type
      setTimeout(() => {
        const serviceSelect = document.querySelector('select[name="service"]');
        if (serviceSelect) {
          const serviceValue = serviceName.toLowerCase().includes('electricidad') ? 'electricidad' :
                              serviceName.toLowerCase().includes('mantenimiento') ? 'mantenimiento' :
                              serviceName.toLowerCase().includes('diagnóstico') ? 'diagnostico' :
                              serviceName.toLowerCase().includes('alternador') ? 'alternador' : '';
          if (serviceValue) {
            serviceSelect.value = serviceValue;
          }
        }
      }, 500);
    }
  });
});



/**
 * WhatsApp button click tracking
 */

document.querySelector('.whatsapp-float').addEventListener('click', function() {
  // You can add analytics tracking here if needed
  console.log('WhatsApp button clicked');
});