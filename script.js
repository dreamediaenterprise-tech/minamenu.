// ====== DATA (UPDATED) ======
const MENU = {
  best: [
    { name: "Spaghetti (Large)", price: 1200, img: "https://i.pinimg.com/736x/22/6c/0e/226c0eb094603fb64fd328c53b673f2d.jpg" },
    { name: "Pansit (Large)", price: 1200, img: "https://i.pinimg.com/736x/d5/ba/d6/d5bad6cd56327d7857b225cb5913b31c.jpg" },
    { name: "Shanghai (100 pcs)", price: 900, img: "https://i.pinimg.com/736x/a5/7a/da/a57ada9962153de831f02e5d2f643797.jpg" },
    { name: "Menudo", price: 1500, img: "https://i.pinimg.com/736x/c4/a4/52/c4a4522cdc59f29e0470094ea8f0f259.jpg" },
    { name: "Buttered Shrimp", price: 1500, img: "https://i.pinimg.com/736x/88/b7/45/88b745b36c8ff8b15b834cdbec9b50e3.jpg" }
  ],

  ulam: [
    // fixed prices requested
    { name: "Sisig", price: 1000, img: "https://i.pinimg.com/736x/74/59/3b/74593bd7b7641c6d3b57553f1bf77aa6.jpg" },
    { name: "Pork BBQ (30 pcs)", price: 1000, img: "https://i.pinimg.com/1200x/33/23/c4/3323c4dc60d03f54f2490d8fa9bb3d62.jpg" },

    // the rest ulam default 1300
    { name: "Kaldereta", price: 1300, img: "https://i.pinimg.com/1200x/6f/1d/35/6f1d35d7a3afa50bd70072af8bd2b072.jpg" },
    { name: "Pininyahang Manok", price: 1300, img: "https://i.pinimg.com/736x/c6/8c/f2/c68cf2223eac3c9ff5f3482e9f641b15.jpg" },
    { name: "Fried Chicken", price: 1300, img: "https://i.pinimg.com/1200x/56/9e/a5/569ea58daee1a54a60e37545afc9310f.jpg" },
    { name: "Afritada Chicken", price: 1300, img: "https://i.pinimg.com/1200x/c2/1f/38/c21f384030a47c8eac2d6228572cd213.jpg" },
    { name: "Lechon Kawali", price: 1300, img: "https://i.pinimg.com/1200x/08/52/8b/08528bc58cf9100e657a47d55007613f.jpg" },
    { name: "Kare-kare", price: 1300, img: "https://i.pinimg.com/1200x/7d/49/1e/7d491edfe4e64368ba8406c9380f3784.jpg" },

    // keep relyeno as old item price
    { name: "Relyeno (Per Piece)", price: 250, img: "https://i.pinimg.com/1200x/ba/e6/10/bae61061fa702ec7db585d28bc2ce29e.jpg" }
  ],

  dessert: [
    // keep existing old prices
    { name: "Maja Blanca (Bilaos)", price: 500, img: "https://i.pinimg.com/1200x/d0/5e/c4/d05ec437d15f0b8d81a49ea07e39f20e.jpg" },
    { name: "Leche Flan (One Tub)", price: 100, img: "https://i.pinimg.com/1200x/c6/97/6f/c6976fa9306f92076a1153259634164b.jpg" },
    { name: "Puto Cheese (25 pcs)", price: 300, img: "https://i.pinimg.com/1200x/f1/8d/a8/f18da80beb16d7736448c375624bd091.jpg" },

    // updated tray pricing
    { name: "Buko Salad (Tray)", price: 1000, img: "https://i.pinimg.com/1200x/2b/22/47/2b2247d85fedef4b2976e9b30ef40bf2.jpg" },
    { name: "Buko Pandan", price: 800, img: "https://i.pinimg.com/1200x/b5/cd/61/b5cd61c76ebef2eba4ab6301879bb032.jpg" }
  ]
};

// ====== HELPERS ======
const slugify = (str) => str.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const flatAll = () => [...MENU.best, ...MENU.ulam, ...MENU.dessert];

// ====== DOM ======
const menuBest = document.getElementById("menuBest");
const menuUlam = document.getElementById("menuUlam");
const menuDessert = document.getElementById("menuDessert");

const orderList = document.getElementById("orderList");
const totalEl = document.getElementById("total");
const itemCountEl = document.getElementById("itemCount");

