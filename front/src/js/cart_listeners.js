
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