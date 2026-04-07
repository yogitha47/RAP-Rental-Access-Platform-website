/* ============================================================
   RAP – Rental Access Platform | main.js
   Covers: for/while/do-while loops, DOM, events, validation,
           canvas, z-index modal, CSS changes via JS
   ============================================================ */

'use strict';

/* ============================================================
   DATA
   ============================================================ */
const ITEMS = [
  { id:1,  name:"Sony A7 III Camera",    cat:"Electronics", price:850,  emoji:"📷", desc:"Full-frame mirrorless, 24MP. Perfect for shoots & events.",      avail:true,  feat:true  },
  { id:2,  name:"DJI Mavic 3 Drone",     cat:"Electronics", price:1200, emoji:"🚁", desc:"4K Hasselblad camera, 46-min flight. Aerial cinematography.",     avail:true,  feat:true  },
  { id:3,  name:"MacBook Pro 14\"",       cat:"Computers",   price:700,  emoji:"💻", desc:"M3 Pro chip, 18 GB RAM, 512 GB SSD. For heavy creative work.",   avail:false, feat:false },
  { id:4,  name:"Dell XPS 15 Laptop",    cat:"Computers",   price:550,  emoji:"🖥️", desc:"Intel i7, 32 GB RAM, 1 TB SSD. Business & design tasks.",        avail:true,  feat:false },
  { id:5,  name:"Trek Mountain Bike",    cat:"Vehicles",    price:300,  emoji:"🚵", desc:"21-speed alloy, front suspension. City & trail rides.",           avail:true,  feat:true  },
  { id:6,  name:"Electric Scooter",      cat:"Vehicles",    price:200,  emoji:"🛴", desc:"30 km range, foldable, lightweight. Smart urban commuting.",      avail:true,  feat:false },
  { id:7,  name:"4K Epson Projector",    cat:"Electronics", price:600,  emoji:"📽️", desc:"3800 lumens, Wi-Fi ready. Great for events & home cinema.",      avail:true,  feat:true  },
  { id:8,  name:"Canon 70-200mm Lens",   cat:"Photography", price:450,  emoji:"🔭", desc:"f/2.8 telephoto. Sports, wildlife & portrait photography.",       avail:true,  feat:false },
  { id:9,  name:"Python Book (Automate)",cat:"Books",       price:30,   emoji:"📘", desc:"Automate the Boring Stuff 2nd ed. Learn Python fast.",            avail:true,  feat:false },
  { id:10, name:"Carbon Tripod Pro",     cat:"Photography", price:150,  emoji:"📐", desc:"Carbon fibre, 180 cm max height. Stable shots every time.",      avail:false, feat:false },
  { id:11, name:"Road Bicycle",          cat:"Vehicles",    price:250,  emoji:"🚴", desc:"Shimano 105, aluminium frame. Weekend rides & commutes.",         avail:true,  feat:false },
  { id:12, name:"iPad Pro 12.9\"",       cat:"Computers",   price:400,  emoji:"📱", desc:"M2 chip, Liquid Retina XDR. Art, design & productivity.",         avail:true,  feat:false },
];

const BOOKINGS = [
  { id:"BK-001", item:"Sony A7 III Camera",  user:"Arun K.",   start:"2025-06-01", end:"2025-06-05", days:4,  total:3400,  status:"returned" },
  { id:"BK-002", item:"Trek Mountain Bike",  user:"Priya S.",  start:"2025-06-10", end:"2025-06-12", days:2,  total:600,   status:"active"   },
  { id:"BK-003", item:"DJI Mavic 3 Drone",   user:"Vikram R.", start:"2025-06-15", end:"2025-06-17", days:2,  total:2400,  status:"pending"  },
  { id:"BK-004", item:"4K Epson Projector",  user:"Meena T.",  start:"2025-06-20", end:"2025-06-21", days:1,  total:600,   status:"active"   },
  { id:"BK-005", item:"MacBook Pro 14\"",     user:"Sanjay L.", start:"2025-05-28", end:"2025-06-04", days:7,  total:4900,  status:"returned" },
];

