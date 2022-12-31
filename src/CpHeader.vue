<template>
  <header>
    <router-link to="/">
      <img :src="logoSmall" class="logo-small">
    </router-link>
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
  computed: {
    showNumber() {
      return this.numberOfElements != 0;
    },
    logoSmall() {
      let srcDir = require.context('./assets/', false, /\.png$/);
      return srcDir('./' + 'logo-small.png');
    },
  },
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

  header img.logo-small {
    height: 100px;
    margin-left: 10px;
    margin-top: 45px;
  }

  header img.center-image {
    margin-left: auto;
    margin-right: auto;
    height: 86px;
    z-index: 10000;
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
    font-size: 30px;
  }

  header nav .link {
    margin: 10px;
  }

  header nav .link span {
    margin-right: 10px;
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

  @media only screen and (max-width: 600px) {
    header img.center-image {
      display: none;
    }
    header nav {
      margin-left: auto;
      padding: 0 15px;
    }
  }
</style>
