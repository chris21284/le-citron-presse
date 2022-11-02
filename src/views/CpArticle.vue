<template>
  <div :class="classesArticle" v-if="article != null">
    <div class="title">{{article.title}}</div>
    <img :src="getPhoto()"/>
  </div>
</template>

<script>
import {useRoute } from 'vue-router';
import {app, credentials} from "@/utils/mongo.client";
export default {
  name: 'CpArticle',
  components: {
  },
  props: {
    reducedMode: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    }
  },
  computed: {
    classesArticle() {
      const classes = ['article'];
      if(this.reducedMode) {
        classes.push('reduced');
      }
      return classes;
    },
  },
  data() {
    return {
      article: undefined,
    }
  },
  methods: {
    getPhoto() {
     return 'trtrtr'
    },
    async getArticle(articleId) {
      const user = await app.logIn(credentials);
      user.functions.getSingleArticle(articleId).then((resp) => {
        console.log("article");
        this.article = resp;
      }).catch(() => {console.log("redicteot");this.$router.push("/not-found");});
    },
  },
  mounted() {
    console.log("mounted");
    //this.getArticle();
  },



  created() {
    const route = useRoute();
    console.log("creatde")
    const articleId = route != null && route.params != null ? route.params.id : undefined;
    console.log("article", route.params.article);
    if(articleId == null) {
       console.log("redirection");
    }
    else {
      this.getArticle(articleId);
    }

  }
}
</script>

<style>
  .article {
    background-color: aliceblue;
    height: 100%;
    width: 100%;
  }

  .article.reduced {
    background-color: greenyellow;
    border-radius: 5px;
  }
</style>
