<template>
    <div class="contact-page">
        <InfoBubble 
            class="infoBubble"
            msg="Pour passer une commande, envoyez un e-mail ou un message sur Instagram !"
        />

        <div class="mail-container">
            <textarea id="contactInput" class="contactInput" placeholder="Écrivez votre message..."></textarea>
            <img src="@/assets/icons/clipboard_icon.png" alt="Clipboard Icon" loading="lazy" class="clipboard-btn" @click="copyToClipboard">
            <button class="contactBtn">CONTACTER PAR MAIL</button>
        </div>

        <div class="contact-side">
            <div class="contact">
                <!-- img symbol contact -->
                <!-- span label -->
                <a :href="mailContact" target="_blank" rel="noopener noreferrer">
                    <!-- IMAGE DE MAIL -->
                    <img class="symbol mail" src="@/assets/icons/mail.png" alt="Instagram" loading="lazy"/>
                    <span>{{ mail }}</span>
                </a>
            </div>

            <div class="contact">
                <!-- img symbol contact -->
                <!-- span label -->
                <a href="https://www.instagram.com/le_citronpresse/" target="_blank" rel="noopener noreferrer">
                    <!-- IMAGE INSTAGRAM -->
                    <img class="symbol insta" src="@/assets/icons/instagram-logo-white.png" alt="Instagram" loading="lazy"/>
                    <span>instagram.com/le_citronpresse/</span>
                </a>
            </div>

            <div class="contact">
                <!-- img symbol contact -->
                <!-- span label -->
                <a href="tel:+33632591451" target="_blank" rel="noopener noreferrer">
                    <!-- IMAGE TÉLÉPHONE -->
                    <img class="symbol tel" src="@/assets/icons/phone.png" alt="Instagram" loading="lazy"/>
                    <span>06.32.59.14.51</span>
                </a>
            </div>
        </div>
             
        <!-- encadré avec toutes les infos contact (flyer carte de visite?) -->
        <!-- téléphone mail, pour une commande envoyez un mail ou mp insta -->
        <!-- bouton pour envoyer au mail citron pressé -->
    </div>
</template>

<script>
    import InfoBubble from '@/views/SingleElement/InfoBubble.vue';

    export default {
        name: "Contact-Page",
        components: { InfoBubble },
        methods: {
            copyToClipboard() { navigator.clipboard.writeText(this.inputTxt); }
        },
        computed: {
            inputTxt() {
                let copyTxt = document.getElementById("contactInput");
                copyTxt.select();
                copyTxt.setSelectionRange(0, 99999);
                return copyTxt.value;
            },
            mail() { return process.env.VUE_APP_LE_CITRON_PRESSE_MAIL; },
            mailContact() { return 'mailto:' + this.mail + '?subject=Contact'; },
            mailSend() { return this.mailContact + '&body=' + this.inputTxt; }
        }
    }
</script>

<style scoped>
    .contact-page {
        margin: 2rem;
        flex-grow: 1;
        display: flex;
        justify-content: space-around;
        /* align-items: center; */
        position: relative;
    }

    .mail-container {
        position: relative;
        max-width: 40rem;
        width: 100%;
        height: 20rem;
        /* flex-grow: 1; */
    }

    .contactInput {
        width: 100%;
        height: 100%;
        margin: 0;
        border: none;
        background-color: var(--light-green);
        border-radius: 1rem;
        color: var(--white);
        font-family: ps-regular, Arial, Helvetica, sans-serif;
        font-size: 1.2rem;
        padding: 1rem 1.3rem;
        box-sizing: border-box;
        resize: none;
    }

    .clipboard-btn {
        position: absolute;
        bottom: 0.3rem;
        right: 0.3rem;
        object-fit: cover;
        max-width: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    }

    .clipboard-btn:hover { 
        background-color: var(--lighter-green); 
        border-radius: 1rem;
    }

    .contact-side {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2.5rem 2rem;
        background-color: var(--light-green);
        border-radius: 30px;
        align-self: flex-start;
    }

    .contactBtn {
        font-family: ps-bold, Arial, Helvetica, sans-serif;
        color: var(--white);
        position: absolute;
        top: 100%;
        right: 0;
        margin-top: 1.3rem;
        padding: 1rem 2rem;
        border: none;
        border-radius: 30px;
        background-color: var(--light-green);
    }

    .contactBtn:hover {
        background-color: var(--green);
        cursor: pointer;
    }

    .contact {
        padding: 0.5rem 1rem;
        border-radius: 30px;
    }

    .contact:hover {
        cursor: pointer;
        background-color: var(--lighter-green);
    }

    .contact:hover span { color: var(--green); }
    .contact:hover .symbol { filter: brightness(0) saturate(100%) invert(59%) sepia(8%) saturate(993%) hue-rotate(65deg) brightness(84%) contrast(82%); }

    .contact span {
        text-decoration: none;
        color: var(--white);
        display: inline-block;
        transform: translateY(-0.25rem); 
        cursor: pointer;  
    }

    .contact:nth-child(2) span { transform: translateY(-0.5rem); }

    .symbol { 
        object-fit: cover;
        margin-right: 1rem;
    }
    .symbol.mail { height: 1.2rem; }
    .symbol.insta { height: 1.75rem; }
    .symbol.tel { height: 1.5rem; margin-right: 1.1rem; margin-left: 0.2rem; }

    .infoBubble {
        top: -7%;
        left: 52%;
    }

    @media only screen and (max-width: 1285px) {
        .contact-page { 
            flex-direction: column;
            align-items: flex-start;
            gap: 1.3rem;
        }
    }

    @media only screen and (max-width: 660px) {
        .contactBtn {
            right: unset;
            left: 0%;
        }

        .contact-page { gap: 5.3rem; }
    }

    @media only screen and (max-width: 610px) {
        .infoBubble { top: -7%; left: 0%; }
        .mail-container { margin-top: 2rem; }
    }

    @media only screen and (max-width: 450px) {
        .symbol { margin-right: 0.5rem; }
        .symbol.tel { margin-right: 0.6rem; }

        .contact span { font-size: 0.75rem; }
    }

    @media only screen and (max-width: 390px) {
        .contact-page { margin-top: 4rem; }
    }

    @media only screen and (max-width: 365px) {
        .contact span { font-size: 0.65rem; }
    }
</style>