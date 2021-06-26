import {cartload} from "./cart.js";

document.querySelector(".cart-cont")
        .addEventListener("mousedown", function (event) {
            const target = event.target;
            const icon = document.querySelector(".cart-icon");

            if (target.className === "cart-cont") {
                target.style.display = "none";
                icon.style.display = "";
            }
        });


document.querySelector("#order-form")
        .addEventListener("submit", function (event) {

            event.preventDefault();

        });

document.querySelector(".submit-button")
        .addEventListener("mouseover", function (event) {
            //Осветляем кнопку при наведении
            const button = event.target;

            button.style.backgroundColor = "#323232"

        });

document.querySelector(".submit-button")
        .addEventListener("mouseout", function (event) {
            //Затемняем кнопку при ненаведении
            const button = event.target;

            button.style.backgroundColor = "#1b1b1b";

        });

document.querySelector(".cart-icon")
        .addEventListener("click", function (event) {
            let button = document.querySelector(".cart-icon");
            let cartWindow = document.querySelector(".cart-cont");

            button.style.display = "none";
            cartWindow.style.display = "flex";
        });

document.querySelector(".cart-icon")
        .addEventListener("mouseover", function () {
            let button = document.querySelector(".cart-icon");

            button.style.backgroundColor = "#323232";
        });

document.querySelector(".cart-icon")
        .addEventListener("mouseout", function () {
            let button = document.querySelector(".cart-icon");

            button.style.backgroundColor = "#1b1b1b";
        });

document.querySelector("#order-form")
        .addEventListener("submit", async function (event) {
            event.preventDefault();
            console.log("Отправка");
            let form = document.querySelector("#order-form");

            let cart = new Map();

            cartload.forEach(item => {

                if (cart.has(item.id)) {
                    cart.set(item.id, cart.get(item.id) + item.quantity);
                }
                else {
                    cart.set(item.id, item.quantity);
                }
            });

            console.log(cart);

            console.log("Собираем тело");

            let order = {
                name: form.elements.name.value,
                email: form.elements.email.value,
                phone: form.elements.phone.value,
                products: Object.fromEntries(cart)
            };

            console.log(order);

            let url = "/sendOrder";

            console.log(JSON.stringify(order));

            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(order)
            });

            console.log(response.json());

            if (response.ok) {
                console.log("Заказ отправлен: " + response.status);
            }
            else {
                console.log("Ошибка при отправлении:" + response.status);
            }

        })