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
    .addEventListener("click", function () {
        let bar = document.querySelector(".search-bar");
        let text = bar.value;
        bar.value = "";

        if (text) {
            //Запрашиваем выборку
        }
    })