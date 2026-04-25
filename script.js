/* ============================================================
   DiasporaConnect — Landing Page Logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  // ===================== NAVBAR =====================
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const navActions = document.getElementById('navActions');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navLinks.classList.toggle('active');
      navActions.classList.toggle('active');
    });
    navLinks?.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navLinks.classList.remove('active');
        navActions.classList.remove('active');
      });
    });
  }

  // ===================== CALCULATOR =====================
  const rates = { USD: 592, EUR: 655.957, GBP: 746, CAD: 435 };
  const flagMap = { USD: 'us', EUR: 'eu', GBP: 'gb', CAD: 'ca' };

  const sendAmt = document.getElementById('sendAmount');
  const sendCur = document.getElementById('sendCurrency');
  const sendFlag = document.getElementById('sendFlag');
  const recvAmt = document.getElementById('receiveAmount');
  const ourFee = document.getElementById('ourFee');

  function fmt(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

  function updateCalc() {
    if (!sendAmt) return;
    const amount = parseFloat(sendAmt.value) || 0;
    const cur = sendCur.value;
    const rate = rates[cur] || 592;
    const fee = amount * 0.008;
    const received = amount * rate;

    recvAmt.textContent = fmt(received);
    ourFee.textContent = fee.toFixed(2).replace('.', ',') + ' ' + cur;
    sendFlag.src = `https://flagcdn.com/w40/${flagMap[cur] || 'us'}.png`;
  }

  sendAmt?.addEventListener('input', updateCalc);
  sendCur?.addEventListener('change', updateCalc);

  // ===================== FAQ =====================
  document.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // ===================== GSAP ANIMATIONS =====================
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    // Hero fade in
    gsap.from('.hero-badge', { opacity: 0, y: 20, duration: .6, delay: .2 });
    gsap.from('.hero h1', { opacity: 0, y: 30, duration: .8, delay: .3, ease: 'power3.out' });
    gsap.from('.hero-subtitle', { opacity: 0, y: 25, duration: .7, delay: .45, ease: 'power3.out' });
    gsap.from('.calculator', { opacity: 0, y: 40, duration: .8, delay: .6, ease: 'power3.out' });
    gsap.from('.hero-trust', { opacity: 0, y: 15, duration: .6, delay: .9 });
    gsap.from('.hero-visual', { opacity: 0, x: 60, duration: 1, delay: .5, ease: 'power3.out' });

    // Stat counter animation
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = parseFloat(el.dataset.target);
      const isDecimal = String(target).includes('.');
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        onEnter: () => {
          gsap.to(el, {
            innerText: target,
            duration: 1.5,
            snap: isDecimal ? { innerText: .1 } : { innerText: 1 },
            ease: 'power2.out',
            onUpdate() {
              const v = parseFloat(el.innerText);
              el.innerText = isDecimal ? v.toFixed(1) : Math.round(v);
            }
          });
        },
        once: true
      });
    });

    // Section reveal animations
    document.querySelectorAll('[data-animate]').forEach(el => {
      const anim = el.dataset.animate;
      const delay = parseFloat(el.dataset.delay || 0);
      const props = { opacity: 0, duration: .7, delay, ease: 'power3.out' };

      if (anim === 'fade-up') { props.y = 40; }
      else if (anim === 'fade-left') { props.x = 40; }
      else if (anim === 'scale-up') { props.scale = .9; }

      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => gsap.from(el, props),
        once: true
      });
    });

    // Parallax orbs
    gsap.to('.orb-1', { y: -80, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
    gsap.to('.orb-2', { y: 60, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });

    // Phone parallax
    gsap.to('.iphone-main', { y: -30, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
    gsap.to('.iphone-secondary', { y: 20, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });

    // Showcase staggered entrance
    document.querySelectorAll('.showcase-phones').forEach(container => {
      const items = container.querySelectorAll('.showcase-item');
      ScrollTrigger.create({
        trigger: container,
        start: 'top 85%',
        onEnter: () => {
          gsap.from(items, { opacity: 0, y: 50, scale: .92, duration: .6, stagger: .12, ease: 'power3.out' });
        },
        once: true
      });
    });
  }
});
