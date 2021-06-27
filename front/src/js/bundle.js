/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./front/src/js/cart.js":
/*!******************************!*\
  !*** ./front/src/js/cart.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"cartload\": () => (/* binding */ cartload),\n/* harmony export */   \"renderCart\": () => (/* binding */ renderCart),\n/* harmony export */   \"getItemInfo\": () => (/* binding */ getItemInfo),\n/* harmony export */   \"addToCart\": () => (/* binding */ addToCart)\n/* harmony export */ });\nlet cartload = [];\r\n\r\nfunction itemToHTML(item) {\r\n    let tag = document.createElement(\"div\");\r\n    tag.className = \"cart-list-item\";\r\n\r\n    let imgTag = document.createElement(\"img\");\r\n    imgTag.className = \"cart-item-img\";\r\n    imgTag.src = item.image;\r\n\r\n    let imgCont = document.createElement(\"div\");\r\n    imgCont.className = \"cart-item-img-cont\";\r\n    imgCont.append(imgTag);\r\n\r\n    let descCont = document.createElement(\"div\");\r\n    descCont.className = \"cart-item-desc\";\r\n    descCont.innerHTML = \"<div class='cart-item-desc-text'>\"\r\n                        + item.name\r\n                        + \"</div>\"\r\n                        + \"<div class='cart-item-desc-text' style='color: #545454'>\"\r\n                        + item.price\r\n                        + \"</div>\";\r\n\r\n    let counterTag = document.createElement(\"div\");\r\n    counterTag.className = \"cart-item-counter\";\r\n    let minusButton = document.createElement(\"div\");\r\n    minusButton.className = \"cart-item-minus\";\r\n    minusButton.innerHTML = \"-\";\r\n    let plusButton = document.createElement(\"div\");\r\n    plusButton.className = \"cart-item-plus\";\r\n    plusButton.innerHTML = \"+\";\r\n    let numberTag = document.createElement(\"div\");\r\n    numberTag.innerHTML = item.quantity;\r\n    minusButton.itemID = item.id;\r\n    plusButton.itemID = item.id;\r\n    minusButton.addEventListener(\"click\", function (event) {\r\n        //Уменьшаем колво\r\n        let button = event.target;\r\n        let index = cartload.findIndex(item => item.id === button.itemID);\r\n        cartload[index].quantity--;\r\n        renderCart();\r\n    });\r\n\r\n    plusButton.addEventListener(\"click\", function (event) {\r\n        //Увеличиваем колво\r\n        let button = event.target;\r\n        let index = cartload.findIndex(item => item.id === button.itemID);\r\n        cartload[index].quantity++;\r\n        renderCart();\r\n    });\r\n\r\n    counterTag.append(minusButton, numberTag, plusButton);\r\n\r\n    let closeTag = document.createElement(\"div\");\r\n    closeTag.className = \"cart-item-delete\";\r\n    closeTag.itemID = item.id;\r\n    closeTag.innerHTML = \"×\";\r\n    closeTag.state = -1;\r\n    closeTag.timer = 0;\r\n\r\n    closeTag.addEventListener(\"click\", function (event) {\r\n        //Удаляем товар из корзины\r\n        let button = event.target;\r\n\r\n        let index = cartload.findIndex(item => item.id === button.itemID);\r\n\r\n        if (button.state === -1) {\r\n            button.state = 5;\r\n            button.innerHTML = button.state.toString();\r\n            button.timer = setInterval(() => {\r\n                button.state -= 1;\r\n                button.innerHTML = button.state.toString();\r\n                if (button.state === 0) {\r\n                    destroyItem(index);\r\n                    clearInterval(button.timer);\r\n                }\r\n            }, 1000);\r\n        } else {\r\n            button.state = -1;\r\n            button.innerHTML = \"×\";\r\n            clearInterval(button.timer);\r\n        }\r\n\r\n    });\r\n\r\n    tag.append(imgCont, descCont, counterTag, closeTag);\r\n\r\n    return tag;\r\n}\r\n\r\nfunction destroyItem(index) {\r\n    cartload.splice(index, 1);\r\n    renderCart();\r\n}\r\n\r\n\r\nfunction renderCart() {\r\n    if (cartload.length === 0) {\r\n        document.querySelector(\".cart-header\").innerHTML = \"В корзине пусто(\";\r\n    }\r\n\r\n    let list = document.querySelector(\".cart-list\");\r\n    let sum = 0;\r\n    list.innerHTML = \"\";\r\n\r\n    cartload.forEach(item => {\r\n        let tag = itemToHTML(item);\r\n        sum += item.price * item.quantity;\r\n\r\n        list.append(tag);\r\n    });\r\n\r\n    document.querySelector(\".cart-sum\").innerHTML = \"Итого:\" + sum;\r\n}\r\n\r\nasync function getItemInfo(id) {\r\n    let url = '/itemInfo';\r\n\r\n    let response = await fetch(url, {\r\n        method: 'POST',\r\n        headers: {\r\n            'Content-Type': 'application/json; charset=utf-8'\r\n        },\r\n        body: JSON.stringify({\r\n            id: id\r\n        })\r\n    });\r\n\r\n    if (response.ok) {\r\n        let info = await response.json();\r\n\r\n        console.log(info);\r\n\r\n        return info;\r\n    }\r\n    else {\r\n        console.log(\"Ошибка при запросе:\" + response.status);\r\n\r\n        return undefined;\r\n    }\r\n\r\n}\r\n\r\nasync function addToCart(id) {\r\n    let info = await getItemInfo(id);\r\n\r\n    info.quantity = 1;\r\n    cartload.push(info);\r\n\r\n    renderCart();\r\n}\n\n//# sourceURL=webpack://front/./front/src/js/cart.js?");

