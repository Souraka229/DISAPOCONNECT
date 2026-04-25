/* ============================================================
   DiasporaConnect — Landing Page Logic (Finno Style)
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
      navActions?.classList.toggle('active');
    });
    navLinks?.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navLinks.classList.remove('active');
        navActions?.classList.remove('active');
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

    // Hero staggered entrance
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .from('.hero-badge', { opacity: 0, y: 20, duration: .5 })
      .from('.hero h1', { opacity: 0, y: 30, duration: .7 }, '-=.3')
      .from('.hero-subtitle', { opacity: 0, y: 25, duration: .6 }, '-=.4')
      .from('.hero-buttons', { opacity: 0, y: 20, duration: .5 }, '-=.3')
      .from('.iphone-hero-main', { opacity: 0, y: 60, duration: .8 }, '-=.5')
      .from('.iphone-hero-left', { opacity: 0, x: -40, y: 40, duration: .7 }, '-=.5')
      .from('.iphone-hero-right', { opacity: 0, x: 40, y: 40, duration: .7 }, '-=.6')
      .from('.hero-float-card', { opacity: 0, scale: .8, duration: .5, stagger: .15 }, '-=.4');

    // Section reveal animations
    document.querySelectorAll('[data-animate]').forEach(el => {
      const anim = el.dataset.animate;
      const delay = parseFloat(el.dataset.delay || 0);
      const props = { opacity: 0, duration: .7, delay, ease: 'power3.out' };

      if (anim === 'fade-up') { props.y = 40; }
      else if (anim === 'fade-left') { props.x = 50; }
      else if (anim === 'scale-up') { props.scale = .9; }

      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => gsap.from(el, props),
        once: true
      });
    });

    // Showcase staggered entrance
    document.querySelectorAll('.showcase-phones').forEach(container => {
      const items = container.querySelectorAll('.showcase-item');
      ScrollTrigger.create({
        trigger: container,
        start: 'top 85%',
        onEnter: () => {
          gsap.from(items, { opacity: 0, y: 50, scale: .92, duration: .6, stagger: .1, ease: 'power3.out' });
        },
        once: true
      });
    });

    // Parallax orbs
    gsap.to('.orb-1', { y: -80, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
    gsap.to('.orb-2', { y: 60, scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
  }
});
