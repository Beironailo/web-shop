import {addLot} from "./catalog.js";

document.querySelector(".search-submit")
    .addEventListener("mouseover", function (event) {
        let target = event.target;

        target.style.backgroundColor = "#4f4f4f";
    });

document.querySelector(".search-submit")
    .addEventListener("mouseout", function (event) {
        let target = event.target;

        target.style.backgroundColor = "#1b1b1b";
    });

document.querySelector(".search-submit")
    .addEventListener("click", async function () {
        let bar = document.querySelector(".search-bar");
        let text = bar.value;
        bar.value = "";

        if (text) {
            let url = '/search';
            let token = document.querySelector("input[name=csrfmiddlewaretoken]").value;

            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type':  'application/json; charset=utf-8',
                    'csrfmiddlewaretoken': token
                },
                body: JSON.stringify({
                    search: text
                })
            });

            if (response.ok) {
                let results = await response.json();
                console.log(results);
                //Отображаем список
                renderSearchResult(results);
            }
            else {
                console.log("Ошибка при запросе:" + response.status);
            }
        }
    });

function renderSearchResult(items) {
    let cont = document.querySelector(".results-cont");

    document.querySelector("#results").innerHTML = "";
    items.forEach(item => {
        addLot(item, 'results');
    });

    cont.style.display = "";
}