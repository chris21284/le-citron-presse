<template>
  <CpHeader :number-of-elements="numberElementInCart" :show-mobile-cart="showCaddy" @updateCartCount="updateCartCount" @click="onClick"
            @open-mobile-cart="onOpenMobileCart" @remove-cart="onRemoveCart"/>
  <div class="main-content" @click="onClick">
    <router-view @add-cart="onAddToCart" @updateCartCount="updateCartCount" @remove-cart="onRemoveCart" />
  </div>
  <CpFooter @click="onClick"/>
</template>

<style>
body {
  margin: 0px;
  overflow: hidden;
}

:root {
  --main-green: #accdc1;
  --green-button: #71886D;
  --green-second-button: #4a6f48;
  --main-background: #FEDC6E;
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
  z-index: 10;
}
footer {
  width: calc(100% - 20px);
  height: 40px;
}

.main-content {
  min-height: calc(100vh - 110px); /* 100px for header and 50px for footer */
  height: calc(100vh - 110px);
  overflow-y: auto;
  background: var(--main-background) url("./assets/background.png");
}

ul {
  padding-left: 15px;
}

li {
  list-style-type: none;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAATCAYAAACZZ43PAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9TpSIVBwuKOGSoThZERRxtFYpQIdQKrTqYvPQPmjQkKS6OgmvBwZ/FqoOLs64OroIg+APi6uKk6CIl3pcUWsT44PI+znvncN99gNCoMM3qmgA03TbTyYSYza2KoVcICGKQKiozy4hLUgq+6+seAb7fxXiW/70/V5+atxgQEInnmGHaxBvEM5u2wXmfOMJKskp8TjxuUoPEj1xXPH7jXHRZ4JkRM5OeJ44Qi8UOVjqYlUyNeJo4qmo65QtZj1XOW5y1So21+uQvDOf1lWWuU40giUUsQYIIBTWUUYGNGO06KRbSdJ7w8Q+7folcCrnKYORYQBUaZNcP/ge/Z2sVpia9pHAC6H5xnI9RILQLNOuO833sOM0TIPgMXOltf7UBzH6SXm9r0SOgfxu4uG5ryh5wuQMMPRmyKbtSkEooFID3M/qmHDBwC/SueXNrneP0AcjQrFI3wMEhMFak7HWfd/d0zu3fO635/QAY73KDmBmckgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAOxAAADsQBlSsOGwAAAAd0SU1FB+cCAxcKCEK9qFkAAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAADTUlEQVQ4y41UXU9cZRB+3vP9sbss7LKFrQXbQrCkRGnQtIJovDBq1AtNTPTCO70wMd77G4xG0foRSU1LawItih9ETOoGpaYRb6q0iaatCyywSJd1OefA7nnf94wXyLYhJjKTTDKZPMnMM88MsAcbmTj99uUrl2hhZZ6+zk14/ws4NfbJKx+cfa93J/9u5ltaKhaoFtZoYSlP74+8o+/UtN3g3Mz31JrOQkiB6Z9yKJaKE/nF/NObW8Gb9/c80NWUTONwW0cIgGEnAMDJc+/u6+8dLKYbMpBCgAsOHnIQRfA2PZQqt9AQT+JIZzf8LR9f5caNV198ndc76D82WOzuOAoAEDwE5xyeHyDwfcScOFwrBi45wjBEMp7E8Xv7QwBMA4BvchNe18EuqIqyPZdlwjRNGIYBIUMEZR8gwNBM+L4Py7Jw8MBhAIACAJ2H7onpmn4HEwoABsMwkGpKQTNULK7OrywU89jwKgiCTZi6iS8vfr6sXpgam+3p7Mlapg3GGMC2aWH/uq7rsEwL1bAan7vxm1GurK+pivpEzImjWtuKay3plj4hJVZvFSEiCcswYZs2DN2AqqpgTEE8lsCRzqMgUHj8vgfZyZGhi5ZpXbVtF2x49KNnHdt9MqgGk2BA0m14OdXY/Hg2sx8t6RY4tgNF3eZaCI6ff72Mh/oeZsOjH7/Qtr/93O01nhnqbm7MDMWc+KOu7SDmJpBwEnBdG7btwnVdaJoGL9jAD79M86ceecao62B8cmw223xXn206UBUFjCnbfIBABDCFwXEcpFNpWJaJ5bVltLW2s/oWDrS297Vmskg1pZBMNiKRaIDjONANHSLiKHvryBf+xPX8dZTK6zB1E59eGH6t3sG1P+boUFsHVFUFAEREkEJASA4v8PBXaRXLqwW/9Hf5rUQ88dK+dObuE70D9fHx4+w01cIqERFFRBTJiCIZkYwi4lJQjdco2AwoX7hJ41Pnr2CXYnD1xtyJQnERMhIACExhYAqDwhg0RYWu6XU9qKra/J8nfPqLU2+srC2RlIIiKUlKQUJwqla3aL1Sot9vXqPRybNnduPYncn5qdGZgWOD/YKHqIVViCjChl/BQnH+0nOPPT+wl+eDDz+7/Uj2Yv8AiUVsYGc0ze0AAAAASUVORK5CYII=);
  background-repeat: no-repeat;
  background-position: -1px -1px;
  padding-left: 25px;
  height: 22px;
}
</style>
<script>
import CpHeader from "@/CpHeader";
import CpFooter from "@/CpFooter";
export default {
  components: {CpHeader, CpFooter},
  data() {
    return {
      numberElementInCart: 0,
      showCaddy: false,
    };
  },
  mounted() {
    this.checkLocalStorage();
  },
  methods: {
    checkLocalStorage() {
        let cart = localStorage.getItem(process.env.VUE_APP_CART);
        if(cart == null) {
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
      if(cart == null) {
        cart = {};
      }
      else {
        cart = JSON.parse(cart);
      }
      
      cart[id] = {id: id, name: article.title, nbElement: parseInt(nbElem), photo: article.photos?.[0]};
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
      if(this.$router.currentRoute.value.path === '/cart') {
        this.showCaddy = false; // on n'affiche pas le caddy en overlay si l'on est en mode mobile
      }
      else {
        this.showCaddy = !showCaddy;
      }
    }
  }
}
</script>