<template>
    <div class="contact-page">

        <div class="mail-container">
            <textarea id="contactInput" class="contactInput" placeholder="Écrivez votre message..."></textarea>
            <img src="@/assets/v2/clipboard_icon.png" alt="Clipboard Icon" loading="lazy" class="clipboard-btn" @click="copyToClipboard">
        </div>

        <div class="contact-side">
            <div class="contact-info">
                <div class="contact">
                    <!-- img symbol contact -->
                    <!-- span label -->
                </div>

                <div class="contact">
                    <!-- img symbol contact -->
                    <!-- span label -->
                </div>

                <div class="contact">
                    <!-- img symbol contact -->
                    <!-- span label -->
                </div>
            </div>

            <button>CONTACTER PAR MAIL</button>
        </div>
             
        <!-- encadré avec toutes les infos contact (flyer carte de visite?) -->
        <!-- téléphone mail, pour une commande envoyez un mail ou mp insta -->
        <!-- bouton pour envoyer au mail citron pressé -->
    </div>
</template>

<script>
    export default {
        name: "Contact-Page",
        components: {},
        methods: {
            copyToClipboard() {
                let copyTxt = document.getElementById("contactInput");
                copyTxt.select();
                copyTxt.setSelectionRange(0, 99999);

                navigator.clipboard.writeText(copyTxt.value);
            }
        }
    }
</script>

<style scoped>
    .contact-page {
        margin: 0 2rem;
        flex-grow: 1;
    }

    .mail-container {
        height: 100%;
        position: relative;
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

    @media only screen and (max-width: 1285px) {
        .contact-page { flex-direction: column; }
    }
</style>