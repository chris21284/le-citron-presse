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
    localLastTimeChangedValue: null,
    noPhotoBase64: "data:image/webp;base64,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OnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE5IChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFCQTNCMTc5RjAwMzExRTg4Nzg3ODA5ODE5Q0NDOUM5IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFCQTNCMTdBRjAwMzExRTg4Nzg3ODA5ODE5Q0NDOUM5Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUJBM0IxNzdGMDAzMTFFODg3ODc4MDk4MTlDQ0M5QzkiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUJBM0IxNzhGMDAzMTFFODg3ODc4MDk4MTlDQ0M5QzkiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4="
  }),
  actions: {

    initRouter(router) { this.router = router; },
    initApp(app) { this.app = app; },

    //#region IMAGES STORE
    async fetchAllImages() {
      const r = require.context('../assets/images/', false, /\.webp$/);
      const prefix = (process.env.NODE_ENV === 'production') ? '/' : '';
      this.images = r.keys().reduce((json, value) => { json[value] = prefix + r(value); return json; }, {});
    },

    getImgById(id) {
      const idPath = "./" + id + ".webp";
      if (idPath in this.images)
        return this.images[idPath];
      return (process.env.NODE_ENV === 'production') ? this.noPhotoBase64 : this.images["./no-photo.webp"];
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
      console.log("CALL DB ARTICLES");
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

        let hasChanged = this.localLastTimeChangedValue < this.lastTimeChangedValue;
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