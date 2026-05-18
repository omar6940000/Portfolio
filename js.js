

      // Loading Screen
      window.addEventListener('load', function() {
        setTimeout(function() {
          document.getElementById('loader').classList.add('hidden');
        }, 2200);
      });

      // Typing animation for the title
      const titles = [
        "Full-Stack Web Developer",
        "Front End Developer", 
        "Back End Developer"
      ];
      
      let currentTitleIndex = 0;
      let currentCharIndex = 0;
      let isDeleting = false;
      let typingSpeed = 100;
      let deletingSpeed = 50;
      let pauseTime = 2000;
      
      const animatedTitleElement = document.getElementById('animatedTitle');
      
      function typeWriter() {
        const currentTitle = titles[currentTitleIndex];
        
        if (!isDeleting) {
          animatedTitleElement.textContent = currentTitle.substring(0, currentCharIndex + 1);
          currentCharIndex++;
          
          if (currentCharIndex === currentTitle.length) {
            isDeleting = true;
            setTimeout(typeWriter, pauseTime);
            return;
          }
        } else {
          animatedTitleElement.textContent = currentTitle.substring(0, currentCharIndex - 1);
          currentCharIndex--;
          
          if (currentCharIndex === 0) {
            isDeleting = false;
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
          }
        }
        
        const speed = isDeleting ? deletingSpeed : typingSpeed;
        setTimeout(typeWriter, speed);
      }
      
      typeWriter();

      // Mobile Menu
      const mobileMenuBtn = document.getElementById('mobileMenuBtn');
      const mobileMenu = document.getElementById('mobileMenu');
      
      mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
      });

      // Close mobile menu when clicking a link
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });


      function toggleLanguage() {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        const t = translations[currentLang];
        
        document.body.classList.toggle('rtl', currentLang === 'ar');
        document.documentElement.lang = currentLang === 'ar' ? 'ar' : 'en';
        
        document.getElementById('langText').textContent = t.langBtn;
        document.querySelector('.lang-text-mobile').textContent = t.langBtn;
        
        document.querySelectorAll('[data-en][data-ar]').forEach(el => {
          el.textContent = currentLang === 'ar' ? el.dataset.ar : el.dataset.en;
        });
        
        const heroGreeting = document.querySelector('.font-ar');
        if (heroGreeting) heroGreeting.textContent = t.heroGreeting;
        
        const hireMeBtn = document.getElementById('hireMeBtn');
        const viewProjectsBtn = document.getElementById('viewProjectsBtn');
        const downloadCvBtn = document.getElementById('downloadCvBtn');
        
        if (hireMeBtn) hireMeBtn.textContent = t.hireMe;
        if (viewProjectsBtn) viewProjectsBtn.textContent = t.viewProjects;
        if (downloadCvBtn) downloadCvBtn.textContent = t.downloadCv;
        
        document.querySelectorAll('.section-badge').forEach((badge, index) => {
          const badges = ['aboutBadge', 'skillsBadge', 'projectsBadge', 'certificatesBadge', 'servicesBadge', 'testimonialsBadge', 'contactBadge'];
          if (badges[index]) badge.textContent = t[badges[index]];
        });
      }

      document.getElementById('langToggle').addEventListener('click', toggleLanguage);
      document.getElementById('langToggleMobile').addEventListener('click', toggleLanguage);

      // Active Nav Link on Scroll
      function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        
        let currentSection = '';
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
          }
        });
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.dataset.section === currentSection) {
            link.classList.add('active');
          }
        });
        
        mobileNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.dataset.section === currentSection) {
            link.classList.add('active');
          }
        });
      }

      window.addEventListener('scroll', updateActiveNavLink);
      window.addEventListener('load', updateActiveNavLink);

      document.addEventListener("DOMContentLoaded", () => {
        // Set current year in footer
        const yearSpan = document.getElementById("year");
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();

        // Smooth scroll buttons in hero
        const hireMeBtn = document.getElementById("hireMeBtn");
        const viewProjectsBtn = document.getElementById("viewProjectsBtn");
        const downloadCvBtn = document.getElementById("downloadCvBtn");

        if (hireMeBtn) {
          hireMeBtn.addEventListener("click", () => {
            document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
          });
        }

        if (viewProjectsBtn) {
          viewProjectsBtn.addEventListener("click", () => {
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          });
        }

        if (downloadCvBtn) {
          downloadCvBtn.addEventListener("click", (e) => {
            e.preventDefault();
            alert("CV download will be available soon.");
          });
        }

        // Hero 3D tilt effect
        const heroVisual = document.getElementById("heroVisual");
        const heroVisualInner = document.getElementById("heroVisualInner");
        if (heroVisual && heroVisualInner) {
          const maxRotate = 12;
          heroVisual.addEventListener("mousemove", (e) => {
            const rect = heroVisual.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateY = ((x - centerX) / centerX) * maxRotate;
            const rotateX = -((y - centerY) / centerY) * maxRotate;
            heroVisualInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
          });

          heroVisual.addEventListener("mouseleave", () => {
            heroVisualInner.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";
          });
        }

        // Reveal on scroll
        const revealElements = document.querySelectorAll(".reveal-on-scroll");
        if ("IntersectionObserver" in window) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("visible");
                  observer.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.15 }
          );
          revealElements.forEach((el) => observer.observe(el));
        } else {
          revealElements.forEach((el) => el.classList.add("visible"));
        }

        // Animate skill bars when in view
        const skillBars = document.querySelectorAll("[data-skill-bar]");
        if ("IntersectionObserver" in window && skillBars.length) {
          const skillObserver = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const el = entry.target;
                  const value = el.getAttribute("data-skill-bar");
                  if (value) {
                    setTimeout(() => {
                      el.style.width = value + "%";
                    }, 200);
                  }
                  skillObserver.unobserve(el);
                }
              });
            },
            { threshold: 0.3 }
          );
          skillBars.forEach((bar) => skillObserver.observe(bar));
        } else {
          skillBars.forEach((bar) => {
            const value = bar.getAttribute("data-skill-bar");
            if (value) bar.style.width = value + "%";
          });
        }

        // Contact form
        const contactForm = document.getElementById("contactForm");
        const contactStatus = document.getElementById("contactStatus");
        if (contactForm && contactStatus) {
          contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            contactStatus.textContent = "Thank you! This is a demo form — your message is not actually sent.";
            contactStatus.classList.remove("text-red-400");
            contactStatus.classList.add("text-emerald-300");
            contactForm.reset();
          });
        }

        // Testimonials slider
        const slides = Array.from(document.querySelectorAll(".testimonial-slide"));
        const prevBtn = document.getElementById("prevTestimonial");
        const nextBtn = document.getElementById("nextTestimonial");
        const dots = Array.from(document.querySelectorAll("[data-testimonial-dot]"));
        let currentSlide = 0;
        let sliderInterval;

        const showSlide = (index) => {
          if (!slides.length) return;
          currentSlide = (index + slides.length) % slides.length;
          slides.forEach((slide, i) => {
            slide.classList.toggle("hidden", i !== currentSlide);
          });
          dots.forEach((dot, i) => {
            if (i === currentSlide) {
              dot.classList.remove("w-1.5", "bg-slate-600");
              dot.classList.add("w-4", "bg-purple-400");
            } else {
              dot.classList.remove("w-4", "bg-purple-400");
              dot.classList.add("w-1.5", "bg-slate-600");
            }
          });
        };

        const startSlider = () => {
          if (sliderInterval) clearInterval(sliderInterval);
          sliderInterval = setInterval(() => {
            showSlide(currentSlide + 1);
          }, 7000);
        };

        if (slides.length) {
          showSlide(0);
          startSlider();

          if (prevBtn) {
            prevBtn.addEventListener("click", () => {
              showSlide(currentSlide - 1);
              startSlider();
            });
          }
          if (nextBtn) {
            nextBtn.addEventListener("click", () => {
              showSlide(currentSlide + 1);
              startSlider();
            });
          }
        }

        // Initialize AOS
        AOS.init({
          duration: 800,
          once: true,
          offset: 100
        });
      });
    





