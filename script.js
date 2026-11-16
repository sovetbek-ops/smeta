"use strict";

const items = document.querySelector("#items");
const template = document.querySelector("#item-template");
const totalOutput = document.querySelector("#total");
const addButton = document.querySelector("#add-item");
const discountInput = document.querySelector("#discount");
const vatInput = document.querySelector("#vat");
const currencySelect = document.querySelector("#currency");
const moneyFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });
let nextId = 0;
const storageKey = "smeta-draft-v1";
const saveStatus = document.querySelector("#save-status");
const draftFields = {
  sender: document.querySelector('[name="sender"]'),
  recipient: document.querySelector('[name="recipient"]'),
  number: document.querySelector('[name="estimate-number"]'),
  date: document.querySelector("#estimate-date"),
  discount: discountInput,
  vat: vatInput,
  currency: currencySelect,
  comment: document.querySelector("#comment")
};
const rowFields = ["name", "quantity", "unit", "price"];
let restoringDraft = true;
let copyStatusTimer;

// Accept decimal commas and grouped thousands, but never partial numbers like "15abc".
function readNumber(value) {
  const normalized = value.trim().replace(/[ \u00a0\u202f]/g, "").replace(",", ".");
  if (!/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(normalized)) return 0;
  const number = Number(normalized);
  return Number.isFinite(number) ? number : 0;
}

function formatMoney(value, currency = currencySelect.value) {
  const safeValue = Number.isFinite(value) ? value : 0;
  return `${moneyFormatter.format(safeValue).replace(/[\u00a0\u202f]/g, " ")} ${currency}`;
}

function roundMoney(value) {
  return Number.isFinite(value) ? Math.round(value) : 0;
}

function updateSummary(outputId, rowId, amount) {
  document.querySelector(outputId).textContent = formatMoney(amount);
  document.querySelector(rowId).hidden = amount === 0;
}

function recalculate() {
  let total = 0;
  for (const row of items.rows) {
    const quantity = readNumber(row.querySelector('[data-field="quantity"]').value);
    const price = readNumber(row.querySelector('[data-field="price"]').value);
    const product = quantity * price;
    // Round every monetary step to whole units so displayed amounts add up.
    const amount = roundMoney(product);
    row.querySelector('[data-field="amount"]').textContent = formatMoney(amount);
    total += amount;
  }
  const subtotal = roundMoney(total);
  const discount = roundMoney(subtotal * (readNumber(discountInput.value) / 100));
  const discounted = roundMoney(subtotal - discount);
  const vat = roundMoney(discounted * (readNumber(vatInput.value) / 100));
  document.querySelector("#subtotal").textContent = formatMoney(subtotal);
  updateSummary("#discount-amount", "#discount-row", discount);
  updateSummary("#discounted-amount", "#discounted-row", discounted);
  updateSummary("#vat-amount", "#vat-row", vat);
  totalOutput.textContent = formatMoney(roundMoney(discounted + vat));
  for (const symbol of document.querySelectorAll("[data-currency]")) {
    symbol.textContent = currencySelect.value;
  }
  return roundMoney(discounted + vat);
}

function addItem(focus = true, values = null, afterRow = null) {
  const row = template.content.firstElementChild.cloneNode(true);
  const id = ++nextId;
  for (const label of row.querySelectorAll("label[data-label]")) {
    const field = label.dataset.label;
    const input = row.querySelector(`[data-field="${field}"]`);
    input.id = `item-${id}-${field}`;
    label.htmlFor = input.id;
  }
  if (values) {
    for (const field of rowFields) row.querySelector(`[data-field="${field}"]`).value = values[field];
  }
  items.insertBefore(row, afterRow ? afterRow.nextElementSibling : null);
  recalculate();
  saveDraft();
  if (focus) row.querySelector('[data-field="name"]').focus();
  return row;
}

