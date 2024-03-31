// ==UserScript==
// @name         coinkeeper
// @namespace    http://tampermonkey.net/
// @version      2024-03-03
// @description  extend coinkeeper functionality
// @author       You
// @match        https://coinkeeper.me/feed
// @icon         https://coinkeeper.me/favicon.ico
// @grant        none
// ==/UserScript==
(() => {
  console.log('coinkeeper script loaded');
  function addStyle() {
    const CATEGORY = '.ck-category-block + .ck-dashboard-card ';
    const category = document.querySelector(CATEGORY);
    if (category) {
      const titles = category.querySelectorAll(
        '.ck-category__title',
      ) as NodeListOf<HTMLDivElement>;

      titles.forEach((title) => {
        title.addEventListener('click', () => {
          console.log('Title clicked!');
          if (title.style.color === 'red') {
            title.style.color = 'black';
          } else {
            title.style.color = 'red';
          }
        });
      });
    } else {
      console.log('Category element not found');
    }
  }
  window.onload = async function () {
    addStyle();
  };
})();
