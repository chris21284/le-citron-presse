<template>
  <footer>
    Suivez-nous
    <a href="https://www.instagram.com/le_citronpresse/" target="_blank" rel="noopener noreferrer">
         <i class="gg-instagram"></i><!--<label>@le_citronpresse</label>-->
    </a>

    <a href="tel:+33632591451" target="_blank" rel="noopener noreferrer"><span class="material-symbols-outlined" title="Numéro de téléphone : 06-32-59-14-51">call</span> <label>06-32-59-14-51</label></a>
    <a :href="mailContact" target="_blank" rel="noopener noreferrer"><span class="material-symbols-outlined" title="Nous contacter">mail</span><label>Nous contacter</label></a>
    <span class="material-symbols-outlined" title="Aubagne et alentours">home_pin</span><label>Aubagne et alentours</label>
  </footer>
</template>

<script>
export default {
  name: 'CpFooter',
  components: {
  },
  computed: {
    mail() {
      return process.env.VUE_APP_LE_CITRON_PRESSE_MAIL;
    },
    mailContact() {
      return 'mailto:' + this.mail + '?subject=Contact';
    }
  }
}
</script>

<style>
  footer {
    padding-left: 10px;
    padding-right: 10px;
    background-color: var(--main-green);
    display: flex;
    align-items: center;
  }

  footer a {
    display: flex;
    gap: 5px;
    text-decoration: none;
    margin: 5px;
    align-items: center;
  }
  footer a,
  footer a label {
    cursor: pointer;
  }

  footer a:first-of-type {
    margin-right: auto;
  }

  footer,
  footer label,
  footer a,
  footer span,
  footer a:visited {
    color: #787878;
  }

  .gg-instagram {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(1);
    border: 2px solid transparent;
    box-shadow: 0 0 0 2px;
    border-radius: 4px;
    width: 20px;
    height: 20px
  }
  .gg-instagram::after,
  .gg-instagram::before {
    content: "";
    display: block;
    box-sizing: border-box;
    position: absolute
  }
  .gg-instagram::after {
    border: 2px solid;
    left: 3px;
    width: 10px;
    height: 10px;
    border-radius: 100%;
    top: 3px
  }
  .gg-instagram::before {
    border-radius: 3px;
    width: 2px;
    height: 2px;
    background: currentColor;
    right: 1px;
    top: 1px
  }

  @media only screen and (max-width: 650px) {
    footer label {
      display: none;
    }
    footer {
      width: calc( 100% - 50px);
      gap: 20px;
    }
  }

</style>