addButton.addEventListener("click", () => addItem());
discountInput.addEventListener("input", recalculate);
vatInput.addEventListener("input", recalculate);
currencySelect.addEventListener("change", recalculate);
items.addEventListener("input", recalculate);
items.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const row = button.closest("tr");
  if (button.dataset.action === "duplicate") {
    const values = Object.fromEntries(rowFields.map(field =>
      [field, row.querySelector(`[data-field="${field}"]`).value]));
    addItem(true, values, row);
    return;
  }
  if (button.dataset.action !== "remove") return;
  const nextRow = row.nextElementSibling || row.previousElementSibling;
  row.remove();
  recalculate();
  saveDraft();
  if (nextRow) nextRow.querySelector('[data-field="name"]').focus();
  else addButton.focus();
});

items.addEventListener("keydown", (event) => {
  // Preserve Enter on buttons and selects for their native keyboard actions.
  if (event.key === "Enter" && !event.isComposing && event.target.matches("input") &&
      event.target.closest("tr") === items.lastElementChild) {
    event.preventDefault();
    addItem();
  }
});

function todayValue() {
  const today = new Date();
  return [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")].join("-");
}

function collectDraft() {
  return {
    version: 1,
    fields: Object.fromEntries(Object.entries(draftFields).map(([key, field]) => [key, field.value])),
    items: Array.from(items.rows, row => Object.fromEntries(rowFields.map(key =>
      [key, row.querySelector(`[data-field="${key}"]`).value])))
  };
}

function isValidDraft(draft) {
  return Boolean(draft && draft.version === 1 && draft.fields && Array.isArray(draft.items) &&
    Object.keys(draftFields).every(key => typeof draft.fields[key] === "string") &&
    ["₸", "₽", "$", "€"].includes(draft.fields.currency) &&
    draft.items.every(row => row && rowFields.every(key => typeof row[key] === "string") &&
      ["шт", "час", "услуга"].includes(row.unit)));
}

function saveDraft() {
  if (restoringDraft) return;
  const draft = collectDraft();
  const status = document.querySelector("#storage-status");
  try {
    localStorage.setItem(storageKey, JSON.stringify(draft));
    status.hidden = true;
    saveStatus.textContent = "Изменения сохранены";
  } catch {
    saveStatus.textContent = "Не удалось сохранить изменения";
    status.textContent = "Не удалось сохранить черновик. Проверьте, разрешено ли браузеру локальное хранение данных.";
    status.hidden = false;
  }
}

function restoreDraft() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return false;
    const draft = JSON.parse(saved);
    if (!isValidDraft(draft)) {
      throw new Error("Invalid draft");
    }
    for (const [key, field] of Object.entries(draftFields)) field.value = draft.fields[key];
    for (const row of draft.items) addItem(false, row);
    recalculate();
    saveStatus.textContent = "Изменения сохранены";
    return true;
  } catch {
    saveStatus.textContent = "Черновик не восстановлен";
    const status = document.querySelector("#storage-status");
    status.textContent = "Не удалось восстановить черновик: он повреждён или локальное хранение недоступно.";
    status.hidden = false;
    return false;
  }
}

if (!restoreDraft()) {
  draftFields.number.value = "1";
  draftFields.date.value = todayValue();
  addItem(false);
}
restoringDraft = false;

for (const eventName of ["input", "change"]) {
  document.addEventListener(eventName, event => {
    if (event.target.matches(".details-grid input, #items input, #items select, #discount, #vat, #currency, #comment")) {
      saveDraft();
    }
  });
}

function clearCopyFeedback() {
  clearTimeout(copyStatusTimer);
  document.querySelector("#copy-status").textContent = "";
  document.querySelector("#copy-fallback").hidden = true;
  document.querySelector("#copy-text").value = "";
}

