const apiUrl = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsItem {
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.id = id;
    }
    render() {
        return `<div class="goods-item" itemId="${this.id}"><h3>${this.title}</h3><p>${this.price}</p><button class="cart-button addBtn" type="button" itemId="${this.id}">Добавить в корзину</button></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }

    async fetchGoods() {
        const responce = await window.fetch(`${apiUrl}/catalogData.json`);
        if (responce.ok) {
            const catalogItems = await responce.json();
            this.goods = catalogItems;
        }
        else {
            alert('Ошибка соединения');
        }
    }

    render() {
        let listHtml = "";
        this.goods.forEach((good) => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
            listHtml += goodItem.render();
        });
        document.querySelector(".goods-list").innerHTML = listHtml;
    }

    //подсчет суммы товаров в каталоге
    /*priceAllGoods() {
        let sum = 0;
        this.goods.forEach((good) => {
            sum += good.price;
        });
        document.querySelector(".goods-list").insertAdjacentHTML("afterend", `<p class = "goods-sum">Товары на сумму: ${sum} руб.</p>`);
    }*/
}

// класс для корзины товаров
class CartList {
    constructor() {
        this.catalogCart = [];
    }
    render() {
        let listHtml = "";
        this.catalogCart.forEach((product) => {
            const productItem = new CartItem(product.product_name, product.price, product.id_product);
            listHtml += productItem.addProduct();
        });
        document.querySelector(".carts-list").innerHTML = listHtml;
    }
}

// класс для элемента корзины товаров
class CartItem {
    constructor(title, price, id) {
        this.title = title;
        this.price = price;
        this.id = id;
    }
    addProduct() {
        return `<div class="cart-item" itemId="${this.id}"><h3>${this.title}</h3><p>${this.price}</p><button class="cart-button delBtn" type="button" itemId="${this.id}">Удалить из корзины</button></div>`;
    }
    delProduct() {

    }
}

const init = async () => {
    const list = new GoodsList();
    await list.fetchGoods();
    list.render();
    //list.priceAllGoods();


    const cart = new CartList();

    let btnAddCart = document.querySelectorAll(".addBtn");
    btnAddCart.forEach(function (btn) {
        btn.addEventListener('click', addInCart);
    });

    function addInCart() {
        list.goods.forEach(good => {
            if (good.id_product == this.attributes.itemid.value) {
                cart.catalogCart.push(good);
            }
        });
        cart.render();
    };

    setInterval(qwe, 1000)
    function qwe() {
        let btnDelCart = document.querySelectorAll(".delBtn");
        btnDelCart.forEach(function (btn) {
            btn.addEventListener('click', delFromCart);
        });
    }

    function delFromCart() {
        let kol = 0;
        for (let i = 0; i < cart.catalogCart.length; i++) {
            if (cart.catalogCart[i].id_product == this.attributes.itemid.value) {
                kol += 1;
                if (kol == 1) {
                    cart.catalogCart.splice(i, 1);
                    cart.render();
                }
            }
        }
    };
};

window.onload = init;
