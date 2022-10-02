<template>
  <header>
    <img src="./assets/logo-small.png">
  header sd
    <nav>
      <router-link to="/">
        <span class="material-symbols-outlined">
          cottage
        </span>
      </router-link>
      <router-link to="/articles">
        <span class="material-symbols-outlined">
          list
        </span>
      </router-link>
      <router-link to="/about">
        <span class="material-symbols-outlined">
          shopping_cart
        </span>
      </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'CpHeader',
  components: {

  }
}
</script>

<style>
  header {
    display: flex;
    align-items: center;
    background-color: #accdc1;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  header img {
    height: 100%;
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
