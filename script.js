"use strict";

const items = document.querySelector("#items");
const template = document.querySelector("#item-template");
const totalOutput = document.querySelector("#total");
const addButton = document.querySelector("#add-item");
const moneyFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 2 });
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
  return `${moneyFormatter.format(safeValue).replace(/[\u00a0\u202f]/g, " ")} ₸`;
}

function recalculate() {
  let total = 0;
  for (const row of items.rows) {
    const quantity = readNumber(row.querySelector('[data-field="quantity"]').value);
    const price = readNumber(row.querySelector('[data-field="price"]').value);
    const product = quantity * price;
    // Round each line to hundredths so the total matches the displayed line amounts.
    const rounded = Math.round((product + Number.EPSILON) * 100) / 100;
    const amount = Number.isFinite(rounded) ? rounded : 0;
    row.querySelector('[data-field="amount"]').textContent = formatMoney(amount);
    total += amount;
  }
  totalOutput.textContent = formatMoney(total);
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