/***/ }),

/***/ "./front/src/js/cart_listeners.js":
/*!****************************************!*\
  !*** ./front/src/js/cart_listeners.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart.js */ \"./front/src/js/cart.js\");\n\r\n\r\ndocument.querySelector(\".cart-cont\")\r\n        .addEventListener(\"mousedown\", function (event) {\r\n            const target = event.target;\r\n            const icon = document.querySelector(\".cart-icon\");\r\n\r\n            if (target.className === \"cart-cont\") {\r\n                target.style.display = \"none\";\r\n                icon.style.display = \"\";\r\n            }\r\n        });\r\n\r\n\r\ndocument.querySelector(\"#order-form\")\r\n        .addEventListener(\"submit\", function (event) {\r\n\r\n            event.preventDefault();\r\n\r\n        });\r\n\r\ndocument.querySelector(\".submit-button\")\r\n        .addEventListener(\"mouseover\", function (event) {\r\n            //Осветляем кнопку при наведении\r\n            const button = event.target;\r\n\r\n            button.style.backgroundColor = \"#323232\"\r\n\r\n        });\r\n\r\ndocument.querySelector(\".submit-button\")\r\n        .addEventListener(\"mouseout\", function (event) {\r\n            //Затемняем кнопку при ненаведении\r\n            const button = event.target;\r\n\r\n            button.style.backgroundColor = \"#1b1b1b\";\r\n\r\n        });\r\n\r\ndocument.querySelector(\".cart-icon\")\r\n        .addEventListener(\"click\", function (event) {\r\n            let button = document.querySelector(\".cart-icon\");\r\n            let cartWindow = document.querySelector(\".cart-cont\");\r\n\r\n            button.style.display = \"none\";\r\n            cartWindow.style.display = \"flex\";\r\n        });\r\n\r\ndocument.querySelector(\".cart-icon\")\r\n        .addEventListener(\"mouseover\", function () {\r\n            let button = document.querySelector(\".cart-icon\");\r\n\r\n            button.style.backgroundColor = \"#323232\";\r\n        });\r\n\r\ndocument.querySelector(\".cart-icon\")\r\n        .addEventListener(\"mouseout\", function () {\r\n            let button = document.querySelector(\".cart-icon\");\r\n\r\n            button.style.backgroundColor = \"#1b1b1b\";\r\n        });\r\n\r\ndocument.querySelector(\"#order-form\")\r\n        .addEventListener(\"submit\", async function (event) {\r\n            event.preventDefault();\r\n            console.log(\"Отправка\");\r\n            let form = document.querySelector(\"#order-form\");\r\n\r\n            let cart = new Map();\r\n\r\n            _cart_js__WEBPACK_IMPORTED_MODULE_0__.cartload.forEach(item => {\r\n\r\n                if (cart.has(item.id)) {\r\n                    cart.set(item.id, cart.get(item.id) + item.quantity);\r\n                }\r\n                else {\r\n                    cart.set(item.id, item.quantity);\r\n                }\r\n            });\r\n\r\n            console.log(cart);\r\n\r\n            console.log(\"Собираем тело\");\r\n\r\n            let order = {\r\n                name: form.elements.name.value,\r\n                email: form.elements.email.value,\r\n                phone: form.elements.phone.value,\r\n                products: Object.fromEntries(cart)\r\n            };\r\n\r\n            console.log(order);\r\n\r\n            let url = \"/sendOrder\";\r\n\r\n            console.log(JSON.stringify(order));\r\n\r\n            let response = await fetch(url, {\r\n                method: 'POST',\r\n                headers: {\r\n                    'Content-Type': 'application/json; charset=utf-8'\r\n                },\r\n                body: JSON.stringify(order)\r\n            });\r\n\r\n            console.log(response.json());\r\n\r\n            if (response.ok) {\r\n                console.log(\"Заказ отправлен: \" + response.status);\r\n            }\r\n            else {\r\n                console.log(\"Ошибка при отправлении:\" + response.status);\r\n            }\r\n\r\n        });\n\n//# sourceURL=webpack://front/./front/src/js/cart_listeners.js?");

