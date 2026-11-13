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

function addItem(focus = true) {
  const row = template.content.firstElementChild.cloneNode(true);
  const id = ++nextId;
  for (const label of row.querySelectorAll("label[data-label]")) {
    const field = label.dataset.label;
    const input = row.querySelector(`[data-field="${field}"]`);
    input.id = `item-${id}-${field}`;
    label.htmlFor = input.id;
  }
  items.append(row);
  recalculate();
  if (focus) row.querySelector('[data-field="name"]').focus();
  return row;
}

addButton.addEventListener("click", () => addItem());
discountInput.addEventListener("input", recalculate);
vatInput.addEventListener("input", recalculate);
currencySelect.addEventListener("change", recalculate);
items.addEventListener("input", recalculate);
items.addEventListener("click", (event) => {
  const button = event.target.closest('[data-action="remove"]');
  if (!button) return;
  const row = button.closest("tr");
  const nextRow = row.nextElementSibling || row.previousElementSibling;
  row.remove();
  recalculate();
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

const today = new Date();
document.querySelector("#estimate-date").value = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

addItem(false);

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
