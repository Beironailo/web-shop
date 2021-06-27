function addLot(param, container) {

  let lotContainer = document.querySelector(container);
  let lot = document.createElement('div');
  lot.ClassName = "lot";

  let imgTag="<img src = \"" +  param.src + "\" class = \"lot_img\">";
  let nameTag = "<div class = \"name_text\">" + param.name + "</div>";
  let price = "<div >" + param.price + "</div>";

  let buttonsCont = document.createElement('div');

  let buttonW = document.createElement('button');
  buttonW.class = "white_button";
  buttonW.setAttribute("data-itemid", param.id);

  let buttonP = document.createElement('button');
  buttonP.class = "purple_button";
  buttonP.setAttribute("data-itemid", param.id);

  buttonsCont.innerHTML += buttonP + buttonW;

  lot.innerHTML += imgTag + nameTag + price + buttonsCont;
  lotContainer.innerHTML += lot;
}
