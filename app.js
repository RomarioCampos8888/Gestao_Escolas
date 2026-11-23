const STORAGE_KEY = "merenda-facil-data-v1";

const iconPaths = {
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  box: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 8 9 5 9-5M3 8v9l9 5 9-5V8M12 13v9"/>',
  arrows: '<path d="M7 7h13l-3-3M17 17H4l3 3"/><path d="M20 7v5M4 17v-5"/>',
  cart: '<circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M2 3h2l2.4 11.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6L22 7H5"/>',
  chart: '<path d="M3 3v18h18"/><path d="m8 14 4-4 4 3 5-7"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4L7.3 15a8 8 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a8 8 0 0 1-.1 2Z"/>',
  spark: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1 2.5 2.5 1-2.5 1L19 21l-1-2.5-2.5-1 2.5-1 1-2.5Z"/>',
  school: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1V10Z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/>',
  leaf: '<path d="M20 4c-9 0-15 4-15 11a5 5 0 0 0 5 5c7 0 11-6 10-16Z"/><path d="M5 20c3-5 7-8 12-10"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  warning: '<path d="m10.3 3.9-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3.1l-8-14a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4M12 17h.01"/>',
  people: '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M23 11h-6"/>',
  calendarCheck: '<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18m-13 5 2 2 4-4"/>',
  package: '<path d="m12 3 9 5-9 5-9-5 9-5ZM3 8v9l9 5 9-5V8M12 13v9"/>',
};

const icon = (name, className = "") =>
  `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true">${iconPaths[name] || iconPaths.box}</svg>`;
const isoDate = (date) => {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return isoDate(d);
};
const money = (value) => Number(value || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const number = (value, digits = 1) => Number(value || 0).toLocaleString("pt-BR", { maximumFractionDigits: digits });
const dateLabel = (value) => value ? new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR") : "—";
const escapeHTML = (value = "") => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function demoData() {
  const categories = [
    { id: "cat-grains", name: "Grãos", description: "Arroz, feijão e cereais" },
    { id: "cat-meat", name: "Carnes", description: "Proteínas e carnes" },
    { id: "cat-produce", name: "Hortifrúti", description: "Frutas, legumes e verduras" },
    { id: "cat-dairy", name: "Laticínios", description: "Leite e derivados" },
    { id: "cat-drinks", name: "Bebidas", description: "Bebidas e sucos" },
    { id: "cat-frozen", name: "Congelados", description: "Alimentos congelados" },
  ];
  const schools = [
    { id: "school-sol", name: "Escola Municipal Sol Nascente", city: "Campinas", state: "SP", students: 320, schoolDays: 22, manager: "Mariana Alves" },
    { id: "school-estrela", name: "EMEF Estrela do Amanhã", city: "Valinhos", state: "SP", students: 185, schoolDays: 21, manager: "Rafael Souza" },
  ];
  const products = [
    { id: "p-rice", name: "Arroz tipo 1", categoryId: "cat-grains", unit: "Kg", minimum: 80, consumptionPerStudent: 0.045, expiration: daysAgo(-90), supplier: "Distribuidora Bom Grão", schoolId: "school-sol", stock: 412, price: 6.8 },
    { id: "p-beans", name: "Feijão carioca", categoryId: "cat-grains", unit: "Kg", minimum: 55, consumptionPerStudent: 0.035, expiration: daysAgo(-18), supplier: "Distribuidora Bom Grão", schoolId: "school-sol", stock: 128, price: 8.5 },
    { id: "p-chicken", name: "Peito de frango", categoryId: "cat-meat", unit: "Kg", minimum: 70, consumptionPerStudent: 0.06, expiration: daysAgo(-11), supplier: "Frigorífico Sabor", schoolId: "school-sol", stock: 84, price: 17.9 },
    { id: "p-milk", name: "Leite integral", categoryId: "cat-dairy", unit: "Litro", minimum: 120, consumptionPerStudent: 0.12, expiration: daysAgo(-24), supplier: "Laticínios Vida", schoolId: "school-sol", stock: 620, price: 5.2 },
    { id: "p-carrot", name: "Cenoura", categoryId: "cat-produce", unit: "Kg", minimum: 28, consumptionPerStudent: 0.025, expiration: daysAgo(-5), supplier: "Horta do Campo", schoolId: "school-sol", stock: 64, price: 4.5 },
    { id: "p-pasta", name: "Macarrão", categoryId: "cat-grains", unit: "Pacote", minimum: 45, consumptionPerStudent: 0.035, expiration: daysAgo(8), supplier: "Distribuidora Bom Grão", schoolId: "school-sol", stock: 38, price: 4.2 },
    { id: "p-banana", name: "Banana prata", categoryId: "cat-produce", unit: "Kg", minimum: 35, consumptionPerStudent: 0.04, expiration: daysAgo(-3), supplier: "Horta do Campo", schoolId: "school-sol", stock: 92, price: 5.8 },
    { id: "p-oil", name: "Óleo de soja", categoryId: "cat-grains", unit: "Litro", minimum: 20, consumptionPerStudent: 0.008, expiration: daysAgo(-150), supplier: "Atacado Central", schoolId: "school-sol", stock: 57, price: 7.3 },
    { id: "p-rice-2", name: "Arroz tipo 1", categoryId: "cat-grains", unit: "Kg", minimum: 50, consumptionPerStudent: 0.045, expiration: daysAgo(-95), supplier: "Distribuidora Bom Grão", schoolId: "school-estrela", stock: 210, price: 6.8 },
    { id: "p-milk-2", name: "Leite integral", categoryId: "cat-dairy", unit: "Litro", minimum: 80, consumptionPerStudent: 0.12, expiration: daysAgo(-16), supplier: "Laticínios Vida", schoolId: "school-estrela", stock: 285, price: 5.2 },
    { id: "p-beans-2", name: "Feijão carioca", categoryId: "cat-grains", unit: "Kg", minimum: 35, consumptionPerStudent: 0.035, expiration: daysAgo(-3), supplier: "Distribuidora Bom Grão", schoolId: "school-estrela", stock: 42, price: 8.5 },
  ];
  const movements = [
    { id: "m-1", date: daysAgo(0), productId: "p-rice", type: "entrada", quantity: 120, unitPrice: 6.8, supplier: "Distribuidora Bom Grão", reason: "Reposição mensal", note: "" },
    { id: "m-2", date: daysAgo(0), productId: "p-chicken", type: "saida", quantity: 18, reason: "Preparo das refeições", note: "" },
    { id: "m-3", date: daysAgo(1), productId: "p-milk", type: "entrada", quantity: 80, unitPrice: 5.2, supplier: "Laticínios Vida", reason: "Entrega semanal", note: "" },
    { id: "m-4", date: daysAgo(2), productId: "p-carrot", type: "saida", quantity: 12, reason: "Preparo das refeições", note: "" },
    { id: "m-5", date: daysAgo(4), productId: "p-pasta", type: "saida", quantity: 22, reason: "Preparo das refeições", note: "" },
    { id: "m-6", date: daysAgo(72), productId: "p-oil", type: "entrada", quantity: 40, unitPrice: 7.3, supplier: "Atacado Central", reason: "Reposição", note: "" },
  ];
  return { schools, categories, products, movements, preparations: [], menuPlans: [], selectedSchoolId: schools[0].id };
}

function generatedId(prefix) {
  const randomUUID = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  return `${prefix}-${randomUUID}`;
}

function normalizeSavedData(saved) {
  const fallback = demoData();
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) return fallback;

  const text = (value, fallbackValue = "") => typeof value === "string" ? value : fallbackValue;
  const numberValue = (value, fallbackValue = 0) => {
    const normalized = Number(value);
    return Number.isFinite(normalized) ? normalized : fallbackValue;
  };
  const nonNegative = (value, fallbackValue = 0) => Math.max(0, numberValue(value, fallbackValue));

  const schools = Array.isArray(saved.schools)
    ? saved.schools.filter((item) => item && typeof item === "object").map((item) => ({
        id: text(item.id, generatedId("school")),
        name: text(item.name, "Escola sem nome"),
        city: text(item.city, ""),
        state: text(item.state, "").slice(0, 2).toUpperCase(),
        students: Math.max(1, numberValue(item.students, 1)),
        schoolDays: Math.min(31, Math.max(1, numberValue(item.schoolDays, 22))),
        manager: text(item.manager, ""),
      }))
    : [];
  if (!schools.length) return fallback;

  const categories = Array.isArray(saved.categories)
    ? saved.categories.filter((item) => item && typeof item === "object").map((item) => ({
        id: text(item.id, generatedId("cat")),
        name: text(item.name, "Sem nome"),
        description: text(item.description, ""),
      }))
    : fallback.categories;
  if (!categories.length) categories.push(...fallback.categories);

  const products = Array.isArray(saved.products)
    ? saved.products.filter((item) => item && typeof item === "object").map((item) => ({
        id: text(item.id, generatedId("product")),
        name: text(item.name, "Alimento sem nome"),
        categoryId: categories.some((category) => category.id === item.categoryId) ? item.categoryId : categories[0].id,
        unit: text(item.unit, "Kg"),
        minimum: nonNegative(item.minimum),
        consumptionPerStudent: nonNegative(item.consumptionPerStudent),
        expiration: text(item.expiration, ""),
        supplier: text(item.supplier, ""),
        schoolId: schools.some((school) => school.id === item.schoolId) ? item.schoolId : schools[0].id,
        stock: nonNegative(item.stock),
        price: nonNegative(item.price),
        createdAt: text(item.createdAt, ""),
      }))
    : [];

  const movements = Array.isArray(saved.movements)
    ? saved.movements.filter((item) => item && typeof item === "object").map((item) => ({
        id: text(item.id, generatedId("movement")),
        date: /^\d{4}-\d{2}-\d{2}$/.test(text(item.date)) ? item.date : isoDate(new Date()),
        productId: text(item.productId, ""),
        type: item.type === "entrada" ? "entrada" : item.type === "saida" ? "saida" : "saida",
        quantity: nonNegative(item.quantity),
        unitPrice: nonNegative(item.unitPrice),
        supplier: text(item.supplier, ""),
        reason: text(item.reason, ""),
        note: text(item.note, ""),
      })).filter((item) => item.productId && item.quantity > 0)
    : [];

  const preparations = Array.isArray(saved.preparations)
    ? saved.preparations.filter((item) => item && typeof item === "object").map((item) => ({
        id: text(item.id, generatedId("preparation")),
        schoolId: text(item.schoolId, schools[0].id),
        name: text(item.name, "Preparação sem nome"),
        description: text(item.description, ""),
        method: text(item.method, ""),
        servings: Math.max(1, numberValue(item.servings, 1)),
        active: item.active !== false,
        ingredients: Array.isArray(item.ingredients)
          ? item.ingredients.filter((ingredient) => ingredient && typeof ingredient === "object").map((ingredient) => ({
              productId: text(ingredient.productId, ""),
              quantity: nonNegative(ingredient.quantity),
              unit: text(ingredient.unit, ""),
            })).filter((ingredient) => ingredient.productId && ingredient.quantity > 0)
          : [],
      }))
    : [];

  const menuPlans = Array.isArray(saved.menuPlans)
    ? saved.menuPlans.filter((item) => item && typeof item === "object").map((item) => ({
        id: text(item.id, generatedId("menu")),
        schoolId: text(item.schoolId, schools[0].id),
        date: /^\d{4}-\d{2}-\d{2}$/.test(text(item.date)) ? item.date : isoDate(new Date()),
        shift: text(item.shift, "Manhã"),
        preparationId: text(item.preparationId, ""),
      })).filter((item) => item.preparationId)
    : [];

  const selectedSchoolId = schools.some((school) => school.id === saved.selectedSchoolId)
    ? saved.selectedSchoolId
    : schools[0].id;

  return { schools, categories, products, movements, preparations, menuPlans, selectedSchoolId };
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return demoData();
    const parsed = JSON.parse(saved);
    const normalized = normalizeSavedData(parsed);
    if (JSON.stringify(normalized) !== JSON.stringify(parsed)) saveData(normalized);
    return normalized;
  } catch (error) {
    console.error("Não foi possível carregar os dados salvos do Merenda Fácil.", error);
    return demoData();
  }
}

