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

            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type':  'application/json; charset=utf-8'
                },
                body: JSON.stringify({
                    search: text
                })
            });

            if (response.ok) {
                console.log(await response.json());
                //Отображаем список
            }
            else {
                console.log("Ошибка при запросе:" + response.status);
            }
        }
    });