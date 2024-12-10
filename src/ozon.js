// Константы селекторов для улучшенной читаемости и centralization
const SELECTORS = {
  POINTS: "section > div.ba0.b221-a0.b221-a1",
  CARDS: "#paginatorContent > div > div > div",
  PRICE: "span.c3022-a1.tsHeadline500Medium.c3022-b1.c3022-a6",
  NAME: "div > div.sj7_23 > a > div > span",
  HREF: "div > div.sj7_23 > a"
};

/**
 * Очищает строковое значение от пробелов и баллов
 * @param {string} value - Исходное значение
 * @returns {number} Преобразованное числовое значение
 */
function parseNumericValue(value) {
  return parseInt(value.replace(/\s/g, "").replace("баллов", ""), 10);
}

/**
 * Проверяет, содержит ли элемент текст о баллах
 * @param {HTMLElement} element - Проверяемый элемент
 * @returns {boolean} Результат проверки
 */
function hasPointsText(element) {
  return element.textContent.includes("баллов");
}

/**
 * Извлекает данные о баллах и цене для карточки
 * @param {HTMLElement} card - Элемент карточки
 * @returns {Object|null} Объект с данными или null
 */
function extractCardData(card) {
  try {

    const pointElement = card.querySelector(SELECTORS.POINTS);
    const priceElement = card.querySelector(SELECTORS.PRICE);
    const nameElement = card.querySelector(SELECTORS.NAME);
    const hrefElement = card.querySelector(SELECTORS.HREF);

    console.log({ pointElement, priceElement, nameElement });
    if (!pointElement || !priceElement || !nameElement 
      || !hrefElement
    ) return null;

    const points = parseNumericValue(pointElement.textContent);
    const price = parseNumericValue(priceElement.textContent);``

    return {
      name: nameElement.textContent,
      point: points,
      price: price,
      percentage: +((points / price) * 100).toFixed(2),
      href: hrefElement.href
    };
  } catch (error) {
    console.error("Ошибка при извлечении данных карточки:", error);
    return null;
  }
}


/**
 * Фильтрует элементы по минимальному проценту
 * @param {Array} items - Массив элементов
 */
function filterByPercentage(items, minPercentage) {
  return items.filter((item) => item.percentage >= minPercentage);
}




/**
 * Собирает данные о карточках с баллами
 * @returns {Array} Массив объектов с данными карточек
 */
function collectPointCards() {
  const cards = document.querySelectorAll(SELECTORS.CARDS);
  const pointCards = Array.from(cards).filter(hasPointsText);
  return pointCards
    .map(extractCardData)
    .filter((card) => card !== null && card.point > 0);
}

// Основная функция для получения данных
function getPointCardData() {
  const filteredCards = filterByPercentage(collectPointCards(), 10);
  return filteredCards;
}

// Выполнение и возврат результата
const pointCardData = getPointCardData();
console.table(pointCardData);