document.querySelector("#new-estimate").addEventListener("click", () => {
  if (!window.confirm("Создать новую смету? Текущий черновик будет очищен.")) return;
  const current = draftFields.number.value.trim();
  const match = current.match(/^(.*?)(\d+)$/);
  const nextNumber = match
    ? match[1] + String(BigInt(match[2]) + 1n).padStart(match[2].length, "0")
    : "1";
  restoringDraft = true;
  for (const field of Object.values(draftFields)) field.value = "";
  draftFields.number.value = nextNumber;
  draftFields.date.value = todayValue();
  discountInput.value = "0";
  vatInput.value = "0";
  currencySelect.value = "₸";
  items.replaceChildren();
  for (const value of document.querySelectorAll(".print-value")) value.remove();
  document.querySelector("#print-title").textContent = "";
  clearCopyFeedback();
  addItem();
  restoringDraft = false;
  saveDraft();
  if (!catalogPanel.hidden) renderCatalog();
});

function buildMessage() {
  recalculate();
  const date = draftFields.date.value;
  const lines = [`Смета № ${draftFields.number.value.trim() || "—"} от ${date ? date.split("-").reverse().join(".") : "—"}`];
  if (draftFields.sender.value.trim()) lines.push(`От кого: ${draftFields.sender.value.trim()}`);
  if (draftFields.recipient.value.trim()) lines.push(`Для кого: ${draftFields.recipient.value.trim()}`);
  lines.push("");
  const quantityFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 20 });
  for (const row of items.rows) {
    const value = key => row.querySelector(`[data-field="${key}"]`).value;
    const quantity = quantityFormatter.format(readNumber(value("quantity"))).replace(/[\u00a0\u202f]/g, " ");
    lines.push(`• ${value("name").trim() || "Без названия"} — ${quantity} ${value("unit")} × ${formatMoney(readNumber(value("price")))} = ${row.querySelector('[data-field="amount"]').textContent}`);
  }
  lines.push("", `Сумма: ${document.querySelector("#subtotal").textContent}`);
  if (!document.querySelector("#discount-row").hidden) {
    lines.push(`Скидка (${readNumber(discountInput.value)} %): ${document.querySelector("#discount-amount").textContent}`,
      `Сумма со скидкой: ${document.querySelector("#discounted-amount").textContent}`);
  }
  if (!document.querySelector("#vat-row").hidden) {
    lines.push(`НДС (${readNumber(vatInput.value)} %): ${document.querySelector("#vat-amount").textContent}`);
  }
  lines.push(`Итого к оплате: ${totalOutput.textContent}`);
  if (draftFields.comment.value.trim()) lines.push("", draftFields.comment.value.trim());
  return lines.join("\n");
}

document.querySelector("#copy-whatsapp").addEventListener("click", async () => {
  clearCopyFeedback();
  const text = buildMessage();
  try {
    await navigator.clipboard.writeText(text);
    document.querySelector("#copy-status").textContent = "Скопировано ✓";
    copyStatusTimer = setTimeout(() => {
      document.querySelector("#copy-status").textContent = "";
    }, 2000);
  } catch {
    document.querySelector("#copy-fallback").hidden = false;
    const field = document.querySelector("#copy-text");
    field.value = text;
    field.focus();
    field.select();
  }
});

function preparePrint() {
  recalculate();
  const number = document.querySelector('[name="estimate-number"]').value.trim() || "—";
  const date = document.querySelector("#estimate-date").value;
  const displayDate = date ? date.split("-").reverse().join(".") : "—";
  document.querySelector("#print-title").textContent = `Смета № ${number} от ${displayDate}`;

  // Plain text copies wrap freely on paper, including long names and comments.
  // Use textContent so user input is never interpreted as HTML.
  for (const previous of document.querySelectorAll(".print-value")) previous.remove();
  const fields = document.querySelectorAll(".details-grid input, #items input, #items select, #comment");
  for (const field of fields) {
    const value = document.createElement("span");
    value.className = "print-value";
    value.textContent = field.type === "date" ? displayDate : field.value;
    field.insertAdjacentElement("afterend", value);
  }
}

document.querySelector("#save-pdf").addEventListener("click", () => {
  preparePrint();
  window.print();
});
window.addEventListener("beforeprint", preparePrint);

