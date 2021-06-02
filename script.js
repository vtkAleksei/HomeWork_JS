// класс для корзины товаров
class CartList {
    constructor() {
        this.catalogCart = [];
    }
    openCart() { }
    closeCart() { }
    totalSum() { }
    render() { }
}

// класс для элемента корзины товаров
class CartItem {
    constructor(title, price, quantity) {
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }
    render() { }
    addProduct() { }
    delProduct() { }
    totalNumberProduct() { }
}

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    fetchGoods() {
        this.goods = [
            { title: "Shirt", price: 150 },
            { title: "Socks", price: 50 },
            { title: "Jacket", price: 350 },
            { title: "Shoes", price: 350 },
        ];
    }

    render() {
        let listHtml = "";
        this.goods.forEach((good) => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector(".goods-list").innerHTML = listHtml;
    }

    //подсчет суммы товаров в каталоге
    priceAllGoods() {
        let sum = 0;
        this.goods.forEach((good) => {
            sum += good.price;
        });
        document.querySelector(".goods-list").insertAdjacentHTML("afterend", `<p class = "goods-sum">Товары на сумму: ${sum} руб.</p>`);
    }
}



const init = () => {
    const list = new GoodsList();
    list.fetchGoods();
    list.render();
    list.priceAllGoods();
};

window.onload = init;
