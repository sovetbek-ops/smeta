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

function formatMoney(value) {
  const safeValue = Number.isFinite(value) ? value : 0;
  return `${moneyFormatter.format(safeValue).replace(/[\u00a0\u202f]/g, " ")} ${currencySelect.value}`;
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

function saveDraft() {
  if (restoringDraft) return;
  const draft = {
    version: 1,
    fields: Object.fromEntries(Object.entries(draftFields).map(([key, field]) => [key, field.value])),
    items: Array.from(items.rows, row => Object.fromEntries(rowFields.map(key =>
      [key, row.querySelector(`[data-field="${key}"]`).value])))
  };
  const status = document.querySelector("#storage-status");
  try {
    localStorage.setItem(storageKey, JSON.stringify(draft));
    status.hidden = true;
  } catch {
    status.textContent = "Не удалось сохранить черновик. Проверьте, разрешено ли браузеру локальное хранение данных.";
    status.hidden = false;
  }
}

function restoreDraft() {
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return false;
    const draft = JSON.parse(saved);
    if (!draft || draft.version !== 1 || !draft.fields || !Array.isArray(draft.items) ||
        !Object.keys(draftFields).every(key => typeof draft.fields[key] === "string") ||
        !["₸", "₽", "$", "€"].includes(draft.fields.currency) ||
        !draft.items.every(row => row && rowFields.every(key => typeof row[key] === "string") &&
          ["шт", "час", "услуга"].includes(row.unit))) {
      throw new Error("Invalid draft");
    }
    for (const [key, field] of Object.entries(draftFields)) field.value = draft.fields[key];
    for (const row of draft.items) addItem(false, row);
    recalculate();
    return true;
  } catch {
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
