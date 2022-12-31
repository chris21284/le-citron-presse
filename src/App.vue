<template>
  <CpHeader :number-of-elements="numberElementInCart"/>
  <div class="main-content">
    <router-view @add-cart="onAddToCart"/>
  </div>
  <CpFooter/>
</template>

<style>
body {
  margin: 0px;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
header {
  height: 60px;
  position: sticky;
  top: 0px;
}
footer {
  height: 50px;
}

.main-content {
  min-height: calc(100vh - 110px); /* 100px for header and 50px for footer */
  height: calc(100vh - 110px);
  overflow-y: auto;
  background: aliceblue url("./assets/background.png");
}
</style>
<script>
import CpHeader from "@/CpHeader";
import CpFooter from "@/CpFooter";
export default {
  components: {CpHeader, CpFooter},
  data() {
    return {numberElementInCart: 0};
  },
  mounted() {
    this.checkLocalStorage();
  },
  methods: {
    checkLocalStorage() {
        let cart = localStorage.getItem('myCart');
        if(cart == null) {
          this.numberElementInCart = 0;
        }
        else {
          cart = JSON.parse(cart);
          this.numberElementInCart = Object.keys(cart).length;
        }
    },

    onAddToCart(id) {
      const nbElem = document.getElementById('nb-elem' + id);
      let cart = localStorage.getItem('myCart');
      if(cart == null) {
        cart = {};
      }
      else {
        cart = JSON.parse(cart);
      }
      
      cart[id] = parseInt(nbElem.value);
      localStorage.setItem('myCart', JSON.stringify(cart));
      this.checkLocalStorage();
    }
  }
}
</script>