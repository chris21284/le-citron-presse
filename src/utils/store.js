import { defineStore } from "pinia";
import { app, credentials } from "@/utils/mongo.client";

export const useStore = defineStore({
  id: "app",
  state: () => ({
    router: null,
    app: null,
    articles: [],
    images: [],
    cart: {},
    savedEventCards: [],
    updateCartEvent: null,
    lastTimeChangedValue: null,
    localLastTimeChangedValue: null
  }),
  actions: {

    initRouter(router) { this.router = router; },
    initApp(app) { this.app = app; },

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
      if (this.updateCartEvent != null) return;
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
      else if (!nbElmt)
          nbElmt = 1;

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

    //#region CACHE SYSTEM
    async getLastTimeChanged() {
      const user = await app.logIn(credentials);
      const response = await user.functions.getLastTimeChanged();
      return response;
    },

    saveEventCards(eventCards) { this.savedEventCards = eventCards; },

    saveToCache() {
      this.localLastTimeChangedValue = Date.now();

      let data = {};
      data['articles'] = this.articles;
      data['eventCards'] = this.savedEventCards;

      localStorage.setItem(process.env.VUE_APP_LAST_DATA_CHANGES, this.localLastTimeChangedValue);
      localStorage.setItem(process.env.VUE_APP_CACHE_DATA, JSON.stringify(data));
    },

    loadFromCache(forceManualLoading = false) {
      this.localLastTimeChangedValue = localStorage.getItem(process.env.VUE_APP_LAST_DATA_CHANGES);
      let localData = localStorage.getItem(process.env.VUE_APP_CACHE_DATA);
      let data = localData ? JSON.parse(localData) : null;
      console.log("data ? => " + data);

      //last time db is true whenever the local data last changes time is older than db most recent changes 
      if (!data || forceManualLoading) {
        //load manually and save
        console.log("loading manually");
        this.savedEventCards = null;
        this.initGetAllArticles().then(() => this.saveToCache());
        return;
      }

      this.articles = data['articles'];
      this.savedEventCards = data['eventCards'];
    },

    checkLastTimeDbChanged() {
      let lastChanges = localStorage.getItem(process.env.VUE_APP_LAST_DATA_CHANGES);
      this.localLastTimeChangedValue = lastChanges ? JSON.parse(lastChanges) : null;

      this.app.showLoadingSpinner();

      const lastTimeDb = this.getLastTimeChanged();
      lastTimeDb.then((response) => {
        this.lastTimeChangedValue = Date.parse(response["lastTimeChanged"]);

        if (!this.localLastTimeChangedValue || !this.lastTimeChangedValue) return false;

        var hasChanged = this.localLastTimeChangedValue < this.lastTimeChangedValue;
        console.log("checking Last Time DB changed : " + hasChanged);

        if (hasChanged) {
          this.loadFromCache(true);
          this.app.rerender();
        }
        
        this.app.hideLoadingSpinner();
        return hasChanged;       
      }).catch(() => { return false; });
    }
    //#endregion
  }
});