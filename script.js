/* =========================================================
   Florencia - JavaScript vanilla
   Maneja catálogo, filtros, carrito, checkout y confirmación
   ========================================================= */

// Datos de envío por ciudad
const shippingCosts = {
  Cuenca: 3,
  Quito: 5,
  Guayaquil: 5,
  Loja: 4,
  Ambato: 4,
  Manta: 6,
  Machala: 5,
  Riobamba: 4,
  Ibarra: 5,
  "Santo Domingo": 5,
};

// Categorías visibles en la tienda
const categories = [
  {
    name: "Aretes",
    accent: "Brillo diario",
    description: "Piezas livianas para elevar cualquier look.",
  },
  {
    name: "Collares",
    accent: "Capas delicadas",
    description: "Cadenas y dijes con presencia sofisticada.",
  },
  {
    name: "Pulseras",
    accent: "Detalles finos",
    description: "Texturas, baño dorado y siluetas modernas.",
  },
  {
    name: "Anillos",
    accent: "Manos protagonistas",
    description: "Diseños ajustables para combinar y apilar.",
  },
  {
    name: "Sets",
    accent: "Combinaciones listas",
    description: "Selecciones coordinadas para regalar o estrenar.",
  },
];

// 40 productos ficticios distribuidos entre las categorías solicitadas
const productGroups = {
  Aretes: [
    ["Aretes Aurora", 18.99, "Acero inoxidable", "Aros dorados con destello pulido para uso diario.", 12],
    ["Aretes Toscana", 22.5, "Baño de oro 18k", "Gotas elegantes con movimiento sutil y acabado premium.", 8],
    ["Aretes Siena", 16.75, "Acero hipoalergénico", "Perlas pequeñas con silueta limpia y femenina.", 15],
    ["Aretes Amelie", 24.99, "Zirconia y acero", "Brillo puntual para cenas, eventos y looks de noche.", 6],
    ["Aretes Magnolia", 19.25, "Acero inoxidable", "Flor minimal con volumen delicado y cierre seguro.", 10],
    ["Aretes Clara", 14.99, "Aleación premium", "Argollas compactas con textura suave martillada.", 18],
    ["Aretes Bianca", 27.5, "Baño dorado", "Lágrimas modernas con reflejo satinado.", 7],
    ["Aretes Valentina", 21.99, "Perla cultivada", "Diseño romántico con perla central y base dorada.", 9],
  ],
  Collares: [
    ["Collar Firenze", 32.99, "Baño de oro 18k", "Cadena fina con dije orgánico de inspiración italiana.", 11],
    ["Collar Luna", 28.75, "Acero inoxidable", "Media luna pulida para combinar con cadenas cortas.", 14],
    ["Collar Emilia", 35.5, "Zirconia y acero", "Punto de luz elegante para escotes limpios.", 5],
    ["Collar Isola", 30.0, "Acero hipoalergénico", "Eslabones suaves con cierre ajustable.", 13],
    ["Collar Rosa", 26.99, "Baño dorado", "Dije floral pequeño con acabado luminoso.", 16],
    ["Collar Celeste", 38.25, "Cristal y acero", "Cristal claro sobre cadena delicada de largo medio.", 4],
    ["Collar Vera", 29.99, "Acero inoxidable", "Dije ovalado con brillo espejo y aire editorial.", 10],
    ["Collar Allegra", 42.0, "Baño de oro 18k", "Cadena doble lista para capas sin enredos.", 6],
  ],
  Pulseras: [
    ["Pulsera Marfil", 20.99, "Perla y acero", "Perlas pequeñas con separadores dorados.", 17],
    ["Pulsera Serena", 18.5, "Acero inoxidable", "Cadena fina con broche ajustable y brillo cálido.", 14],
    ["Pulsera Capri", 23.99, "Baño dorado", "Eslabón plano para un look moderno y pulido.", 9],
    ["Pulsera Alba", 21.75, "Acero hipoalergénico", "Dije central sutil con textura de flor.", 12],
    ["Pulsera Dalia", 25.5, "Zirconia y acero", "Detalle de zirconias para un resplandor discreto.", 6],
    ["Pulsera Catania", 19.99, "Aleación premium", "Cadena serpiente flexible con caída elegante.", 18],
    ["Pulsera Nube", 17.99, "Acero inoxidable", "Diseño liviano con cierre de extensión.", 20],
    ["Pulsera Giulia", 28.0, "Baño de oro 18k", "Brazalete fino con acabado satinado.", 5],
  ],
  Anillos: [
    ["Anillo Aurora", 16.99, "Acero inoxidable", "Anillo ajustable con frente abierto y líneas suaves.", 13],
    ["Anillo Bella", 18.75, "Baño dorado", "Silueta delgada para llevar solo o combinado.", 15],
    ["Anillo Perla", 20.5, "Perla y acero", "Perla pequeña sobre base dorada ajustable.", 7],
    ["Anillo Lucca", 22.99, "Acero hipoalergénico", "Aro ancho con textura ondulada contemporánea.", 8],
    ["Anillo Siena", 19.99, "Zirconia y acero", "Piedra central clara con brillo refinado.", 10],
    ["Anillo Gala", 24.75, "Baño de oro 18k", "Diseño cruzado con acabado pulido.", 6],
    ["Anillo Flora", 17.5, "Aleación premium", "Detalle floral en relieve con aire romántico.", 16],
    ["Anillo Sol", 21.25, "Acero inoxidable", "Forma irregular inspirada en joyería artesanal.", 9],
  ],
  Sets: [
    ["Set Aurora", 44.99, "Acero inoxidable", "Aretes y collar coordinados para un brillo diario.", 8],
    ["Set Firenze", 58.5, "Baño de oro 18k", "Collar doble y pulsera plana de estilo boutique.", 5],
    ["Set Perla", 49.99, "Perla cultivada", "Perlas suaves en aretes, collar y pulsera.", 6],
    ["Set Siena", 52.75, "Zirconia y acero", "Piezas con luz puntual para eventos especiales.", 4],
    ["Set Rosa", 46.25, "Baño dorado", "Motivos florales delicados en tres accesorios.", 7],
    ["Set Celeste", 61.99, "Cristal y acero", "Cristales claros con cadena dorada ajustable.", 3],
    ["Set Valentina", 54.0, "Acero hipoalergénico", "Combinación femenina de argollas y cadena fina.", 9],
    ["Set Allegra", 66.5, "Baño de oro 18k", "Selección premium lista para regalo.", 2],
  ],
};

