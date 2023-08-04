import { defineStore } from "pinia";
import { app, credentials } from "@/utils/mongo.client";

export const useStore = defineStore({
  id: "app",
  state: () => ({
    router: null,
    articles: [],
    images: [],
    cart: {},
    updateCartEvent: null
  }),
  actions: {

    initRouter(router) { this.router = router; },

    //#region IMAGES STORE
    async fetchAllImages() {
      //replace with import all images from db, maybe not finally see HomePage.vue todo list
      const r = require.context('../assets/v2/images/', false, /\.webp$/);
      const prefix = (process.env.NODE_ENV === 'production') ? '/' : '';
      this.images = r.keys().reduce((json, value) => { json[value] = prefix + r(value); return json; }, {});
    },

    getImgById(id) {
      const idPath = "./" + id + ".webp";
      if (idPath in this.images)
        return this.images[idPath];
      return this.images["./no-photo.webp"];
    },
    //#endregion

    //#region CART STORE
    initUpdateEvent() {
      this.updateCartEvent = new CustomEvent(process.env.VUE_APP_CART_UPDATE);
    },

    updateCart() {
      let localCart = localStorage.getItem(process.env.VUE_APP_CART);
      this.cart = localCart ? JSON.parse(localCart) : {};

      window.dispatchEvent( this.updateCartEvent );
    },

    getCartNumberOfItems() { return this.cart ? Object.keys(this.cart).length : 0; },

    setLocalStorageItems() {
      if (!this.cart) return;
      localStorage.setItem(process.env.VUE_APP_CART, JSON.stringify(this.cart));
      this.updateCart();
    },

    clearCart() {
      this.cart = {};
      this.setLocalStorageItems();
    },

    addArticleToCart(article, nbElement) {
      const id = article._id;
      let nbElmt = nbElement;

      if (this.cart[id])
          nbElmt = nbElement ? this.cart[id]['nbElement'] + parseInt(nbElement) : this.cart[id]['nbElement'] + 1;

      this.cart[id] = { id: id, name: article.title, nbElement: parseInt(nbElmt), photo: article.photos?.[0], price: article.price };
      this.setLocalStorageItems();
    },

    //if nbElement is not given, it will try to add one on an item already in cart
    addItemToCart(cartItem, nbElement) {
      const id = cartItem['id'];
      let nbElmt = nbElement;

      if (!nbElmt)
        nbElmt = this.cart[id] ? this.cart[id]['nbElement'] + 1 : 1;

      if (parseInt(nbElmt) <= 0) {
        this.deleteItemFromCart(cartItem);
        return;
      }

      this.cart[id] = { id: id, name: cartItem.name, nbElement: parseInt(nbElmt), photo: cartItem.photo, price: cartItem.price };
      this.setLocalStorageItems();
    },

    removeOneItemFromCart(cartItem) {
      const id = cartItem['id'];
      let nbElmt = this.cart[id]['nbElement'] - 1;

      if (nbElmt >= 1) {
        this.cart[id] = { id: id, name: cartItem.name, nbElement: parseInt(nbElmt), photo: cartItem.photo, price: cartItem.price };
        this.setLocalStorageItems();
        return;
      }
      
      this.deleteItemFromCart(cartItem); //if this article is 0 times in cart, it will be deleted from cart
    },

    deleteItemFromCart(cartItem) {
      delete this.cart[cartItem['id']];
      this.setLocalStorageItems();
    },
    //#endregion

    //#region ARTICLES STORE
    async initGetAllArticles() {
      const user = await app.logIn(credentials);
      const listOfArticles = user.functions.getAllArticles();
      listOfArticles.then((resp) => {
        this.articles = resp;
      });
    },

    getArticleById(articleId) { return this.articles.find(article => this.getId(article) === articleId.toString() ); },

    getId(obj) { return obj._id.toString(); },

    redirectToArticle(articleId) { if(articleId) this.router.push({ path: "/articles/" + articleId }); },
    //#endregion
  }
});