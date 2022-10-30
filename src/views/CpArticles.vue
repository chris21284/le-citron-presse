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

<script lang="ts">
import { defineComponent } from 'vue';
import { IArticle } from '@/models/article.interface';
import { app, credentials } from "@/utils/mongo.client";

export default defineComponent({
  name: 'CpArticles',
  components: {
  },

  data: () => ({ articles: [] as IArticle[] }), //ERREUR ICI

  methods: {
    async getListOfArticles() {
      const user: Realm.User = await app.logIn(credentials);
      const listOfArticle: Promise<IArticle[]> = user.functions.getAllArticles();
      listOfArticle.then((resp) => {
        this.articles = resp;
      });
    },
  },

  mounted() {
    this.getAllArticles();
  },
});
</script>

<style>
</style>
