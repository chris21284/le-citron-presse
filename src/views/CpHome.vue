<template>
  <div class="about">
    <cp-information />
    <cp-information />
  </div>
</template>

<script>

import { app, credentials } from "../utils/mongo.client";
import CpInformation from "@/views/CpInformation.vue";

export default {
  name: 'CpHome',
  components: {
    CpInformation
  },
  data() {
    return {
      infos: [],
    }
  },
  methods: {
    async getListOfInfos() {
      console.log("gest list of infos");
      const user = await app.logIn(credentials);
      const listOfInfos = user.functions.getAllInformations();
      listOfInfos.then((resp) => {
        this.infos = resp;
      });
    },
  },
  mounted() {
    this.getListOfInfos();
  },
}
</script>

<style>
  .about {
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    margin-bottom: 10px;
    width: calc(100% - 20px);
    padding: 0 10px;
    max-width: 1000px;
    height: calc(100% - 20px);
  }

</style>
