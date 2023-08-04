<template>  
  <HeaderComponent :isShrinked="isShrinked"/>
  
  <div class="bg expand">
    <div class="bg_color expand"></div>
  </div>

  <div class="container" :class="[isShrinked ? 'container-shrink':'']">
    <div class="main-content">
      <router-view/>
    </div>

    <FooterComponent />
  </div>
  
</template>

<script>
  import HeaderComponent from "@/views/v2/Component/HeaderComponent"
  import FooterComponent from "@/views/v2/Component/FooterComponent.vue";
  import { useStore } from "@/utils/store";

  export default {
    components: { HeaderComponent, FooterComponent },
    data() {
      return {
        isShrinked: false,

        //maybe a variable for mobile device (a way to detect if user is on mobile? or width viewport too small)
        //for triggering a boolean isMobileDevice, and changing cart display method ?

        store: null
      };
    },
    created() {
      this.store = useStore();

      this.store.initRouter(this.$router);
      this.store.fetchAllImages(); //stores all images on startup
      this.store.initGetAllArticles();
      this.store.initUpdateEvent();
      this.store.updateCart(); //init cart in store ( get localStorage or init to empty {} )
    },
    mounted() {
      this.containerElement = document.querySelector('.container');
      this.containerElement.addEventListener('scroll', this.updateScroll);
    },
    methods: {
      updateScroll() {
        this.isShrinked = this.containerElement.scrollTop > 80;
      },
    }
  }
</script>

<style>
  body {
    margin: 0px;
    overflow: hidden;

    -webkit-user-select: none;
    user-select: none;
  }

  :root {    
    --white: #ffffff;
    --black: #000000;
    --yellow: #fedc6e;
    --light-green: #96bf8f;
    --green: #71886d;
    --lighter-green: #afdfa7;
  }

  #app {
    font-family: ps-regular, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, p {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  .bg {
    z-index: -100;
  }

  .bg_color {
    position: relative;
    background-color: var(--yellow);
    z-index: -100;
  }

  .expand {
    position: fixed;
    min-width: 100vw;
    min-height: 100vh;
  }

  .container {
    position: absolute;
    top: 5rem;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
    margin-left: 5px;
    margin-right: 5px;
    transition: all 250ms cubic-bezier(0.33, 1, 0.6, 1);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .container-shrink {
    top: 4rem;
  }

  .main-content {
    display: flex;
    flex-grow: 1;
    padding-top: 5rem;
    padding-bottom: 5rem;

    background-image: url("./assets/v2/background_repeating_3.png");
    background-size: 20rem;
    background-color: var(--yellow);
  }

  /* SCROLLBAR */
  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: var(--green);
    border-radius: 1rem;
  }

  .container::-webkit-scrollbar-track {
    margin: 3rem;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--light-green);
    border-radius: 1rem;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--lighter-green);
  }

  @media only screen and (max-width: 570px) {
    .main-content { padding-top: 4rem; }
  }

  @media only screen and (max-width: 390px) {
    .main-content { padding-top: 2.5rem; }
  }

</style>