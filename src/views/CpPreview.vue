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
      <input :id="'nb-elem'+article._id" class="nb-elements" type="number" value="1" max="100" min="1"/>
      <button class="material-symbols-outlined cart" @click="addToCart">
        add_shopping_cart
      </button>
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
      }
    },
    data() {
      return {
        images : null,
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
          namePhoto = 'no-photo';
        }
        console.log("imgg")
        console.log("PROD MODE ? = ", process.env.NODE_ENV === 'production')
        console.log("DEV MODE ? = ", process.env.NODE_ENV === 'development')
        return this.images['./' + namePhoto + '.webp'];
      },
    },
    methods: {
      redirect() {
        this.$router.push({path: "articles/" + this.id});//{ params: {id: this.id}, component: CpArticle});

        //<router-link :to="{path: `articles/${article._id}`}"
      },

      addToCart() {
        this.$emit("add-cart", this.id);
      },
      importAll(r) {
        console.log("import");
        const prefix = (process.env.NODE_ENV === 'production') ? '/' : '';
        return r.keys().reduce((json, value) => {json[value] = prefix + r(value); return json; }, {});
      }
    },
    created() {
      this.images = this.importAll(require.context('../assets/images/', false, /\.webp$/));
    }
  }
</script>
<style>
  .preview {
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    height: 400px;
    /*width: 100%;*/
  }

  .preview .title {
    text-decoration: none;
    text-align: left;
    font-size: 18px;
  }

  .preview .content {
    background-color: #deede8;
    display: flex;
    gap: 10px;
    flex-direction: column;
    padding: 0px 10px;
    min-height: 90px;
    height: 90px;
   /* width: 100%;*/
  }

  .preview .content .description {
    text-align: right;
    font-size: 14px;
  }

  .preview img {
    border: 1px solid #deede8;
    border-radius: 15px 15px 0px 0px;
    object-fit: cover;
    height: 80%;
    width: 100%;
  }

  .preview .buttons-line {
    margin-top: auto;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    position: relative;
    /* top: 10px; */
    bottom: 128px;
    right: 10px;
    display: none;
  }

  .preview button.more-info {
    background-color: #4a6f48;
    border: 0px;
    border-radius: 3px;
    padding: 3px 6px;
    color: white;
    font-weight: bold;
    margin-right: 5px;
  } 

  .preview .buttons-line input.nb-elements {
    width: 30px;
  }

  .preview .buttons-line button.cart {
    background-color:#4a6f48;
    border: 0px;
    border-radius: 3px;
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

</style>