const orderDetails = document.getElementById("orderDetails");
const totalAmount = document.getElementById("totalAmount");
const paymentHidden = document.getElementById("paymentHidden");

const gcashBox = document.getElementById("gcashBox");
const orderForm = document.getElementById("orderForm");

const successSection = document.getElementById("success");

// ====== STATE ======
const cart = {};      // { id: qty }
const priceMap = {}; // { id: price }
const nameMap = {};  // { id: name }

flatAll().forEach(item => {
  const id = slugify(item.name);
  cart[id] = 0;
  priceMap[id] = item.price;
  nameMap[id] = item.name;
});

// ====== RENDER MENU ======
function renderCategory(list, container) {
  container.innerHTML = list.map((item) => {
    const id = slugify(item.name);
    return `
      <div class="menu-card" data-reveal="card">
        <img src="${item.img}" alt="${item.name}">
        <div class="menu-info">
          <h4>${item.name}</h4>
          <div class="menu-price">₱${item.price}</div>
          <div class="qty">
            <button type="button" aria-label="Decrease" onclick="updateQty('${id}', -1)">−</button>
            <span id="q-${id}">0</span>
            <button type="button" aria-label="Increase" onclick="updateQty('${id}', 1)">+</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

renderCategory(MENU.best, menuBest);
renderCategory(MENU.ulam, menuUlam);
renderCategory(MENU.dessert, menuDessert);

// ====== CART ======
window.updateQty = function(id, delta) {
  cart[id] = Math.max(0, cart[id] + delta);
  const qEl = document.getElementById(`q-${id}`);
  if (qEl) qEl.textContent = cart[id];
  renderOrder();
};

function renderOrder() {
  let total = 0;
  let count = 0;
  const details = [];

  const lines = [];

  Object.keys(cart).forEach((id) => {
    const qty = cart[id];
    if (qty > 0) {
      count += qty;
      const sub = qty * priceMap[id];
      total += sub;

      details.push(`${qty} x ${nameMap[id]}`);
      lines.push(`
        <div class="order-line">
          <strong>${qty} × ${nameMap[id]}</strong>
          <span>₱${sub}</span>
        </div>
      `);
    }
  });

  totalEl.textContent = total;
  itemCountEl.textContent = `${count} item${count === 1 ? "" : "s"}`;

  orderDetails.value = details.join(", ");
  totalAmount.value = String(total);

  if (lines.length === 0) {
    orderList.classList.add("empty");
    orderList.innerHTML = `
      <div class="empty-state">
        <div class="empty-dot"></div>
        <p>No items yet. Add from the menu.</p>
      </div>
    `;
  } else {
    orderList.classList.remove("empty");
    orderList.innerHTML = lines.join("");
  }
}

// ====== PAYMENT ======
window.selectPayment = function(method) {
  paymentHidden.value = method;
  if (method === "GCash") gcashBox.classList.add("show");
  else gcashBox.classList.remove("show");
};

// ====== THEME (DEFAULT DARK) ======
(function initTheme(){
  const saved = localStorage.getItem("mina_theme");
  if (saved === "light") document.body.classList.add("light");
})();

window.toggleMode = function() {
  document.body.classList.toggle("light");
  localStorage.setItem("mina_theme", document.body.classList.contains("light") ? "light" : "dark");
};

// ====== SUCCESS PAGE (AJAX submit; supports file upload) ======
orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const hasItem = Object.values(cart).some(q => q > 0);
  if (!hasItem) {
    alert("Please add at least 1 item to your order.");
    return;
  }

  const formData = new FormData(orderForm);

  try {
    const res = await fetch(orderForm.action, {
      method: "POST",
      body: formData,
      headers: { "Accept": "application/json" }
    });

    if (!res.ok) throw new Error("Submit failed");

    // Reset cart + UI
    Object.keys(cart).forEach(id => {
      cart[id] = 0;
      const qEl = document.getElementById(`q-${id}`);
      if (qEl) qEl.textContent = "0";
    });
    renderOrder();

    gcashBox.classList.remove("show");
    paymentHidden.value = "COD";
    orderForm.reset();

    successSection.classList.add("show");
    window.location.hash = "#success";
  } catch (err) {
    alert("Oops! Something went wrong. Please try again.");
  }
});

// ====== REVEAL ANIMATIONS ======
const revealTargets = [
  ...document.querySelectorAll(".reveal"),
  ...document.querySelectorAll('[data-reveal="card"]')
];

const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal-in");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => io.observe(el));

// init order render
renderOrder();
