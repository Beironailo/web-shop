const express = require('express');
const path = require("path");

const app = express();

app.use(express.static(__dirname + '/front'));
app.use(express.json());

app.get('/', (req, res) => {
    console.log('AAA');
    res.sendFile(path.join(__dirname, '/front/cart.html'));
});

app.post('/sendOrder', (req, res) => {
   console.log(req.body);
   res.sendStatus(200);
});

app.post('/itemInfo', (req, res) => {
    let info = {
        name: 'auf',
        id: req.body.id,
        image: 'https://sklad.freeimg.ru/rsynced_images/chessboard-153303_1280.png',
        description: 'sugar',
        category: 'acc',
        price: 19999
    }

    console.log(info);

    res.send(JSON.stringify(info));
});

app.post('/search', (req, res) => {
    let search = req.body.search;
    console.log(search);

    let result = [
        {
            name: 'auf',
            id: (Math.random() * 1000).toFixed(),
            image: 'https://sklad.freeimg.ru/rsynced_images/chessboard-153303_1280.png',
            description: 'sugar',
            category: 'acc',
            price: 19999
        },
        {
            name: 'auf2',
            id: (Math.random() * 1000).toFixed(),
            image: 'https://sklad.freeimg.ru/rsynced_images/chessboard-153303_1280.png',
            description: 'sugar2',
            category: 'bcc',
            price: 29999
        },
        {
            name: 'auf3',
            id: (Math.random() * 1000).toFixed(),
            image: 'https://sklad.freeimg.ru/rsynced_images/chessboard-153303_1280.png',
            description: 'sugar3',
            category: 'acc',
            price: 39999
        }
    ];

    res.send(JSON.stringify(result));
});

console.log(__dirname);
console.log("Сервер готов");
app.listen(8080);