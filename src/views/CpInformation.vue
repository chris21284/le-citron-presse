<template>
    <article class="info">
        <h2>Nos formules "brunch"</h2>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pellentesque tortor nulla, mattis aliquet magna venenatis et. Phasellus ultricies libero a lacinia imperdiet. Morbi dictum vulputate nulla, ac condimentum lorem lobortis ut. Praesent ac aliquam nisi, et auctor dolor. Integer placerat non neque suscipit scelerisque. Mauris vitae ligula justo. Mauris egestas, erat sed aliquam dapibus, metus sapien dapibus mi, ut mollis nunc lectus a lacus. Mauris et turpis bibendum, maximus diam id, congue est. Aenean rhoncus vestibulum dapibus. Aenean eget ipsum augue. Sed rhoncus diam ut finibus euismod. Aliquam dignissim elit ipsum. Praesent convallis lorem sed justo sagittis mollis.

      Maecenas ac leo vitae purus molestie laoreet eget id augue. Suspendisse non purus vitae magna eleifend facilisis. Donec rutrum sollicitudin tellus non posuere. Nulla mollis ante nisl, a dignissim nulla cursus quis. Mauris lectus neque, venenatis et auctor non, dictum eu massa. Fusce consectetur nibh ut quam suscipit, id consectetur ipsum venenatis. Morbi tempor mauris eu neque finibus semper. Vestibulum gravida finibus ultricies. Curabitur porta efficitur lectus quis porttitor. Ut interdum erat eget sagittis blandit. Donec et nisi in odio sagittis vehicula id vel massa.

      Curabitur sed ultrices nulla. Mauris mauris sem, tristique vitae libero et, efficitur viverra dolor. Praesent ac nibh sit amet massa cursus iaculis. Integer a justo eu nibh placerat rhoncus. Proin faucibus sit amet elit ut suscipit. Nullam vitae neque quis ligula porttitor tincidunt. Nulla aliquet, enim vel auctor accumsan, mauris sapien tincidunt neque, id hendrerit diam leo mattis erat. Suspendisse finibus nisl id porta porta. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

      Phasellus egestas nibh quis ante hendrerit pellentesque. Mauris ornare semper sollicitudin. Maecenas sit amet egestas augue, non bibendum orci. Pellentesque sagittis interdum velit eget interdum. Morbi ac ornare ligula, ut ullamcorper nunc. Nam auctor lectus quis fringilla tincidunt. Nam rhoncus ante blandit, pretium nunc iaculis, lobortis eros. Nam vestibulum finibus odio, ut iaculis risus condimentum ut. Maecenas volutpat ut magna in finibus. Morbi nec egestas tellus. Aenean vel nunc dolor. Pellentesque congue, ipsum in interdum hendrerit, mauris libero finibus metus, sit amet interdum nisi dui vel mauris.

      Sed aliquet lacus felis, non accumsan lectus volutpat quis. Etiam placerat massa ac libero gravida, nec consequat est hendrerit. Nam placerat aliquam velit scelerisque ultricies. Vivamus fringilla, ante facilisis cursus accumsan, nisi est cursus turpis, et iaculis justo felis faucibus purus. Phasellus sed ligula a ante volutpat placerat. Aliquam suscipit, nisl vel viverra euismod, ligula dui fermentum ipsum, blandit auctor diam velit at arcu. Integer ac sapien mollis, vehicula leo eget, tristique ligula. Aliquam enim neque, bibendum eget euismod nec, ullamcorper ut dolor. Morbi hendrerit mi et ligula dictum, id dictum augue interdum. In hac habitasse platea dictumst.
      <div class="button" v-if="showButton">Un devis ?</div>
    </article>
</template>

<script>

import { app, credentials } from "../utils/mongo.client";

export default {
  name: 'CpInformation',
  components: {
  },
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    showButton() {
      return this.info?.link != null && this.info?.nameLink != null;
     // titre
      //text
      //link
     // nameLink
    }
  },
  mounted() {
    this.getListOfInfos();
  },
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
