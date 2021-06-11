const API_URL = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

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

    addGoodCart: function(good) {
      this.cartGoods.push(good);
    },

    delGoodCart: function(goodCart){
      this.cartGoods.splice(this.cartGoods.indexOf(goodCart), 1);
    },

  },

  async mounted() {
    await this.getProducts()
    const searchButton = document.querySelector('.search-button');
    searchButton.addEventListener('click', this.filterGoods);
  }
});