const historyKey = "smeta-history-v1";
const historyPanel = document.querySelector("#history-panel");
const historyList = document.querySelector("#history-list");
const historyStatus = document.querySelector("#history-status");
const historyToggle = document.querySelector("#show-history");

function readHistory() {
  const saved = localStorage.getItem(historyKey);
  if (!saved) return [];
  const history = JSON.parse(saved);
  if (!history || history.version !== 1 || !Array.isArray(history.estimates) ||
      !history.estimates.every(entry => entry && typeof entry.id === "string" &&
        isValidDraft(entry.draft) && Number.isFinite(entry.total)) ||
      new Set(history.estimates.map(entry => entry.id)).size !== history.estimates.length) {
    throw new Error("Invalid history");
  }
  return history.estimates;
}

function writeHistory(estimates) {
  localStorage.setItem(historyKey, JSON.stringify({ version: 1, estimates }));
}

function addHistorySnapshot(estimates, draft, total) {
  // Repeated saving of the same version does not create identical entries.
  const serialized = JSON.stringify(draft);
  if (estimates.some(entry => JSON.stringify(entry.draft) === serialized)) return estimates;
  let id = String(Date.now());
  while (estimates.some(entry => entry.id === id)) id += "-1";
  return [{ id, draft, total }, ...estimates];
}

function renderHistory() {
  historyList.replaceChildren();
  const empty = document.querySelector("#history-empty");
  try {
    const estimates = readHistory();
    empty.textContent = "У вас пока нет сохранённых смет";
    empty.hidden = estimates.length > 0;
    const template = document.querySelector("#history-entry-template");
    for (const entry of estimates) {
      const card = template.content.firstElementChild.cloneNode(true);
      const fields = entry.draft.fields;
      const values = {
        number: `Смета № ${fields.number.trim() || "—"}`,
        date: fields.date ? fields.date.split("-").reverse().join(".") : "—",
        client: fields.recipient.trim() || "Клиент не указан",
        total: formatMoney(entry.total, fields.currency),
        currency: fields.currency
      };
      for (const [key, value] of Object.entries(values)) {
        card.querySelector(`[data-history-field="${key}"]`).textContent = value;
      }
      for (const button of card.querySelectorAll("button[data-history-action]")) {
        button.dataset.historyId = entry.id;
      }
      historyList.append(card);
    }
  } catch {
    empty.hidden = false;
    empty.textContent = "Не удалось прочитать историю. Данные повреждены или локальное хранение недоступно.";
  }
}

function setHistoryOpen(open) {
  historyPanel.hidden = !open;
  historyToggle.setAttribute("aria-expanded", String(open));
  if (open) renderHistory();
}

historyToggle.addEventListener("click", () => setHistoryOpen(historyPanel.hidden));
document.querySelector("#close-history").addEventListener("click", () => {
  setHistoryOpen(false);
  historyToggle.focus();
});

document.querySelector("#save-history").addEventListener("click", () => {
  try {
    const total = recalculate();
    writeHistory(addHistorySnapshot(readHistory(), collectDraft(), total));
    setHistoryOpen(true);
    historyStatus.textContent = "Смета сохранена в историю";
  } catch {
    historyStatus.textContent = "Не удалось сохранить смету в историю. Проверьте доступность и свободное место в локальном хранилище.";
  }
});

