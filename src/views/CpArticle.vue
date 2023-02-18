<template>
  <div :class="articleClasses" v-if="showArticle">
    <div class="photos">
      <div class="carousel">
        <div class="photos-list2">
          <img v-for="(name, index) in picturesToShow" :key="index"
               :src="getPhoto(name)" :id="name" />
        </div>
        <nav class="nav-photos" v-if="showNavigationCarroussel">
          <a :href="'#'+name" v-for="(name, index) in picturesToShow"
             :key="index" class="link" />
        </nav>
      </div>
    </div>
    <!--<div class="second-zone">-->
      <div class="text">
        <div class="title">{{article.title}}</div>
        <div class="desc">{{article.description}}</div>
      </div>
      <div class="buttons-line">
        <button class="material-symbols-outlined add-to-cart" @click="decrementNumberOfElement()">
          remove
        </button>
        <div :id="'nb-elem'+article._id" class="nb-elements">{{nbToOrder}}</div>
        <button class="material-symbols-outlined add-to-cart" @click="incrementNumberOfElement()">
          add
        </button>
        <div class="main-caddy" @click="addToCart">
          <img src="../assets/caddy.png" />
          Ajouter au panier
        </div>
      <!--</div>-->
      </div>
    <div class="allergene" v-if="showAllergens">
      <div class="title">Allergènes</div>
      <ul>
        <li v-for="(allergen, index) in article.allergens"
            :key="'al' + index">
          {{ allergen }}
        </li>
      </ul>
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
      noPhotoName: 'no-photo',
      images : null,
      nbToOrder : 1,
    }
  },
  computed: {
    showArticle() {
        return this.article != null;
    },
    showNavigationCarroussel() {
      return this.article?.photos?.length > 1;
    },
    showAllergens() {
      return this.article?.allergens?.length > 0;
    },
    articleClasses() {
      const classes = ['article'];
      if(!this.showAllergens) {
        classes.push('without-allergens');
      }
      return classes;
    },
    picturesToShow() {
      return this.article?.photos?.length > 1 ? this.article.photos : ['nophoto'];
    }
  },
  methods: {
    async getArticle(articleId) {
      const user = await app.logIn(credentials);
      user.functions.getSingleArticle(articleId).then((resp) => {
        this.article = resp;
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
    },
    decrementNumberOfElement() {
      if(this.nbToOrder != 1) {
        this.nbToOrder--;
      }
    },
    incrementNumberOfElement() {
      this.nbToOrder++;
    },
    addToCart() {
      this.$emit("add-cart", this.article, this.nbToOrder);
    },
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
    min-height: 100%;
    width: 100%;
    max-width: 1400px;
    padding: 20px 0px;
    display: grid;
    grid-template-columns: 400px repeat(2, 1fr);
    grid-template-rows: 250px 140px 130px;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }

  .article .photos-list {
    display: flex;
    flex-direction: row;
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
    outline: 6px solid var(--main-background);
    outline-offset: -14px;
  }

  /*.article .second-zone {*/
  /*  display: flex;*/
  /*  flex-direction: column;*/
  /*}*/

  .article .text,
  .article .allergene {
    width: 100%;
    padding: 5px 20px;
    margin-left: 10px;
    background-color: #bdbdbdbf;
    color: white;
    text-align: left;
  }

  .article .allergene {
    height: fit-content;
  }

  .article .allergene .title {
    font-size: 21px;
    font-weight: bolder;
    text-align: left;
  }

  .article .text .title {
    font-size: 45px;
    text-transform: uppercase;
    padding-bottom: 10px;
    font-weight: bold;
    text-align: left;
  }

  .article .buttons-line {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    position: relative;
    /* top: 10px; */
    height: 59px;
    min-height: 59px;
  }

  .article .buttons-line button.add-to-cart {
    background-color: var(--green-second-button);
    border: 0px;
    border-radius: 50px;
    height: 28px;
    color: white;
    font-size: 20px;
    padding: 5px;
  }

  .article .buttons-line .nb-elements {
    width: 40px;
    margin-top: 3px;
    display: flex;
    height: 21px;
    background-color: var(--green-second-button);
    border: unset;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .article .buttons-line .main-caddy {
    background-color: var(--green-button);
    display: flex;
    position: relative;
    text-transform: uppercase;
    height: 45px;
    color: white;
    width: 230px;
    align-items: center;
    justify-content: center;
  }

  .article .buttons-line .main-caddy:hover {
    filter: brightness(0.8);
  }

  .article .buttons-line .main-caddy img {
    height: 80%;
    min-height: 80%;
    width: 40px;
    padding-right: 5px;
    border: unset;
  }

  .article .buttons-line .main-caddy .material-symbols-outlined {
    display: block;
    position: absolute;
    top: -9px;
    right: -13px;
    font-weight: bolder;
    font-size: 28px;
    color: var(--green-button);
    filter: brightness(0.5);
    padding: 2px 7px;
  }

  .carousel {
    width: 400px;
    height: 530px;
  }
  .carousel nav.nav-photos {
    bottom: 71px;
    position: relative;
    padding: 3px;
  }

  .carousel nav.nav-photos {
    padding: 3px;
    box-shadow: 0 2px 5px 1px rgb(0 0 0 / 20%);
  }

  .article .link {
    padding: 4px;
    color: #deede8;
    text-decoration: none;
    font-size: 31px;

  }

  .article .link:before {
    content: '○';
  }

  .article .link:active:before {
    content: '●';
  }

  .photos-list2 {
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    display: flex;
    width: 100%;
    height: 100%;
    overflow: hidden;
    outline: 6px solid var(--main-background);
    outline-offset: -14px;
  }

  .photos-list2 img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    color: grey;
  }

  .photos-list2 img:first-of-type::before,
  .photos-list2 img:last-of-type::after {
    color: blue;
  }

  .photos-list2 img::before {
    content: '<';
  }

  .photos-list2 img::after {
    content: '>';
  }

  .section {
    height: 100vh;
    width: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 5em;
    text-shadow:
        0px 2px 0px #b2a98f,
        0px 4px 3px rgba(0,0,0,0.15),
        0px 8px 1px rgba(0,0,0,0.1);
  }

  .bg-red {
    background: #de5448;
  }

  .bg-blue {
    background: #4267b2;
  }

  .bg-green {
    background: #4CAF50;
  }

  .article .text { grid-area: 1 / 2 / 2 / 6; }
  .article .carousel { grid-area: 1 / 1 / 4 / 2; }
  .article .buttons-line { grid-area: 2 / 2 / 4 / 3; }
  .article .allergene { grid-area: 2 / 3 / 4 / 4; }

  @media only screen and (max-width: 650px) {
    .article {
      grid-template-columns: 100%;
      grid-template-rows: 250px 140px 130px 45px repeat(2, 1fr);
      grid-row-gap: 10px;
    }

    .article.without-allergens {
      grid-template-rows: 250px 140px 130px 45px 1fr;
    }

    .article .text,
    .article .allergene {
      width: unset;
      margin: 0px 10px;
      grid-area: 6 / 1 / 7 / 4;
    }

    .article .carousel {
      width: 100%;
    }
    .article .buttons-line {
      grid-area: 4 / 1 / 5 / 2;
    }
    .article .text {
      grid-area: 5 / 1 / 6 / 2;
    }
    article .allergene {
      grid-area: 6 / 1 / 7 / 2;
    }
  }

</style>
