<template>
  <CpHeader/>
  <div class="content">
    <router-view/>
  </div>
  <CpFooter/>
</template>

<style>
body {
  margin: 0px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
header {
  height: 100px;
  position: sticky;
  top: 0px;
}
footer {
  height: 100px;
}

.content {
  min-height: calc(100vh - 220px); /* 120px for header and 100px for footer */
}
</style>
<script>
import CpHeader from "@/CpHeader";
import CpFooter from "@/CpFooter";
export default {
  components: {CpHeader, CpFooter}
}
</script>