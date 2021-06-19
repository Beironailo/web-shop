const express = require('express');
const app = express();

app.use(express.static(__dirname + '/front'));

app.get("/", function (request, response) {
    response.sendFile('cart.html');
})

console.log("Сервер готов");
app.listen(8080);