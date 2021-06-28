import {addToCart, getItemInfo} from "./cart.js";
console.log('inspect.js');

document.querySelector(".inspect-tocart")
    .addEventListener("click", async function (event) {
        event.preventDefault();
        let button = event.target;

        await addToCart(button.dataset.itemid);
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

export async function renderInspect(id) {
    let info = await getItemInfo(id);

    let container = document.querySelector(".inspect-cont");

    let imgTag = document.querySelector("#item-img");
    let nameTag = document.querySelector(".inspect-desc-name");
    let descTag = document.querySelector(".inspect-desc-text");
    let priceTag = document.querySelector(".inspect-desc-price");
    let tocartButton = document.querySelector(".inspect-tocart");

    imgTag.src = info.image;
    nameTag.innerHTML = info.name;
    descTag.innerHTML = info.description;
    priceTag.innerHTML = info.price;
    tocartButton.setAttribute("data-itemid", info.id);

    container.style.display = 'flex';
}