/* ============================================================
   CANVAS — Draw Logo
   ============================================================ */
function drawLogo(id, size = 34) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = size; canvas.height = size;

  // Gradient fill
  const grd = ctx.createLinearGradient(0, 0, size, size);
  grd.addColorStop(0, '#6a5af9');
  grd.addColorStop(1, '#8b5cf6');

  if (ctx.roundRect) {
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, size * 0.24);
    ctx.fillStyle = grd;
    ctx.fill();
  } else {
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, size, size);
  }

  // White R
  ctx.fillStyle = '#ffffff';
  ctx.font = `bold ${size * 0.56}px Outfit, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('R', size / 2, size / 2 + 1);
}

/* ============================================================
   CANVAS — Draw Hero Graphic (About page large canvas)
   ============================================================ */
function drawHeroCanvas(id) {
  const canvas = document.getElementById(id);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 300;
  const H = canvas.offsetHeight || 260;
  canvas.width = W; canvas.height = H;

  // Background fill
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, 'rgba(106,90,249,0.08)');
  bg.addColorStop(1, 'rgba(79,172,254,0.08)');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Circles decoration
  const circles = [
    { x: W*0.25, y: H*0.35, r: H*0.2,  c: 'rgba(106,90,249,0.18)' },
    { x: W*0.7,  y: H*0.55, r: H*0.28, c: 'rgba(79,172,254,0.14)' },
    { x: W*0.55, y: H*0.2,  r: H*0.12, c: 'rgba(139,92,246,0.2)'  },
  ];

  // for loop drawing shapes
  for (let i = 0; i < circles.length; i++) {
    ctx.beginPath();
    ctx.arc(circles[i].x, circles[i].y, circles[i].r, 0, Math.PI * 2);
    ctx.fillStyle = circles[i].c;
    ctx.fill();
  }

  // Centred emoji-style icon
  ctx.font = `${H * 0.35}px serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('📦', W / 2, H / 2);
}

/* ============================================================
   TOAST
   ============================================================ */
function toast(msg, type = '') {
  let el = document.getElementById('__toast');
  if (!el) {
    el = document.createElement('div');
    el.id = '__toast';
    el.className = 'toast';
    document.body.appendChild(el);
  }
  el.className = `toast ${type}`;
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), 3400);
}

/* ============================================================
   ACTIVE NAV
   ============================================================ */
function markActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav.main-nav a, .sidebar-nav a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

/* ============================================================
   FOR LOOP — Render Item Cards
   ============================================================ */
function renderCards(containerId, items) {
  const box = document.getElementById(containerId);
  if (!box) return;
  box.innerHTML = '';

  // for loop — display each item card
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const art = document.createElement('article');
    art.className = 'item-card';
    art.dataset.id  = it.id;
    art.dataset.cat = it.cat;

    art.innerHTML = `
      <div class="item-card-img" style="position:relative;">
        ${it.feat ? '<span class="feat-badge">⭐ Featured</span>' : ''}
        <span style="position:relative;z-index:1;">${it.emoji}</span>
      </div>
      <div class="item-card-body">
        <div class="item-cat">${it.cat}</div>
        <h3>${it.name}</h3>
        <p>${it.desc}</p>
        <div class="item-card-footer">
          <div class="item-price">₹${it.price} <span>/ day</span></div>
          <span class="${it.avail ? 'avail' : 'unavail'}">${it.avail ? 'Available' : 'Rented'}</span>
        </div>
        <button class="btn btn-primary btn-sm" style="margin-top:0.9rem;width:100%;"
          onclick="window.location='booking.html?item=${it.name}'">Rent Now</button>
      </div>`;

    // JavaScript changing CSS — highlight featured
    if (it.feat) {
      art.style.borderColor = 'rgba(106,90,249,0.45)';
      art.style.boxShadow   = '0 8px 32px rgba(106,90,249,0.22)';
    }

    box.appendChild(art);
  }
}


