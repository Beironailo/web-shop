const express = require('express');
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(__dirname + '/front'));
app.use(express.json());
app.use(bodyParser.text());

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
})

console.log(__dirname);
console.log("Сервер готов");
app.listen(8080);