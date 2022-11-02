<template>
  <header>
    <img src="./assets/logo-small.png">
    <img src="./assets/title.png" class="center-image">
    <nav>
      <span class="link">
        <router-link to="/" >
          <span class="material-symbols-outlined">
            cottage
          </span>
          Accueil
        </router-link>
      </span>
      <span class="link">
        <router-link to="/articles">
          <span class="material-symbols-outlined">
            list
          </span>
          Articles
        </router-link>
      </span>
      <span class="link">
        <router-link to="/cart">
          <span class="material-symbols-outlined">
            shopping_cart
          </span>
          Caddy
        </router-link>
      </span>
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

  header img.center-image {
    margin: auto;
  }

  header nav {
    display: flex;
  }

  header nav a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
  }
  header nav .link .material-symbols-outlined {
    font-size: 36px;
  }

  header nav .link {
    margin: 10px;
  }

  header nav .link span {
    margin: 10px;
  }

  header .link nav span {
    font-size: 36px;
  }
</style>
