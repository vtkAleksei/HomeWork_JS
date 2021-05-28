const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    //Изменил начальную строку, чтобы сделать пример с значением по умолчанию для функции
    { title: 'Product' },
];

//Функция без написания фигурных скобок и return, для price добавлено значение по умолчанию
const renderGoodsItem = (title, price = 0) => `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    //Функция без написания фигурных скобок
    goodsList.forEach(element => document.querySelector('.goods-list').innerHTML += element);
}
//Функция без написания фигурных скобок
const init = () => renderGoodsList(goods)

window.onload = init