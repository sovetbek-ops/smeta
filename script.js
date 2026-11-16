"use strict";

// All interface translations live in this object. Add the same key to every language.
const translations = {
  "ru": {
    "dailyTipTitle": "Совет дня",
    "dailyTipExperimental": "Эксперимент",
    "dailyTip01": "Попросите клиента подтвердить объём работ до начала проекта.",
    "dailyTip02": "Записывайте договорённости с клиентами, чтобы избежать недопонимания.",
    "dailyTip03": "Разбивайте крупные задачи на небольшие понятные этапы.",
    "dailyTip04": "После завершения заказа попросите клиента оставить отзыв.",
    "dailyTip05": "Выделяйте время на ответы клиентам каждый рабочий день.",
    "dailyTip06": "Перед отправкой предложения проверьте имена, сроки и состав работ.",
    "dailyTip07": "Храните шаблоны ответов на частые вопросы клиентов.",
    "dailyTip08": "Заранее сообщайте клиенту об изменениях в сроках выполнения.",
    "dailyTip09": "В конце недели отмечайте, какие действия принесли лучший результат.",
    "dailyTip10": "Начинайте рабочий день с одной самой важной задачи.",
    "workspace": "РАБОЧЕЕ ПРОСТРАНСТВО",
    "editor": "Редактор сметы",
    "localPrivacy": "Данные хранятся только в вашем браузере",
    "appTitle": "Смета за 5 минут",
    "intro": "Добавьте позиции и цены — сумма посчитается сама.",
    "theme": "Тема оформления",
    "lightTheme": "Светлая тема",
    "darkTheme": "Тёмная тема",
    "details": "Реквизиты",
    "sender": "От кого",
    "recipient": "Для кого",
    "senderPlaceholder": "Ваше имя или компания",
    "recipientPlaceholder": "Имя клиента или компания",
    "estimateNumber": "Номер сметы",
    "numberPlaceholder": "Например, 001",
    "date": "Дата",
    "items": "Позиции",
    "keyboardTip": "Enter в последней строке добавит новую",
    "name": "Наименование",
    "quantity": "Количество",
    "unit": "Единица",
    "pricePrefix": "Цена,",
    "amount": "Сумма",
    "itemActions": "Действия с позицией",
    "addItem": "+ Добавить позицию",
    "discountPercent": "Скидка, %",
    "vatPercent": "НДС, %",
    "currency": "Валюта",
    "breakdown": "Расчёт стоимости",
    "discount": "Скидка",
    "discounted": "Сумма со скидкой",
    "vat": "НДС",
    "total": "Итого к оплате",
    "comment": "Комментарий",
    "commentPlaceholder": "Сроки выполнения, условия оплаты",
    "signature": "Подпись ____________________",
    "savePdf": "Сохранить PDF",
    "copyWhatsapp": "Скопировать для WhatsApp",
    "newEstimate": "Новая смета",
    "saveHistory": "Сохранить в историю",
    "history": "История смет",
    "catalog": "Каталог",
    "printTip": "В окне печати выберите «Сохранить как PDF».",
    "closeHistory": "Закрыть историю",
    "historyTip": "При открытии другой сметы текущая будет сохранена в историю. Чтобы сохранить правки открытой сметы, нажмите «Сохранить в историю».",
    "historyEmpty": "У вас пока нет сохранённых смет",
    "catalogTitle": "Каталог товаров и услуг",
    "closeCatalog": "Закрыть каталог",
    "catalogTip": "Цены используются в выбранной валюте сметы без пересчёта.",
    "catalogName": "Название",
    "productPlaceholder": "Товар или услуга",
    "unitFull": "Единица измерения",
    "price": "Цена",
    "catalogAdd": "Добавить в каталог",
    "cancelEdit": "Отменить редактирование",
    "search": "Поиск по названию",
    "searchPlaceholder": "Введите название",
    "catalogEmpty": "В каталоге пока нет товаров и услуг",
    "copyFallback": "Не удалось скопировать автоматически. Скопируйте текст вручную:",
    "duplicateItem": "Дублировать позицию",
    "removeItem": "Удалить позицию",
    "client": "Клиент",
    "open": "Открыть",
    "delete": "Удалить",
    "catalogToEstimate": "Добавить в смету",
    "edit": "Редактировать",
    "unitPiece": "шт",
    "unitHour": "час",
    "unitService": "услуга",
    "themeSaveError": "Тема изменена, но браузер не позволил сохранить выбор.",
    "draftSaved": "Изменения сохранены",
    "draftSaveFailed": "Не удалось сохранить изменения",
    "draftSaveError": "Не удалось сохранить черновик. Проверьте, разрешено ли браузеру локальное хранение данных.",
    "draftNotRestored": "Черновик не восстановлен",
    "draftRestoreError": "Не удалось восстановить черновик: он повреждён или локальное хранение недоступно.",
    "confirmNew": "Создать новую смету? Текущий черновик будет очищен.",
    "untitled": "Без названия",
    "copied": "Скопировано ✓",
    "historyReadError": "Не удалось прочитать историю. Данные повреждены или локальное хранение недоступно.",
    "noClient": "Клиент не указан",
    "historySaved": "Смета сохранена в историю",
    "historySaveError": "Не удалось сохранить смету в историю. Проверьте доступность и свободное место в локальном хранилище.",
    "historyMissing": "Эта смета уже удалена из истории",
    "historyDeleted": "Смета удалена из истории",
    "historyOpened": "Смета открыта для редактирования. Предыдущая версия доступна в истории.",
    "historyActionError": "Не удалось выполнить действие с историей. Текущая смета не заменена. Проверьте локальное хранилище.",
    "noMatches": "По вашему запросу ничего не найдено",
    "catalogReadError": "Не удалось прочитать каталог. Данные повреждены или локальное хранение недоступно.",
    "editCancelled": "Редактирование отменено",
    "nameRequired": "Укажите название товара или услуги",
    "catalogEditMissing": "Эта запись уже удалена. Отмените редактирование, чтобы добавить новую.",
    "catalogSaved": "Запись сохранена в каталоге",
    "catalogSaveError": "Не удалось сохранить запись. Проверьте доступность локального хранилища. Введённые данные оставлены в форме.",
    "catalogMissing": "Эта запись уже удалена из каталога",
    "itemAdded": "Позиция добавлена в смету",
    "saveChanges": "Сохранить изменения",
    "catalogEditing": "Редактирование записи каталога",
    "catalogDeleted": "Запись удалена из каталога. Позиции сметы сохранены.",
    "catalogActionError": "Не удалось выполнить действие. Проверьте данные каталога и доступность локального хранилища.",
    "estimateHeading": "Смета № {number} от {date}",
    "estimateShort": "Смета № {number}",
    "confirmHistoryDelete": "Удалить смету № {number} из истории?",
    "confirmHistoryOpen": "Открыть смету № {number}? Текущая смета сначала будет сохранена в историю.",
    "confirmCatalogDelete": "Удалить «{name}» из каталога?",
    "language": "Язык интерфейса",
    "languageSaveError": "Язык изменён, но браузер не позволил сохранить выбор.",
    "currencyKzt": "Казахстанский тенге",
    "currencyRub": "Российский рубль",
    "currencyUsd": "Доллар США",
    "currencyEur": "Евро"
  },
  "kz": {
    "dailyTipTitle": "Күн кеңесі",
    "dailyTipExperimental": "Сынақ нұсқасы",
    "dailyTip01": "Жобаны бастамас бұрын, клиенттен жұмыс көлемін растауды сұраңыз.",
    "dailyTip02": "Түсініспеушілікті болдырмау үшін клиенттермен келісілген шарттарды жазып қойыңыз.",
    "dailyTip03": "Ірі міндеттерді шағын әрі түсінікті кезеңдерге бөліңіз.",
    "dailyTip04": "Тапсырыс аяқталған соң, клиенттен пікір қалдыруды сұраңыз.",
    "dailyTip05": "Әр жұмыс күні клиенттерге жауап беруге уақыт бөліңіз.",
    "dailyTip06": "Ұсынысты жібермес бұрын, есімдерді, мерзімдерді және жұмыс құрамын тексеріңіз.",
    "dailyTip07": "Клиенттердің жиі қойылатын сұрақтарына жауап үлгілерін сақтаңыз.",
    "dailyTip08": "Орындау мерзімдері өзгерсе, клиентке алдын ала хабарлаңыз.",
    "dailyTip09": "Апта соңында қай әрекеттер жақсы нәтиже бергенін белгілеңіз.",
    "dailyTip10": "Жұмыс күнін ең маңызды бір міндеттен бастаңыз.",
    "workspace": "ЖҰМЫС КЕҢІСТІГІ",
    "editor": "Смета редакторы",
    "localPrivacy": "Деректер тек браузеріңізде сақталады",
    "appTitle": "5 минутта смета",
    "intro": "Позициялар мен бағаларды қосыңыз — сома автоматты түрде есептеледі.",
    "theme": "Безендіру тақырыбы",
    "lightTheme": "Ашық тақырып",
    "darkTheme": "Қараңғы тақырып",
    "details": "Деректемелер",
    "sender": "Кімнен",
    "recipient": "Кімге",
    "senderPlaceholder": "Атыңыз немесе компанияңыз",
    "recipientPlaceholder": "Клиенттің аты немесе компаниясы",
    "estimateNumber": "Смета нөмірі",
    "numberPlaceholder": "Мысалы, 001",
    "date": "Күні",
    "items": "Позициялар",
    "keyboardTip": "Соңғы жолда Enter пернесін бассаңыз, жаңа жол қосылады",
    "name": "Атауы",
    "quantity": "Саны",
    "unit": "Бірлік",
    "pricePrefix": "Бағасы,",
    "amount": "Сома",
    "itemActions": "Позициямен орындалатын әрекеттер",
    "addItem": "+ Позиция қосу",
    "discountPercent": "Жеңілдік, %",
    "vatPercent": "ҚҚС, %",
    "currency": "Валюта",
    "breakdown": "Құнын есептеу",
    "discount": "Жеңілдік",
    "discounted": "Жеңілдіктен кейінгі сома",
    "vat": "ҚҚС",
    "total": "Төленетін жалпы сома",
    "comment": "Түсініктеме",
    "commentPlaceholder": "Орындау мерзімдері, төлем шарттары",
    "signature": "Қолы ____________________",
    "savePdf": "PDF сақтау",
    "copyWhatsapp": "WhatsApp үшін көшіру",
    "newEstimate": "Жаңа смета",
    "saveHistory": "Тарихқа сақтау",
    "history": "Сметалар тарихы",
    "catalog": "Каталог",
    "printTip": "Басып шығару терезесінде «PDF ретінде сақтау» тармағын таңдаңыз.",
    "closeHistory": "Тарихты жабу",
    "historyTip": "Басқа сметаны ашқанда, ағымдағы смета тарихқа сақталады. Ашық сметадағы өзгерістерді сақтау үшін «Тарихқа сақтау» түймесін басыңыз.",
    "historyEmpty": "Әзірге сақталған сметалар жоқ",
    "catalogTitle": "Тауарлар мен қызметтер каталогы",
    "closeCatalog": "Каталогты жабу",
    "catalogTip": "Бағалар сметада таңдалған валютада қайта есептеусіз қолданылады.",
    "catalogName": "Атауы",
    "productPlaceholder": "Тауар немесе қызмет",
    "unitFull": "Өлшем бірлігі",
    "price": "Бағасы",
    "catalogAdd": "Каталогқа қосу",
    "cancelEdit": "Өңдеуден бас тарту",
    "search": "Атауы бойынша іздеу",
    "searchPlaceholder": "Атауын енгізіңіз",
    "catalogEmpty": "Каталогта әзірге тауарлар мен қызметтер жоқ",
    "copyFallback": "Автоматты түрде көшіру мүмкін болмады. Мәтінді қолмен көшіріңіз:",
    "duplicateItem": "Позицияның көшірмесін жасау",
    "removeItem": "Позицияны жою",
    "client": "Клиент",
    "open": "Ашу",
    "delete": "Жою",
    "catalogToEstimate": "Сметаға қосу",
    "edit": "Өңдеу",
    "unitPiece": "дана",
    "unitHour": "сағат",
    "unitService": "қызмет",
    "themeSaveError": "Тақырып өзгертілді, бірақ браузер таңдауды сақтауға рұқсат бермеді.",
    "draftSaved": "Өзгерістер сақталды",
    "draftSaveFailed": "Өзгерістерді сақтау мүмкін болмады",
    "draftSaveError": "Нобайды сақтау мүмкін болмады. Браузерде деректерді жергілікті сақтауға рұқсат берілгенін тексеріңіз.",
    "draftNotRestored": "Нобай қалпына келтірілмеді",
    "draftRestoreError": "Нобайды қалпына келтіру мүмкін болмады: ол бүлінген немесе жергілікті сақтау қолжетімсіз.",
    "confirmNew": "Жаңа смета жасалсын ба? Ағымдағы нобай тазаланады.",
    "untitled": "Атаусыз",
    "copied": "Көшірілді ✓",
    "historyReadError": "Тарихты оқу мүмкін болмады. Деректер бүлінген немесе жергілікті сақтау қолжетімсіз.",
    "noClient": "Клиент көрсетілмеген",
    "historySaved": "Смета тарихқа сақталды",
    "historySaveError": "Сметаны тарихқа сақтау мүмкін болмады. Жергілікті сақтаудың қолжетімділігін және бос орнын тексеріңіз.",
    "historyMissing": "Бұл смета тарихтан жойылған",
    "historyDeleted": "Смета тарихтан жойылды",
    "historyOpened": "Смета өңдеу үшін ашылды. Алдыңғы нұсқасы тарихта қолжетімді.",
    "historyActionError": "Тарихпен әрекетті орындау мүмкін болмады. Ағымдағы смета ауыстырылмады. Жергілікті сақтауды тексеріңіз.",
    "noMatches": "Сұрауыңыз бойынша ештеңе табылмады",
    "catalogReadError": "Каталогты оқу мүмкін болмады. Деректер бүлінген немесе жергілікті сақтау қолжетімсіз.",
    "editCancelled": "Өңдеуден бас тартылды",
    "nameRequired": "Тауардың немесе қызметтің атауын енгізіңіз",
    "catalogEditMissing": "Бұл жазба жойылған. Жаңасын қосу үшін өңдеуден бас тартыңыз.",
    "catalogSaved": "Жазба каталогта сақталды",
    "catalogSaveError": "Жазбаны сақтау мүмкін болмады. Жергілікті сақтаудың қолжетімділігін тексеріңіз. Енгізілген деректер пішінде қалдырылды.",
    "catalogMissing": "Бұл жазба каталогтан жойылған",
    "itemAdded": "Позиция сметаға қосылды",
    "saveChanges": "Өзгерістерді сақтау",
    "catalogEditing": "Каталог жазбасын өңдеу",
    "catalogDeleted": "Жазба каталогтан жойылды. Смета позициялары сақталды.",
    "catalogActionError": "Әрекетті орындау мүмкін болмады. Каталог деректерін және жергілікті сақтаудың қолжетімділігін тексеріңіз.",
    "estimateHeading": "{date} күнгі № {number} смета",
    "estimateShort": "№ {number} смета",
    "confirmHistoryDelete": "№ {number} смета тарихтан жойылсын ба?",
    "confirmHistoryOpen": "№ {number} смета ашылсын ба? Алдымен ағымдағы смета тарихқа сақталады.",
    "confirmCatalogDelete": "«{name}» каталогтан жойылсын ба?",
    "language": "Интерфейс тілі",
    "languageSaveError": "Тіл өзгертілді, бірақ браузер таңдауды сақтауға рұқсат бермеді.",
    "currencyKzt": "Қазақстан теңгесі",
    "currencyRub": "Ресей рублі",
    "currencyUsd": "АҚШ доллары",
    "currencyEur": "Еуро"
  },
  "en": {
    "dailyTipTitle": "Tip of the day",
    "dailyTipExperimental": "Experimental",
    "dailyTip01": "Ask the client to confirm the scope before starting a project.",
    "dailyTip02": "Write down client agreements to avoid misunderstandings.",
    "dailyTip03": "Break large tasks into small, clear milestones.",
    "dailyTip04": "Ask clients for feedback after completing an order.",
    "dailyTip05": "Set aside time to reply to clients every working day.",
    "dailyTip06": "Check names, deadlines and scope before sending a proposal.",
    "dailyTip07": "Keep response templates for common client questions.",
    "dailyTip08": "Let clients know about changes to deadlines in advance.",
    "dailyTip09": "At the end of each week, note which actions worked best.",
    "dailyTip10": "Start your working day with your most important task.",
    "workspace": "WORKSPACE",
    "editor": "Estimate editor",
    "localPrivacy": "Your data stays in your browser",
    "appTitle": "Estimate in 5 Minutes",
    "intro": "Add items and prices — the total is calculated automatically.",
    "theme": "Appearance",
    "lightTheme": "Light theme",
    "darkTheme": "Dark theme",
    "details": "Details",
    "sender": "From",
    "recipient": "To",
    "senderPlaceholder": "Your name or company",
    "recipientPlaceholder": "Client name or company",
    "estimateNumber": "Estimate number",
    "numberPlaceholder": "For example, 001",
    "date": "Date",
    "items": "Items",
    "keyboardTip": "Press Enter in the last row to add a new one",
    "name": "Item name",
    "quantity": "Quantity",
    "unit": "Unit",
    "pricePrefix": "Price,",
    "amount": "Amount",
    "itemActions": "Item actions",
    "addItem": "+ Add item",
    "discountPercent": "Discount, %",
    "vatPercent": "VAT, %",
    "currency": "Currency",
    "breakdown": "Cost breakdown",
    "discount": "Discount",
    "discounted": "Amount after discount",
    "vat": "VAT",
    "total": "Total due",
    "comment": "Comment",
    "commentPlaceholder": "Completion dates, payment terms",
    "signature": "Signature ____________________",
    "savePdf": "Save PDF",
    "copyWhatsapp": "Copy for WhatsApp",
    "newEstimate": "New estimate",
    "saveHistory": "Save to history",
    "history": "Estimate history",
    "catalog": "Catalog",
    "printTip": "In the print dialog, choose “Save as PDF”.",
    "closeHistory": "Close history",
    "historyTip": "Opening another estimate saves the current one to history. To save changes to an open estimate, click “Save to history”.",
    "historyEmpty": "You have no saved estimates yet",
    "catalogTitle": "Products and services catalog",
    "closeCatalog": "Close catalog",
    "catalogTip": "Prices use the selected estimate currency without conversion.",
    "catalogName": "Name",
    "productPlaceholder": "Product or service",
    "unitFull": "Unit of measure",
    "price": "Price",
    "catalogAdd": "Add to catalog",
    "cancelEdit": "Cancel editing",
    "search": "Search by name",
    "searchPlaceholder": "Enter a name",
    "catalogEmpty": "The catalog has no products or services yet",
    "copyFallback": "Automatic copying failed. Copy the text manually:",
    "duplicateItem": "Duplicate item",
    "removeItem": "Remove item",
    "client": "Client",
    "open": "Open",
    "delete": "Delete",
    "catalogToEstimate": "Add to estimate",
    "edit": "Edit",
    "unitPiece": "pcs",
    "unitHour": "hour",
    "unitService": "service",
    "themeSaveError": "The theme changed, but the browser could not save your choice.",
    "draftSaved": "Changes saved",
    "draftSaveFailed": "Could not save changes",
    "draftSaveError": "Could not save the draft. Check that local data storage is allowed in your browser.",
    "draftNotRestored": "Draft not restored",
    "draftRestoreError": "Could not restore the draft: it is damaged or local storage is unavailable.",
    "confirmNew": "Create a new estimate? The current draft will be cleared.",
    "untitled": "Untitled",
    "copied": "Copied ✓",
    "historyReadError": "Could not read history. The data is damaged or local storage is unavailable.",
    "noClient": "No client specified",
    "historySaved": "Estimate saved to history",
    "historySaveError": "Could not save the estimate to history. Check local storage availability and free space.",
    "historyMissing": "This estimate has already been deleted from history",
    "historyDeleted": "Estimate deleted from history",
    "historyOpened": "Estimate opened for editing. The previous version is available in history.",
    "historyActionError": "Could not complete the history action. The current estimate was not replaced. Check local storage.",
    "noMatches": "No results found",
    "catalogReadError": "Could not read the catalog. The data is damaged or local storage is unavailable.",
    "editCancelled": "Editing cancelled",
    "nameRequired": "Enter a product or service name",
    "catalogEditMissing": "This entry has already been deleted. Cancel editing to add a new one.",
    "catalogSaved": "Entry saved to catalog",
    "catalogSaveError": "Could not save the entry. Check local storage availability. Your input has been kept in the form.",
    "catalogMissing": "This entry has already been deleted from the catalog",
    "itemAdded": "Item added to estimate",
    "saveChanges": "Save changes",
    "catalogEditing": "Editing catalog entry",
    "catalogDeleted": "Entry deleted from catalog. Estimate items have been kept.",
    "catalogActionError": "Could not complete the action. Check the catalog data and local storage availability.",
    "estimateHeading": "Estimate No. {number} dated {date}",
    "estimateShort": "Estimate No. {number}",
    "confirmHistoryDelete": "Delete estimate No. {number} from history?",
    "confirmHistoryOpen": "Open estimate No. {number}? The current estimate will first be saved to history.",
    "confirmCatalogDelete": "Delete “{name}” from the catalog?",
    "language": "Interface language",
    "languageSaveError": "The language changed, but the browser could not save your choice.",
    "currencyKzt": "Kazakhstani tenge",
    "currencyRub": "Russian ruble",
    "currencyUsd": "US dollar",
    "currencyEur": "Euro"
  }
};
const languageKey = "smeta-language-v1";
let currentLanguage = "ru";
try {
  const saved = localStorage.getItem(languageKey);
  if (Object.hasOwn(translations, saved)) currentLanguage = saved;
} catch {
  // Language switching also works when local storage is unavailable.
}

