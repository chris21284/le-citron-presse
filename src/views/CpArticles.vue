<template>
  <div class="list-article">
    <cp-preview v-for="article in articles"
      :id="getId(article)"
      :key="getId(article)"
      :article="article"
      :nb-to-order="getNbFor(article)"
      @add-cart="onAddCart"/>
  </div>
</template>

<script>
import { app, credentials } from "../utils/mongo.client";
import CpPreview from "@/views/CpPreview";

export default {
  name: 'CpArticles',
  components: {
    CpPreview,
  },
  data() {
    return {
      articles: [],
      cart: undefined,
    }
  },
  methods: {
    async getListOfArticles() {
      const user = await app.logIn(credentials);
      const listOfArticles = user.functions.getAllArticles();
      listOfArticles.then((resp) => {
        this.articles = resp;
      });
    },
    onAddCart(article, nbToOrder) {
      this.$emit("add-cart", article, nbToOrder);
    },
    getId(article) {
      return article._id.toString();
    },
    getNbFor(article) {
      const nb = this.cart?.[article._id.toString()]?.['nbElement'];
      return nb || 1;
    },
    getCart() {
      let cart = localStorage.getItem(process.env.VUE_APP_CART);
      if(cart == null) {
        cart = {};
      }
      else {
        cart = JSON.parse(cart);
      }
      return cart;
    },
  },
  mounted() {
    this.getListOfArticles();
  },
  created() {
    this.cart = this.getCart();
  }
}
</script>

<style>
  .list-article {
    display: grid;
    justify-items: stretch;
    grid-template-columns: 1fr 1fr 1fr;/*repeat(auto-fit, minmax(410px, 1fr));*/
    gap: 10px;
    /* padding: 10px; */
    text-decoration: none;
    margin: 10px auto;
    height: 100%;
    max-width: 1400px;
    width: calc(100% - 10px);
  }

  .list-article router-link {
    background-color: blueviolet;
  }

  .list-article a:-webkit-any-link {
    text-decoration: none;
  }

  @media only screen and (max-width: 1100px) {
    .list-article {
      grid-template-columns: 1fr 1fr; /*repeat(1, 760px);*/
      max-width: calc(100% - 20px);
    }
  }

  @media only screen and (max-width: 800px) {
    .list-article {
      grid-template-columns: 1fr; /*repeat(1, 760px);*/
      max-width: calc(100% - 20px);
      width: 100vh;
    }
  }
</style>
