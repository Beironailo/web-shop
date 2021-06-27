function addlot(param,container){

  let lotContainer=document.querySelector(container);
  let lot=document.createElement('div');
  lot.ClassName="lot";

  let imgTag="<img src = \"" +  param.src + "\"class = \"lot_img\">";
  let nameTag = "<div class = \"name_text\">" + param.name + "</div>";
  let price = "<div >" + param.price + "</div>";
  let buttonsCont=createElement('div');
  let buttonW=createElement('button');
  buttonW.class = "white_button";
  buttonW.setAttribute("data-itemid", param.id);
  let buttonP = createElement('button');
  buttonW.class = "purple_button";
  buttonW.setAttribute("data-itemid", param.id);
  buttonsCont.innerHTML += buttonP+buttonW;

  lot.innerHTML += imgTag + nameTag + price + buttonsCont;
  lotContainer.innerHTML += lot;
}
