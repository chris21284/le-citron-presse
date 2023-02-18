<template>
  <article class="preview">
    <img :src="first" loading="lazy" @click="redirect"/>
    <div class="content">
      <div class="title" @click="redirect">{{article.title}}</div>
      <div class="description" @click="redirect">
        {{article.description}}
      </div>
    </div>
    <div class="buttons-line">
      <button class="more-info" @click="redirect">Plus d'infos</button>
      <button class="material-symbols-outlined add-to-cart" @click="decrementNumberOfElement()">
        remove
      </button>
      <div :id="'nb-elem'+article._id" class="nb-elements">{{numberToOrder}}</div>
      <button class="material-symbols-outlined add-to-cart" @click="incrementNumberOfElement()">
        add
      </button>


      <div class="main-caddy" @click="addToCart">
        <img src="../assets/caddy.png" />
        <span class="material-symbols-outlined">
            add
          </span>
      </div>
    </div>
  </article>
</template>

<script>


  export default {
    name: 'CpPreview',
    props: {
      id: {
        type: String
      },
      article: {
        type: Object
      },
      nbToOrder: {
        type: Number,
        default: 1,
      }
    },
    data() {
      return {
        images : null,
        numberToOrder: 1,
      }
    },
    computed: {
      first() {
        let namePhoto;
        if(this.article != null && this.article.photos != null && this.article.photos.length > 0 &&
          this.article.photos[0].length > 0) {
            namePhoto = this.article.photos[0];
        }
        else {
          console.log("dskfdkskfk");
          namePhoto = 'nophoto';
        }
       return this.images['./' + namePhoto + '.webp'];
      },
    },
    methods: {
      redirect() {
        this.$router.push({path: "articles/" + this.id});//{ params: {id: this.id}, component: CpArticle});

        //<router-link :to="{path: `articles/${article._id}`}"
      },
      addToCart() {
        this.$emit("add-cart", this.article);
      },
      importAll(r) {
        const prefix = (process.env.NODE_ENV === 'production') ? '/' : '';
        return r.keys().reduce((json, value) => {json[value] = prefix + r(value); return json; }, {});
      },
      decrementNumberOfElement() {
        if(this.numberToOrder != 1) {
          this.numberToOrder--;
        }
      },
      incrementNumberOfElement() {
        this.numberToOrder++;
      }
    },
    created() {
      this.images = this.importAll(require.context('../assets/images/', false, /\.webp$/));
      console.log("creation image");
      this.numberToOrder = this.nbToOrder;
    }
  }
</script>
<style>
  .preview {
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: 370px;
    min-height: 370px;
    /*width: 100%;*/
  }

  .preview .title {
    text-decoration: none;
    text-align: left;
    font-size: 18px;
    font-weight: bolder;
  }

  .preview .content {
    background-color: #e4e4e4bf;
    gap: 10px;
    flex-direction: column;
    padding: 10px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    position: relative;
    min-height: 58px;
    bottom: 79px;
  }

  .preview .content .description {
    text-align: right;
    font-size: 14px;
    height: 32px;
  }

  .preview img {
    border: 1px solid #deede8;
    border-radius: 15px 15px 0px 0px;
    object-fit: cover;
    width: 100%;
    min-height: 370px;
    height: 370px;
  }

  .preview .buttons-line {
    margin-top: 16px;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    position: relative;
    /* top: 10px; */
    bottom: 60px;;
    height: 59px;
    min-height: 59px;
    right: 10px;
    display: none;
  }


  .preview .buttons-line .main-caddy {
    background-color: var(--green-button);
    border-radius: 50%;
    display: flex;
    position: relative;
    height: 45px;
    width: 45px;
    align-items: center;
    justify-content: center;
    margin-top: -12px;
  }

  .preview .buttons-line .main-caddy:hover {
    filter: brightness(0.8);
  }

  .preview .buttons-line .main-caddy img {
    height: 80%;
    min-height: 80%;
    width: 80%;
    border: unset;
  }

  .preview .buttons-line .main-caddy .material-symbols-outlined {
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

  .preview button.more-info {
    background-color: var(--green-second-button);
    border: 0px;
    border-radius: 7px 7px 0px 0px;
    padding: 3px 6px;
    color: white;
    font-weight: bold;
    margin-right: 5px;
    height: 43px;
  }

  .preview .buttons-line .nb-elements {
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

  .preview .buttons-line button.add-to-cart {
    background-color:var(--green-second-button);
    border: 0px;
    border-radius: 50px;
    height: 28px;
    color: white;
    font-size: 20px;
    padding: 5px;
  }

  .preview:hover {
    cursor: pointer;
  }
  .preview:hover .buttons-line {
    display: flex;
  }

  .preview:hover .content {
    display: none;
  }

</style>