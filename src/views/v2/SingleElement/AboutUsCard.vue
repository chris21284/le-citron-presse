<template>
    <div class="about-us-card">
        <img class="bio-img" src="@/assets/v2/lemon_slice_v5.png" alt="Bio et 100% fait maison" loading="lazy"/>

        <div class="side-info">

            <div class="info">
                <h2>Gourmandises bio 100% faites avec amour</h2>
                <p>Découvrez une gamme diversifiée de produits tels que les cupcakes, biscuits, macarons, number cakes, cookies et bien plus encore ! Vous prévoyez de commander pour un événement spécial ? Il vous suffit de préciser vos demandes spécifiques pour personnaliser votre commande.</p>
            </div>
            
            <div class="info spacer">
                <div class="side-row">
                    <img class="symbol" src="@/assets/v2/pin_home.png" alt="Localisation" loading="lazy"/>
                    <p>Aubagne et alentours</p>
                </div>

                <div class="side-row">
                    <a href="https://www.instagram.com/le_citronpresse/" target="_blank" rel="noopener noreferrer">
                        <img class="symbol" src="@/assets/v2/instagram-logo-white.png" alt="Instagram" loading="lazy"/>
                    </a>
                    <p>Retrouvez toutes nos préparations, actualités et même des concours sur Instagram !</p>
                </div>
            </div>            

            <div class="side-btn">
                <router-link to="/contact">
                    <button class="contact-us-btn">Contactez-nous</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AboutUsCard'
    }
</script>

<style scoped>
    .about-us-card {
        display: flex;
        flex-direction: row;
        border-radius: 30px;
        position: relative;
        margin: 0 0.3rem;
    }

    .about-us-card h2 {
        font-family: ps-regular, Avenir, Helvetica, Arial, sans-serif;
        color: var(--white);
        margin: 0.5rem 0 0 0;
    }

    .about-us-card p {
        text-align: left;
        margin: 0;
    }

    .contact-us-btn {
        width: 100%;
        padding: 1rem;
        background-color: var(--green);
        box-sizing: border-box;
        border: none;
        border-radius: 30px;
        color: var(--white);
        font-family: ps-bold, Avenir, Helvetica, Arial, sans-serif;
    }
    .contact-us-btn:hover {
        cursor: pointer;
        background-color: var(--lighter-green);
        color: var(--green);
    }

    .contact-us-btn:active {
        background-color: var(--white);
    }

    .bio-img {
        max-width: 13rem;
        max-height: 13rem;
        aspect-ratio: 1 / 1;
        z-index: 15;
        background-color: var(--light-green);
        padding: 1rem 0.3rem 1rem 1rem;
        border-radius: 30px 0 0 30px;
    }

    .side-info {
        display: flex;
        flex-direction: column;
        max-width: 30rem;
        align-items: flex-start;
        justify-content: space-between;
        background-color: var(--light-green);
        border-radius: 0 30px 30px 30px;
        padding: 0.7rem;
    }

    .info {
        text-align: left;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
    }

    .spacer {
        margin-top: 1rem;
    }

    .info p {
        font-family: ps-italic, Avenir, Helvetica, Arial, sans-serif;
        font-size: 0.93rem;
        color: var(--black);
        opacity: 0.7;
    }

    .side-btn {
        margin-top: 1rem;
        display: flex;
        flex-direction: row-reverse;
        width: 100%;
        z-index: 15;
    }

    .side-btn a {
        width: 10rem;
    }

    .side-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
    }

    .side-row p {
        font-size: 1rem;
        color: var(--white);
        opacity: 1;
        font-family: ps-regular, Avenir, Helvetica, Arial, sans-serif;
    }

    .symbol {
        width: 1.8rem;
    }

    @media only screen and (max-width: 770px) {
        .about-us-card { flex-direction: column; }

        .bio-img {
            border-radius: 30px 30px 0 0;
            padding: 1rem;
        }
    }
</style>