let data = loadData();
let activePage = "dashboard";
let searchTerm = "";
let categoryFilter = "todas";
let reportFilter = "30";
let movementFilters = { type: "todos", productId: "todos", from: "", to: "" };
let menuSection = "planning";
let menuMonth = isoDate(new Date()).slice(0, 7);
let menuView = "month";
let menuFocusDate = isoDate(new Date());

function saveData(dataToSave = data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    showToast("Não foi possível salvar. Verifique o espaço disponível no navegador.", true);
    console.error("Erro ao salvar dados do Merenda Fácil.", error);
  }
}

function currentSchool() {
  return data.schools.find((school) => school.id === data.selectedSchoolId) || data.schools[0];
}
function productsForSchool() {
  const school = currentSchool();
  return data.products.filter((product) => product.schoolId === school?.id);
}
function productById(id) { return data.products.find((product) => product.id === id); }
function categoryName(id) { return data.categories.find((category) => category.id === id)?.name || "Sem categoria"; }
function dailyConsumption(product, school = currentSchool()) {
  return Number(product.consumptionPerStudent || 0) * Number(school?.students || 0);
}
function daysRemaining(product, school = currentSchool()) {
  const daily = dailyConsumption(product, school);
  return daily > 0 ? Math.max(0, Number(product.stock || 0)) / daily : Infinity;
}
function isDaysBelow(days, threshold) { return days < threshold - 1e-9; }
function isDaysAtMost(days, threshold) { return days <= threshold + 1e-9; }
function productStatus(product) {
  const today = isoDate(new Date());
  const expiryDays = product.expiration ? Math.ceil((new Date(`${product.expiration}T00:00:00`) - new Date(`${today}T00:00:00`)) / 86400000) : Infinity;
  if (expiryDays < 0) return { label: "Vencido", className: "danger" };
  if (Number(product.stock) < Number(product.minimum)) return { label: "Estoque baixo", className: "danger" };
  if (isDaysBelow(daysRemaining(product), 7)) return { label: "Crítico", className: "danger" };
  if (isDaysAtMost(daysRemaining(product), 30) || expiryDays <= 30) return { label: "Atenção", className: "warn" };
  return { label: "Seguro", className: "good" };
}
function alertItems(products = productsForSchool()) {
  const today = isoDate(new Date());
  const alerts = [];
  products.forEach((product) => {
    const remaining = daysRemaining(product);
    const expiry = product.expiration ? Math.ceil((new Date(`${product.expiration}T00:00:00`) - new Date(`${today}T00:00:00`)) / 86400000) : Infinity;
    if (expiry < 0) alerts.push({ product, label: "Produto vencido", detail: `${Math.abs(expiry)} dia(s) atrás`, tone: "red" });
    else if (expiry <= 30) alerts.push({ product, label: expiry === 0 ? "Vence hoje" : `Vence em ${expiry} dia(s)`, detail: dateLabel(product.expiration), tone: "amber" });
    if (Number(product.stock) < Number(product.minimum)) alerts.push({ product, label: "Abaixo do estoque mínimo", detail: `${number(product.stock)} ${product.unit}`, tone: "red" });
    if (remaining < 7) alerts.push({ product, label: "Menos de 7 dias de estoque", detail: Number.isFinite(remaining) ? `${number(remaining)} dias` : "Sem consumo informado", tone: "red" });
    const latest = data.movements.filter((movement) => movement.productId === product.id).map((movement) => movement.date).sort().at(-1);
    const lastDate = latest || product.createdAt;
    if (lastDate && (new Date(`${today}T00:00:00`) - new Date(`${lastDate}T00:00:00`)) / 86400000 > 60) alerts.push({ product, label: "Sem movimentação há mais de 60 dias", detail: `Última em ${dateLabel(lastDate)}`, tone: "amber" });
  });
  return alerts;
}
function forecastItems() {
  const school = currentSchool();
  return productsForSchool().map((product) => {
    const expected = dailyConsumption(product, school) * school.schoolDays;
    return { product, expected, available: Number(product.stock || 0), purchase: Math.max(0, expected - Number(product.stock || 0)) };
  });
}
function schoolDaysAvailable() {
  const usable = productsForSchool().filter((product) => dailyConsumption(product) > 0);
  return usable.length ? Math.min(...usable.map((product) => daysRemaining(product))) : 0;
}
function productsNeedingAttention() {
  const today = isoDate(new Date());
  return productsForSchool().filter((product) => {
    const remaining = daysRemaining(product);
    const expiry = product.expiration ? (new Date(`${product.expiration}T00:00:00`) - new Date(`${today}T00:00:00`)) / 86400000 : Infinity;
    return product.stock < product.minimum || isDaysBelow(remaining, 7) || isDaysAtMost(remaining, 30) || (expiry >= 0 && expiry <= 30) || expiry < 0;
  }).sort((a, b) => daysRemaining(a) - daysRemaining(b));
}
function consumptionLast30Days(products = productsForSchool()) {
  const school = currentSchool();
  const productIds = new Set(products.map((product) => product.id));
  const startDate = daysAgo(29);
  const endDate = isoDate(new Date());
  const consumption = new Map();
  data.movements.forEach((movement) => {
    if (movement.type !== "saida" || movement.date < startDate || movement.date > endDate || !productIds.has(movement.productId)) return;
    consumption.set(movement.productId, (consumption.get(movement.productId) || 0) + Number(movement.quantity || 0));
  });
  return products.map((product) => {
    const consumed = consumption.get(product.id) || 0;
    const monthlyTarget = dailyConsumption(product, school) * school.schoolDays;
    return {
      product,
      consumed,
      monthlyTarget,
      progress: monthlyTarget > 0 ? Math.min(100, consumed / monthlyTarget * 100) : 0,
    };
  }).sort((a, b) => b.progress - a.progress || b.consumed - a.consumed).slice(0, 5);
}

function setSchoolOptions() {
  const select = document.getElementById("school-select");
  select.innerHTML = data.schools.map((school) => `<option value="${escapeHTML(school.id)}">${escapeHTML(school.name)}</option>`).join("");
  select.value = currentSchool()?.id || "";
  document.getElementById("school-student-count").textContent = `${number(currentSchool()?.students || 0, 0)} alunos`;
}
function responsibleName() { return currentSchool()?.manager || "Gestor escolar"; }
function setUserName() {
  const manager = responsibleName();
  const initials = manager.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
  document.getElementById("user-name").textContent = manager;
  document.getElementById("user-email").textContent = "Responsável escolar";
  document.getElementById("top-avatar").textContent = initials;
}
function render() {
  setSchoolOptions();
  setUserName();
  document.querySelectorAll(".nav-link, .mobile-tab").forEach((button) => button.classList.toggle("active", button.dataset.page === activePage));
  const purchases = forecastItems().filter((item) => item.purchase > 0).length;
  document.getElementById("purchase-count").textContent = purchases;
  const today = new Date();
  document.getElementById("today-label").textContent = today.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" }).replace(".", "");
  const renderer = { dashboard: renderDashboard, inventory: renderInventory, movements: renderMovements, purchases: renderPurchases, menu: renderMenu, reports: renderReports, registers: renderRegisters }[activePage];
  document.getElementById("page-content").innerHTML = renderer();
  document.getElementById("notification-dot").style.display = alertItems().length ? "block" : "none";
}

