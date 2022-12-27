<template>
  <article class="preview">
    <img :src="first" loading="lazy" @click="redirect"/>
    <div class="content">
      <div class="title" @click="redirect">{{article.title}}</div>
      <div class="description" @click="redirect">
        {{article.description}}
      </div>
      <div class="footer">
        <button class="more-info" @click="redirect">Plus d'infos</button>
        <input :id="'nb-elem'+article._id" class="nb-elements" type="number" value="1" max="100" min="1"/>
        <button class="material-symbols-outlined cart" @click="addToCart">
          add_shopping_cart
        </button>
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
        return r.keys().reduce((json, value) => {json[value] = r(value); return json; }, {});
      }
    },
    created() {
      this.images = this.importAll(require.context('../assets/images/', false, /\.webp$/));
    }
  }
</script>
<style>
  .preview {
    background-color: #deede8;
    border-radius: 5px;
    padding: 10px;
    display: flex;
    height: 170px;
    /*width: 100%;*/
  }

  .preview .title {
    text-decoration: none;
    text-align: left;
    font-size: 18px;
  }

  .preview .content {
    display: flex;
    gap: 10px;
    flex-direction: column;
    min-height: unset;
    width: 100%;
  }

  .preview .content .description {
    text-align: right;
    font-size: 14px;
  }

  .preview img {
    border: 1px solid grey;
    border-radius: 15px;
    margin-right: 10px;
    object-fit: cover;
    height: 100%;
    width: 300px;
  }

  .preview .footer {
    margin-top: auto;
    text-align: right;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
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

  .preview .footer input.nb-elements {
    width: 30px;
  }

  .preview .footer button.cart {
    background-color:#4a6f48;
    border: 0px;
    border-radius: 3px;
    color: white;
    font-size: 20px;
    padding: 5px;
  }
</style>