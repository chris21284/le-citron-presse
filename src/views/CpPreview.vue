<template>
  <div class="preview">
    <!--<img src="../assets/images/cookie.png"/>-->
    <img :src="first"/>
    <div class="content">
      <div class="title">{{article.title}}</div>
      <div class="description">
        {{article.description}}
      </div>
      <div class="footer">
        <button class="more-info">Plus d'infos</button>
        <button class="add">Add</button>
      </div>
    </div>
  </div>
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
    computed: {
      first() {
        let srcDirImage = '../assets/images/';
        if(this.article != null && this.article.photos != null && this.article.photos.length > 0) {
          return srcDirImage + this.article.photos[0];
        }
        else {
          return srcDirImage + 'default.png';
        }
      }
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
  }

  .preview .content .description {
    text-align: right;
    font-size: 14px;
  }

  .preview img {
    border: 1px solid grey;
    border-radius: 15px;
    margin-right: 10px;
  }

  .preview .footer {
    margin-top: auto;
    text-align: right;
  }

  .preview button.more-info {
    background-color: #13df0b;
    border: 0px;
    border-radius: 3px;
    padding: 3px 6px;
    color: white;
    font-weight: bold;
    margin-right: 5px;
  } 
</style>