/***/ }),

/***/ "./front/src/js/index.js":
/*!*******************************!*\
  !*** ./front/src/js/index.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cart_listeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart_listeners.js */ \"./front/src/js/cart_listeners.js\");\n/* harmony import */ var _search_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./search.js */ \"./front/src/js/search.js\");\n/* harmony import */ var _search_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_search_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _inspect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./inspect.js */ \"./front/src/js/inspect.js\");\n\r\n\r\n\n\n//# sourceURL=webpack://front/./front/src/js/index.js?");

/***/ }),

/***/ "./front/src/js/inspect.js":
/*!*********************************!*\
  !*** ./front/src/js/inspect.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cart.js */ \"./front/src/js/cart.js\");\n\r\n\r\n\r\ndocument.querySelector(\".inspect-tocart\")\r\n    .addEventListener(\"click\", async function (event) {\r\n        event.preventDefault();\r\n        let button = event.target;\r\n\r\n        await (0,_cart_js__WEBPACK_IMPORTED_MODULE_0__.addToCart)(3);\r\n    });\r\n\r\ndocument.querySelector(\".inspect-cont\")\r\n    .addEventListener(\"mousedown\", function (event) {\r\n        const target = event.target;\r\n\r\n        if (target.className === \"inspect-cont\") {\r\n            target.style.display = \"none\";\r\n        }\r\n    });\r\n\r\ndocument.querySelector(\".inspect-tocart\")\r\n    .addEventListener(\"mouseover\", function (event) {\r\n        //Осветляем кнопку при наведении\r\n        const button = event.target;\r\n\r\n        button.style.backgroundColor = \"#323232\"\r\n\r\n    });\r\n\r\ndocument.querySelector(\".inspect-tocart\")\r\n    .addEventListener(\"mouseout\", function (event) {\r\n        //Затемняем кнопку при ненаведении\r\n        const button = event.target;\r\n\r\n        button.style.backgroundColor = \"#1b1b1b\";\r\n    });\r\n\r\ndocument.querySelector(\".test-button\")\r\n    .addEventListener(\"click\", async function () {\r\n        await renderInspect(3);\r\n    });\r\n\r\nasync function renderInspect(id) {\r\n    let info = await (0,_cart_js__WEBPACK_IMPORTED_MODULE_0__.getItemInfo)(id);\r\n\r\n    let container = document.querySelector(\".inspect-cont\");\r\n\r\n    let imgTag = document.querySelector(\"#item-img\");\r\n    let nameTag = document.querySelector(\".inspect-desc-name\");\r\n    let descTag = document.querySelector(\".inspect-desc-text\");\r\n    let priceTag = document.querySelector(\".inspect-desc-price\");\r\n\r\n    imgTag.src = info.image;\r\n    nameTag.innerHTML = info.name;\r\n    descTag.innerHTML = info.description;\r\n    priceTag.innerHTML = info.price;\r\n\r\n    container.style.display = 'flex';\r\n}\n\n//# sourceURL=webpack://front/./front/src/js/inspect.js?");

/***/ }),

/***/ "./front/src/js/search.js":
/*!********************************!*\
  !*** ./front/src/js/search.js ***!
  \********************************/
/***/ (() => {

eval("document.querySelector(\".search-submit\")\r\n    .addEventListener(\"mouseover\", function (event) {\r\n        let target = event.target;\r\n\r\n        target.style.backgroundColor = \"#4f4f4f\";\r\n    });\r\n\r\ndocument.querySelector(\".search-submit\")\r\n    .addEventListener(\"mouseout\", function (event) {\r\n        let target = event.target;\r\n\r\n        target.style.backgroundColor = \"#1b1b1b\";\r\n    });\r\n\r\ndocument.querySelector(\".search-submit\")\r\n    .addEventListener(\"click\", async function () {\r\n        let bar = document.querySelector(\".search-bar\");\r\n        let text = bar.value;\r\n        bar.value = \"\";\r\n\r\n        if (text) {\r\n            let url = '/search';\r\n\r\n            let response = await fetch(url, {\r\n                method: 'POST',\r\n                headers: {\r\n                    'Content-Type':  'application/json; charset=utf-8'\r\n                },\r\n                body: JSON.stringify({\r\n                    search: text\r\n                })\r\n            });\r\n\r\n            if (response.ok) {\r\n                console.log(await response.json());\r\n                //Отображаем список\r\n            }\r\n            else {\r\n                console.log(\"Ошибка при запросе:\" + response.status);\r\n            }\r\n        }\r\n    });\n\n//# sourceURL=webpack://front/./front/src/js/search.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./front/src/js/index.js");
/******/ 	
/******/ })()
;