<template>
  <div @click="html">cart</div>


</template>

<script>
export default {
  name: 'CpCart',
  components: {
  },
  methods: {
    html() {
      var formattedBody = "FirstLine \n Second Line \n Third Line";
      var mailToLink = "mailto:x@y.com?body=" + encodeURIComponent(formattedBody);
      window.location.href = mailToLink;
    }
  }
}
</script>

<style>
</style>