function pageHeading(eyebrow, title, description, actions = "") {
  return `<div class="page-heading"><div><div class="eyebrow">${eyebrow}</div><h1>${title}</h1><p>${description}</p></div><div class="heading-actions">${actions}</div></div>`;
}
function button(label, action, kind = "primary", iconName = "plus") {
  return `<button class="${kind}-button" data-action="${action}">${icon(iconName)}${label}</button>`;
}
function renderDashboard() {
  const school = currentSchool();
  const products = productsForSchool();
  const alerts = alertItems(products);
  const days = schoolDaysAvailable();
  const condition = isDaysBelow(days, 7) ? "critical" : isDaysAtMost(days, 30) ? "warning" : "healthy";
  const daysStatus = condition === "critical" ? "status-critical" : condition === "warning" ? "status-warning" : "status-healthy";
  const attentionProducts = productsNeedingAttention();
  const criticalProducts = products.filter((p) => productStatus(p).className === "danger");
  const warningProducts = products.filter((p) => productStatus(p).className === "warn");
  const safeProducts = products.length - criticalProducts.length - warningProducts.length;
  const lowStock = products.filter((p) => p.stock < p.minimum).length;
  const expiring = products.filter((p) => {
    if (!p.expiration) return false;
    const left = (new Date(`${p.expiration}T00:00:00`) - new Date(`${isoDate(new Date())}T00:00:00`)) / 86400000;
    return left >= 0 && left <= 30;
  }).length;
  const todayMovements = data.movements.filter((movement) => movement.date === isoDate(new Date()) && products.some((product) => product.id === movement.productId)).length;
  const monthlyMeals = school.students * school.schoolDays;
  const purchaseCount = forecastItems().filter((item) => item.purchase > 0).length;
  const monthMenu = menuPlansForMonth(menuMonth);
  const menuNeeds = menuConsumption(menuMonth).filter((item) => item.purchase > 0);
  const menuCoveredCount = menuConsumption(menuMonth).filter((item) => item.status === "good").length;
  const tightest = [...products].filter((p) => dailyConsumption(p) > 0).sort((a, b) => daysRemaining(a) - daysRemaining(b))[0];
  const heroStatus = isDaysBelow(days, 7) ? { label: "CRÍTICO", message: "Reposição necessária nesta semana", icon: "warning" } : isDaysAtMost(days, 30) ? { label: "ATENÇÃO", message: "Planeje a reposição dos alimentos", icon: "clock" } : { label: "ESTÁVEL", message: `Estoque suficiente para ${number(days, 0)} dias`, icon: "calendarCheck" };
  const expiringProducts = products.filter((product) => product.expiration && product.expiration >= isoDate(new Date()) && (new Date(`${product.expiration}T00:00:00`) - new Date(`${isoDate(new Date())}T00:00:00`)) / 86400000 <= 30);
  return `${pageHeading("PAINEL DA MERENDA", escapeHTML(school.name), `${escapeHTML(school.city)}, ${escapeHTML(school.state)} · ${number(school.students, 0)} alunos · ${school.schoolDays} dias letivos/mês · Responsável: ${escapeHTML(responsibleName())}`, "")}
    <div class="dashboard-grid">
      <section class="days-card ${daysStatus}">
        <div class="days-card-content">
          <div class="eyebrow"><span class="status-dot"></span> DIAS DE MERENDA DISPONÍVEIS</div>
          <div class="days-main"><div class="days-number">${number(days, 0)}<span>DIAS</span></div>
            <div class="days-situation"><span class="situation-indicator">${icon(heroStatus.icon)}</span><div><span class="situation-label">SITUAÇÃO · ${heroStatus.label}</span><strong>${heroStatus.message}</strong></div></div>
          </div>
          <div class="days-footer">
            <div class="next-item">${tightest ? `<span class="next-item-label">PRÓXIMO ITEM A ACABAR</span><strong>${icon("package")} ${escapeHTML(tightest.name)}</strong><span>${number(daysRemaining(tightest))} dias restantes · ${number(tightest.stock)} ${escapeHTML(tightest.unit)} disponíveis</span>` : `<span class="next-item-label">PRÓXIMO ITEM A ACABAR</span><strong>Cadastre o consumo dos alimentos</strong><span>para ver uma previsão de estoque</span>`}</div>
            <div class="recommended-action"><span>AÇÃO RECOMENDADA</span><button class="primary-button hero-purchase-button" data-page="purchases">${icon("cart")} Gerar lista de compras</button></div>
          </div>
        </div>
      </section>
      <section class="attention-card"><div class="attention-header"><div class="section-title"><h2>Centro de ação</h2></div><span class="attention-total">${alerts.length}</span></div>
        <div class="summary-item"><span class="summary-item-icon green">${icon("calendarCheck")}</span><div class="summary-item-copy"><strong>Seguro</strong><small>Estoque adequado</small></div><span class="summary-item-count safe-count">${safeProducts}</span></div>
        <div class="summary-item"><span class="summary-item-icon amber">${icon("clock")}</span><div class="summary-item-copy"><strong>Atenção</strong><small>Planeje uma reposição</small></div><span class="summary-item-count warning-count">${warningProducts.length}</span></div>
        <div class="summary-item"><span class="summary-item-icon">${icon("warning")}</span><div class="summary-item-copy"><strong>Crítico</strong><small>Exige ação prioritária</small></div><span class="summary-item-count critical-count">${criticalProducts.length}</span></div>
        <div class="summary-expiring"><span>${icon("calendar")} ${expiringProducts.length} produtos vencendo em até 30 dias</span><span>${purchaseCount} sugestões de compra</span></div>
        <button class="primary-button summary-purchase-button" data-page="purchases">${icon("cart")} Comprar para o próximo mês</button>
      </section>
    </div>
    <div class="stats-grid">
      ${statCard("Alimentos cadastrados", products.length, "itens na escola", "package")}
      ${statCard("Abaixo do mínimo", lowStock, lowStock ? "precisam de reposição" : "estoque adequado", "warning", lowStock ? "red" : "")}
      ${statCard("Vencendo em breve", expiring, "nos próximos 30 dias", "calendar", expiring ? "amber" : "")}
      ${statCard("Movimentações hoje", todayMovements, "entradas e saídas", "arrows", "blue")}
      ${statCard("Refeições previstas", `${number(monthlyMeals, 0)} <small>refeições</small>`, `${school.students} alunos × ${school.schoolDays} dias letivos`, "chart")}
      ${statCard("Previsão de compras", purchaseCount, "itens para o próximo mês", "cart", purchaseCount ? "amber" : "")}
      ${statCard("Refeições planejadas", monthMenu.length, "no calendário deste mês", "calendar")}
      ${statCard("Preparações cadastradas", preparationsForSchool().length, "receitas ativas", "leaf")}
      ${statCard("Cardápio coberto", menuCoveredCount, "ingredientes suficientes", "calendarCheck", menuNeeds.length ? "amber" : "")}
      ${statCard("Itens para comprar", menuNeeds.length, "para cumprir o cardápio", "cart", menuNeeds.length ? "red" : "")}
    </div>
    <section class="panel menu-dashboard-link"><div class="panel-header"><div><h2>Cardápio Escolar</h2><p>Planeje refeições e confira o impacto no estoque.</p></div><button class="primary-button" data-page="menu">${icon("calendar")} Abrir planejamento</button></div></section>
    <section class="panel attention-panel"><div class="panel-header"><div><h2>Produtos que exigem atenção</h2><p>Priorize o que pode faltar ou vencer primeiro</p></div><button class="text-link" data-page="inventory">Ver todos os alimentos →</button></div>
      ${attentionProducts.length ? `<div class="attention-list">${attentionProducts.slice(0, 6).map((product) => {
        const remaining = daysRemaining(product);
        const status = productStatus(product);
        return `<div class="attention-product"><div class="attention-product-name">${escapeHTML(product.name)}<span class="attention-product-detail">${escapeHTML(categoryName(product.categoryId))}</span></div><div class="attention-metric"><small>QUANTIDADE</small>${number(product.stock)} ${escapeHTML(product.unit)}</div><div class="attention-metric"><small>ESTOQUE MÍNIMO</small>${number(product.minimum)} ${escapeHTML(product.unit)}</div><div class="attention-metric"><small>DIAS RESTANTES</small>${Number.isFinite(remaining) ? `${number(remaining)} dias` : "—"}</div><span class="badge ${status.className}">${status.className === "good" ? "Seguro" : status.className === "warn" ? "Atenção" : "Crítico"}</span></div>`;
      }).join("")}</div>` : `<div class="empty-state"><strong>Tudo em ordem!</strong>Nenhum alimento precisa de atenção agora.</div>`}
    </section>
    <div class="lower-grid">
      <section class="panel"><div class="panel-header"><div><h2>Consumo dos últimos 30 dias</h2><p>Consumo realizado em relação à previsão mensal</p></div><span class="chart-period">${number(products.length, 0)} alimentos</span></div>${consumptionBars30Days(products)}</section>
      <section class="panel"><div class="panel-header"><div><h2>Últimas movimentações</h2><p>Atividade recente da escola</p></div><button class="text-link" data-page="movements">Ver histórico →</button></div>${movementTable(data.movements.filter((m) => products.some((p) => p.id === m.productId)).slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4), false)}</section>
    </div>`;
}
function statCard(title, value, foot, iconName, tone = "") {
  return `<article class="stat-card"><div class="stat-top"><span>${title}</span><span class="stat-icon ${tone}">${icon(iconName)}</span></div><div class="stat-value">${value}</div><div class="stat-foot">${foot}</div></article>`;
}
function productUrgency(products) {
  const urgent = products.filter((product) => dailyConsumption(product) > 0).sort((a, b) => daysRemaining(a) - daysRemaining(b)).slice(0, 4);
  if (!urgent.length) return `<div class="empty-state">Cadastre o consumo dos alimentos para ver a previsão.</div>`;
  return `<div class="product-list">${urgent.map((product) => {
    const days = daysRemaining(product);
    const barWidth = Number.isFinite(days) ? Math.min(100, Math.max(5, days / 30 * 100)) : 100;
    return `<div class="product-row"><div><span class="product-name">${escapeHTML(product.name)}</span><span class="product-sub">${number(product.stock)} ${escapeHTML(product.unit)} disponíveis</span><div class="progress-track"><div class="progress-fill ${days < 7 ? "danger" : days > 20 ? "safe" : ""}" style="width:${barWidth}%"></div></div></div><div class="days-left">${Number.isFinite(days) ? number(days) : "—"}<span>dias</span></div></div>`;
  }).join("")}</div>`;
}
function consumptionBars30Days(products = productsForSchool()) {
  const rows = consumptionLast30Days(products);
  if (!rows.length) return `<div class="empty-state"><strong>Nenhum alimento cadastrado</strong>Cadastre alimentos para acompanhar o consumo.</div>`;
  return `<div class="consumption-bars">${rows.map(({ product, consumed, monthlyTarget, progress }) => {
    const fillClass = progress > 100 ? "over-target" : "";
    return `<div class="consumption-bar-row"><div class="consumption-bar-heading"><strong>${escapeHTML(product.name)}</strong><span>${number(consumed)} ${escapeHTML(product.unit)} <small>de ${number(monthlyTarget)} ${escapeHTML(product.unit)}</small></span></div><div class="consumption-bar-track" role="progressbar" aria-label="Consumo de ${escapeHTML(product.name)} em relação à previsão mensal" aria-valuenow="${Math.round(progress)}" aria-valuemin="0" aria-valuemax="100"><span class="${fillClass}" style="width:${Math.max(0, Math.min(100, progress))}%"></span></div><span class="consumption-bar-caption">${consumed > 0 ? `${number(progress, 0)}% da previsão mensal` : "Sem saídas registradas nos últimos 30 dias"}</span></div>`;
  }).join("")}</div>`;
}
function movementTable(movements, actions = true) {
  if (!movements.length) return `<div class="empty-state"><strong>Nenhuma movimentação encontrada</strong>Quando houver entradas ou saídas, elas aparecerão aqui.</div>`;
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>PRODUTO</th><th>TIPO</th><th>QUANTIDADE</th><th>DATA</th><th>RESPONSÁVEL / MOTIVO</th>${actions ? "<th></th>" : ""}</tr></thead><tbody>${movements.map((movement) => {
    const product = productById(movement.productId);
    return `<tr><td>${escapeHTML(product?.name || "Alimento removido")}<span class="table-sub">${escapeHTML(product ? categoryName(product.categoryId) : "—")}</span></td><td><span class="badge ${movement.type === "entrada" ? "good" : "warn"}">${movement.type === "entrada" ? "Entrada" : "Saída"}</span></td><td>${movement.type === "entrada" ? "+" : "−"}${number(movement.quantity)} ${escapeHTML(product?.unit || "")}</td><td>${dateLabel(movement.date)}</td><td>${escapeHTML(movement.reason || movement.supplier || "—")}</td>${actions ? `<td><button class="small-action" data-action="delete-movement" data-id="${movement.id}" aria-label="Excluir movimentação">Excluir</button></td>` : ""}</tr>`;
  }).join("")}</tbody></table></div>`;
}
function renderInventory() {
  const products = productsForSchool().filter((product) => (categoryFilter === "todas" || product.categoryId === categoryFilter) && `${product.name} ${categoryName(product.categoryId)}`.toLowerCase().includes(searchTerm.toLowerCase()));
  return `${pageHeading("CONTROLE SIMPLES", "Estoque de alimentos", "Acompanhe quantidades, validade e dias de alimentação.", button("Adicionar alimento", "new-product"))}
    <section class="panel"><div class="toolbar"><div class="toolbar-left"><label class="search-box">${icon("search")}<input id="inventory-search" placeholder="Buscar alimento..." value="${escapeHTML(searchTerm)}"></label><select class="filter-select" id="category-filter"><option value="todas" ${categoryFilter === "todas" ? "selected" : ""}>Todas as categorias</option>${data.categories.map((cat) => `<option value="${cat.id}" ${categoryFilter === cat.id ? "selected" : ""}>${escapeHTML(cat.name)}</option>`).join("")}</select></div><div class="toolbar-right"><span class="summary-label">${products.length} alimentos</span></div></div>
    <div class="table-wrap"><table class="data-table"><thead><tr><th>ALIMENTO</th><th>QUANTIDADE</th><th>ESTOQUE MÍNIMO</th><th>DIAS RESTANTES</th><th>VALIDADE</th><th>STATUS</th><th>AÇÕES</th></tr></thead><tbody>${products.length ? products.map((product) => {
    const days = daysRemaining(product), status = productStatus(product);
    return `<tr><td>${escapeHTML(product.name)}<span class="table-sub">${escapeHTML(categoryName(product.categoryId))} · ${escapeHTML(product.supplier || "Sem fornecedor")}</span></td><td>${number(product.stock)} ${escapeHTML(product.unit)}</td><td>${number(product.minimum)} ${escapeHTML(product.unit)}</td><td>${Number.isFinite(days) ? `${number(days)} dias` : "—"}</td><td>${dateLabel(product.expiration)}</td><td><span class="badge ${status.className}">${status.label}</span></td><td><div class="row-actions"><button class="small-action" data-action="new-movement" data-product="${product.id}">Movimentar</button><button class="small-action" data-action="edit-product" data-id="${product.id}">Editar</button></div></td></tr>`;
    }).join("") : `<tr><td colspan="7"><div class="empty-state">Nenhum alimento encontrado.</div></td></tr>`}</tbody></table></div></section>`;
}
function renderMovements() {
  const schoolProducts = productsForSchool();
  const productIds = new Set(schoolProducts.map((p) => p.id));
  const movements = data.movements.filter((m) => productIds.has(m.productId)).filter((m) => movementFilters.type === "todos" || m.type === movementFilters.type).filter((m) => movementFilters.productId === "todos" || m.productId === movementFilters.productId).filter((m) => !movementFilters.from || m.date >= movementFilters.from).filter((m) => !movementFilters.to || m.date <= movementFilters.to).sort((a, b) => b.date.localeCompare(a.date));
  return `${pageHeading("ENTRADAS E SAÍDAS", "Movimentações", "Cada movimentação atualiza o estoque automaticamente.", `${button("Registrar entrada", "new-entry", "secondary", "plus")} ${button("Registrar saída", "new-exit", "primary", "plus")}`)}
    <section class="panel"><div class="toolbar"><div class="toolbar-left filter-row"><select class="filter-select" id="movement-type"><option value="todos" ${movementFilters.type === "todos" ? "selected" : ""}>Todos os tipos</option><option value="entrada" ${movementFilters.type === "entrada" ? "selected" : ""}>Entradas</option><option value="saida" ${movementFilters.type === "saida" ? "selected" : ""}>Saídas</option></select><select class="filter-select" id="movement-product"><option value="todos" ${movementFilters.productId === "todos" ? "selected" : ""}>Todos os alimentos</option>${schoolProducts.map((p) => `<option value="${p.id}" ${movementFilters.productId === p.id ? "selected" : ""}>${escapeHTML(p.name)}</option>`).join("")}</select><label class="filter-row"><span class="summary-label">De</span><input class="filter-select" type="date" id="movement-from" value="${movementFilters.from}"></label><label class="filter-row"><span class="summary-label">até</span><input class="filter-select" type="date" id="movement-to" value="${movementFilters.to}"></label></div><span class="summary-label">${movements.length} registros</span></div>${movementTable(movements)}</section>`;
}
function renderPurchases() {
  const forecast = forecastItems();
  const need = forecast.filter((item) => item.purchase > 0);
  const total = need.reduce((sum, item) => sum + item.purchase * Number(item.product.price || 0), 0);
  return `${pageHeading("PLANEJAMENTO INTELIGENTE", "O que preciso comprar?", "Uma previsão simples para planejar a merenda do próximo mês.", button("Exportar lista", "export-purchases", "secondary", "download"))}
    <div class="purchase-callout"><div><strong>Planeje o próximo mês com tranquilidade</strong><p>Estimativa baseada no consumo médio por aluno e nos dias letivos de ${new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1).toLocaleDateString("pt-BR", { month: "long" })}.</p></div><div class="purchase-total">${money(total)}<small>investimento estimado</small></div></div>
    <section class="panel"><div class="summary-strip"><div><div class="summary-label">Alimentos para repor</div><div class="summary-value">${need.length} itens</div></div><div><div class="summary-label">Consumo previsto no mês</div><div class="summary-value">${number(forecast.reduce((sum, item) => sum + item.expected, 0), 0)} un.</div></div><div><div class="summary-label">Dias letivos considerados</div><div class="summary-value">${currentSchool().schoolDays} dias</div></div></div>
    ${need.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>ALIMENTO</th><th>FORNECEDOR</th><th>CONSUMO PREVISTO</th><th>DISPONÍVEL</th><th>COMPRAR</th><th>VALOR ESTIMADO</th></tr></thead><tbody>${need.map(({ product, expected, available, purchase }) => `<tr><td>${escapeHTML(product.name)}<span class="table-sub">${escapeHTML(categoryName(product.categoryId))}</span></td><td>${escapeHTML(product.supplier || "A definir")}</td><td>${number(expected)} ${escapeHTML(product.unit)}</td><td>${number(available)} ${escapeHTML(product.unit)}</td><td><strong>${number(purchase)} ${escapeHTML(product.unit)}</strong></td><td>${money(purchase * Number(product.price || 0))}</td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-state"><strong>Estoque suficiente para o próximo mês!</strong>Não há sugestões de compra por enquanto.</div>`}</section>`;
}
function renderReports() {
  const products = productsForSchool();
  const alerts = alertItems(products);
  const expiring = products.filter((product) => {
    if (!product.expiration) return false;
    const left = (new Date(`${product.expiration}T00:00:00`) - new Date(`${isoDate(new Date())}T00:00:00`)) / 86400000;
    return left >= 0 && left <= Number(reportFilter);
  });
  const critical = products.filter((p) => p.stock < p.minimum || daysRemaining(p) < 7);
  return `${pageHeading("ACOMPANHAMENTO DA ESCOLA", "Relatórios", "Informações organizadas para decisões rápidas.", button("Exportar estoque", "export-stock", "secondary", "download"))}
    <div class="toolbar reports-toolbar"><div class="toolbar-left"><select class="filter-select" id="expiry-filter"><option value="7" ${reportFilter === "7" ? "selected" : ""}>Vencendo em 7 dias</option><option value="15" ${reportFilter === "15" ? "selected" : ""}>Vencendo em 15 dias</option><option value="30" ${reportFilter === "30" ? "selected" : ""}>Vencendo em 30 dias</option></select></div><div class="toolbar-right"><button class="secondary-button" data-action="export-movements">${icon("download")} Exportar movimentações</button></div></div>
    <div class="lower-grid">
      <section class="panel"><div class="panel-header"><div><h2>Produtos vencendo</h2><p>Validade nos próximos ${reportFilter} dias</p></div><span class="attention-total">${expiring.length}</span></div>${simpleProductTable(expiring, "Validade")}</section>
      <section class="panel"><div class="panel-header"><div><h2>Produtos críticos</h2><p>Abaixo do mínimo ou com menos de 7 dias</p></div><span class="attention-total">${critical.length}</span></div>${critical.length ? `<div class="product-list">${critical.map((p) => `<div class="product-row"><div><span class="product-name">${escapeHTML(p.name)}</span><span class="product-sub">${number(p.stock)} ${escapeHTML(p.unit)} · mínimo ${number(p.minimum)}</span></div><div class="days-left">${number(daysRemaining(p))}<span>dias</span></div></div>`).join("")}</div>` : `<div class="empty-state">Nenhum produto crítico.</div>`}</section>
    </div>
    <section class="panel section-spacer"><div class="panel-header"><div><h2>Consumo por alimento</h2><p>Estimativa diária, semanal e mensal</p></div></div>${consumptionReportTable(products)}</section>
    <section class="panel section-spacer"><div class="panel-header"><div><h2>Alertas automáticos</h2><p>Inclui estoque, validade e falta de movimentação</p></div><span class="attention-total">${alerts.length}</span></div>${alerts.length ? `<div class="product-list">${alerts.map((a) => `<div class="product-row"><div><span class="product-name">${escapeHTML(a.product.name)} · ${escapeHTML(a.label)}</span><span class="product-sub">${escapeHTML(a.detail)}</span></div><span class="badge ${a.tone === "red" ? "danger" : "warn"}">${a.tone === "red" ? "Atenção" : "Aviso"}</span></div>`).join("")}</div>` : `<div class="empty-state">Nenhum alerta por enquanto.</div>`}</section>`;
}
function simpleProductTable(products, finalHeading) {
  return products.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>ALIMENTO</th><th>QUANTIDADE</th><th>${finalHeading.toUpperCase()}</th></tr></thead><tbody>${products.map((p) => `<tr><td>${escapeHTML(p.name)}<span class="table-sub">${escapeHTML(categoryName(p.categoryId))}</span></td><td>${number(p.stock)} ${escapeHTML(p.unit)}</td><td>${dateLabel(p.expiration)}</td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-state">Nenhum alimento vencendo neste período.</div>`;
}
function consumptionReportTable(products) {
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>ALIMENTO</th><th>CONSUMO DIÁRIO</th><th>SEMANAL</th><th>MENSAL</th><th>ESTOQUE</th><th>DIAS RESTANTES</th></tr></thead><tbody>${products.map((p) => {
    const daily = dailyConsumption(p);
    return `<tr><td>${escapeHTML(p.name)}</td><td>${number(daily)} ${escapeHTML(p.unit)}</td><td>${number(daily * 5)} ${escapeHTML(p.unit)}</td><td>${number(daily * currentSchool().schoolDays)} ${escapeHTML(p.unit)}</td><td>${number(p.stock)} ${escapeHTML(p.unit)}</td><td>${Number.isFinite(daysRemaining(p)) ? `${number(daysRemaining(p))} dias` : "—"}</td></tr>`;
  }).join("")}</tbody></table></div>`;
}
function renderRegisters() {
  const school = currentSchool();
  const schoolProducts = productsForSchool();
  return `${pageHeading("CONFIGURAÇÕES", "Cadastros", "Mantenha os dados da escola e dos alimentos sempre atualizados.", button("Adicionar escola", "new-school"))}
    <div class="register-intro"><strong>Uma gestão mais simples começa com os dados certos.</strong><p>Cadastre suas escolas, organize as categorias e mantenha as informações dos alimentos atualizadas.</p></div>
    <div class="register-grid">
      <section class="panel register-card"><div class="panel-header"><div><h2>${escapeHTML(school.name)}</h2><p>Dados da escola selecionada</p></div><button class="text-link" data-action="edit-school" data-id="${school.id}">Editar escola</button></div><div class="register-list"><div class="register-item"><div><strong>Localização</strong><small>${escapeHTML(school.city)}, ${escapeHTML(school.state)}</small></div></div><div class="register-item"><div><strong>Quantidade de alunos</strong><small>${number(school.students, 0)} alunos · ${school.schoolDays} dias letivos/mês</small></div></div><div class="register-item"><div><strong>Responsável</strong><small>${escapeHTML(school.manager)}</small></div></div><div class="register-item"><div><strong>Alimentos cadastrados</strong><small>${schoolProducts.length} itens vinculados</small></div></div></div></section>
      <section class="panel register-card"><div class="panel-header"><div><h2>Escolas cadastradas</h2><p>${data.schools.length} unidades na sua gestão</p></div><button class="text-link" data-action="new-school">+ Adicionar</button></div><div class="register-list">${data.schools.map((item) => `<div class="register-item"><div><strong>${escapeHTML(item.name)}</strong><small>${escapeHTML(item.city)} · ${item.students} alunos</small></div><button data-action="select-school" data-id="${item.id}">Selecionar</button></div>`).join("")}</div></section>
      <section class="panel register-card"><div class="panel-header"><div><h2>Categorias de alimentos</h2><p>Organize os alimentos por tipo</p></div><button class="text-link" data-action="new-category">+ Categoria</button></div><div class="register-list">${data.categories.map((cat) => `<div class="register-item"><div><strong>${escapeHTML(cat.name)}</strong><small>${escapeHTML(cat.description || "Sem descrição")}</small></div><span class="summary-label">${data.products.filter((p) => p.categoryId === cat.id).length} alimentos</span></div>`).join("")}</div></section>
      <section class="panel register-card"><div class="panel-header"><div><h2>Unidades de medida</h2><p>Disponíveis nos cadastros de alimentos</p></div></div><div class="register-list">${["Kg", "Litro", "Unidade", "Pacote"].map((unit) => `<div class="register-item"><div><strong>${unit}</strong></div><span class="summary-label">${data.products.filter((p) => p.unit === unit).length} alimentos</span></div>`).join("")}</div></section>
      <section class="panel register-card"><div class="panel-header"><div><h2>Backup e restauração</h2><p>Guarde uma cópia ou restaure dados neste dispositivo</p></div></div><div class="register-list"><div class="register-item backup-item"><div><strong>Exportar dados</strong><small>Baixa todos os dados em um arquivo JSON</small></div><button class="secondary-button" type="button" data-action="export-backup">Baixar backup</button></div><div class="register-item backup-item"><div><strong>Importar dados</strong><small>Restaurar um arquivo de backup JSON</small></div><label class="secondary-button backup-upload-button">Selecionar arquivo<input id="backup-file" type="file" accept=".json,application/json" hidden></label></div></div></section>
    </div>`;
}

function preparationsForSchool(includeInactive = false) {
  return (data.preparations || []).filter((item) => item.schoolId === currentSchool()?.id && (includeInactive || item.active));
}
function menuPlansForMonth(month = menuMonth) {
  return (data.menuPlans || []).filter((item) => item.schoolId === currentSchool()?.id && item.date.startsWith(month))
    .sort((a, b) => a.date.localeCompare(b.date) || a.shift.localeCompare(b.shift));
}
function menuPeriod(month, period = "month") {
  const [year, monthNumber] = month.split("-").map(Number);
  if (period === "week") {
    const focus = new Date(`${menuFocusDate}T12:00:00`);
    const start = new Date(focus);
    start.setDate(start.getDate() - (start.getDay() + 6) % 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start: isoDate(start), end: isoDate(end), days: 7 };
  }
  const start = `${month}-01`;
  const end = isoDate(new Date(year, monthNumber, 0));
  return { start, end, days: new Date(year, monthNumber, 0).getDate() };
}
function convertIngredientQuantity(ingredient, product) {
  const quantity = Number(ingredient.quantity);
  if (ingredient.unit === product.unit) return quantity;
  const conversions = {
    Kg: { g: 0.001 },
    g: { Kg: 1000 },
    Litro: { mL: 0.001 },
    mL: { Litro: 1000 },
  };
  const factor = conversions[product.unit]?.[ingredient.unit];
  if (factor) return quantity * factor;
  throw new Error(`A unidade ${ingredient.unit} não é compatível com ${product.name} (${product.unit}).`);
}
function menuConsumption(month = menuMonth, period = "month") {
  const { start, end, days } = menuPeriod(month, period);
  const plans = (data.menuPlans || []).filter((item) => item.schoolId === currentSchool()?.id && item.date >= start && item.date <= end);
  const products = new Map(productsForSchool().map((product) => [product.id, product]));
  const totals = new Map();
  plans.forEach((plan) => {
    const preparation = (data.preparations || []).find((item) => item.id === plan.preparationId && item.schoolId === plan.schoolId);
    if (!preparation || !Number(preparation.servings)) return;
    preparation.ingredients.forEach((ingredient) => {
      const product = products.get(ingredient.productId);
      if (!product) return;
      const needed = convertIngredientQuantity(ingredient, product) * Number(currentSchool().students) / Number(preparation.servings);
      const row = totals.get(product.id) || { product, needed: 0 };
      row.needed += needed;
      totals.set(product.id, row);
    });
  });
  return [...totals.values()].map(({ product, needed }) => {
    const available = Number(product.stock || 0);
    const difference = available - needed;
    const coverageDays = needed > 0 ? available / (needed / days) : Infinity;
    const status = difference < -1e-9 ? "danger" : difference <= Number(product.minimum || 0) ? "warn" : "good";
    return { product, needed, available, difference, purchase: Math.max(0, -difference), coverageDays, status };
  }).sort((a, b) => a.status.localeCompare(b.status) || a.product.name.localeCompare(b.product.name));
}
function menuSectionNavigation() {
  const links = [
    ["planning", "Planejamento de Cardápio"],
    ["calendar", "Calendário Alimentar"],
    ["consumption", "Consumo Previsto"],
    ["purchases", "Necessidade de Compras"],
  ];
  return `<nav class="menu-section-nav" aria-label="Seções do Cardápio Escolar">${links.map(([section, label]) => `<button class="menu-section-link ${menuSection === section ? "active" : ""}" data-menu-section="${section}">${label}</button>`).join("")}</nav>`;
}
function menuStatus(status) {
  return `<span class="badge ${status}">${status === "good" ? "Estoque suficiente" : status === "warn" ? "Próximo do limite" : "Estoque insuficiente"}</span>`;
}
function renderMenu() {
  const monthLabel = new Date(`${menuMonth}-01T12:00:00`).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  const alerts = menuConsumption(menuMonth).filter((item) => item.status !== "good");
  let content = "";
  if (menuSection === "planning") content = renderMenuPlanning();
  else if (menuSection === "calendar") content = renderMenuCalendar();
  else if (menuSection === "consumption") content = renderMenuConsumption();
  else content = renderMenuPurchases();
  return `${pageHeading("PLANEJAMENTO ALIMENTAR", "Cardápio Escolar", `Planeje as refeições de ${monthLabel} e veja o impacto no estoque.`, "")}
    ${menuSectionNavigation()}
    <div class="menu-month-toolbar"><label for="menu-month">Período</label><input id="menu-month" type="month" value="${escapeHTML(menuMonth)}"><span>${menuPlansForMonth().length} refeições planejadas</span></div>
    ${alerts.length ? `<div class="menu-alert" role="status"><strong>Há ingredientes que precisam de atenção neste período.</strong><span>${alerts.map((item) => escapeHTML(item.product.name)).join(", ")}</span></div>` : ""}
    ${content}`;
}
function renderMenuPlanning() {
  const preparations = preparationsForSchool(true);
  return `<div class="menu-toolbar-actions">${button("Nova preparação", "new-preparation")} ${button("Planejar refeição", "new-menu-plan", "secondary", "calendar")}</div>
    <section class="panel section-spacer"><div class="panel-header"><div><h2>Preparações</h2><p>Receitas vinculadas aos alimentos cadastrados nesta escola.</p></div><span class="summary-label">${preparations.filter((item) => item.active).length} ativas</span></div>
      ${preparations.length ? `<div class="preparation-grid">${preparations.map((preparation) => `<article class="preparation-card"><div class="preparation-card-top"><div><h3>${escapeHTML(preparation.name)}</h3><span>${number(preparation.servings, 0)} porções por receita · ${preparation.active ? "Ativa" : "Inativa"}</span></div><button class="small-action" data-action="edit-preparation" data-id="${escapeHTML(preparation.id)}">Editar</button></div><p>${escapeHTML(preparation.description || "Sem descrição")}</p>${preparation.method ? `<details class="preparation-method"><summary>Modo de preparo</summary><p>${escapeHTML(preparation.method)}</p></details>` : ""}<div class="preparation-ingredients">${preparation.ingredients.map((ingredient) => {
        const product = productById(ingredient.productId);
        return `<span>${escapeHTML(product?.name || "Alimento removido")} · ${number(ingredient.quantity)} ${escapeHTML(ingredient.unit)}</span>`;
      }).join("")}</div></article>`).join("")}</div>` : `<div class="empty-state"><strong>Cadastre sua primeira preparação</strong>Inclua ingredientes usando os alimentos existentes no estoque.</div>`}
    </section>
    <section class="panel section-spacer"><div class="panel-header"><div><h2>Refeições planejadas</h2><p>As quantidades previstas são calculadas proporcionalmente ao número de alunos.</p></div><button class="text-link" data-menu-section="calendar">Abrir calendário →</button></div>${menuPlanList(menuPlansForMonth())}</section>`;
}
function renderMenuCalendar() {
  return `<div class="menu-calendar-toolbar"><div class="menu-view-switch" role="group" aria-label="Visualização do calendário">${[["month", "Mensal"], ["week", "Semanal"], ["list", "Lista"]].map(([view, label]) => `<button class="${menuView === view ? "active" : ""}" data-menu-view="${view}">${label}</button>`).join("")}</div>
    ${menuView === "week" ? `<div class="week-controls"><button class="secondary-button" data-action="menu-week-prev" aria-label="Semana anterior">←</button><input id="menu-focus-date" type="date" value="${escapeHTML(menuFocusDate)}"><button class="secondary-button" data-action="menu-week-next" aria-label="Próxima semana">→</button></div>` : ""}</div>
    <section class="panel calendar-panel">${menuView === "list" ? menuPlanList(menuPlansForMonth()) : renderMenuCalendarGrid()}</section>`;
}
function renderMenuCalendarGrid() {
  const weekdays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  let dates = [];
  if (menuView === "week") {
    const { start } = menuPeriod(menuMonth, "week");
    const first = new Date(`${start}T12:00:00`);
    dates = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(first);
      date.setDate(first.getDate() + index);
      return isoDate(date);
    });
  } else {
    const [year, month] = menuMonth.split("-").map(Number);
    const firstDay = new Date(year, month - 1, 1).getDay();
    const offset = (firstDay + 6) % 7;
    const dayCount = new Date(year, month, 0).getDate();
    dates = Array.from({ length: Math.ceil((dayCount + offset) / 7) * 7 }, (_, index) => {
      const date = new Date(year, month - 1, index - offset + 1);
      return isoDate(date);
    });
  }
  return `<div class="calendar-grid ${menuView === "week" ? "week-view" : ""}">${weekdays.map((day) => `<div class="calendar-weekday">${day}</div>`).join("")}${dates.map((date) => {
    const plans = (data.menuPlans || []).filter((item) => item.schoolId === currentSchool().id && item.date === date).sort((a, b) => a.shift.localeCompare(b.shift));
    const isCurrentMonth = date.startsWith(menuMonth);
    return `<article class="calendar-day ${isCurrentMonth ? "" : "outside-month"}"><div class="calendar-day-heading"><strong>${Number(date.slice(-2))}</strong><button class="calendar-add" data-action="new-menu-plan" data-date="${date}" aria-label="Planejar refeição em ${dateLabel(date)}">+</button></div>${plans.map((plan) => {
      const preparation = (data.preparations || []).find((item) => item.id === plan.preparationId);
      return `<button class="calendar-meal" data-action="edit-menu-plan" data-id="${escapeHTML(plan.id)}"><small>${escapeHTML(plan.shift)}</small><strong>${escapeHTML(preparation?.name || "Preparação removida")}</strong></button>`;
    }).join("")}</article>`;
  }).join("")}</div>`;
}
function menuPlanList(plans) {
  if (!plans.length) return `<div class="empty-state"><strong>Nenhuma refeição planejada</strong>Use “Planejar refeição” para adicionar uma preparação ao calendário.</div>`;
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>DATA</th><th>TURNO</th><th>PREPARAÇÃO</th><th>INGREDIENTES</th><th></th></tr></thead><tbody>${plans.map((plan) => {
    const preparation = (data.preparations || []).find((item) => item.id === plan.preparationId);
    return `<tr><td>${dateLabel(plan.date)}</td><td>${escapeHTML(plan.shift)}</td><td>${escapeHTML(preparation?.name || "Preparação removida")}</td><td>${preparation?.ingredients.length || 0} ingredientes</td><td><div class="row-actions"><button class="small-action" data-action="edit-menu-plan" data-id="${escapeHTML(plan.id)}">Editar</button><button class="small-action" data-action="delete-menu-plan" data-id="${escapeHTML(plan.id)}">Remover</button></div></td></tr>`;
  }).join("")}</tbody></table></div>`;
}
function renderMenuConsumption() {
  const period = document.getElementById("menu-consumption-period")?.value || "month";
  const { start, end } = menuPeriod(menuMonth, period);
  const plans = (data.menuPlans || []).filter((item) => item.schoolId === currentSchool().id && item.date >= start && item.date <= end);
  const rows = menuConsumption(menuMonth, period);
  return `<section class="panel"><div class="panel-header"><div><h2>Consumo previsto</h2><p>Estimativa proporcional às porções das receitas e aos ${number(currentSchool().students, 0)} alunos.</p></div><select class="filter-select" id="menu-consumption-period"><option value="month" ${period === "month" ? "selected" : ""}>Mês</option><option value="week" ${period === "week" ? "selected" : ""}>Semana de ${dateLabel(menuFocusDate)}</option></select></div>
    <div class="summary-strip"><div><div class="summary-label">Refeições no período</div><div class="summary-value">${plans.length}</div></div><div><div class="summary-label">Preparações utilizadas</div><div class="summary-value">${new Set(plans.map((item) => item.preparationId)).size}</div></div><div><div class="summary-label">Ingredientes previstos</div><div class="summary-value">${rows.length} alimentos</div></div></div>
    ${menuConsumptionTable(rows)}</section>`;
}
function menuConsumptionTable(rows) {
  if (!rows.length) return `<div class="empty-state"><strong>Sem consumo previsto</strong>Planeje refeições para calcular os ingredientes necessários.</div>`;
  return `<div class="table-wrap"><table class="data-table"><thead><tr><th>ALIMENTO</th><th>NECESSIDADE PREVISTA</th><th>ESTOQUE ATUAL</th><th>SALDO APÓS CARDÁPIO</th><th>DIAS DE COBERTURA</th><th>STATUS</th></tr></thead><tbody>${rows.map(({ product, needed, available, difference, coverageDays, status }) => `<tr><td>${escapeHTML(product.name)}<span class="table-sub">${escapeHTML(categoryName(product.categoryId))}</span></td><td>${number(needed)} ${escapeHTML(product.unit)}</td><td>${number(available)} ${escapeHTML(product.unit)}</td><td class="${difference < 0 ? "menu-negative" : ""}">${number(difference)} ${escapeHTML(product.unit)}</td><td>${Number.isFinite(coverageDays) ? `${number(coverageDays)} dias` : "—"}</td><td>${menuStatus(status)}</td></tr>`).join("")}</tbody></table></div>`;
}
function renderMenuPurchases() {
  const rows = menuConsumption(menuMonth);
  const needs = rows.filter((item) => item.purchase > 0);
  return `<div class="purchase-callout"><div><strong>Compras para cumprir o cardápio de ${new Date(`${menuMonth}-01T12:00:00`).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}</strong><p>Estimativa calculada com as preparações planejadas e o estoque atual.</p></div><div class="purchase-total">${needs.length}<small>alimentos para comprar</small></div></div>
    <section class="panel"><div class="summary-strip"><div><div class="summary-label">Itens suficientes</div><div class="summary-value">${rows.filter((item) => item.status === "good").length}</div></div><div><div class="summary-label">Próximos do limite</div><div class="summary-value">${rows.filter((item) => item.status === "warn").length}</div></div><div><div class="summary-label">Insuficientes</div><div class="summary-value">${needs.length}</div></div></div>
    ${needs.length ? `<div class="table-wrap"><table class="data-table"><thead><tr><th>ALIMENTO</th><th>ESTOQUE ATUAL</th><th>NECESSIDADE DO PERÍODO</th><th>QUANTIDADE A COMPRAR</th></tr></thead><tbody>${needs.map(({ product, available, needed, purchase }) => `<tr><td>${escapeHTML(product.name)}<span class="table-sub">${escapeHTML(product.supplier || "Fornecedor não informado")}</span></td><td>${number(available)} ${escapeHTML(product.unit)}</td><td>${number(needed)} ${escapeHTML(product.unit)}</td><td><strong>${number(purchase)} ${escapeHTML(product.unit)}</strong></td></tr>`).join("")}</tbody></table></div>` : `<div class="empty-state"><strong>O estoque cobre o cardápio planejado.</strong>Não há compras previstas para este período.</div>`}</section>`;
}

function field(label, name, value = "", type = "text", options = null, required = false, extra = "") {
  const requiredAttr = required ? "required" : "";
  let control;
  if (options) control = `<select name="${name}" ${requiredAttr}>${options.map((option) => `<option value="${escapeHTML(option.value)}" ${String(option.value) === String(value) ? "selected" : ""}>${escapeHTML(option.label)}</option>`).join("")}</select>`;
  else control = `<input name="${name}" type="${type}" value="${escapeHTML(value)}" ${requiredAttr} ${extra}>`;
  return `<div class="form-field"><label>${label}${required ? " *" : ""}</label>${control}</div>`;
}
function openModal(title, subtitle, body, onSubmit, submitLabel = "Salvar") {
  const root = document.getElementById("modal-root");
  root.innerHTML = `<div class="modal-backdrop"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><div class="modal-header"><div><h2 id="modal-title">${title}</h2><p>${subtitle}</p></div><button class="modal-close" type="button" aria-label="Fechar">×</button></div><form id="modal-form">${body}<div class="modal-footer"><button class="secondary-button" type="button" data-close-modal>Cancelar</button><button class="primary-button" type="submit">${submitLabel}</button></div></form></section></div>`;
  root.querySelector(".modal-close").addEventListener("click", closeModal);
  root.querySelector("[data-close-modal]").addEventListener("click", closeModal);
  root.querySelector(".modal-backdrop").addEventListener("click", (event) => { if (event.target.classList.contains("modal-backdrop")) closeModal(); });
  root.querySelector("#modal-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget).entries());
    formData.active = Boolean(event.currentTarget.querySelector('[name="active"]')?.checked);
    formData.ingredients = [...event.currentTarget.querySelectorAll(".ingredient-row")].map((row) => ({
      productId: row.querySelector("[data-ingredient-product]").value,
      quantity: row.querySelector("[data-ingredient-quantity]").value,
      unit: row.querySelector("[data-ingredient-unit]").value,
    }));
    onSubmit(formData);
  });
  root.querySelector("input, select, textarea")?.focus();
}
function closeModal() { document.getElementById("modal-root").innerHTML = ""; }
function ingredientUnitOptions(product) {
  const units = [product.unit];
  if (product.unit === "Kg") units.push("g");
  if (product.unit === "Litro") units.push("mL");
  return units;
}
function ingredientRow(ingredient = {}) {
  const products = productsForSchool();
  const product = products.find((item) => item.id === ingredient.productId) || products[0];
  if (!product) return "";
  const units = ingredientUnitOptions(product);
  const selectedUnit = units.includes(ingredient.unit) ? ingredient.unit : product.unit;
  return `<div class="ingredient-row"><select aria-label="Alimento" data-ingredient-product>${products.map((item) => `<option value="${escapeHTML(item.id)}" ${item.id === product.id ? "selected" : ""}>${escapeHTML(item.name)} (${escapeHTML(item.unit)})</option>`).join("")}</select><input aria-label="Quantidade" data-ingredient-quantity type="number" min="0.001" step="0.001" value="${escapeHTML(ingredient.quantity ?? "")}" placeholder="Quantidade" required><select aria-label="Unidade" data-ingredient-unit>${units.map((unit) => `<option value="${escapeHTML(unit)}" ${unit === selectedUnit ? "selected" : ""}>${escapeHTML(unit)}</option>`).join("")}</select><button class="small-action" type="button" data-action="remove-ingredient" aria-label="Remover ingrediente">Remover</button></div>`;
}
function newPreparation(preparation = null) {
  const products = productsForSchool();
  if (!products.length) {
    showToast("Cadastre alimentos nesta escola antes de criar uma preparação.", true);
    return;
  }
  const ingredients = preparation?.ingredients?.length ? preparation.ingredients : [{}];
  const body = `<div class="form-grid">${field("Nome da preparação", "name", preparation?.name || "", "text", null, true)}${field("Porções produzidas", "servings", preparation?.servings ?? "", "number", null, true, 'min="1" step="1"')}
    <div class="form-field full"><label>Descrição</label><textarea name="description" placeholder="Descreva a preparação">${escapeHTML(preparation?.description || "")}</textarea></div>
    <div class="form-field full"><label>Modo de preparo</label><textarea name="method" placeholder="Informe o modo de preparo">${escapeHTML(preparation?.method || "")}</textarea></div>
    <div class="form-field full"><div class="ingredient-heading"><label>Ingredientes</label><button class="text-link" type="button" data-action="add-ingredient">+ Adicionar ingrediente</button></div><div class="ingredient-rows">${ingredients.map((item) => ingredientRow(item)).join("")}</div></div>
    <label class="preparation-active"><input type="checkbox" name="active" ${preparation?.active === false ? "" : "checked"}> Preparação ativa</label></div>`;
  openModal(preparation ? "Editar preparação" : "Nova preparação", "Os ingredientes precisam usar alimentos já cadastrados nesta escola.", body, (values) => {
    if (!values.ingredients.length || values.ingredients.some((item) => !item.productId || !Number.isFinite(Number(item.quantity)) || Number(item.quantity) <= 0)) {
      showToast("Adicione ao menos um ingrediente com quantidade válida.", true);
      return;
    }
    try {
      values.ingredients.forEach((ingredient) => convertIngredientQuantity(ingredient, productById(ingredient.productId)));
    } catch (error) {
      showToast(error.message, true);
      return;
    }
    const normalized = {
      id: preparation?.id || crypto.randomUUID(),
      schoolId: currentSchool().id,
      name: values.name.trim(),
      description: values.description.trim(),
      method: values.method.trim(),
      servings: Number(values.servings),
      active: values.active,
      ingredients: values.ingredients.map((item) => ({ productId: item.productId, quantity: Number(item.quantity), unit: item.unit })),
    };
    if (preparation) Object.assign(preparation, normalized);
    else (data.preparations ||= []).push(normalized);
    saveData();
    closeModal();
    render();
    showToast(preparation ? "Preparação atualizada." : "Preparação cadastrada.");
  });
  const root = document.getElementById("modal-root");
  root.addEventListener("click", (event) => {
    const action = event.target.closest("[data-action]")?.dataset.action;
    if (action === "add-ingredient") {
      root.querySelector(".ingredient-rows").insertAdjacentHTML("beforeend", ingredientRow());
    } else if (action === "remove-ingredient") {
      const rows = root.querySelectorAll(".ingredient-row");
      if (rows.length === 1) showToast("A preparação precisa ter ao menos um ingrediente.", true);
      else event.target.closest(".ingredient-row").remove();
    }
  });
  root.addEventListener("change", (event) => {
    if (!event.target.matches("[data-ingredient-product]")) return;
    const row = event.target.closest(".ingredient-row");
    const product = productById(event.target.value);
    row.querySelector("[data-ingredient-unit]").innerHTML = ingredientUnitOptions(product).map((unit) => `<option value="${escapeHTML(unit)}">${escapeHTML(unit)}</option>`).join("");
  });
}
function newMenuPlan(plan = null, date = menuFocusDate) {
  const preparations = preparationsForSchool();
  if (!preparations.length) {
    showToast("Cadastre uma preparação ativa antes de planejar uma refeição.", true);
    menuSection = "planning";
    render();
    return;
  }
  const shifts = ["Manhã", "Tarde", "Integral"].map((item) => ({ value: item, label: item }));
  const body = `<div class="form-grid">${field("Data", "date", plan?.date || date, "date", null, true)}${field("Turno", "shift", plan?.shift || "Manhã", "select", shifts, true)}${field("Preparação", "preparationId", plan?.preparationId || preparations[0].id, "select", preparations.map((item) => ({ value: item.id, label: item.name })), true)}</div>`;
  openModal(plan ? "Editar refeição" : "Planejar refeição", "A previsão considera uma porção para cada aluno da escola.", body, (values) => {
    const duplicate = (data.menuPlans || []).find((item) => item.schoolId === currentSchool().id && item.date === values.date && item.shift === values.shift && item.id !== plan?.id);
    if (duplicate) {
      showToast("Já existe uma refeição planejada para esta data e turno.", true);
      return;
    }
    const normalized = { id: plan?.id || crypto.randomUUID(), schoolId: currentSchool().id, date: values.date, shift: values.shift, preparationId: values.preparationId };
    if (plan) Object.assign(plan, normalized);
    else (data.menuPlans ||= []).push(normalized);
    menuFocusDate = values.date;
    menuMonth = values.date.slice(0, 7);
    saveData();
    closeModal();
    render();
    showToast("Planejamento atualizado; o consumo previsto foi recalculado.");
  });
}
function newProduct(product = null) {
  const editing = Boolean(product);
  const categories = data.categories.map((cat) => ({ value: cat.id, label: cat.name }));
  const schools = data.schools.map((school) => ({ value: school.id, label: school.name }));
  const body = `<div class="form-grid">${field("Nome do alimento", "name", product?.name || "", "text", null, true)}${field("Categoria", "categoryId", product?.categoryId || data.categories[0]?.id, "select", categories, true)}${field("Unidade de medida", "unit", product?.unit || "Kg", "select", ["Kg", "Litro", "Unidade", "Pacote"].map((v) => ({ value: v, label: v })), true)}${field("Estoque mínimo", "minimum", product?.minimum ?? "", "number", null, true, 'min="0" step="0.01"')}${field("Consumo por aluno / dia", "consumptionPerStudent", product?.consumptionPerStudent ?? "", "number", null, true, 'min="0" step="0.001"')}${field("Data de validade", "expiration", product?.expiration || "", "date")}${field("Fornecedor", "supplier", product?.supplier || "")}${field("Escola", "schoolId", product?.schoolId || currentSchool().id, "select", schools, true)}${field("Quantidade atual", "stock", product?.stock ?? 0, "number", null, true, 'min="0" step="0.01"')}${field("Valor unitário (R$)", "price", product?.price ?? "", "number", null, false, 'min="0" step="0.01"')}</div>`;
  openModal(editing ? "Editar alimento" : "Adicionar alimento", "Preencha os dados para acompanhar este alimento.", body, (values) => {
    const normalized = { ...values, minimum: Number(values.minimum), consumptionPerStudent: Number(values.consumptionPerStudent), stock: Number(values.stock), price: Number(values.price || 0) };
    if (editing) Object.assign(product, normalized);
    else data.products.push({ ...normalized, id: crypto.randomUUID(), createdAt: isoDate(new Date()) });
    saveData(); closeModal(); render(); showToast(editing ? "Alimento atualizado com sucesso." : "Alimento cadastrado com sucesso.");
  });
}
function newMovement(type, productId = "") {
  const schoolProducts = productsForSchool();
  if (!schoolProducts.length) { showToast("Cadastre um alimento antes de registrar uma movimentação.", true); return; }
  const title = type === "entrada" ? "Registrar entrada" : "Registrar saída";
  const productOptions = schoolProducts.map((p) => ({ value: p.id, label: `${p.name} (${number(p.stock)} ${p.unit})` }));
  const body = `<div class="form-grid">${field("Data", "date", isoDate(new Date()), "date", null, true)}${field("Alimento", "productId", productId || schoolProducts[0].id, "select", productOptions, true)}${field("Quantidade", "quantity", "", "number", null, true, 'min="0.01" step="0.01"')}${type === "entrada" ? field("Valor unitário (R$)", "unitPrice", "", "number", null, false, 'min="0" step="0.01"') : field("Motivo", "reason", "Preparo das refeições", "select", ["Preparo das refeições", "Ajuste de estoque", "Perda ou descarte", "Transferência", "Outro"].map((v) => ({ value: v, label: v })), true)}${type === "entrada" ? field("Fornecedor", "supplier", "") : ""}<div class="form-field full"><label>Observação</label><textarea name="note" placeholder="Adicione um detalhe, se necessário"></textarea></div></div>`;
  openModal(title, "O saldo do alimento será atualizado automaticamente.", body, (values) => {
    const quantity = Number(values.quantity);
    const product = productById(values.productId);
    if (!product || !Number.isFinite(quantity) || quantity <= 0) { showToast("Informe um alimento e uma quantidade válida.", true); return; }
    if (type === "saida" && quantity > Number(product.stock)) { showToast(`Saldo insuficiente. Disponível: ${number(product.stock)} ${product.unit}.`, true); return; }
    product.stock = Number(product.stock) + (type === "entrada" ? quantity : -quantity);
    if (type === "entrada" && values.unitPrice) product.price = Number(values.unitPrice);
    data.movements.push({ ...values, id: crypto.randomUUID(), type, quantity, unitPrice: Number(values.unitPrice || 0) });
    saveData(); closeModal(); render(); showToast(`${type === "entrada" ? "Entrada" : "Saída"} registrada e estoque atualizado.`);
  });
}
function chooseMovementType(productId = "") {
  const options = [
    { value: "entrada", label: "Entrada" },
    { value: "saida", label: "Saída" },
  ];
  openModal("Nova movimentação", "Escolha o tipo de movimentação que deseja registrar.", `<div class="form-grid">${field("Tipo", "type", "entrada", "select", options, true)}</div>`, (values) => {
    closeModal();
    newMovement(values.type, productId);
  }, "Continuar");
}
function newSchool(school = null) {
  const body = `<div class="form-grid">${field("Nome da escola", "name", school?.name || "", "text", null, true)}${field("Cidade", "city", school?.city || "", "text", null, true)}${field("Estado (UF)", "state", school?.state || "", "text", null, true, 'maxlength="2"')}${field("Quantidade de alunos", "students", school?.students ?? "", "number", null, true, 'min="1" step="1"')}${field("Dias letivos por mês", "schoolDays", school?.schoolDays ?? 22, "number", null, true, 'min="1" max="31" step="1"')}${field("Responsável", "manager", school?.manager || "", "text", null, true)}</div>`;
  openModal(school ? "Editar escola" : "Adicionar escola", "Os dados são usados para calcular o consumo e os dias restantes.", body, (values) => {
    const normalized = { ...values, state: values.state.toUpperCase(), students: Number(values.students), schoolDays: Number(values.schoolDays) };
    if (school) Object.assign(school, normalized);
    else { const created = { ...normalized, id: crypto.randomUUID() }; data.schools.push(created); data.selectedSchoolId = created.id; }
    saveData(); closeModal(); render(); showToast(school ? "Dados da escola atualizados." : "Escola cadastrada com sucesso.");
  });
}
function newCategory() {
  const body = `<div class="form-grid">${field("Nome da categoria", "name", "", "text", null, true)}<div class="form-field full"><label>Descrição</label><textarea name="description" placeholder="Descreva os alimentos desta categoria"></textarea></div></div>`;
  openModal("Nova categoria", "Organize seus alimentos em categorias.", body, (values) => {
    data.categories.push({ ...values, id: crypto.randomUUID() });
    saveData(); closeModal(); render(); showToast("Categoria cadastrada com sucesso.");
  });
}
function showToast(message, error = false) {
  const root = document.getElementById("toast-root");
  const toast = document.createElement("div");
  toast.className = `toast${error ? " error" : ""}`;
  toast.textContent = message;
  root.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3500);
}
function downloadCSV(filename, rows) {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`).join(";")).join("\n");
  const url = URL.createObjectURL(new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url; link.download = filename; link.click();
  URL.revokeObjectURL(url);
  showToast("Arquivo exportado com sucesso.");
}
function exportStock() {
  downloadCSV("estoque-merenda-facil.csv", [["Alimento", "Categoria", "Quantidade", "Unidade", "Dias restantes", "Status"], ...productsForSchool().map((p) => [p.name, categoryName(p.categoryId), number(p.stock), p.unit, Number.isFinite(daysRemaining(p)) ? number(daysRemaining(p)) : "—", productStatus(p).label])]);
}
function exportPurchases() {
  downloadCSV("compras-proximo-mes.csv", [["Alimento", "Fornecedor", "Consumo previsto", "Disponível", "Quantidade para comprar", "Valor estimado"], ...forecastItems().filter((item) => item.purchase > 0).map(({ product, expected, available, purchase }) => [product.name, product.supplier, number(expected), number(available), number(purchase), money(purchase * Number(product.price || 0))])]);
}
function exportMovements() {
  const ids = new Set(productsForSchool().map((p) => p.id));
  downloadCSV("movimentacoes-merenda-facil.csv", [["Data", "Alimento", "Categoria", "Tipo", "Quantidade", "Motivo", "Fornecedor", "Observação"], ...data.movements.filter((m) => ids.has(m.productId)).map((m) => [dateLabel(m.date), productById(m.productId)?.name, categoryName(productById(m.productId)?.categoryId), m.type, number(m.quantity), m.reason, m.supplier, m.note])]);
}
function exportBackup() {
  const backup = localStorage.getItem(STORAGE_KEY);
  let content = data;
  if (backup) {
    try {
      content = JSON.parse(backup);
    } catch (error) {
      content = data;
    }
  }
  const blob = new Blob([JSON.stringify(content, null, 2)], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `merenda-facil-backup-${isoDate(new Date())}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Backup JSON exportado com sucesso.");
}
function importBackup(file) {
  if (!file) return;
  if (!file.name.toLowerCase().endsWith(".json") && file.type !== "application/json") {
    showToast("Selecione um arquivo JSON válido.", true);
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    let imported;
    try {
      imported = JSON.parse(String(reader.result));
    } catch (error) {
      showToast("Arquivo inválido ou JSON corrompido.", true);
      return;
    }
    if (!imported || typeof imported !== "object" || Array.isArray(imported)
      || !Array.isArray(imported.schools)
      || !Array.isArray(imported.categories)
      || !Array.isArray(imported.products)
      || !Array.isArray(imported.movements)) {
      showToast("Estrutura incompatível. O backup deve conter escolas, categorias, alimentos e movimentações.", true);
      return;
    }
    if (!window.confirm("ATENÇÃO: A importação substituirá todos os dados atuais. Deseja continuar?")) return;
    const normalized = normalizeSavedData(imported);
    if (!normalized.schools.length) {
      showToast("O backup não contém uma escola válida.", true);
      return;
    }
    data = normalized;
    saveData(data);
    setSchoolOptions();
    activePage = "registers";
    render();
    showToast("Backup importado e dados atualizados.");
  };
  reader.onerror = () => showToast("Não foi possível ler o arquivo de backup.", true);
  reader.onabort = () => showToast("A leitura do arquivo foi interrompida.", true);
  reader.readAsText(file);
}

