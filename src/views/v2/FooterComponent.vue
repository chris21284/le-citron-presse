<template>
    <footer>
        <div class="footer-content">
            <a href="https://www.instagram.com/le_citronpresse/" target="_blank" rel="noopener noreferrer">
                <img class="symbol" src="@/assets/v2/instagram-logo-white.png" alt="Instagram" loading="lazy"/>
                <span class="tooltip">Suivez-nous</span>
                <p>Suivez-nous</p>
            </a>
            
            <a href="tel:+33632591451" target="_blank" rel="noopener noreferrer">
                <span class="material-symbols-outlined symbol" title="Numéro de téléphone : 06-32-59-14-51">call</span> 
                <span class="tooltip">06-32-59-14-51</span>
                <p>06-32-59-14-51</p>
            </a>
            
            <a :href="mailContact" target="_blank" rel="noopener noreferrer">
                <span class="material-symbols-outlined symbol" title="Nous contacter">mail</span>
                <span class="tooltip">Nous Contacter</span>
                <p>Nous Contacter</p>
            </a>
            
            <a>
                <img class="symbol" src="@/assets/v2/pin_home.png" alt="Localisation" loading="lazy"/>
                <span class="tooltip">Aubagne et alentours</span>
                <p>Aubagne et alentours</p>
            </a>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "FooterComponent",
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

<style scoped>
    footer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .footer-content {
        background-color: var(--light-green);
        padding: 1rem 1.7rem 0.7rem 1.7rem;
        border-radius: 30px 30px 0 0;
        display: flex;
        gap: 1.3rem;
    }

    a {
        position: relative;
        text-decoration: none;
        color: var(--white);
        display: flex;
        align-items: center;
        gap: 0.2rem;
    }

    a:hover {
        color: var(--green);
    }
    a:hover img {
        filter: invert(52%) sepia(17%) saturate(452%) hue-rotate(65deg) brightness(94%) contrast(85%);
    }

    a p {
        font-size: 0.95rem;
    }

    .symbol {
        max-height: 1.4rem;
        font-size: 1.4rem;
        object-fit: contain;
    }

    .tooltip {
        visibility: hidden;
        position: absolute;
        top: 0;
        left: 50%;
        font-size: 0.7rem;
        transform: translateX(-50%) translateY(-160%);
        background-color: var(--green);
        padding: 0.5rem 1rem;
        min-width: 7rem;
        text-align: center;
        border-radius: 20px;
        color: var(--white);
    }

    .tooltip::after {
        content: "";
        position: absolute;
        top: 99%;
        left: 50%;
        transform: translateX(-50%);
        border-width: 0.7rem;
        border-style: solid;
        border-color: var(--green) transparent transparent transparent;
    }

    @media only screen and (max-width: 700px) {
        a p { display: none; }
        a:hover .tooltip { visibility: visible; }
    }
</style>