historyList.addEventListener("click", event => {
  const button = event.target.closest("button[data-history-action]");
  if (!button) return;
  try {
    const estimates = readHistory();
    const entry = estimates.find(item => item.id === button.dataset.historyId);
    if (!entry) {
      renderHistory();
      historyStatus.textContent = "Эта смета уже удалена из истории";
      return;
    }
    const number = entry.draft.fields.number.trim() || "—";
    if (button.dataset.historyAction === "delete") {
      if (!window.confirm(`Удалить смету № ${number} из истории?`)) return;
      writeHistory(estimates.filter(item => item.id !== entry.id));
      renderHistory();
      historyToggle.focus();
      historyStatus.textContent = "Смета удалена из истории";
    } else if (button.dataset.historyAction === "open") {
      if (!window.confirm(`Открыть смету № ${number}? Текущая смета сначала будет сохранена в историю.`)) return;
      // Do not replace the form until both the current version is archived and
      // the requested draft can be persisted. A storage failure leaves it intact.
      writeHistory(addHistorySnapshot(estimates, collectDraft(), recalculate()));
      localStorage.setItem(storageKey, JSON.stringify(entry.draft));
      restoringDraft = true;
      try {
        for (const [key, field] of Object.entries(draftFields)) field.value = entry.draft.fields[key];
        items.replaceChildren();
        for (const row of entry.draft.items) addItem(false, row);
        recalculate();
        clearCopyFeedback();
        for (const value of document.querySelectorAll(".print-value")) value.remove();
        document.querySelector("#print-title").textContent = "";
      } finally {
        restoringDraft = false;
      }
      saveDraft();
      if (!catalogPanel.hidden) renderCatalog();
      setHistoryOpen(false);
      draftFields.recipient.focus();
      historyStatus.textContent = "Смета открыта для редактирования. Предыдущая версия доступна в истории.";
    }
  } catch {
    historyStatus.textContent = "Не удалось выполнить действие с историей. Текущая смета не заменена. Проверьте локальное хранилище.";
  }
});

const catalogKey = "smeta-catalog-v1";
const catalogPanel = document.querySelector("#catalog-panel");
const catalogToggle = document.querySelector("#show-catalog");
const catalogList = document.querySelector("#catalog-list");
const catalogStatus = document.querySelector("#catalog-status");
const catalogName = document.querySelector("#catalog-name");
const catalogUnit = document.querySelector("#catalog-unit");
const catalogPrice = document.querySelector("#catalog-price");
const catalogSearch = document.querySelector("#catalog-search");
let editingCatalogId = null;

function readCatalog() {
  const saved = localStorage.getItem(catalogKey);
  if (!saved) return [];
  const catalog = JSON.parse(saved);
  if (!catalog || catalog.version !== 1 || !Array.isArray(catalog.entries) ||
      !catalog.entries.every(entry => entry && typeof entry.id === "string" &&
        typeof entry.name === "string" && entry.name.trim() &&
        ["шт", "час", "услуга"].includes(entry.unit) && typeof entry.price === "string") ||
      new Set(catalog.entries.map(entry => entry.id)).size !== catalog.entries.length) {
    throw new Error("Invalid catalog");
  }
  return catalog.entries;
}

function writeCatalog(entries) {
  localStorage.setItem(catalogKey, JSON.stringify({ version: 1, entries }));
}

function resetCatalogForm() {
  editingCatalogId = null;
  catalogName.value = "";
  catalogUnit.value = "шт";
  catalogPrice.value = "";
  document.querySelector("#catalog-save").textContent = "Добавить в каталог";
  document.querySelector("#catalog-cancel").hidden = true;
}

function renderCatalog() {
  catalogList.replaceChildren();
  const empty = document.querySelector("#catalog-empty");
  try {
    const entries = readCatalog();
    const query = catalogSearch.value.trim().toLocaleLowerCase("ru-RU");
    const matches = entries.filter(entry => entry.name.toLocaleLowerCase("ru-RU").includes(query));
    empty.hidden = matches.length > 0;
    empty.textContent = entries.length ? "По вашему запросу ничего не найдено" : "В каталоге пока нет товаров и услуг";
    const template = document.querySelector("#catalog-entry-template");
    for (const entry of matches) {
      const card = template.content.firstElementChild.cloneNode(true);
      const values = { name: entry.name, unit: entry.unit, price: formatMoney(readNumber(entry.price)) };
      for (const [key, value] of Object.entries(values)) {
        card.querySelector(`[data-catalog-field="${key}"]`).textContent = value;
      }
      for (const button of card.querySelectorAll("button[data-catalog-action]")) {
        button.dataset.catalogId = entry.id;
      }
      catalogList.append(card);
    }
  } catch {
    empty.hidden = false;
    empty.textContent = "Не удалось прочитать каталог. Данные повреждены или локальное хранение недоступно.";
  }
}

