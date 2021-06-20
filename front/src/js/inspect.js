function initInspection(itemId) {
    let itemName = document.querySelector(".class-desc-name");
    let itemDesc = document.querySelector(".inspect-desc-text");
    let itemImg = document.querySelector("#item-img");
    let itemPrice = document.querySelector(".inspect-desc-price");

    //Запрашиваем и вставляем инфу о товаре
}

document.querySelector(".inspect-tocart")
    .addEventListener("click", function (event) {
        event.preventDefault();

        //Добавить в корзину
        console.log("Добавили в корзину")
    });

document.querySelector(".inspect-cont")
    .addEventListener("mousedown", function (event) {
        const target = event.target;

        if (target.className === "inspect-cont") {
            target.style.display = "none";
        }
    });

document.querySelector(".inspect-tocart")
    .addEventListener("mouseover", function (event) {
        //Осветляем кнопку при наведении
        const button = event.target;

        button.style.backgroundColor = "#323232"

    });

document.querySelector(".inspect-tocart")
    .addEventListener("mouseout", function (event) {
        //Затемняем кнопку при ненаведении
        const button = event.target;

        button.style.backgroundColor = "#1b1b1b";
    });