function t(key, params = {}) {
  const text = translations[currentLanguage][key] ?? translations.ru[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (match, name) => String(params[name] ?? match));
}

function setLocalizedText(element, key) {
  element.dataset.i18n = key;
  element.textContent = t(key);
}

function clearLocalizedText(element) {
  delete element.dataset.i18n;
  element.textContent = "";
}

// Unit codes are unchanged in drafts/history/catalog for backward compatibility.
function translateUnit(unit) {
  const keys = { "шт": "unitPiece", "час": "unitHour", "услуга": "unitService" };
  return keys[unit] ? t(keys[unit]) : unit;
}

function currencyName(symbol) {
  const keys = { "₸": "currencyKzt", "₽": "currencyRub", "$": "currencyUsd", "€": "currencyEur" };
  return keys[symbol] ? symbol + " — " + t(keys[symbol]) : symbol;
}

function translateTree(root = document) {
  const elements = [...(root.nodeType === 1 ? [root] : []), ...root.querySelectorAll("*")];
  for (const element of elements) {
    if (element.dataset.i18n) element.textContent = t(element.dataset.i18n);
    for (const attribute of ["placeholder", "aria-label", "title"]) {
      const key = element.getAttribute("data-i18n-" + attribute);
      if (key) element.setAttribute(attribute, t(key));
    }
    if (element.dataset.i18nCurrency) {
      element.textContent = element.value + " — " + t(element.dataset.i18nCurrency);
    }
    if (element.tagName === "TEMPLATE") translateTree(element.content);
  }
}

