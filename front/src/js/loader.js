import {cartload, renderCart, setCartload} from "./cart.js";

if(!localStorage.getItem("cartload")) {

    cartload.push({
        id: "111",
        quantity: 1,
        name: "Name",
        image: "https://sklad.freeimg.ru/rsynced_images/chessboard-153303_1280.png",
        price: 17990,
        description: "lorem",
        category: 'A'
    });
    cartload.push({
        id: "112",
        quantity: 1,
        name: "Name2",
        image: "https://sklad.freeimg.ru/rsynced_images/chessboard-153303_1280.png",
        price: 18990,
        description: "lorem",
        category: 'B'
    });
    cartload.push({
        id: "113",
        quantity: 1,
        name: "Name3",
        image: "https://sklad.freeimg.ru/rsynced_images/chessboard-153303_1280.png",
        price: 19990,
        description: "lorem",
        category: 'A'
    });

} else {

    try {

        let store = JSON.parse(localStorage.getItem("cartload"));

        setCartload(store);
    } catch (e) {
        console.log(e.message);
    }
}

renderCart();
