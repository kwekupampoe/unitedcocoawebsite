/* ============================================================
   UNITED COCOA LIMITED — Premium JavaScript
   Luxury interactions, scroll reveals, and micro-animations
   ============================================================ */

(function () {
  'use strict';

  // ── Preloader ──
  window.addEventListener('load', function () {
    const preloader = document.getElementById('smoothpreloader');
    if (preloader) {
      setTimeout(function () {
        preloader.classList.add('loaded');
        setTimeout(function () {
          preloader.style.display = 'none';
        }, 800);
      }, 2200);
    }
  });

  // ── Navbar Scroll Effect ──
  function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          const currentScroll = window.pageYOffset;
          if (currentScroll > 50) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // ── Scroll Reveal ──
  function initScrollReveal() {
    // Auto-tag elements for reveal
    var selectors = [
      '.discover-item',
      '.mission-card',
      '.about-grid',
      '.product-card',
      '.category-item',
      '.gallery-item',
      '.info-card',
      '.pp-card',
      '.premium-products-header',
      '.hear-from-you',
      '#contact-form'
    ];

    selectors.forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (!el.classList.contains('reveal') && !el.classList.contains('discover-item')) {
          el.classList.add('reveal');
        }
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          // Stagger children animations
          var children = entry.target.querySelectorAll('.reveal');
          children.forEach(function (child, i) {
            setTimeout(function () {
              child.classList.add('reveal-visible');
            }, i * 100);
          });
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal, .discover-item').forEach(function (el) {
      observer.observe(el);
    });
  }

  // ── Staggered Grid Reveals ──
  function initStaggeredReveals() {
    var grids = ['.gallery-grid', '.products-grid', '.mission-grid', '.category-grid', '.info-grid', '.premium-products-grid'];
    
    grids.forEach(function (gridSel) {
      var grid = document.querySelector(gridSel);
      if (!grid) return;

      var gridObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var items = entry.target.children;
            Array.prototype.forEach.call(items, function (item, i) {
              setTimeout(function () {
                item.classList.add('reveal-visible');
              }, i * 120);
            });
            gridObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      gridObserver.observe(grid);
    });
  }

  // ── Back to Top Button ──
  function initBackToTop() {
    var btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(btn);

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          if (window.pageYOffset > 400) {
            btn.classList.add('visible');
          } else {
            btn.classList.remove('visible');
          }
          ticking = false;
        });
        ticking = true;
      }
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Custom Hero Slider ──
  function initHeroSlider() {
    var slides = document.querySelectorAll('.hero-slide');
    var dots = document.querySelectorAll('.hero-dot');
    var progressBar = document.querySelector('.hero-progress-bar');
    var counterCurrent = document.querySelector('.hero-counter-current');
    var prevBtn = document.querySelector('.hero-arrow-prev');
    var nextBtn = document.querySelector('.hero-arrow-next');

    if (!slides.length) return;

    var current = 0;
    var total = slides.length;
    var interval = 7000; // ms per slide
    var timer = null;
    var isTransitioning = false;

    // Pre-load background images
    slides.forEach(function (slide) {
      var bgUrl = slide.getAttribute('data-bg');
      var bgPos = slide.getAttribute('data-bg-pos') || 'center';
      var bgEl = slide.querySelector('.hero-slide-bg');
      if (bgUrl && bgEl) {
        bgEl.style.backgroundImage = 'url(' + bgUrl + ')';
        bgEl.style.backgroundPosition = bgPos;
      }
    });

    function goToSlide(index) {
      if (isTransitioning || index === current) return;
      isTransitioning = true;

      slides[current].classList.remove('active');
      current = ((index % total) + total) % total;
      slides[current].classList.add('active');

      // Update dots
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });

      // Update counter
      if (counterCurrent) {
        counterCurrent.textContent = String(current + 1).padStart(2, '0');
      }

      // Reset progress bar
      restartProgress();

      setTimeout(function () { isTransitioning = false; }, 1000);
    }

    function nextSlide() { goToSlide(current + 1); }
    function prevSlide() { goToSlide(current - 1); }

    function restartProgress() {
      if (!progressBar) return;
      progressBar.classList.remove('running');
      // Force reflow
      void progressBar.offsetWidth;
      progressBar.classList.add('running');
    }

    function startAutoplay() {
      stopAutoplay();
      restartProgress();
      timer = setInterval(nextSlide, interval);
    }

    function stopAutoplay() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    // Arrow listeners
    if (nextBtn) nextBtn.addEventListener('click', function () { stopAutoplay(); nextSlide(); startAutoplay(); });
    if (prevBtn) prevBtn.addEventListener('click', function () { stopAutoplay(); prevSlide(); startAutoplay(); });

    // Dot listeners
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        stopAutoplay();
        goToSlide(i);
        startAutoplay();
      });
    });

    // Keyboard
    document.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { stopAutoplay(); nextSlide(); startAutoplay(); }
      if (e.key === 'ArrowLeft') { stopAutoplay(); prevSlide(); startAutoplay(); }
    });

    // Touch / swipe support
    var touchStartX = 0;
    var heroEl = document.querySelector('.hero-carousel');
    if (heroEl) {
      heroEl.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].clientX;
      }, { passive: true });

      heroEl.addEventListener('touchend', function (e) {
        var diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          stopAutoplay();
          if (diff > 0) nextSlide(); else prevSlide();
          startAutoplay();
        }
      }, { passive: true });
    }

    // Pause on hover
    if (heroEl) {
      heroEl.addEventListener('mouseenter', stopAutoplay);
      heroEl.addEventListener('mouseleave', startAutoplay);
    }

    // Start
    startAutoplay();
  }

  // ── Counter Animation ──
  function animateCounter(el, target, duration) {
    var start = 0;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      el.textContent = Math.floor(eased * target).toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(step);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = parseInt(entry.target.getAttribute('data-counter'), 10);
          animateCounter(entry.target, target, 2000);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function (c) { observer.observe(c); });
  }

  // ── Image Lazy Load Enhancement ──
  function initLazyImages() {
    if ('IntersectionObserver' in window) {
      var images = document.querySelectorAll('img[loading="lazy"]');
      var imageObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transition = 'opacity 0.6s ease';
            entry.target.onload = function () {
              entry.target.style.opacity = '1';
            };
            if (entry.target.complete) {
              entry.target.style.opacity = '1';
            }
            imageObserver.unobserve(entry.target);
          }
        });
      });

      images.forEach(function (img) { imageObserver.observe(img); });
    }
  }

  // ── Active Navigation Highlight ──
  function initActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-nav .nav-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href) {
        var linkPage = href.replace('./', '');
        if (linkPage === currentPage) {
          link.classList.add('active');
        }
      }
    });
  }

  // ── Current Year ──
  function setCurrentYear() {
    document.querySelectorAll('.showCurrentYear').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  // ── Smooth Close Mobile Nav on Click ──
  function initMobileNavClose() {
    var navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    var navCollapse = document.querySelector('.navbar-collapse');
    if (!navCollapse) return;

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navCollapse.classList.contains('show')) {
          var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }

  // ── Magnetic Hover on CTA Buttons ──
  function initMagneticButtons() {
    document.querySelectorAll('.learn-more-btn, .discover-btn, .warning-report-btn').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var rect = btn.getBoundingClientRect();
        var x = e.clientX - rect.left - rect.width / 2;
        var y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = 'translate(' + (x * 0.15) + 'px, ' + (y * 0.15) + 'px)';
      });

      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ── Ticker Pause on Hover ──
  function initTickerHover() {
    var ticker = document.querySelector('.product-ticker');
    if (!ticker) return;

    var section = ticker.closest('.product-ticker-section');
    if (section) {
      section.addEventListener('mouseenter', function () {
        ticker.style.animationPlayState = 'paused';
      });
      section.addEventListener('mouseleave', function () {
        ticker.style.animationPlayState = 'running';
      });
    }
  }

  // ── Contact Form Handler ──
  function initContactForm() {
    var form = document.getElementById('contact-form');
    if (!form) return;

    var submitBtn = document.getElementById('submitBtn');
    var btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    var btnLoader = submitBtn ? submitBtn.querySelector('.btn-loader') : null;
    var messageTextarea = document.getElementById('message');
    var charCount = document.getElementById('charCount');

    // Character counter for message
    if (messageTextarea && charCount) {
      messageTextarea.addEventListener('input', function () {
        charCount.textContent = this.value.length;
      });
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Show loading state
      if (submitBtn) submitBtn.disabled = true;
      if (btnText) btnText.textContent = 'Sending...';
      if (btnLoader) btnLoader.style.display = 'inline-block';

      // Collect form data
      var firstName = document.getElementById('firstname').value.trim();
      var lastName = document.getElementById('lastname').value.trim();
      var name = lastName ? firstName + ' ' + lastName : firstName;
      var email = document.getElementById('email').value.trim();
      var phone = document.getElementById('phonenumber').value.trim();
      var company = document.getElementById('company').value.trim();
      var subject = document.getElementById('subject').value || 'Website Contact Form';
      var message = document.getElementById('message').value.trim();

      try {
        var response = await fetch('https://emailservice-api.onrender.com/api/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': '79e18cce96eec04ad3da9557f740eccd7b4607ccb14c091b'
          },
          body: JSON.stringify({
            template: 'contact-form',
            to: 'info@unitedcocoaltd.com',
            from: {
              email: 'noreply@unitedcocoaltd.com',
              name: 'United Cocoa Website'
            },
            subject: 'New Contact: ' + subject,
            templateData: {
              name: name,
              email: email,
              phone: phone,
              message: message,
              company: company || undefined
            }
          })
        });

        var result = await response.json();

        if (result.success) {
          showFormMessage('success', 'Thank you! Your message has been sent successfully. We will get back to you soon.');
          form.reset();
          if (charCount) charCount.textContent = '0';
        } else {
          showFormMessage('error', 'Sorry, there was a problem sending your message. Please try again or contact us directly.');
        }
      } catch (error) {
        console.error('Contact form error:', error);
        showFormMessage('error', 'Sorry, there was a problem sending your message. Please try again or contact us directly.');
      } finally {
        // Reset button state
        if (submitBtn) submitBtn.disabled = false;
        if (btnText) btnText.textContent = 'Send Message';
        if (btnLoader) btnLoader.style.display = 'none';
      }
    });

    function showFormMessage(type, text) {
      // Remove existing message
      var existing = document.querySelector('.form-status-message');
      if (existing) existing.remove();

      var msgDiv = document.createElement('div');
      msgDiv.className = 'form-status-message ' + type;
      msgDiv.innerHTML = '<i class="fas fa-' + (type === 'success' ? 'check-circle' : 'exclamation-circle') + '"></i> ' + text;

      var formPanel = document.querySelector('.contact-form-panel');
      if (formPanel) {
        formPanel.insertBefore(msgDiv, form);
      }

      // Scroll to message
      msgDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

      // Auto-remove after 10 seconds
      setTimeout(function () {
        msgDiv.classList.add('fade-out');
        setTimeout(function () { msgDiv.remove(); }, 500);
      }, 10000);
    }
  }

  // ── Initialize Everything ──
  document.addEventListener('DOMContentLoaded', function () {
    handleNavbarScroll();
    initScrollReveal();
    initStaggeredReveals();
    initBackToTop();
    initHeroSlider();
    initCounters();
    initLazyImages();
    initActiveNav();
    setCurrentYear();
    initMobileNavClose();
    initMagneticButtons();
    initTickerHover();
    initContactForm();
  });

})();
