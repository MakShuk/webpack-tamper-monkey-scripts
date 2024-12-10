function hasWrapperLockClass(element) {
  try {
    if (!element || !element.classList) {
      return false;
    }

    // Преобразуем classList в массив и проверяем каждый класс
    return Array.from(element.classList).some((className) =>
      className.toLowerCase().includes("wrapperlock")
    );
  } catch (error) {
    console.error("Ошибка при проверке классов:", error);
    return false;
  }
}

function getElementByXPath(xpath) {
  try {
    // Экранируем XPath, заменяя двойные кавычки на одинарные если нужно
    const safeXPath = xpath.replace(/"/g, "'");

    const result = document.evaluate(
      safeXPath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );

    return result.singleNodeValue;
  } catch (error) {
    console.error("Ошибка при поиске элемента:", error);
    return null;
  }
}

function getLastActiveArea() {
  let lastActiveArea = 1;
  for (let i = 1; i <= 24; i++) {
    const xpath = `//*[@id="improvements-map-icon-${i}"]`;
    console.log(xpath);
    const element = getElementByXPath(xpath);
    const isActive = element && !hasWrapperLockClass(element);
    console.log(isActive);
    if (isActive) {
      lastActiveArea = i;
    } else {
      break;
    }
  }
  return lastActiveArea;
}

function getPriceFromXPath(xpath) {
  try {
    // Создаем XPath evaluator
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    );

    // Получаем найденный элемент
    const element = result.singleNodeValue;

    if (!element) {
      console.error("Элемент не найден");
      return null;
    }

    // Получаем текст элемента
    const text = element.textContent;

    // Ищем число в тексте
    const match = text.match(/\d+(?:\.\d+)?/);

    if (match) {
      return parseFloat(match[0]);
    }

    return null;
  } catch (error) {
    console.error("Произошла ошибка:", error);
    return null;
  }
}

function getOptimalPriceIndex(lastNumberArea) {
  const priceArray = [];

  for (let i = 1; i <= lastNumberArea; i++) {
    const xpath = `//*[@id="improvements-map-stage"]/div[${i}]/button/div[2]/div/div[2]/span`;
    const price = getPriceFromXPath(xpath);
    priceArray.push(price / (i * 100));
  }

  return priceArray.indexOf(Math.min(...priceArray)) + 1;
}

function start() {
  const lastNumberArea = getLastActiveArea();
  const optimalPriceIndex = getOptimalPriceIndex(lastNumberArea);

  const xpath = `//*[@id="improvements-map-stage"]/div[${optimalPriceIndex}]/button/div[2]/div/div[2]/span`;
  const clickButton = getElementByXPath(xpath);
  clickButton.click();

  setTimeout(() => {
    getElementByXPath(
      `//*[@id="clicker-game-page-container"]/div[6]/div[4]/button`
    ).click();
  }, 1000);
    
     setTimeout(() => {
       getElementByXPath(
         `//*[@id="clicker-game-page-container"]/div[6]/div[1]/button`
       ).click();
     }, 5000);
}

start();

setInterval(() => {
    start();
    }, 60000*1);