const express = require('express');
const path = require("path");

const app = express();

app.use(express.static(__dirname + '/front'));
app.use(express.json());

let catalog = [
    {
        name: 'acc1',
        id: (Math.random() * 1000).toFixed(),
        image: 'https://sklad.freeimg.ru/rsynced_images/chessboard-153303_1280.png',
        description: 'sugar',
        category: 'accessories',
        price: 9999
    },
    {
        name: 'comp1',
        id: (Math.random() * 1000).toFixed(),
        image: 'https://sklad.freeimg.ru/rsynced_images/chessboard-153303_1280.png',
        description: 'sugar2',
        category: 'computers',
        price: 192999
    },
    {
        name: 'acc2',
        id: (Math.random() * 1000).toFixed(),
        image: 'https://sklad.freeimg.ru/rsynced_images/chessboard-153303_1280.png',
        description: 'sugar3',
        category: 'accessories',
        price: 339999
    }
];

app.get('/', (req, res) => {
    console.log('AAA');
    res.sendFile(path.join(__dirname, '/front/cart.html'));
});

app.post('/sendOrder', (req, res) => {
   console.log(req.body);
   res.send({
       code: 200,
       message: 'OK'
    });
});

app.post('/itemInfo', (req, res) => {

    let info = catalog.find(item => item.id === req.body.id);

    console.log(info);

    res.send(JSON.stringify(info));
});

app.get('/getCatalog', (req, res) => {

    console.log(JSON.stringify(catalog));
    res.send(JSON.stringify(catalog));

});

app.post('/search', (req, res) => {
    let search = req.body.search;
    console.log(search);

    let result = catalog.filter(item => item.name.includes(search));

    console.log(JSON.stringify(result));
    res.send(JSON.stringify(result));
});

console.log(__dirname);
console.log("Сервер готов");
app.listen(8080);