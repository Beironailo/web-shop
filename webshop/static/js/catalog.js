import {renderInspect} from "./inspect.js";
import {addToCart, cartload} from "./cart.js";

export function renderCatalog(items) {
    console.log(items);
    items.forEach((item) => {
        addLot(item, item.category);
    });
}

export function addLot(param, category) {

    let lotContainer = document.querySelector("#" + category);
    let lot = document.createElement('div');
    lot.className = "lot";

    let imgTag="<img src=\"" +  param.image + "\" class=\"lot_img\" alt=\"\">";
    let nameTag = "<div class=\"name_text\">" + param.name + "</div>";
    let price = "<div>" + param.price + "</div>";

    let buttonsCont = document.createElement('div');

    let buttonW = document.createElement('button');
    buttonW.className = "white_button";
    buttonW.setAttribute("data-itemid", param.id);
    buttonW.innerHTML = 'Подробнее';
    
    buttonW.addEventListener("click", function (event) {
        renderInspect(event.target.dataset.itemid).then();
    });

    let buttonP = document.createElement('button');
    buttonP.className = "purple_button";
    buttonP.setAttribute("data-itemid", param.id);
    if (cartload.some(item =>
        item.id === buttonP.getAttribute("data-itemid")
    )) {
        buttonP.innerHTML = 'В корзине';
    } else {
        buttonP.innerHTML = 'Купить';

        buttonP.addEventListener("click", function (event) {
            let button = event.target;
            addToCart(button.dataset.itemid).then();

            button.innerHTML = 'В корзине';
        }, {once: true});
    }

    buttonsCont.append(buttonP, buttonW);

    lot.innerHTML += imgTag + nameTag + price
    lot.append(buttonsCont);
    lotContainer.append(lot);
}

export async function getCatalog() {
    let url = "products/all";

    let response = await fetch(url, {
        method: 'GET'
    });

    if (response.ok) {
        try {

            let info = await response.json();

            renderCatalog(info);
        } catch (e) {
            console.log(e.message);
        }
    }
}