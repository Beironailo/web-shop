export let cartload = [];

function itemToHTML(item) {
    let tag = document.createElement("div");
    tag.className = "cart-list-item";

    let imgTag = document.createElement("img");
    imgTag.className = "cart-item-img";
    imgTag.src = item.image;

    let imgCont = document.createElement("div");
    imgCont.className = "cart-item-img-cont";
    imgCont.append(imgTag);

    let descCont = document.createElement("div");
    descCont.className = "cart-item-desc";
    descCont.innerHTML = "<div class='cart-item-desc-text'>"
                        + item.name
                        + "</div>"
                        + "<div class='cart-item-desc-text' style='color: #545454'>"
                        + item.price
                        + "</div>";

    let counterTag = document.createElement("div");
    counterTag.className = "cart-item-counter";
    let minusButton = document.createElement("div");
    minusButton.className = "cart-item-minus";
    minusButton.innerHTML = "-";
    let plusButton = document.createElement("div");
    plusButton.className = "cart-item-plus";
    plusButton.innerHTML = "+";
    let numberTag = document.createElement("div");
    numberTag.innerHTML = item.count;
    minusButton.itemID = item.id;
    plusButton.itemID = item.id;
    minusButton.addEventListener("click", function (event) {
        //Уменьшаем колво
        let button = event.target;
        let index = cartload.findIndex(item => item.id === button.itemID);
        cartload[index].count--;
        renderCart();
    });

    plusButton.addEventListener("click", function (event) {
        //Увеличиваем колво
        let button = event.target;
        let index = cartload.findIndex(item => item.id === button.itemID);
        cartload[index].count++;
        renderCart();
    });

    counterTag.append(minusButton, numberTag, plusButton);

    let closeTag = document.createElement("div");
    closeTag.className = "cart-item-delete";
    closeTag.itemID = item.id;
    closeTag.innerHTML = "×";
    closeTag.state = -1;
    closeTag.timer = 0;

    closeTag.addEventListener("click", function (event) {
        //Удаляем товар из корзины
        let button = event.target;

        let index = cartload.findIndex(item => item.id === button.itemID);

        if (button.state === -1) {
            button.state = 5;
            button.innerHTML = button.state.toString();
            button.timer = setInterval(() => {
                button.state -= 1;
                button.innerHTML = button.state.toString();
                if (button.state === 0) {
                    destroyItem(index);
                    clearInterval(button.timer);
                }
            }, 1000);
        } else {
            button.state = -1;
            button.innerHTML = "×";
            clearInterval(button.timer);
        }

    });

    tag.append(imgCont, descCont, counterTag, closeTag);

    return tag;
}

function destroyItem(index) {
    cartload.splice(index, 1);
    renderCart();
}


export function renderCart() {
    if (cartload.length === 0) {
        document.querySelector(".cart-header").innerHTML = "В корзине пусто(";
    }

    let list = document.querySelector(".cart-list");
    let sum = 0;
    list.innerHTML = "";


    document.cookie = "cartload=" + JSON.stringify(cartload);
    console.log(document.cookie);

    cartload.forEach(item => {
        let tag = itemToHTML(item);
        sum += item.price * item.count;

        list.append(tag);
    });

    document.querySelector(".cart-sum").innerHTML = "Итого:" + sum;
}










export function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}