catalogToggle.addEventListener("click", () => {
  const open = catalogPanel.hidden;
  catalogPanel.hidden = !open;
  catalogToggle.setAttribute("aria-expanded", String(open));
  if (open) {
    renderCatalog();
    catalogSearch.focus();
  }
});
document.querySelector("#close-catalog").addEventListener("click", () => {
  catalogPanel.hidden = true;
  catalogToggle.setAttribute("aria-expanded", "false");
  catalogToggle.focus();
});
catalogSearch.addEventListener("input", renderCatalog);
currencySelect.addEventListener("change", () => {
  if (!catalogPanel.hidden) renderCatalog();
});
document.querySelector("#catalog-cancel").addEventListener("click", () => {
  resetCatalogForm();
  catalogStatus.textContent = "Редактирование отменено";
  catalogName.focus();
});

document.querySelector("#catalog-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = catalogName.value.trim();
  if (!name) {
    catalogStatus.textContent = "Укажите название товара или услуги";
    catalogName.focus();
    return;
  }
  try {
    const entries = readCatalog();
    const price = readNumber(catalogPrice.value) === 0 ? "0" : catalogPrice.value.trim();
    const unit = ["шт", "час", "услуга"].includes(catalogUnit.value) ? catalogUnit.value : "шт";
    if (editingCatalogId !== null) {
      const index = entries.findIndex(entry => entry.id === editingCatalogId);
      if (index === -1) {
        catalogStatus.textContent = "Эта запись уже удалена. Отмените редактирование, чтобы добавить новую.";
        return;
      }
      entries[index] = { id: editingCatalogId, name, unit, price };
    } else {
      let id = String(Date.now());
      while (entries.some(entry => entry.id === id)) id += "-1";
      entries.unshift({ id, name, unit, price });
    }
    writeCatalog(entries);
    resetCatalogForm();
    catalogSearch.value = "";
    renderCatalog();
    catalogStatus.textContent = "Запись сохранена в каталоге";
    catalogName.focus();
  } catch {
    catalogStatus.textContent = "Не удалось сохранить запись. Проверьте доступность локального хранилища. Введённые данные оставлены в форме.";
  }
});

catalogList.addEventListener("click", event => {
  const button = event.target.closest("button[data-catalog-action]");
  if (!button) return;
  try {
    const entries = readCatalog();
    const entry = entries.find(item => item.id === button.dataset.catalogId);
    if (!entry) {
      renderCatalog();
      catalogStatus.textContent = "Эта запись уже удалена из каталога";
      return;
    }
    if (button.dataset.catalogAction === "add") {
      addItem(true, { name: entry.name, quantity: "1", unit: entry.unit, price: entry.price });
      catalogStatus.textContent = "Позиция добавлена в смету";
    } else if (button.dataset.catalogAction === "edit") {
      editingCatalogId = entry.id;
      catalogName.value = entry.name;
      catalogUnit.value = entry.unit;
      catalogPrice.value = entry.price;
      document.querySelector("#catalog-save").textContent = "Сохранить изменения";
      document.querySelector("#catalog-cancel").hidden = false;
      catalogStatus.textContent = "Редактирование записи каталога";
      catalogName.focus();
    } else if (button.dataset.catalogAction === "delete") {
      if (!window.confirm(`Удалить «${entry.name}» из каталога?`)) return;
      writeCatalog(entries.filter(item => item.id !== entry.id));
      if (editingCatalogId === entry.id) resetCatalogForm();
      renderCatalog();
      catalogStatus.textContent = "Запись удалена из каталога. Позиции сметы сохранены.";
      catalogSearch.focus();
    }
  } catch {
    catalogStatus.textContent = "Не удалось выполнить действие. Проверьте данные каталога и доступность локального хранилища.";
  }
});
