// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navEl = document.querySelector('.nav');
const navToggle = document.querySelector('.mobile-nav-toggle');
navToggle.addEventListener('click', () => {
  const isOpen = navEl.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.mobile-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    navEl.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const question = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  question.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
      }
    });

    if (isOpen) {
      item.classList.remove('open');
      question.setAttribute('aria-expanded', 'false');
      answer.style.maxHeight = null;
    } else {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// Phone mockups — play a step-by-step reveal while scrolled into view
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function reveal(el) {
  if (!el) return;
  el.hidden = false;
  void el.offsetWidth; // force reflow so the transition fires
  el.classList.add('show');
}

function hide(el) {
  if (!el) return;
  el.classList.remove('show');
  el.hidden = true;
}

function hideAll(root) {
  root.querySelectorAll('.seq').forEach(hide);
}

async function typeInto(el, text, speed = 32) {
  if (!el) return;
  el.textContent = '';
  for (const ch of text) {
    el.textContent += ch;
    await sleep(speed);
  }
}

async function playWebsite(root) {
  hideAll(root);
  const browserbar = root.querySelector('.mw-browserbar');
  const hero = root.querySelector('.mws-hero');
  const form = root.querySelector('.mw-form');
  const nameField = form.querySelector('[data-field="name"] .mw-input-text');
  const phoneField = form.querySelector('[data-field="phone"] .mw-input-text');
  const msgField = form.querySelector('[data-field="msg"] .mw-input-text');
  const check = form.querySelector('.mw-check');
  const btn = form.querySelector('.mw-form-btn');
  const sent = root.querySelector('.mwa-missed');
  const typing = root.querySelector('.msg-typing');
  const groups = root.querySelectorAll('.msg-group');

  check.classList.remove('checked');
  btn.classList.remove('pressed');
  [nameField, phoneField, msgField].forEach((f) => { f.textContent = ''; });

  await sleep(350); reveal(browserbar);
  await sleep(300); reveal(hero);
  await sleep(400); reveal(form);
  await sleep(400);
  await typeInto(nameField, 'Mark de Vries');
  await sleep(250);
  await typeInto(phoneField, '06 12 34 56 78');
  await sleep(250);
  await typeInto(msgField, 'Dakgoot lekt sinds de storm');
  await sleep(300);
  check.classList.add('checked');
  await sleep(400);
  btn.classList.add('pressed');
  await sleep(180);
  btn.classList.remove('pressed');
  await sleep(600);

  hide(browserbar);
  hide(hero);
  hide(form);
  await sleep(400); reveal(sent);
  await sleep(500); reveal(typing);
  await sleep(1000); hide(typing); reveal(groups[0]);
  await sleep(900); reveal(groups[1]);
  await sleep(2600);
}

async function playWhatsapp(root) {
  hideAll(root);
  const callScreen = root.querySelector('.mwa-callscreen');
  const missed = root.querySelector('.mwa-missed');
  const typing1 = root.querySelector('.mwa-typing-1');
  const group1 = root.querySelector('.mwa-group-1');
  const autoLabel = root.querySelector('.mwa-auto-label');
  const group2 = root.querySelector('.mwa-group-2');
  await sleep(300); reveal(callScreen);
  await sleep(2200); hide(callScreen);
  await sleep(300); reveal(missed);
  await sleep(650); reveal(typing1);
  await sleep(1100); hide(typing1); reveal(group1);
  await sleep(300); reveal(autoLabel);
  await sleep(800); reveal(group2);
  await sleep(2600);
}

async function playReviews(root) {
  hideAll(root);
  const rows = root.querySelectorAll('.mr-flow-row');
  rows.forEach((row) => row.querySelectorAll('.mr-flow-star').forEach((s) => s.classList.remove('mr-star-on')));

  const msg = root.querySelector('.mr-msg');
  const popup = root.querySelector('.mr-google-popup');
  await sleep(400); reveal(msg);
  await sleep(500);

  const goodStars = rows[0].querySelectorAll('.mr-flow-star');
  for (const star of goodStars) { await sleep(150); star.classList.add('mr-star-on'); }
  await sleep(250); reveal(rows[0].querySelector('.mr-flow-arrow'));
  await sleep(200); reveal(rows[0].querySelector('.mr-flow-dest'));
  await sleep(500); reveal(popup);
  await sleep(1400); hide(popup);
  await sleep(400);

  const badStars = rows[1].querySelectorAll('.mr-flow-star');
  for (let i = 0; i < 2; i++) { await sleep(150); badStars[i].classList.add('mr-star-on'); }
  await sleep(250); reveal(rows[1].querySelector('.mr-flow-arrow'));
  await sleep(200); reveal(rows[1].querySelector('.mr-flow-dest'));
  await sleep(2400);
}

async function playPhoneapp(root) {
  hideAll(root);
  const topbar = root.querySelector('.mp-topbar');
  const stats = root.querySelector('.mp-stats');
  const sectionLabel = root.querySelector('.mp-section-label');
  const icons = root.querySelectorAll('.mp-icon');
  const navbar = root.querySelector('.mp-navbar');
  await sleep(350); reveal(topbar);
  await sleep(400); reveal(stats);
  await sleep(400); reveal(sectionLabel);
  for (const icon of icons) { await sleep(150); reveal(icon); }
  await sleep(300); reveal(navbar);
  await sleep(2200);
}

async function playInbox(root) {
  hideAll(root);
  const rows = root.querySelectorAll('.mi-row:not(.mi-new)');
  const newRow = root.querySelector('.mi-new');
  for (const row of rows) { await sleep(220); reveal(row); }
  await sleep(1100);
  reveal(newRow);
  await sleep(2600);
}

async function playFollowup(root) {
  hideAll(root);
  const groupIn = root.querySelector('.group-in');
  const typing = root.querySelector('.mf-typing');
  const groupOut = root.querySelector('.group-out');
  const autoLabel = root.querySelector('.mf-auto-label');
  await sleep(400); reveal(groupIn);
  await sleep(650); reveal(typing);
  await sleep(1100); hide(typing); reveal(groupOut);
  await sleep(400); reveal(autoLabel);
  await sleep(2400);
}

const mockPlayers = {
  'mock-website': playWebsite,
  'mock-whatsapp': playWhatsapp,
  'mock-reviews': playReviews,
  'mock-phoneapp': playPhoneapp,
  'mock-inbox': playInbox,
  'mock-followup': playFollowup,
};

const mockVisibility = new WeakMap();
const mockObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => mockVisibility.set(entry.target, entry.isIntersecting));
}, { threshold: 0.35 });

document.querySelectorAll('.phone-screen').forEach((root) => {
  const key = Object.keys(mockPlayers).find((cls) => root.classList.contains(cls));
  const play = mockPlayers[key];
  if (!play) return;

  mockObserver.observe(root);

  (async () => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (mockVisibility.get(root)) {
        await play(root);
        await sleep(700);
      } else {
        await sleep(400);
      }
    }
  })();
});

