/* ============================================================
   DiasporaConnect — Interactive Prototype Logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  // ===================== PORTAL NAVIGATION =====================
  const portalSelector = document.getElementById('portalSelector');
  const diasporaApp = document.getElementById('diasporaApp');
  const beninApp = document.getElementById('beninApp');

  window.openPortal = function(portal) {
    portalSelector.classList.remove('active-view');
    diasporaApp.classList.remove('active-view');
    beninApp.classList.remove('active-view');

    if (portal === 'diaspora') {
      diasporaApp.classList.add('active-view');
    } else {
      beninApp.classList.add('active-view');
    }
    if (window.lucide) lucide.createIcons();
  };

  window.showPortalSelector = function() {
    diasporaApp.classList.remove('active-view');
    beninApp.classList.remove('active-view');
    portalSelector.classList.add('active-view');
  };

  // ===================== SCREEN NAVIGATION =====================
  window.goScreen = function(screenId) {
    const appShell = document.getElementById(screenId).closest('.app-shell');
    const screens = appShell.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));

    const target = document.getElementById(screenId);
    target.classList.add('active');

    // Update bottom nav
    const nav = appShell.querySelector('.bottom-nav');
    const navItems = nav.querySelectorAll('.bnav-item');

    // Mapping screens to nav index
    const dMap = { 'd-home': 0, 'd-transfer': 1, 'd-summary': 1, 'd-sent': 1, 'd-history': 2, 'd-profile': 3 };
    const bMap = { 'b-home': 0, 'b-receive': 1, 'b-bills': 2, 'b-withdraw': 3, 'b-profile': -1 };
    const map = screenId.startsWith('d-') ? dMap : bMap;
    const activeIdx = map[screenId] ?? -1;

    navItems.forEach((item, i) => {
      item.classList.toggle('active', i === activeIdx);
    });

    // Re-init icons for new screen
    if (window.lucide) lucide.createIcons();
  };

  // ===================== CALCULATOR =====================
  const rates = { USD: 592, EUR: 655.957, GBP: 746, CAD: 435 };
  const flagMap = { USD: 'us', EUR: 'eu', GBP: 'gb', CAD: 'ca' };

  const dSendAmt = document.getElementById('dSendAmt');
  const dSendCur = document.getElementById('dSendCur');
  const dSendFlag = document.getElementById('dSendFlag');
  const dRecvAmt = document.getElementById('dRecvAmt');
  const dFee = document.getElementById('dFee');

  function fmt(n) { return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

  function updateCalc() {
    const amount = parseFloat(dSendAmt.value) || 0;
    const cur = dSendCur.value;
    const rate = rates[cur] || 592;
    const fee = amount * 0.008;
    const received = amount * rate;

    dRecvAmt.textContent = fmt(received);
    dFee.textContent = fee.toFixed(2).replace('.', ',') + ' ' + cur;

    const code = flagMap[cur] || 'us';
    dSendFlag.src = `https://flagcdn.com/w40/${code}.png`;
  }

  dSendAmt.addEventListener('input', updateCalc);
  dSendCur.addEventListener('change', updateCalc);

  // Transfer form calc
  const tfAmount = document.getElementById('tfAmount');
  const tfRecv = document.getElementById('tfRecv');
  if (tfAmount && tfRecv) {
    tfAmount.addEventListener('input', () => {
      const v = parseFloat(tfAmount.value) || 0;
      tfRecv.textContent = fmt(v * 655.957);
    });
  }
});
