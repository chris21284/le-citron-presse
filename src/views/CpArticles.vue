<template>
  <div class="list-article">
    <cp-preview v-for="article in articles"
      :id="getId(article)"
      :key="getId(article)"
      :article="article"
      @add-cart="onAddCart(getId(article))"/>
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
    onAddCart(id) {
      this.$emit("add-cart", id);
    },
    getId(article) {
      return article._id.toString();
    }
  },
  mounted() {
    this.getListOfArticles();
  },
}
</script>

<style>
  .list-article {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(410px, 1fr));
    gap: 10px;
    /* padding: 10px; */
    text-decoration: none;
    margin: 10px auto;
    height: 100%;
    max-width: 1400px;
    width: 100%;
  }

  .list-article router-link {
    background-color: blueviolet;
  }

  .list-article a:-webkit-any-link {
    text-decoration: none;
  }

  @media only screen and (max-width: 800px) {
    .list-article {
      grid-template-columns: repeat(1, 760px);
      max-width: unset;
      width: 100vh;
    }
  }
</style>
