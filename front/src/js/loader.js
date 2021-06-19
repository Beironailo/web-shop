import * as Cart from "./cart.js"

Cart.cartload.push({
    id: "111",
    count: 1,
    name: "Name",
    image: "https://sklad.freeimg.ru/rsynced_images/chessboard-153303_1280.png",
    price: "17,990",
    desc: "lorem"
});
Cart.cartload.push({
    id: "112",
    count: 1,
    name: "Name2",
    image: "https://sklad.freeimg.ru/rsynced_images/chessboard-153303_1280.png",
    price: "18,990",
    desc: "lorem"
});
Cart.cartload.push({
    id: "113",
    count: 1,
    name: "Name3",
    image: "https://sklad.freeimg.ru/rsynced_images/chessboard-153303_1280.png",
    price: "19,990",
    desc: "lorem"
});

Cart.renderCart();
