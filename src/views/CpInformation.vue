<template>
    <article class="info">
        <h2>{{titre}}</h2>
        {{text}}
        <div class="button" v-if="showButton">{{nameLink}}</div>
    </article>
</template>

<script>

//import { app, credentials } from "../utils/mongo.client";

export default {
  name: 'CpInformation',
  components: {
  },
  props: {
    text: {
      type: String,
    },
    link: {
      type: String,
    },
    nameLink: {
      type: String,
    }
  },
  computed: {
    showButton() {
      return this.link != null && this.nameLink != null;
     // titre
      //text
      //link
     // nameLink
    }
  },
  /*mounted() {
    this.getListOfInfos();
  },*/
}
</script>

<style>

  article.info {
    padding: 10px;
    margin-bottom: 10px;
    background-color: aliceblue;
  }

  article.info h2 {
    margin: 0px;
    padding-bottom: 15px;
    font-size: 30px;
    color: #79ad9a;
    font-weight: bolder;
  }

  div.button {
    background-color: var(--green-button);
    display: flex;
    position: relative;
    text-transform: uppercase;
    height: 45px;
    color: white;
    width: 180px;
    align-items: center;
    justify-content: space-evenly;
    padding: 2px;
    margin-top: 10px;
    margin-left: auto;
  }

  div.button:hover {
    cursor: pointer;
    border: 2px #a5c0a0 solid;
    padding: 0px;
  }
</style>
