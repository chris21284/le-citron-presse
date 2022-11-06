<template>
  <header>
    <img src="./assets/logo-small.png">
    <img src="./assets/title.png" class="center-image">
    <nav>
      <span class="link">
        <router-link to="/">
          <span class="material-symbols-outlined">
            list
          </span>
          Articles
        </router-link>
      </span>
      <span class="link">
        <router-link to="/infos" >
          <span class="material-symbols-outlined">
            cottage
          </span>
          Infos
        </router-link>
      </span>
      <span class="link">
        <router-link to="/cart">
          <span class="material-symbols-outlined">
            shopping_cart
          </span>
          Caddy
          <div class="number" v-if="showNumber">{{numberOfElements}}</div>
        </router-link>
      </span>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'CpHeader',
  props: {
    numberOfElements: {
      type: Number,
      default: 0
    }
  },
  components: {

  },
  computed: {
    showNumber() {
      return this.numberOfElements != 0;
    }
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
    padding: 0px 30px;
  }

  header nav a {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    position: relative;
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

  header nav a .number {
    display: block;
    position: absolute;
    top: 3px;
    right: -3px;
    font-size: 12px;
    background-color: #18cff9;
    color: white;
    border: 1px solid grey;
    border-radius: 50%;
    padding: 2px 7px;
}
</style>