(function () {
  'use strict';

  let currentLightboxIndex = 0;
  const certificateGrid = document.getElementById('certificateGrid');
  const lightbox = document.getElementById('certLightbox');
  const lightboxImg = document.getElementById('certLightboxImg');
  const lightboxCounter = document.getElementById('certLightboxCounter');
  const lightboxClose = document.getElementById('certLightboxClose');
  const lightboxPrev = document.getElementById('certLightboxPrev');
  const lightboxNext = document.getElementById('certLightboxNext');

  function init() {
    bindEvents();
    updateLightboxIndices();
  }

  function bindEvents() {
    // Click on image wrappers to open lightbox
    certificateGrid.addEventListener('click', (e) => {
      const wrapper = e.target.closest('.certificate-image-wrapper');
      if (wrapper) {
        const index = parseInt(wrapper.getAttribute('data-lightbox-index'));
        openLightbox(index);
      }
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => navigateLightbox(1));
    
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }

  function updateLightboxIndices() {
    const wrappers = certificateGrid.querySelectorAll('.certificate-image-wrapper');
    wrappers.forEach((wrapper, i) => {
      wrapper.setAttribute('data-lightbox-index', i);
    });
  }

  function openLightbox(index) {
    const images = certificateGrid.querySelectorAll('.certificate-image-wrapper img');
    if (index < 0 || index >= images.length) return;
    
    currentLightboxIndex = index;
    lightboxImg.src = images[index].src;
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${images.length}`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function navigateLightbox(direction) {
    const images = certificateGrid.querySelectorAll('.certificate-image-wrapper img');
    currentLightboxIndex = (currentLightboxIndex + direction + images.length) % images.length;
    lightboxImg.src = images[currentLightboxIndex].src;
    lightboxCounter.textContent = `${currentLightboxIndex + 1} / ${images.length}`;
  }

  document.addEventListener('DOMContentLoaded', init);
})();