function updateLanguageControls() {
  document.documentElement.lang = currentLanguage === "kz" ? "kk" : currentLanguage;
  for (const button of document.querySelectorAll("[data-language]")) {
    button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage));
  }
}

translateTree();
updateLanguageControls();



// Theme preferences are independent of the estimate, history and catalog.
const themeKey = "smeta-theme-v1";
const lightThemeButton = document.querySelector("#theme-light");
const darkThemeButton = document.querySelector("#theme-dark");
const themeStatus = document.querySelector("#theme-status");

function applyTheme(theme) {
  const dark = theme === "dark";
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  lightThemeButton.setAttribute("aria-pressed", String(!dark));
  darkThemeButton.setAttribute("aria-pressed", String(dark));
}

let savedTheme = "light";
try {
  if (localStorage.getItem(themeKey) === "dark") savedTheme = "dark";
} catch {
  // The switch remains usable when browser storage is unavailable.
}
applyTheme(savedTheme);

function chooseTheme(theme) {
  applyTheme(theme);
  try {
    localStorage.setItem(themeKey, theme);
    clearLocalizedText(themeStatus);
  } catch {
    setLocalizedText(themeStatus, "themeSaveError");
  }
}

lightThemeButton.addEventListener("click", () => chooseTheme("light"));
darkThemeButton.addEventListener("click", () => chooseTheme("dark"));

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
  translateTree(row);
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
    setLocalizedText(saveStatus, "draftSaved");
  } catch {
    setLocalizedText(saveStatus, "draftSaveFailed");
    setLocalizedText(status, "draftSaveError");
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
    setLocalizedText(saveStatus, "draftSaved");
    return true;
  } catch {
    setLocalizedText(saveStatus, "draftNotRestored");
    const status = document.querySelector("#storage-status");
    setLocalizedText(status, "draftRestoreError");
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
  clearLocalizedText(document.querySelector("#copy-status"));
  document.querySelector("#copy-fallback").hidden = true;
  document.querySelector("#copy-text").value = "";
}

