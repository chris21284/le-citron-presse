<template>
  <div class="preview">
    <div class="title">{{article.title}}</div>
    <img :src="article.photo"/>
    <div class="footer">
      <button class="more-info">Plus d'infos</button>
      <button class="add">Add</button>
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
  }
</script>
<style>
  .preview {
    background-color: #deede8;
    border-radius: 5px;
    padding: 10px;
  }
</style>