const products = Object.entries(productGroups).flatMap(([category, items], categoryIndex) =>
  items.map(([name, price, material, description, stock], index) => ({
    id: `${category.toLowerCase()}-${index + 1}`,
    category,
    name,
    price,
    material,
    description,
    stock,
    tone: (categoryIndex + index) % 8,
  })),
);

const paymentMethods = ["Tarjeta de crédito", "Tarjeta de débito", "Transferencia bancaria", "PayPhone"];

// Estado de la aplicación
let activeCategory = "Todos";
let cart = [];
let selectedPayment = paymentMethods[0];
let lastOrder = null;

// Referencias al DOM
const categoryGrid = document.querySelector("#categoryGrid");
const filterRow = document.querySelector("#filterRow");
const productGrid = document.querySelector("#productGrid");
const catalogTitle = document.querySelector("#catalogTitle");
const cartOverlay = document.querySelector("#cartOverlay");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartSubtotal = document.querySelector("#cartSubtotal");
const checkoutItems = document.querySelector("#checkoutItems");
const checkoutSubtotal = document.querySelector("#checkoutSubtotal");
const checkoutShipping = document.querySelector("#checkoutShipping");
const checkoutTotal = document.querySelector("#checkoutTotal");
const citySelect = document.querySelector("#citySelect");
const paymentOptions = document.querySelector("#paymentOptions");
const confirmationSection = document.querySelector("#confirmacion");
const checkoutForm = document.querySelector("#checkoutForm");
const menuToggle = document.querySelector("#menuToggle");
const mainNav = document.querySelector("#mainNav");

// Utilidades
function money(value) {
  return `$${value.toFixed(2)}`;
}

function getSubtotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function getShipping() {
  return shippingCosts[citySelect.value] || 0;
}

function getTotal() {
  return getSubtotal() + getShipping();
}

function getCategoryClass(category) {
  return category.toLowerCase().replace("á", "a");
}