document.querySelector("#new-estimate").addEventListener("click", () => {
  if (!window.confirm(t("confirmNew"))) return;
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
  clearLocalizedText(document.querySelector("#print-title"));
  clearCopyFeedback();
  addItem();
  restoringDraft = false;
  saveDraft();
  if (!catalogPanel.hidden) renderCatalog();
});

function buildMessage() {
  recalculate();
  const date = draftFields.date.value;
  const lines = [t("estimateHeading", { number: draftFields.number.value.trim() || "—", date: date ? date.split("-").reverse().join(".") : "—" })];
  if (draftFields.sender.value.trim()) lines.push(`${t("sender")}: ${draftFields.sender.value.trim()}`);
  if (draftFields.recipient.value.trim()) lines.push(`${t("recipient")}: ${draftFields.recipient.value.trim()}`);
  lines.push("");
  const quantityFormatter = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 20 });
  for (const row of items.rows) {
    const value = key => row.querySelector(`[data-field="${key}"]`).value;
    const quantity = quantityFormatter.format(readNumber(value("quantity"))).replace(/[\u00a0\u202f]/g, " ");
    lines.push(`• ${value("name").trim() || t("untitled")} — ${quantity} ${translateUnit(value("unit"))} × ${formatMoney(readNumber(value("price")))} = ${row.querySelector('[data-field="amount"]').textContent}`);
  }
  lines.push("", `${t("amount")}: ${document.querySelector("#subtotal").textContent}`);
  if (!document.querySelector("#discount-row").hidden) {
    lines.push(`${t("discount")} (${readNumber(discountInput.value)} %): ${document.querySelector("#discount-amount").textContent}`,
      `${t("discounted")}: ${document.querySelector("#discounted-amount").textContent}`);
  }
  if (!document.querySelector("#vat-row").hidden) {
    lines.push(`${t("vat")} (${readNumber(vatInput.value)} %): ${document.querySelector("#vat-amount").textContent}`);
  }
  lines.push(`${t("total")}: ${totalOutput.textContent}`);
  if (draftFields.comment.value.trim()) lines.push("", draftFields.comment.value.trim());
  return lines.join("\n");
}

