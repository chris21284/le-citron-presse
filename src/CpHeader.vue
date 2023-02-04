<template>
  <header>
    <router-link to="/">
      <img :src="logoSmall" class="logo-small">
    </router-link>
    <nav>
      <span class="link">
        <router-link to="/">
          Articles
        </router-link>
      </span>
      <span class="link">
        <router-link to="/infos" >
          Infos
        </router-link>
      </span>
      <!--<span class="link">
        <router-link to="/cart">
          <span class="material-symbols-outlined">
            shopping_cart
          </span>
          Caddy
          <div class="number" v-if="showNumber">{{numberOfElements}}</div>
        </router-link>
      </span>-->
    </nav>
    <div class="main-caddy">
      <img src="./assets/caddy.png" >
      <div class="number" v-if="showNumber">{{numberOfElements}}</div>
    </div>
      <img src="./assets/biomaison.png" class="bio-image">
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
    background-color: var(--main-green);
    padding-top: 5px;
    padding-bottom: 5px;
  }

  header img.logo-small {
    /**height: 100px;
    margin-left: 10px;
    margin-top: 45px;*/
    height: 290px;
    margin-left: -55px;
    margin-top: 125px;
  }

  header img.bio-image {
    margin-right: -34px;
    height: 180px;
    margin-top: 65px;
  }

  header nav {
    display: flex;
    margin: auto auto 0 auto;
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

  header .main-caddy {
    background-color: var(--green-button);
    border-radius: 50%;
    display: flex;
    position: relative;
    height: 50px;
    width: 50px;
    align-items: center;
    justify-content: center;
  }

  header .main-caddy:hover {
    filter: brightness(0.8);
  }

  header .main-caddy img {
    height: 80%;
    width: 80%;
  }

  header .main-caddy .number {
    display: block;
    position: absolute;
    top: -6px;
    right: -9px;
    font-weight: bolder;
    font-size: 12px;
    background-color: var(--main-background);
    color: white;
    border: 1px solid var(--main-background);
    border-radius: 50%;
    padding: 2px 7px;
  }

  @media only screen and (max-width: 650px) {
    header img.bio-image {
      display: none;
    }
    header nav {
      margin-left: auto;
      padding: 0 15px;
    }
    header img.logo-small {
      height: 173px;
      margin-left: -55px;
      margin-top: 125px;
    }

    header .main-caddy {
      margin-right: 14px;
    }
  }
</style>
