<template>
  articlessssss

  <ul>
    <li
      v-for="article in articles"
      :key="article._id"
    >
      {{article.title}}
    </li>
  </ul>

</template>

<script>
import { defineComponent } from 'vue';
import { app, credentials } from "../utils/mongo.client";

export default defineComponent({
  name: 'CpArticles',
  components: {
  },

  data()  {
    return { articles: [] }
  },

  methods: {
    async getListOfArticles() {
      const user = await app.logIn(credentials);
      const listOfArticle = user.functions.getAllArticles();
      listOfArticle.then((resp) => {
        this.articles = resp;
      });
    },
  },

  mounted() {
    this.getListOfArticles();
  },
});
</script>

<style>
</style>
