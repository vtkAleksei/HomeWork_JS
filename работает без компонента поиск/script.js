const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

Vue.component('goods-list', {
  props: ['goods'],
  template: `
  <div class="goods-list">
    <noData v-if="goods.length == 0"></noData>
    <goods-item v-for="goodItem in goods" v-bind:goodPropItem="goodItem" v-if="goods.length>0"></goods-item>
  </div>
  `
})

Vue.component('noData', {
  template: `
    <div class="noData">
      <p class="noData__text">По запросу ни чего не найдено</p>
    </div>
  `
})

Vue.component('goods-item', {
  props: ['goodPropItem'],
  template: `
  <div class="goods-item">
    <h3>{{goodPropItem.product_name}}</h3>
    <p>{{goodPropItem.price}}</p>
    <cart-button v-on:click.native="addGoodCart(goodPropItem)"></cart-button>
  </div>
  `,
  methods: {
    addGoodCart: function (good) {
      app.cartGoods.push(good);
    },
  }

})

Vue.component('cart-button', {
  template: `
    <button class="cart-button" type="button">В корзину</button>
  `
})

Vue.component('carts-list', {
  props: ['cartgoods'],
  template: `
  <div class="carts-list">
    <cart-item v-for="cartgood in cartgoods" v-bind:goodPropCartItem="cartgood"></cart-item>
  </div>
  `
})

Vue.component('cart-item', {
  props: ['goodPropCartItem'],
  template: `
  <div class="cart-item">
    <h3>{{goodPropCartItem.product_name}}</h3>
    <p>{{goodPropCartItem.price}}</p>
    <cart-buttons v-on:click.native="delGoodCart(goodPropCartItem)"></cart-buttons>
  </div>
  `,
  methods: {
    delGoodCart: function (goodCart) {
      app.cartGoods.splice(app.cartGoods.indexOf(goodCart), 1);
    },
  }

})

Vue.component('cart-buttons', {
  template: `
    <button class="cart-button" type="button">Удалить</button>
  `
})

const app = new Vue({
  el: "#app",
  data: {
    goods: [],
    filteredGoods: [],
    cartGoods: [],
    searchLine: '',
  },

  methods: {
    async getProducts() {
      const responce = await fetch(`${API_URL}/catalogData.json`);
      if (responce.ok) {
        const catalogItems = await responce.json();
        this.goods = catalogItems;
        this.filteredGoods = catalogItems;
      } else {
        alert("Ошибка при соединении с сервером");
      }
    },

    filterGoods() {
      const regExp = new RegExp(this.searchLine, 'i')
      this.filteredGoods = this.goods.filter(good => regExp.test(good.product_name))
    },
  },

  async mounted() {
    await this.getProducts()
    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', this.filterGoods);
  }
});