document.querySelector("#copy-whatsapp").addEventListener("click", async () => {
  clearCopyFeedback();
  const text = buildMessage();
  try {
    await navigator.clipboard.writeText(text);
    setLocalizedText(document.querySelector("#copy-status"), "copied");
    copyStatusTimer = setTimeout(() => {
      clearLocalizedText(document.querySelector("#copy-status"));
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
  document.querySelector("#print-title").textContent = t("estimateHeading", { number, date: displayDate });

  // Plain text copies wrap freely on paper, including long names and comments.
  // Use textContent so user input is never interpreted as HTML.
  for (const previous of document.querySelectorAll(".print-value")) previous.remove();
  const fields = document.querySelectorAll(".details-grid input, #items input, #items select, #comment");
  for (const field of fields) {
    const value = document.createElement("span");
    value.className = "print-value";
    value.textContent = field.type === "date" ? displayDate : field.tagName === "SELECT" ? translateUnit(field.value) : field.value;
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
    setLocalizedText(empty, "historyEmpty");
    empty.hidden = estimates.length > 0;
    const template = document.querySelector("#history-entry-template");
    for (const entry of estimates) {
      const card = template.content.firstElementChild.cloneNode(true);
      translateTree(card);
      const fields = entry.draft.fields;
      const values = {
        number: t("estimateShort", { number: fields.number.trim() || "—" }),
        date: fields.date ? fields.date.split("-").reverse().join(".") : "—",
        client: fields.recipient.trim() || t("noClient"),
        total: formatMoney(entry.total, fields.currency),
        currency: currencyName(fields.currency)
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
    setLocalizedText(empty, "historyReadError");
  }
}

function setHistoryOpen(open) {
  setPanelOpen("history", open);
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
    setLocalizedText(historyStatus, "historySaved");
  } catch {
    setLocalizedText(historyStatus, "historySaveError");
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
      setLocalizedText(historyStatus, "historyMissing");
      return;
    }
    const number = entry.draft.fields.number.trim() || "—";
    if (button.dataset.historyAction === "delete") {
      if (!window.confirm(t("confirmHistoryDelete", { number }))) return;
      writeHistory(estimates.filter(item => item.id !== entry.id));
      renderHistory();
      (historyList.querySelector("button") || document.querySelector("#close-history")).focus();
      setLocalizedText(historyStatus, "historyDeleted");
    } else if (button.dataset.historyAction === "open") {
      if (!window.confirm(t("confirmHistoryOpen", { number }))) return;
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
        clearLocalizedText(document.querySelector("#print-title"));
      } finally {
        restoringDraft = false;
      }
      saveDraft();
      if (!catalogPanel.hidden) renderCatalog();
      setHistoryOpen(false);
      draftFields.recipient.focus();
      setLocalizedText(historyStatus, "historyOpened");
    }
  } catch {
    setLocalizedText(historyStatus, "historyActionError");
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
  setLocalizedText(document.querySelector("#catalog-save"), "catalogAdd");
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
    setLocalizedText(empty, entries.length ? "noMatches" : "catalogEmpty");
    const template = document.querySelector("#catalog-entry-template");
    for (const entry of matches) {
      const card = template.content.firstElementChild.cloneNode(true);
      translateTree(card);
      const values = { name: entry.name, unit: translateUnit(entry.unit), price: formatMoney(readNumber(entry.price)) };
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
    setLocalizedText(empty, "catalogReadError");
  }
}

catalogToggle.addEventListener("click", () => {
  const open = catalogPanel.hidden;
  setPanelOpen("catalog", open);
  if (open) {
    renderCatalog();
    catalogSearch.focus();
  }
});
document.querySelector("#close-catalog").addEventListener("click", () => {
  setPanelOpen("catalog", false);
  catalogToggle.focus();
});
catalogSearch.addEventListener("input", renderCatalog);
currencySelect.addEventListener("change", () => {
  if (!catalogPanel.hidden) renderCatalog();
});
document.querySelector("#catalog-cancel").addEventListener("click", () => {
  resetCatalogForm();
  setLocalizedText(catalogStatus, "editCancelled");
  catalogName.focus();
});

document.querySelector("#catalog-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = catalogName.value.trim();
  if (!name) {
    setLocalizedText(catalogStatus, "nameRequired");
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
        setLocalizedText(catalogStatus, "catalogEditMissing");
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
    setLocalizedText(catalogStatus, "catalogSaved");
    catalogName.focus();
  } catch {
    setLocalizedText(catalogStatus, "catalogSaveError");
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
      setLocalizedText(catalogStatus, "catalogMissing");
      return;
    }
    if (button.dataset.catalogAction === "add") {
      addItem(false, { name: entry.name, quantity: "1", unit: entry.unit, price: entry.price });
      setLocalizedText(catalogStatus, "itemAdded");
    } else if (button.dataset.catalogAction === "edit") {
      editingCatalogId = entry.id;
      catalogName.value = entry.name;
      catalogUnit.value = entry.unit;
      catalogPrice.value = entry.price;
      setLocalizedText(document.querySelector("#catalog-save"), "saveChanges");
      document.querySelector("#catalog-cancel").hidden = false;
      setLocalizedText(catalogStatus, "catalogEditing");
      catalogName.focus();
    } else if (button.dataset.catalogAction === "delete") {
      if (!window.confirm(t("confirmCatalogDelete", { name: entry.name }))) return;
      writeCatalog(entries.filter(item => item.id !== entry.id));
      if (editingCatalogId === entry.id) resetCatalogForm();
      renderCatalog();
      setLocalizedText(catalogStatus, "catalogDeleted");
      catalogSearch.focus();
    }
  } catch {
    setLocalizedText(catalogStatus, "catalogActionError");
  }
});


function applyLanguage(language) {
  if (!Object.hasOwn(translations, language)) return;
  currentLanguage = language;
  translateTree();
  updateLanguageControls();
  recalculate();
  renderHistory();
  renderCatalog();
  // Refresh generated output using labels in the selected language.
  preparePrint();
  if (!document.querySelector("#copy-fallback").hidden) {
    document.querySelector("#copy-text").value = buildMessage();
  }
  try {
    localStorage.setItem(languageKey, language);
    clearLocalizedText(document.querySelector("#language-status"));
  } catch {
    setLocalizedText(document.querySelector("#language-status"), "languageSaveError");
  }
}

for (const button of document.querySelectorAll("[data-language]")) {
  button.addEventListener("click", () => applyLanguage(button.dataset.language));
}

// Presentation only: native dialogs provide focus containment and an inert backdrop.
const panelDialogs = {
  history: { dialog: document.querySelector("#history-dialog"), panel: historyPanel, toggle: historyToggle },
  catalog: { dialog: document.querySelector("#catalog-dialog"), panel: catalogPanel, toggle: catalogToggle }
};

function setPanelOpen(name, open) {
  const current = panelDialogs[name];
  if (open) {
    for (const [otherName, other] of Object.entries(panelDialogs)) {
      if (otherName !== name && other.dialog.open) setPanelOpen(otherName, false);
    }
    current.panel.hidden = false;
    current.toggle.setAttribute("aria-expanded", "true");
    if (!current.dialog.open) current.dialog.showModal();
  } else {
    if (current.dialog.open) current.dialog.close();
    current.panel.hidden = true;
    current.toggle.setAttribute("aria-expanded", "false");
  }
}

for (const [name, current] of Object.entries(panelDialogs)) {
  current.dialog.addEventListener("cancel", event => {
    event.preventDefault();
    setPanelOpen(name, false);
  });
  current.dialog.addEventListener("close", () => {
    if (current.dialog.open) return;
    current.panel.hidden = true;
    current.toggle.setAttribute("aria-expanded", "false");
  });
  current.dialog.addEventListener("click", event => {
    if (event.target !== current.dialog) return;
    const rect = current.dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom) setPanelOpen(name, false);
  });
}

// Keep history feedback visible both inside the dialog and after closing it.
const historyModalStatus = document.createElement("p");
historyModalStatus.className = "draft-status";
historyModalStatus.setAttribute("role", "status");
historyPanel.querySelector(".section-heading").after(historyModalStatus);
new MutationObserver(() => {
  historyModalStatus.textContent = historyStatus.textContent;
}).observe(historyStatus, { childList: true, characterData: true, subtree: true });


// Daily tips have their own storage key and never modify estimate data.
const dailyTipKey = "smeta-daily-tip-v1";
const dailyTipKeys = Array.from({ length: 10 }, (_, index) => "dailyTip" + String(index + 1).padStart(2, "0"));
let dailyTipState = null;
let dailyTipTimer;

function updateDailyTip(now = new Date()) {
  // Use the device's local date, including after travel or daylight-saving changes.
  const date = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")].join("-");
  let saved = dailyTipState;
  try {
    const stored = JSON.parse(localStorage.getItem(dailyTipKey));
    if (stored && typeof stored.date === "string" &&
        Number.isInteger(stored.index) && stored.index >= 0 && stored.index < dailyTipKeys.length) saved = stored;
  } catch {
    // Missing, damaged or blocked storage must not affect the rest of the app.
  }
  if (!saved || saved.date !== date) {
    const count = dailyTipKeys.length;
    // Exclude the previous tip so a new day always brings a different one.
    let index = Math.floor(Math.random() * (saved ? count - 1 : count));
    if (saved && index >= saved.index) index += 1;
    saved = { date, index };
    try {
      localStorage.setItem(dailyTipKey, JSON.stringify(saved));
    } catch {
      // A fixed shuffled cycle stays stable across reloads even without storage.
      const day = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
      const fallbackOrder = [3, 7, 1, 8, 4, 0, 9, 5, 2, 6];
      saved.index = fallbackOrder[((day % count) + count) % count];
    }
  }
  dailyTipState = saved;
  setLocalizedText(document.querySelector("#daily-tip-text"), dailyTipKeys[saved.index]);
}

function refreshDailyTip() {
  clearTimeout(dailyTipTimer);
  const now = new Date();
  updateDailyTip(now);
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  dailyTipTimer = setTimeout(refreshDailyTip, midnight.getTime() - now.getTime() + 100);
}

refreshDailyTip();
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) refreshDailyTip();
});
window.addEventListener("focus", refreshDailyTip);
window.addEventListener("pageshow", refreshDailyTip);
window.addEventListener("storage", event => {
  if (event.key === dailyTipKey || event.key === null) refreshDailyTip();
});
