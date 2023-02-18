<template>
  <header>
    <router-link to="/">
      <img :src="logoSmall" class="logo-small">
      <img :src="title" class="logo-title">
    </router-link>
    <nav>
      <span class="link">
        <router-link to="/">
          Articles
        </router-link>
      </span>
      <span class="link">
        <router-link to="/infos" >
          Infos
        </router-link>
      </span>
      <!--<span class="link">
        <router-link to="/cart">
          <span class="material-symbols-outlined">
            shopping_cart
          </span>
          Caddy
          <div class="number" v-if="showNumber">{{numberOfElements}}</div>
        </router-link>
      </span>-->
    </nav>
    <div class="main-caddy-mobile" v-if="showCaddyButton">
      <router-link to="/cart">
        <img src="./assets/caddy.png" >
        <div class="number">{{numberOfElements}}</div>
      </router-link>
    </div>
    <div class="main-caddy" v-if="showCaddyButton" @click="changeDisplayCaddyMobile">
        <img src="./assets/caddy.png" >
        <div class="number">{{numberOfElements}}</div>
    </div>
    <cp-cart v-if="showCartMobile" @update-cart-count="updateCartCount" @remove-cart="onRemoveCart"/>
    <img src="./assets/biomaison.png" class="bio-image">
  </header>
</template>

<script>
import CpCart from "@/views/CpCart.vue";

export default {
  name: 'CpHeader',
  components: {CpCart},
  props: {
    numberOfElements: {
      type: Number,
      default: 0
    },
    showMobileCart: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    showCaddyButton() {
      return this.numberOfElements != 0;
    },
    showCartMobile() {
      return this.showCaddyButton && this.showMobileCart;
    },
    srcDir() {
      return require.context('./assets/', false, /\.png$/);
    },
    logoSmall() {
      return this.srcDir('./logo-small-sans-titre.png');
    },
    title() {
      return this.srcDir('./titre.png');
    }
  },
  methods: {
    changeDisplayCaddyMobile(event) {
      event.stopPropagation();
      this.$emit("open-mobile-cart", this.showMobileCart);
    },
    updateCartCount() {
      this.$emit("update-cart-count");
    },
    onRemoveCart() {
      this.$emit('remove-cart');
    }
  }
}
</script>

<style>
  header {
    display: flex;
    align-items: center;
    background-color: var(--main-green);
    padding-top: 5px;
    padding-bottom: 5px;
  }

  header img.logo-small {
    /**height: 100px;
    margin-left: 10px;
    margin-top: 45px;*/
    height: 290px;
    margin-left: -55px;
    margin-top: 125px;
  }

  header img.logo-title {
    height: 75px;
    margin-left: -236px;
    margin-bottom: 167px;
  }

  header img.bio-image {
    margin-right: -34px;
    height: 180px;
    margin-top: 65px;
  }

  header nav {
    display: flex;
    margin: auto auto 0 auto;
    padding: 0px 30px;
  }

  header nav a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    position: relative;
  }
  header nav .link .material-symbols-outlined {
    font-size: 30px;
  }

  header nav .link {
    margin: 10px;
  }

  header nav .link span {
    margin-right: 10px;
  }

  header .link nav span {
    font-size: 36px;
  }

  header nav a .number {
    display: block;
    position: absolute;
    top: 3px;
    right: -3px;
    font-size: 12px;
    background-color: #18cff9;
    color: white;
    border: 1px solid grey;
    border-radius: 50%;
    padding: 2px 7px;
  }

  header .cart {
    --color-bg-cart: #ffe374;
    position: absolute;
    border-radius: 10px;
    top: 67px;
    right: 20px;
    height: calc(100vh - 80px);
    width: 400px;
    box-shadow: 3px 5px 7px 1px;
  }

  header .cart:before {
    content: '\25C0';
    rotate: 90deg;
    font-size: 19px;
    border-color: transparent;
    position: absolute;
    top: -18px;
    right: 139px;
  }

  header .cart ul {
    padding-left: 0px;
    min-height: calc(100% - 115px);
    height: calc(100% - 115px);
    overflow-x: auto;
  }

  header .main-caddy,
  header .main-caddy-mobile {
    background-color: var(--green-button);
    border-radius: 50%;
    display: flex;
    position: relative;
    height: 50px;
    width: 50px;
    align-items: center;
    justify-content: center;
  }

  header .main-caddy-mobile,
  header .main-caddy-mobile .number {
    visibility: hidden;
    width: 0px;
  }

  header .main-caddy:hover,
  header .main-caddy-mobile:hover {
    filter: brightness(0.8);
  }

  header .main-caddy img,
  header .main-caddy-mobile img{
    height: 80%;
    width: 80%;
  }

  header .main-caddy .number,
  header .main-caddy-mobile .number{
    display: block;
    position: absolute;
    top: -6px;
    right: -9px;
    font-weight: bolder;
    font-size: 12px;
    background-color: var(--main-background);
    color: white;
    border: 1px solid var(--main-background);
    border-radius: 50%;
    padding: 2px 7px;
  }

  @media only screen and (max-width: 650px) {
    header img.bio-image {
      display: none;
    }
    header nav {
      margin-left: auto;
      padding: 0 15px;
    }
    header img.logo-small {
      height: 173px;
      margin-left: -55px;
      margin-top: 125px;
    }

    header .main-caddy,
    header .main-caddy .number {
      visibility: hidden;
      width: 0px;
    }

    header .main-caddy-mobile {
      visibility: visible;
      width: 50px;
      margin-right: 14px;
    }

    header .main-caddy-mobile .number {
      visibility: visible;
      padding-right: 14px;
    }
  }
</style>