/* ============================================================
   WHILE LOOP — Simulate Loading with Skeletons
   ============================================================ */
function simulateLoad(containerId, callback) {
  const box = document.getElementById(containerId);
  if (!box) { callback(); return; }
  box.innerHTML = '';

  let n = 0;
  // while loop — create skeleton placeholders
  while (n < 4) {
    const sk = document.createElement('div');
    sk.className = 'item-card';
    sk.innerHTML = `
      <div class="skeleton" style="height:165px;border-radius:24px 24px 0 0;"></div>
      <div style="padding:1.1rem;">
        <div class="skeleton" style="height:11px;width:55%;margin-bottom:0.55rem;"></div>
        <div class="skeleton" style="height:17px;margin-bottom:0.45rem;"></div>
        <div class="skeleton" style="height:11px;width:80%;margin-bottom:0.9rem;"></div>
        <div class="skeleton" style="height:34px;border-radius:50px;"></div>
      </div>`;
    box.appendChild(sk);
    n++;
  }

  callback();
}

/* ============================================================
   FOR LOOP — Render Categories
   ============================================================ */
const CATS = [
  { name:'Electronics', emoji:'⚡', count:5 },
  { name:'Computers',   emoji:'💻', count:3 },
  { name:'Vehicles',    emoji:'🚗', count:3 },
  { name:'Photography', emoji:'📷', count:3 },
  { name:'Books',       emoji:'📚', count:2 },
  { name:'Audio',       emoji:'🎧', count:2 },
];

function renderCats(id) {
  const box = document.getElementById(id);
  if (!box) return;
  box.innerHTML = '';

  // for loop — each category card
  for (let i = 0; i < CATS.length; i++) {
    const c = CATS[i];
    const div = document.createElement('div');
    div.className = 'cat-card';
    div.innerHTML = `<div class="cat-icon">${c.emoji}</div><div class="cat-name">${c.name}</div><div class="cat-count">${c.count} items</div>`;
    div.addEventListener('click', () => filterItems(c.name));
    box.appendChild(div);
  }
}

/* ============================================================
   FILTER ITEMS
   ============================================================ */
function filterItems(cat) {
  document.querySelectorAll('.item-card').forEach(card => {
    const show = !cat || card.dataset.cat === cat;
    card.style.display = show ? '' : 'none';
  });
  if (cat) toast(`Showing: ${cat}`);
}

/* ============================================================
   DO-WHILE — Booking History Table
   ============================================================ */
