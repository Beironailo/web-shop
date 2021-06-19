export let cartload = [];
let timer;

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
                        + "<div class='cart-item-desc-text'>"
                        + item.price
                        + "</div>";

    let closeTag = document.createElement("div");
    closeTag.className = "cart-item-delete";
    closeTag.itemID = item.id;
    closeTag.innerHTML = "X";
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
            button.innerHTML = "X";
            clearInterval(button.timer);
        }

    });

    tag.append(imgCont, descCont, closeTag);

    return tag;
}

function destroyItem(index) {
    cartload.splice(index, 1);
    renderCart();
}


export function renderCart() {
    let list = document.querySelector(".cart-list");

    list.innerHTML = "";

    cartload.forEach(item => {
        let tag = itemToHTML(item);

        list.append(tag);
    })
}