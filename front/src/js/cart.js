export let cartload = [];

export function setCartload(arr) {
    cartload = arr;
}

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
    numberTag.innerHTML = item.quantity;
    minusButton.itemID = item.id;
    plusButton.itemID = item.id;
    minusButton.addEventListener("click", function (event) {
        //Уменьшаем колво
        let button = event.target;
        let index = cartload.findIndex(item => item.id === button.itemID);
        cartload[index].quantity--;

        localStorage.setItem("cartload", JSON.stringify(cartload));
        renderCart();
    });

    plusButton.addEventListener("click", function (event) {
        //Увеличиваем колво
        let button = event.target;
        let index = cartload.findIndex(item => item.id === button.itemID);
        cartload[index].quantity++;

        localStorage.setItem("cartload", JSON.stringify(cartload));
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

    localStorage.setItem("cartload", JSON.stringify(cartload));
    renderCart();
}


export function renderCart() {
    if (cartload.length === 0) {
        document.querySelector(".cart-header").innerHTML = "В корзине пусто(";
    }

    let list = document.querySelector(".cart-list");
    let sum = 0;
    list.innerHTML = "";

    cartload.forEach(item => {
        let tag = itemToHTML(item);
        sum += item.price * item.quantity;

        list.append(tag);
    });

    document.querySelector(".cart-sum").innerHTML = "Итого:" + sum;
}

export async function getItemInfo(id) {
    let url = '/itemInfo';

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            id: id
        })
    });

    if (response.ok) {
        let info = await response.json();

        console.log(info);

        return info;
    }
    else {
        console.log("Ошибка при запросе:" + response.status);

        return undefined;
    }

}

export async function addToCart(id) {
    let info = await getItemInfo(id);

    info.quantity = 1;
    cartload.push(info);

    localStorage.setItem("cartload", JSON.stringify(cartload));

    renderCart();
}