document.addEventListener("click", (event) => {
  const menuSectionButton = event.target.closest("[data-menu-section]");
  if (menuSectionButton) {
    menuSection = menuSectionButton.dataset.menuSection;
    activePage = "menu";
    render();
    return;
  }
  const menuViewButton = event.target.closest("[data-menu-view]");
  if (menuViewButton) {
    menuView = menuViewButton.dataset.menuView;
    render();
    return;
  }
  const nav = event.target.closest("[data-page]");
  const mobileNav = event.target.closest(".mobile-tab[data-page]");
  if (nav || mobileNav) {
    activePage = (nav || mobileNav).dataset.page;
    searchTerm = "";
    render();
    return;
  }
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const { action, id, product } = target.dataset;
  if (action === "new-product") newProduct();
  else if (action === "edit-product") newProduct(productById(id));
  else if (action === "new-movement") chooseMovementType(product || "");
  else if (action === "new-entry") newMovement("entrada");
  else if (action === "new-exit") newMovement("saida");
  else if (action === "new-school") newSchool();
  else if (action === "edit-school") newSchool(data.schools.find((s) => s.id === id));
  else if (action === "new-category") newCategory();
  else if (action === "new-preparation") newPreparation();
  else if (action === "edit-preparation") newPreparation((data.preparations || []).find((item) => item.id === id));
  else if (action === "new-menu-plan") newMenuPlan(null, target.dataset.date || menuFocusDate);
  else if (action === "edit-menu-plan") newMenuPlan((data.menuPlans || []).find((item) => item.id === id));
  else if (action === "delete-menu-plan") {
    if (!window.confirm("Remover esta refeição do planejamento?")) return;
    data.menuPlans = data.menuPlans.filter((item) => item.id !== id);
    saveData(); render(); showToast("Refeição removida; o consumo previsto foi recalculado.");
  }
  else if (action === "menu-week-prev" || action === "menu-week-next") {
    const date = new Date(`${menuFocusDate}T12:00:00`);
    date.setDate(date.getDate() + (action === "menu-week-prev" ? -7 : 7));
    menuFocusDate = isoDate(date);
    menuMonth = menuFocusDate.slice(0, 7);
    render();
  }
  else if (action === "select-school") { data.selectedSchoolId = id; saveData(); render(); }
  else if (action === "export-stock") exportStock();
  else if (action === "export-purchases") exportPurchases();
  else if (action === "export-movements") exportMovements();
  else if (action === "export-backup") exportBackup();
  else if (action === "delete-movement") {
    const movement = data.movements.find((item) => item.id === id);
    if (!movement || !window.confirm("Excluir esta movimentação e reverter seu efeito no estoque?")) return;
    const item = productById(movement.productId);
    if (item) item.stock = Number(item.stock) + (movement.type === "entrada" ? -Number(movement.quantity) : Number(movement.quantity));
    data.movements = data.movements.filter((item) => item.id !== id);
    saveData(); render(); showToast("Movimentação excluída e estoque corrigido.");
  }
});
document.getElementById("school-select").addEventListener("change", (event) => {
  data.selectedSchoolId = event.target.value;
  saveData(); render();
});
document.getElementById("notification-button").addEventListener("click", () => { activePage = "reports"; render(); });
document.getElementById("page-content").addEventListener("input", (event) => {
  if (event.target.id === "inventory-search") {
    const position = event.target.selectionStart;
    searchTerm = event.target.value;
    render();
    const input = document.getElementById("inventory-search");
    input.focus(); input.setSelectionRange(position, position);
  }
});
document.getElementById("page-content").addEventListener("change", (event) => {
  if (event.target.id === "backup-file") {
    importBackup(event.target.files?.[0]);
    event.target.value = "";
  }
  if (event.target.id === "menu-month") {
    menuMonth = event.target.value;
    menuFocusDate = `${menuMonth}-01`;
    render();
  }
  if (event.target.id === "menu-focus-date") {
    menuFocusDate = event.target.value;
    menuMonth = menuFocusDate.slice(0, 7);
    render();
  }
  if (event.target.id === "menu-consumption-period") render();
  if (event.target.id === "category-filter") {
    categoryFilter = event.target.value;
    render();
  }
  if (event.target.id === "expiry-filter") { reportFilter = event.target.value; render(); }
  if (event.target.id === "movement-type") { movementFilters.type = event.target.value; render(); }
  if (event.target.id === "movement-product") { movementFilters.productId = event.target.value; render(); }
  if (event.target.id === "movement-from") { movementFilters.from = event.target.value; render(); }
  if (event.target.id === "movement-to") { movementFilters.to = event.target.value; render(); }
});

document.querySelectorAll("[data-icon]").forEach((node) => {
  const name = node.dataset.icon;
  if (name) node.innerHTML = icon(name);
});
render();