// Renderiza una imagen placeholder elegante con CSS
function productImage(product, extraClass = "") {
  return `
    <div class="product-image tone-${product.tone} ${extraClass}">
      <span class="jewel ${getCategoryClass(product.category)}"></span>
      <span class="product-image-label">${product.category}</span>
    </div>
  `;
}

// Render de categorías destacadas
function renderCategories() {
  categoryGrid.innerHTML = categories
    .map(
      (category) => `
        <button class="category-card ${activeCategory === category.name ? "active" : ""}" data-category="${category.name}" type="button">
          <div class="category-visual"><span></span></div>
          <p>${category.accent}</p>
          <h3>${category.name}</h3>
          <small>${category.description}</small>
        </button>
      `,
    )
    .join("");
}

// Render de filtros del catálogo
function renderFilters() {
  const filters = ["Todos", ...categories.map((category) => category.name)];
  filterRow.innerHTML = filters
    .map(
      (filter) => `
        <button class="${activeCategory === filter ? "active" : ""}" data-filter="${filter}" type="button">
          ${filter}
        </button>
      `,
    )
    .join("");
}

// Render de catálogo
function renderProducts() {
  const visibleProducts =
    activeCategory === "Todos"
      ? products
      : products.filter((product) => product.category === activeCategory);

  catalogTitle.textContent = activeCategory === "Todos" ? "Colección Florencia" : activeCategory;

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card">
          ${productImage(product)}
          <div class="product-body">
            <p class="product-category">${product.category}</p>
            <h3>${product.name}</h3>
            <strong>${money(product.price)}</strong>
            <p>${product.material}</p>
            <small>${product.description}</small>
            <span class="stock-label">Stock: ${product.stock} unidades</span>
            <button class="add-button" data-add="${product.id}" type="button">Agregar al carrito</button>
          </div>
        </article>
      `,
    )
    .join("");
}

// Render de ciudades de envío
function renderCities() {
  citySelect.innerHTML = Object.entries(shippingCosts)
    .map(([city, cost]) => `<option value="${city}">${city} (${money(cost)})</option>`)
    .join("");
}

// Render de métodos de pago
function renderPaymentOptions() {
  paymentOptions.innerHTML = paymentMethods
    .map(
      (method) => `
        <button class="${selectedPayment === method ? "active" : ""}" data-payment="${method}" type="button">
          ${method}
        </button>
      `,
    )
    .join("");
}

// Cambia categoría activa y actualiza secciones
function setCategory(category) {
  activeCategory = category;
  renderCategories();
  renderFilters();
  renderProducts();
}

// Agrega productos al carrito
function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const existing = cart.find((item) => item.id === productId);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + 1, product.stock);
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
  openCart();
}

// Actualiza cantidades del carrito
function updateQuantity(productId, change) {
  cart = cart
    .map((item) => {
      if (item.id !== productId) return item;
      return {
        ...item,
        quantity: Math.min(Math.max(item.quantity + change, 1), item.stock),
      };
    })
    .filter((item) => item.quantity > 0);

  renderCart();
}

// Elimina un producto del carrito
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  renderCart();
}

// Render del carrito y resumen
function renderCart() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
  cartSubtotal.textContent = money(getSubtotal());

  if (cart.length === 0) {
    cartItems.innerHTML = `<div class="cart-empty">Tu carrito está vacío.</div>`;
  } else {
    cartItems.innerHTML = cart
      .map(
        (item) => `
          <article class="cart-item">
            ${productImage(item, "cart-thumb")}
            <div>
              <h3>${item.name}</h3>
              <p>${money(item.price)}</p>
              <div class="quantity-controls">
                <button class="quantity-button" data-decrease="${item.id}" type="button">−</button>
                <strong>${item.quantity}</strong>
                <button class="quantity-button" data-increase="${item.id}" type="button">+</button>
              </div>
            </div>
            <button class="remove-button" data-remove="${item.id}" type="button" aria-label="Eliminar ${item.name}">×</button>
          </article>
        `,
      )
      .join("");
  }

  renderCheckoutSummary();
}

// Render del resumen de checkout
function renderCheckoutSummary() {
  if (cart.length === 0) {
    checkoutItems.innerHTML = `<p class="payment-note">Agrega productos para ver el resumen.</p>`;
  } else {
    checkoutItems.innerHTML = cart
      .map(
        (item) => `
          <div class="summary-line">
            <span>${item.name} × ${item.quantity}</span>
            <strong>${money(item.price * item.quantity)}</strong>
          </div>
        `,
      )
      .join("");
  }

  checkoutSubtotal.textContent = money(getSubtotal());
  checkoutShipping.textContent = money(cart.length ? getShipping() : 0);
  checkoutTotal.textContent = money(cart.length ? getTotal() : 0);
}

function openCart() {
  cartOverlay.classList.add("open");
  cartOverlay.setAttribute("aria-hidden", "false");
}

function closeCart() {
  cartOverlay.classList.remove("open");
  cartOverlay.setAttribute("aria-hidden", "true");
}

// Finaliza la compra simulada
function finalizeOrder(event) {
  event.preventDefault();

  if (cart.length === 0) {
    openCart();
    return;
  }

  lastOrder = {
    items: [...cart],
    city: citySelect.value,
    subtotal: getSubtotal(),
    shipping: getShipping(),
    total: getTotal(),
  };

  renderConfirmation();
  cart = [];
  renderCart();
  checkoutForm.reset();
  citySelect.value = lastOrder.city;
  renderCheckoutSummary();
  confirmationSection.classList.remove("hidden");
  document.querySelector("#confirmacion").scrollIntoView({ behavior: "smooth" });
}

// Render de confirmación
function renderConfirmation() {
  document.querySelector("#confirmationItems").innerHTML = lastOrder.items
    .map(
      (item) => `
        <div class="summary-line">
          <span>${item.name} × ${item.quantity}</span>
          <strong>${money(item.price * item.quantity)}</strong>
        </div>
      `,
    )
    .join("");

  document.querySelector("#confirmationSubtotal").textContent = money(lastOrder.subtotal);
  document.querySelector("#confirmationShipping").textContent = money(lastOrder.shipping);
  document.querySelector("#confirmationTotal").textContent = money(lastOrder.total);
  document.querySelector("#confirmationCity").textContent = `Ciudad de envío: ${lastOrder.city}`;
}

// Eventos generales
function bindEvents() {
  document.addEventListener("click", (event) => {
    const addId = event.target.closest("[data-add]")?.dataset.add;
    const removeId = event.target.closest("[data-remove]")?.dataset.remove;
    const increaseId = event.target.closest("[data-increase]")?.dataset.increase;
    const decreaseId = event.target.closest("[data-decrease]")?.dataset.decrease;
    const filter = event.target.closest("[data-filter]")?.dataset.filter;
    const category = event.target.closest("[data-category]")?.dataset.category;
    const categoryLink = event.target.closest("[data-category-link]")?.dataset.categoryLink;
    const payment = event.target.closest("[data-payment]")?.dataset.payment;

    if (addId) addToCart(addId);
    if (removeId) removeFromCart(removeId);
    if (increaseId) updateQuantity(increaseId, 1);
    if (decreaseId) updateQuantity(decreaseId, -1);

    if (filter || category || categoryLink) {
      setCategory(filter || category || categoryLink);
      mainNav.classList.remove("open");
    }

    if (payment) {
      selectedPayment = payment;
      renderPaymentOptions();
    }
  });

  document.querySelector("#cartOpen").addEventListener("click", openCart);
  document.querySelector("#cartClose").addEventListener("click", closeCart);
  document.querySelector("#cartBackdrop").addEventListener("click", closeCart);

  document.querySelector("#checkoutButton").addEventListener("click", (event) => {
    if (cart.length === 0) {
      event.preventDefault();
      return;
    }

    closeCart();
  });

  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
  });

  citySelect.addEventListener("change", renderCheckoutSummary);
  checkoutForm.addEventListener("submit", finalizeOrder);

  document.querySelector("#backToStore").addEventListener("click", () => {
    confirmationSection.classList.add("hidden");
  });
}

// Inicialización del sitio
function init() {
  renderCategories();
  renderFilters();
  renderProducts();
  renderCities();
  renderPaymentOptions();
  renderCart();
  bindEvents();
}

init();