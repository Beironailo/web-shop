import * as Cart from './cart.js'


document.querySelector(".cart-cont")
        .addEventListener("mousedown", function (event) {
            if (event.target.className === "cart-cont") {
                event.target.style.display = "none";
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
