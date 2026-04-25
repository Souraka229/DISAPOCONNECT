// ================= NAVBAR SCROLL =================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ================= MOBILE MENU =================
const mobileToggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

mobileToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileToggle.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileToggle.classList.remove('open');
  });
});

// ================= CALCULATOR =================
const rates = {
  USD: 592,
  EUR: 655.957,
  GBP: 746,
  CAD: 435
};

const feeRate = 0.008;

const sendAmount = document.getElementById('sendAmount');
const sendCurrency = document.getElementById('sendCurrency');
const receiveAmount = document.getElementById('receiveAmount');
const ourFee = document.getElementById('ourFee');

function formatNumber(num) {
  return Math.round(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function updateCalculator() {
  const amount = parseFloat(sendAmount.value) || 0;
  const currency = sendCurrency.value;
  const rate = rates[currency] || 592;
  const fee = amount * feeRate;
  const received = amount * rate;

  receiveAmount.textContent = formatNumber(received);
  ourFee.textContent = fee.toFixed(2).replace('.', ',') + ' ' + currency;
}

sendAmount.addEventListener('input', updateCalculator);
sendCurrency.addEventListener('change', updateCalculator);

// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ================= INTERSECTION OBSERVER ANIMATIONS =================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-card, .problem-card, .odd-card, .testimonial-card, .showcase-step, .dual-screen-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ================= FAQ ACCORDION =================
// Native <details> handles this, but we add smooth animation
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      const content = item.querySelector('p');
      content.style.maxHeight = content.scrollHeight + 'px';
    }
  });
});
