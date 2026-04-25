/* ============================================================
   DiasporaConnect — Expert-Level Interactions & Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Init Lucide icons
  if (window.lucide) lucide.createIcons();

  // ==================== NAVBAR ====================
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navActions = document.getElementById('navActions');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  mobileToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    navActions.classList.toggle('active');
    mobileToggle.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      navActions.classList.remove('active');
      mobileToggle.classList.remove('open');
    });
  });

  // ==================== CALCULATOR ====================
  const rates = { USD: 592, EUR: 655.957, GBP: 746, CAD: 435 };
  const flagMap = { USD: 'us', EUR: 'eu', GBP: 'gb', CAD: 'ca' };
  const feeRate = 0.008;

  const sendAmount = document.getElementById('sendAmount');
  const sendCurrency = document.getElementById('sendCurrency');
  const sendFlag = document.getElementById('sendFlag');
  const receiveAmount = document.getElementById('receiveAmount');
  const ourFee = document.getElementById('ourFee');

  function formatNumber(num) {
    return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  function animateValue(el, target) {
    const formatted = formatNumber(target);
    el.textContent = formatted;
    el.style.transform = 'scale(1.04)';
    setTimeout(() => { el.style.transform = 'scale(1)'; }, 200);
  }

  function updateCalculator() {
    const amount = parseFloat(sendAmount.value) || 0;
    const currency = sendCurrency.value;
    const rate = rates[currency] || 592;
    const fee = amount * feeRate;
    const received = amount * rate;

    animateValue(receiveAmount, received);
    ourFee.textContent = fee.toFixed(2).replace('.', ',') + ' ' + currency;

    // Update flag
    const code = flagMap[currency] || 'us';
    sendFlag.src = `https://flagcdn.com/w40/${code}.png`;
  }

  sendAmount.addEventListener('input', updateCalculator);
  sendCurrency.addEventListener('change', updateCalculator);

  // ==================== SMOOTH SCROLL ====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ==================== FAQ ACCORDION ====================
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ==================== DEMO PROTOTYPE ====================
  const demoScreens = document.querySelectorAll('.demo-screen');
  const flowCards = document.querySelectorAll('.flow-card');
  const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
  let currentScreen = 0;

  function setScreen(index) {
    currentScreen = index;
    demoScreens.forEach((s, i) => s.classList.toggle('active', i === index));
    flowCards.forEach((c, i) => c.classList.toggle('active', i === index));

    // Update bottom nav active state
    const screenToNav = { 0: 0, 1: 1, 2: 1, 3: 2, 4: 3, 5: 0 };
    bottomNavItems.forEach((btn, i) => {
      btn.classList.toggle('active', i === screenToNav[index]);
    });
  }

  flowCards.forEach(card => {
    card.addEventListener('click', () => {
      setScreen(parseInt(card.dataset.flow));
    });
  });

  bottomNavItems.forEach(btn => {
    btn.addEventListener('click', () => {
      setScreen(parseInt(btn.dataset.goto));
    });
  });

  // Auto-advance demo every 4s if in viewport
  let demoAutoplay = null;
  const demoSection = document.getElementById('demo');

  function startDemoAutoplay() {
    if (demoAutoplay) return;
    demoAutoplay = setInterval(() => {
      setScreen((currentScreen + 1) % demoScreens.length);
    }, 4000);
  }

  function stopDemoAutoplay() {
    clearInterval(demoAutoplay);
    demoAutoplay = null;
  }

  // Stop autoplay when user interacts
  flowCards.forEach(c => c.addEventListener('click', stopDemoAutoplay));
  bottomNavItems.forEach(b => b.addEventListener('click', stopDemoAutoplay));

  // ==================== GSAP ANIMATIONS ====================
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    gsap.from('.hero-badge', { y: 30, opacity: 0, duration: .8, ease: 'power3.out', delay: .2 });
    gsap.from('.hero h1', { y: 40, opacity: 0, duration: .9, ease: 'power3.out', delay: .35 });
    gsap.from('.hero-subtitle', { y: 30, opacity: 0, duration: .8, ease: 'power3.out', delay: .5 });
    gsap.from('.calculator', { y: 40, opacity: 0, duration: .9, ease: 'power3.out', delay: .65 });
    gsap.from('.hero-trust', { y: 20, opacity: 0, duration: .7, ease: 'power3.out', delay: .8 });
    gsap.from('.phone-main', { x: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: .5 });
    gsap.from('.phone-secondary', { x: 80, y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: .7 });

    // Floating phones parallax
    gsap.to('.phone-main', {
      y: -20, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });
    gsap.to('.phone-secondary', {
      y: -40, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
    });

    // Stats counter animation
    gsap.from('.stat-number', {
      textContent: 0, duration: 1.5, ease: 'power1.out',
      scrollTrigger: { trigger: '.stats-banner', start: 'top 80%' },
      stagger: .2
    });

    // Section reveals
    const sections = document.querySelectorAll('[data-animate-section]');
    sections.forEach(section => {
      const cards = section.querySelectorAll('[data-animate]');
      cards.forEach((card, i) => {
        const delay = parseFloat(card.dataset.delay) || i * 0.08;
        const type = card.dataset.animate;

        let fromVars = { opacity: 0, duration: .7, ease: 'power3.out' };

        if (type === 'fade-up') { fromVars.y = 40; }
        else if (type === 'fade-left') { fromVars.x = 60; }
        else if (type === 'fade-right') { fromVars.x = -40; }
        else if (type === 'scale-up') { fromVars.scale = .9; }

        gsap.from(card, {
          ...fromVars,
          delay,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });
    });

    // Demo section auto-play
    ScrollTrigger.create({
      trigger: '#demo',
      start: 'top 60%',
      end: 'bottom 20%',
      onEnter: startDemoAutoplay,
      onLeave: stopDemoAutoplay,
      onEnterBack: startDemoAutoplay,
      onLeaveBack: stopDemoAutoplay
    });

    // Parallax orbs
    gsap.to('.orb-1', { y: -80, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });
    gsap.to('.orb-2', { y: 60, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 } });

    // Security card entrance
    gsap.from('.sec-visual-card', {
      y: 60, opacity: 0, rotation: 5, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.security-section', start: 'top 70%' }
    });

    // CTA section
    gsap.from('.cta-content', {
      y: 50, opacity: 0, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: '.cta-section', start: 'top 75%' }
    });

  } else {
    // Fallback: simple IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity .6s ease, transform .6s ease';
      observer.observe(el);
    });
  }

  // ==================== RECEIPT STYLE TRANSITIONS ====================
  receiveAmount.style.transition = 'transform .2s ease';

});