function renderBookTable(tbodyId) {
  const tb = document.getElementById(tbodyId);
  if (!tb) return;
  tb.innerHTML = '';

  let i = 0;
  // do-while loop — render rows
  do {
    const b = BOOKINGS[i];
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${b.id}</strong></td>
      <td>${b.item}</td>
      <td>${b.user}</td>
      <td>${b.start}</td>
      <td>${b.end}</td>
      <td>${b.days} days</td>
      <td><strong style="color:#6a5af9">₹${b.total.toLocaleString()}</strong></td>
      <td><span class="status-pill s-${b.status}">${b.status}</span></td>`;
    tb.appendChild(tr);
    i++;
  } while (i < BOOKINGS.length);
}

/* ============================================================
   ITEM SELECT POPULATION
   ============================================================ */
function populateItemDropdown(selId) {
  const sel = document.getElementById(selId);
  if (!sel) return;
  ITEMS.forEach(it => {
    const opt = document.createElement('option');
    opt.value = it.id;
    opt.textContent = `${it.name} — ₹${it.price}/day`;
    opt.dataset.price = it.price;
    sel.appendChild(opt);
  });
}

/* ============================================================
   PRICE CALCULATOR
   Total Rent = PricePerDay × NumberOfDays
   Days = (EndDate – StartDate) / (1000 × 60 × 60 × 24)
   ============================================================ */
function calcPrice() {
	if (!document.getElementById('price-display')) return;
  const s = document.getElementById('start-date')?.value;
  const e = document.getElementById('end-date')?.value;
  const sel = document.getElementById('item-sel');
  const display = document.getElementById('price-display');
  if (!s || !e || !sel || !display) return;

  const startMs = new Date(s).getTime();
  const endMs   = new Date(e).getTime();

  if (endMs > startMs) {
    // Date Logic: Days = (EndDate – StartDate) / (1000 × 60 × 60 × 24)
    const days = Math.ceil((endMs - startMs) / (1000 * 60 * 60 * 24));
    const pricePerDay = parseInt(sel.options[sel.selectedIndex]?.dataset.price || 0);

    // Total Rent = PricePerDay × NumberOfDays
    let total = pricePerDay * days;
    if (document.getElementById('x-delivery')?.checked)  total += 150;
    if (document.getElementById('x-insurance')?.checked) total += 200;
    if (document.getElementById('x-cleaning')?.checked)  total += 100;

    document.getElementById('price-days').textContent  = days;
    document.getElementById('price-total').textContent = `₹${total.toLocaleString()}`;
    display.style.display = '';

    // JavaScript changing CSS property
    display.style.borderColor = 'rgba(106,90,249,0.4)';
  } else {
    display.style.display = 'none';
  }
}

/* ============================================================
   DO-WHILE VALIDATION PATTERN
   ============================================================ */
function validateField(fieldId, msg, fn) {
  let tries = 0, valid = false;
  // do-while retry pattern for validation
  do {
    const el = document.getElementById(fieldId);
    if (!el) break;
    valid = fn(el.value);
    const grp = el.closest('.form-group');
    if (grp) {
      grp.classList.toggle('invalid', !valid);
      grp.classList.toggle('valid',    valid);
      const err = grp.querySelector('.err');
      if (err) err.textContent = msg;
    }
    tries++;
  } while (!valid && tries < 1);
  return valid;
}

function validateBookingForm() {
  let ok = true;
  const rules = [
    { id:'r-name',  msg:'Full name required (min 3 letters, alphabets only).',   fn: v => /^[A-Za-z\s]{3,}$/.test(v.trim()) },
    { id:'r-email', msg:'Enter a valid email address.',                           fn: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id:'r-phone', msg:'Phone number must be exactly 10 digits.',                fn: v => /^\d{10}$/.test(v.replace(/\s/g,'')) },
    { id:'start-date', msg:'Please select a start date.',                         fn: v => v !== '' },
    { id:'end-date',   msg:'End date must be after start date.',                  fn: v => {
      const s = document.getElementById('start-date')?.value;
      return v !== '' && s && new Date(v) > new Date(s);
    }},
  ];
  rules.forEach(r => { if (!validateField(r.id, r.msg, r.fn)) ok = false; });
  return ok;
}

/* ============================================================
   BOOKING FORM SUBMIT
   ============================================================ */
function initBookingForm() {
  const form = document.getElementById('booking-form');
  if (!form) return;
  // addEventListener — form submit
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (validateBookingForm()) {
		const booking = {
  name: document.getElementById('r-name')?.value,
  item: document.getElementById('item-sel')?.selectedOptions[0]?.textContent || "Item",
  date: new Date().toLocaleString()
};

let all = JSON.parse(localStorage.getItem("rap_bookings")) || [];
all.push(booking);
localStorage.setItem("rap_bookings", JSON.stringify(all));
      toast('✅ Booking confirmed! Check your email.', 'ok');
      setTimeout(() => { form.reset(); document.getElementById('price-display').style.display='none'; }, 400);
      form.querySelectorAll('.form-group').forEach(g => g.classList.remove('valid','invalid'));
    } else {
      toast('❌ Please fix the highlighted errors.', 'err');
    }
  });

  // addEventListener — date & item changes trigger price calc
  ['start-date','end-date','item-sel'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', calcPrice);
  });
  ['x-delivery','x-insurance','x-cleaning'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', calcPrice);
  });

  // Real-time blur validation
  form.querySelectorAll('input,select,textarea').forEach(el => {
    el.addEventListener('blur', () => {
      const g = el.closest('.form-group');
      if (g && el.value.trim()) { g.classList.remove('invalid'); g.classList.add('valid'); }
    });
  });
}

/* ============================================================
   FEEDBACK FORM
   ============================================================ */
function initFeedbackForm() {
  const form = document.getElementById('feedback-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    const rating  = document.getElementById('fb-rating')?.value;
    const comment = document.getElementById('fb-comment')?.value.trim();
    if (!rating || rating === '') { toast('Please select a rating.', 'err'); return; }
    if (comment.length < 5)      { toast('Comment must be at least 5 characters.', 'err'); return; }
    toast(`⭐ Thanks for your ${rating}-star review!`, 'ok');
    setTimeout(() => form.reset(), 400);
  });
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', e => {
    e.preventDefault();
    toast("📩 Message sent! We'll reply within 24 hours.", 'ok');
    setTimeout(() => form.reset(), 400);
  });
}

/* ============================================================
   QUICK BOOKING MODAL (z-index popup)
   ============================================================ */
function openQuickModal(itemId) {
  const item = ITEMS.find(i => i.id === itemId);
  if (!item) return;

  let overlay = document.getElementById('__modal');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = '__modal';
    overlay.className = 'modal-overlay';
    overlay.innerHTML = `
      <div class="modal">
        <button class="modal-x" onclick="closeModal()">✕</button>
        <h3 id="m-title" style="font-family:var(--font-head);font-size:1.3rem;margin-bottom:0.3rem;"></h3>
        <p  id="m-price" style="color:var(--primary-solid);font-weight:700;font-size:1.05rem;margin-bottom:0.75rem;"></p>
        <p  id="m-desc"  style="font-size:0.85rem;color:var(--text-light);margin-bottom:1.25rem;line-height:1.6;"></p>
        <div class="form-group">
          <label>Your Name</label>
          <input type="text" id="m-name" placeholder="Full name">
        </div>
        <div class="form-group">
          <label>Number of Days</label>
          <input type="number" id="m-days" min="1" max="30" value="1">
        </div>
        <div id="m-total" style="text-align:center;padding:1rem;background:rgba(106,90,249,0.1);border-radius:12px;margin:1rem 0;font-family:var(--font-head);font-size:1.4rem;color:var(--primary-solid);"></div>
        <button class="btn btn-primary" style="width:100%" onclick="confirmModal()">Confirm Rental</button>
      </div>`;
    document.body.appendChild(overlay);

    // Close on backdrop click
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  }

  // Set z-index via JS
  overlay.style.zIndex = '900';
  overlay.querySelector('.modal').style.zIndex = '901';

  document.getElementById('m-title').textContent = `${item.emoji}  ${item.name}`;
  document.getElementById('m-price').textContent = `₹${item.price} / day`;
  document.getElementById('m-desc').textContent  = item.desc;
  document.getElementById('m-total').textContent = `Total: ₹${item.price}`;

  // addEventListener — recalc on days input
  document.getElementById('m-days').addEventListener('input', function() {
    const d = parseInt(this.value) || 1;
    document.getElementById('m-total').textContent = `Total: ₹${(item.price * d).toLocaleString()} for ${d} day${d>1?'s':''}`;
  });

  overlay.classList.add('open');
}

function closeModal() {
  document.getElementById('__modal')?.classList.remove('open');
}

function confirmModal() {
  const name = document.getElementById('m-name')?.value.trim();
  if (!name) { toast('Please enter your name.', 'err'); return; }
  closeModal();
  toast(`🎉 Booking confirmed for ${name}!`, 'ok');
}

/* ============================================================
   SEARCH
   ============================================================ */
function initSearch() {
  const inp = document.getElementById('item-search');
  if (!inp) return;

  // addEventListener — input event
  inp.addEventListener('input', () => {
    const q = inp.value.toLowerCase();
    document.querySelectorAll('.item-card').forEach(card => {
      const name = card.querySelector('h3')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('p')?.textContent.toLowerCase()  || '';
      card.style.display = (name.includes(q) || desc.includes(q)) ? '' : 'none';
    });
  });
}

/* ============================================================
   SIDEBAR FILTERS (items page)
   ============================================================ */
function initFilters() {
  const catSel  = document.getElementById('f-cat');
  const priceR  = document.getElementById('f-price');
  const priceV  = document.getElementById('f-price-val');
  const availSel = document.getElementById('f-avail');

  const run = () => {
    const cat   = catSel?.value  || '';
    const maxP  = parseInt(priceR?.value || 9999);
    const avail = availSel?.value || '';
    document.querySelectorAll('.item-card').forEach(card => {
      const it = ITEMS.find(i => i.id === parseInt(card.dataset.id));
      if (!it) return;
      let show = true;
      if (cat   && it.cat !== cat)              show = false;
      if (it.price > maxP)                       show = false;
      if (avail === 'yes' && !it.avail)          show = false;
      if (avail === 'no'  &&  it.avail)          show = false;
      card.style.display = show ? '' : 'none';
    });
  };

  catSel?.addEventListener('change', run);
  availSel?.addEventListener('change', run);
  priceR?.addEventListener('input', () => {
    if (priceV) priceV.textContent = `₹${priceR.value}`;
    run();
  });
}

/* ============================================================
   COUNTER ANIMATION
   ============================================================ */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 45));
    const t = setInterval(() => {
      cur = Math.min(cur + step, target);
      el.textContent = cur.toLocaleString();
      if (cur >= target) clearInterval(t);
    }, 35);
  });
}

/* ============================================================
   PAGE ROUTER — INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  /* Always */
  drawLogo('logo-canvas');
  drawLogo('logo-canvas-f', 30);
  markActiveNav();
const reqForm = document.getElementById("request-form");
if (reqForm) {
  reqForm.addEventListener("submit", e => {
    e.preventDefault();
    toast("Request submitted 📩");
    reqForm.reset();
  });
}
  const page = location.pathname.split('/').pop() || 'index.html';
  const params = new URLSearchParams(window.location.search);
const item = params.get("item");

if (item) {
  const dropdown = document.getElementById("item-sel");
  if (dropdown) dropdown.value = item;
}

  /* -- index.html -- */
  if (page === 'index.html' || page === '') {
    renderCats('cats-box');
    simulateLoad('items-box', () => {
      renderCards('items-box', ITEMS.filter(i => i.feat));
    });
    renderBookTable('bk-tbody');
    animateCounters();
  }

  /* -- items.html -- */
  if (page === 'items.html') {
    simulateLoad('items-box', () => {
      renderCards('items-box', ITEMS);
    });
    initSearch();
    initFilters();
  }

  /* -- booking.html -- */
  if (page === 'booking.html') {
    populateItemDropdown('item-sel');
    document.getElementById('price-display').style.display = 'none';
    initBookingForm();
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('start-date').min = today;
    document.getElementById('end-date').min   = today;
  }

  /* -- contact.html -- */
  if (page === 'contact.html') {
    initContactForm();
    initFeedbackForm();
  }

  /* -- about.html -- */
  if (page === 'about.html') {
    drawHeroCanvas('about-canvas');
    animateCounters();
  }
  showBookings();

  /* Escape closes modal */
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
});
function showBookings() {
  const box = document.getElementById("booking-list");
  if (!box) return;

  const data = JSON.parse(localStorage.getItem("rap_bookings")) || [];

  box.innerHTML = data.map(b => `
    <div class="glass" style="padding:10px;margin:10px 0;">
      <b>${b.name}</b> booked <b>${b.item}</b><br>
      <small>${b.date}</small>
    </div>
  `).join("");
}



function validateName(name) {
  return /^[A-Za-z ]{3,}$/.test(name);
}