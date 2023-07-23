<template>
  <!-- <CpHeader :number-of-elements="numberElementInCart" :show-mobile-cart="showCaddy" @updateCartCount="updateCartCount" @click="onClick"
            @open-mobile-cart="onOpenMobileCart" @remove-cart="onRemoveCart"/> -->
  
  <HeaderComponent :isShrinked="isShrinked" :currentPath="getCurrentPath()" />
  
  <div class="bg expand" @click="onClick">
    <div class="bg_color expand"></div>
  </div>

  <div class="container" @click="onClick" :class="[isShrinked ? 'container-shrink':'']">
    <div class="main-content" @click="onClick">
      <router-view @add-cart="onAddToCart" @updateCartCount="updateCartCount" @remove-cart="onRemoveCart" />
    </div>

    <FooterComponent @click="onClick" />
  </div>
  
</template>

<script>
  //import CpHeader from "@/CpHeader";
  import HeaderComponent from "@/views/v2/HeaderComponent"
  import FooterComponent from "./views/v2/FooterComponent.vue";
  // import CpFooter from "@/CpFooter";
  import { useStore } from "./utils/store";

  export default {
    components: { HeaderComponent, FooterComponent }, //{CpHeader, CpFooter},
    data() {
      return {
        numberElementInCart: 0,
        showCaddy: false,
        isShrinked: false,
        containerElement: null,

        store: null
      };
    },
    created() {
      this.store = useStore();
      this.store.fetchAllImages(); //stores all images on startup
    },
    mounted() {
      this.checkLocalStorage();

      this.containerElement = document.querySelector('.container');
      this.containerElement.addEventListener('scroll', this.updateScroll);
    },
    methods: {
      getCurrentPath() {
        return this.$route.path;
      },

      updateScroll() {
        this.isShrinked = this.containerElement.scrollTop > 80;
      },

      checkLocalStorage() {
        let cart = localStorage.getItem(process.env.VUE_APP_CART);
        if (cart == null) {
          this.numberElementInCart = 0;
        }
        else {
          cart = JSON.parse(cart);
          this.numberElementInCart = Object.keys(cart).length;
        }
      },
      onAddToCart(article, nbElement) {
        const id = article._id;
        const nbElem = nbElement || document.getElementById('nb-elem' + id).innerHTML;
        let cart = localStorage.getItem(process.env.VUE_APP_CART);
        if (cart == null) {
          cart = {};
        }
        else {
          cart = JSON.parse(cart);
        }

        cart[id] = { id: id, name: article.title, nbElement: parseInt(nbElem), photo: article.photos?.[0] };
        localStorage.setItem(process.env.VUE_APP_CART, JSON.stringify(cart));
        this.updateCartCount();
      },
      updateCartCount() {
        this.checkLocalStorage();
      },
      onRemoveCart() {
        localStorage.setItem(process.env.VUE_APP_CART, JSON.stringify({}))
        this.checkLocalStorage();
      },
      onClick() {
        this.showCaddy = false;
      },
      onOpenMobileCart(showCaddy) {
        if (this.$router.currentRoute.value.path === '/cart') {
          this.showCaddy = false; // on n'affiche pas le caddy en overlay si l'on est en mode mobile
        }
        else {
          this.showCaddy = !showCaddy;
        }
      }
    }
  }
</script>

<style>
  body {
    margin: 0px;
    overflow: hidden;

    -webkit-user-select: none;
    user-select: none;
  }

  :root {    
    --white: #ffffff;
    --black: #000000;
    --yellow: #fedc6e;
    --light-green: #96bf8f;
    --green: #71886d;
    --lighter-green: #afdfa7;
  }

  #app {
    font-family: ps-regular, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, p {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  .bg {
    z-index: -100;
  }

  .bg_color {
    position: relative;
    background-color: var(--yellow);
    z-index: -100;
  }

  .expand {
    position: fixed;
    min-width: 100vw;
    min-height: 100vh;
  }

  .container {
    position: absolute;
    top: 5rem;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    margin-left: 5px;
    margin-right: 5px;
    transition: all 250ms cubic-bezier(0.33, 1, 0.6, 1);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .container-shrink {
    top: 4rem;
  }

  .main-content {
    padding-top: 5rem;
    padding-bottom: 5rem;

    background-image: url("./assets/v2/background_repeating_3.png");
    background-size: 20rem;
    background-color: var(--yellow);
  }

  /* SCROLLBAR */
  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: var(--green);
    border-radius: 1rem;
    margin: 3rem;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--light-green);
    border-radius: 1rem;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--lighter-green);
  }

</style>