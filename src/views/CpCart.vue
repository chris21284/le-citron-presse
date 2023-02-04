<template>
  <div @click="html">cart</div>


</template>
/* eslint-disable */
<script>
export default {
  name: 'CpCart',
  components: {
  },
  methods: {
    html() {
      var formattedBody = "FirstLine \n Second Line \n Third Line";
      var mailToLink = "mailto:"+ process.env.VUE_APP_LE_CITRON_PRESSE_MAIL+"?body=" + encodeURIComponent(formattedBody);
      window.location.href = mailToLink;
    }
  }
}
</script>

<style>
</style>
