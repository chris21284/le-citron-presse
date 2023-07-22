<template>
  <div class="cart" @click="clickOnCart">
    <ul>
      <li class="item" v-for="item in cart" :key="item">
        <button class="material-symbols-outlined add-to-cart close" @click="deleteElement($event,item.id)">
          close
        </button>
        <img :src="getPhoto(item.photo)"  />
        {{item.name}}
        <div class="buttons-line-cart">
          <button class="material-symbols-outlined add-to-cart" @click="decrementNumberOfElement($event,item.id)">
            remove
          </button>
          <div class="nb-elements">{{item.nbElement}}</div>
          <button class="material-symbols-outlined add-to-cart" @click="incrementNumberOfElement($event,item.id)">
            add
          </button>
        </div>
      </li>
    </ul>
    <div class="buttons-cart">
      <div @click="generateMail">Un devis ? <span class="material-symbols-outlined">mail</span>
      </div>
      <!--<div>
        <span class="material-symbols-outlined">production_quantity_limits</span>
        Commander</div>-->
    </div>
  </div>
</template>
/* eslint-disable */
<script>
export default {
  name: 'CpCart',
  components: {
  },
  data() {
    return {
      cart: undefined,
      images: undefined,
    }
  },
  computed: {
    items() {
      //JSON cart
      if (this.cart == null) return null;
      else {
        return this.cart;
      }
    }
  },
  methods: {
    importAll(r) {
      const prefix = (process.env.NODE_ENV === 'production') ? '/' : '';
      return r.keys().reduce((json, value) => {json[value] = prefix + r(value); return json; }, {});
    },
    getPhoto(name) {
      if (name != null && name.length > 0) {
//        return srcDir('./' + name + '.webp');
        return this.images['./' + name + '.webp'];
      }
      return '';
    },
    generateMail() {
      var formattedBody = "Bonjour,\nPourriez vous me faire un devis pour la commande ci dessous : \n";
      let item = undefined;
      for(let itemId of Object.keys(this.cart)) {
        item = this.cart[itemId];
        formattedBody += "\t- " + item.nbElement + " " + item.name + "\n";
      }
      formattedBody += "\nEn vous remerciant";
      var mailToLink = "mailto:" + process.env.VUE_APP_LE_CITRON_PRESSE_MAIL + "?subject=Devis&body=" + encodeURIComponent(formattedBody);
      this.$emit('remove-cart');
      window.open(mailToLink, '_blank');

    },
    saveUpdatedCart(itemId, cartItem) {
      this.cart[itemId] = cartItem;
      localStorage.setItem(process.env.VUE_APP_CART, JSON.stringify(this.cart));
    },
    decrementNumberOfElement(event, itemId) {
      event.stopPropagation();
      let cartItem = this.cart[itemId];
      let nbElem = cartItem['nbElement'];
      if(nbElem > 1) {
        cartItem = {...cartItem, nbElement: --nbElem};
      }
      this.saveUpdatedCart(itemId, cartItem);
    },
    incrementNumberOfElement(event, itemId) {
      event.stopPropagation();
      let cartItem = this.cart[itemId];
      let nbElem = cartItem['nbElement'];
      cartItem = {...cartItem, nbElement: ++nbElem};
      this.saveUpdatedCart(itemId, cartItem);
    },
    deleteElement(event, itemId) {
      event.stopPropagation();
      delete this.cart[itemId];
      localStorage.setItem(process.env.VUE_APP_CART, JSON.stringify(this.cart));
      this.$emit("update-cart-count");
    },
    clickOnCart(event) {
      event.stopPropagation();
    }
  },
  created() {
    this.cart = JSON.parse(localStorage.getItem(process.env.VUE_APP_CART));
    this.images = this.importAll(require.context('../assets/images/', false, /\.webp$/));
  },
}
</script>

<style>
/* 
.cart {
  --color-bg-cart: aliceblue;
  background-color: var(--color-bg-cart);
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.cart:before {
  color: var(--color-bg-cart);
}

.cart ul {
  padding-left: 15px;
  width: calc(100% - 50px);
  margin-left: auto;
  margin-right: auto;
}

.cart li {
  background-position: 1px 25px;
}

.cart li img {
  height: 100%;
  object-fit: cover;
  width: 65px;
  margin-right: 10px;
}

.cart li.item {
  margin-bottom: 10px;
  display: flex;
  height: 75px;
  align-items: center;
}

.cart li.item .buttons-line-cart {
  display: flex;
  margin-left: auto;
  gap: 5px;
}

.cart li.item button.add-to-cart {
  background-color: var(--green-second-button);
  border: 0px;
  border-radius: 50px;
  height: 28px;
  color: white;
  font-size: 20px;
  padding: 5px;
}

.cart li.item button.add-to-cart.close {
  height: 100%;
  border-radius: 10px 0px 0px 10px;
}

.cart li.item .buttons-line-cart .nb-elements {
  width: 40px;
  margin-top: 3px;
  display: flex;
  height: 21px;
  background-color: var(--green-second-button);
  border: unset;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart .buttons-cart {
  height: 55px;
  display: flex;
  gap: 10px;
  justify-content: center;
}

.cart .buttons-cart div {
  background-color: var(--green-button);
  display: flex;
  position: relative;
  text-transform: uppercase;
  height: 45px;
  color: white;
  width: 180px;
  align-items: center;
  justify-content: space-evenly;
  padding: 2px;
}

.cart .buttons-cart div:hover {
  cursor: pointer;
  border: 2px #a5c0a0 solid;
  padding: 0px;
}

.cart .buttons-cart div .material-symbols-outlined {
  margin: 10px;
} */

</style>
