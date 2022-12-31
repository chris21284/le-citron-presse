<template>
  <div class="article" v-if="article != null">
    <div class="photos-list">
      <img v-for="(name, index) in article.photos" :key="index" :src="getPhoto(name)"
            @click="changeBigPhoto(name)"/>
    </div>
    <img class="big-photo" :src="getPhoto(bigPhotoName)"/>
    <div class="text">
      <div class="title">{{article.title}}</div>
      <div class="desc">{{article.description}}</div>
    </div>
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
    id: {
      type: String
    }
  },
  data() {
    return {
      article: undefined,
      bigPhotoName: null,
      noPhotoName: 'no-photo',
      images : null,
    }
  },
  methods: {
    async getArticle(articleId) {
      const user = await app.logIn(credentials);
      user.functions.getSingleArticle(articleId).then((resp) => {
        this.article = resp;
        this.bigPhotoName = this.article.photos ? this.article.photos[0] : this.noPhotoName;
      }).catch(() => {
        this.redirect();
      });
    },
    getPhoto(name) {
      if (name != null && name.length > 0) {
//        return srcDir('./' + name + '.webp');
        return this.images['./' + name + '.webp'];
      }
      return '';
    },
    importAll(r) {
      const prefix = (process.env.NODE_ENV === 'production') ? '/' : '';
      return r.keys().reduce((json, value) => {json[value] = prefix + r(value); return json; }, {});
    },
    changeBigPhoto(name) {
      this.bigPhotoName = name;
    },
    redirect() {
      this.$router.push("/not-found");
    }
  },
  created() {
    const route = useRoute();
    const articleId = route != null && route.params != null ? route.params.id : undefined;

    if(articleId == null) {
      this.redirect();
    }
    else {
      this.getArticle(articleId);
    }
    this.images = this.importAll(require.context('../assets/images/', false, /\.webp$/));
  }
}
</script>

<style>
  .article {
    background-color: aliceblue;
    min-height: 100%;
    width: 100%;
    max-width: 1400px;
    display: flex;
    flex-direction: row;
    margin: auto;
    padding: 20px 0px;
  }

  .article .photos-list {
    display: flex;
    flex-direction: column;
    padding: 10px;
    min-width: 100px;
    gap: 10px;
  }

  .article .photos-list img {
    width: 100px;
    border: 1px solid #6cb198;
    border-radius: 5px;
  }

  .article img.big-photo{
    max-height: 600px;
    max-width: 400px;
    object-fit: contain;
  }

  .article .text {
    width: 100%;
    padding: 5px 20px;
  }

  .article .text .title {
    font-size: 20px;
    text-transform: uppercase;
    padding-bottom: 10px;
    font-weight: bold;
    text-align: left;
  }

  .article .text .desc {
    text-align: left;
  }

</style>
