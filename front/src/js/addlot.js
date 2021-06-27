function addlot(param){

  let lotContainer=document.querySelector(param.container);
  let lot=document.createElement('div');
  lot.ClassName="lot";
  lot.id=param.id;
  let imgTag="<img src= \""+ param.src +"\"class=\"lot_img\">";
  let nameTag = "<div class=\"name_text\">" +param.name +"</div>";
  let price = "<div >"+param.price+"</div>";
  let buttons="<div><button type=\"button\" name=\"purple_button\"  class=\"purple_button\">Купить</button><button type=\"button\" name=\"white_button\" class=\"white_button\">Подробнее</button></div>";
  lot.innerHTML += imgTag+nameTag+price+buttons;
  lotContainer.innerHTML +=lot;
}
