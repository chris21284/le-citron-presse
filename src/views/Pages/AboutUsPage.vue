<template>
    <div class="about-us-page">

        <!-- encadré sur le citron pressé, artisanale depuis année etc -->

        <AboutUsCard />

        <!-- localisé aux alentours d'aubagne, souvent sur le marché, suivez les réseaux pour des concours et retrouvez les dernières créations + photo stand citron pressé? -->
        <div class="section">
            <div class="block"></div>
            <!-- <img /> image of citron presse market -->
            <div class="info">
                <h2>Aubagne et alentours</h2>
                <p>Un stand souvent présent sur le marché d'aubagne pour vous montrer les dernières créations et délicieuses patisseries. Pour le moment les commandes en lignes seront probablement à récupérer sur le marché d'Aubagne pour certains produits dont la livraison est pour le moment compliqué.</p>
            </div>
        </div>        
    </div>
</template>

<script>
    import AboutUsCard from "@/views/SingleElement/AboutUsCard.vue"

    export default {
        name: 'AboutUsPage',
        components: { AboutUsCard }
    }
</script>

<style scoped>
    .about-us-page {
        /* margin: 0 2rem; */
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .about-us-page .info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-family: ps-regular, Arial, Helvetica, sans-serif;
        font-size: 1rem;
        padding: 1.5rem 2rem;
        background-color: var(--green);
        color: var(--white);
        border-radius: 0 0 30px 30px;
    }

    .about-us-page .info p {
        font-family: ps-italic, Arial, Helvetica, sans-serif;
        font-size: 0.93rem;
        color: var(--white);
        opacity: 0.7;
    }

    .section {
        position: relative;
        max-width: 40rem;
        margin: 0 0.3rem;
    }

    .block {
        position: absolute;
        bottom: 100%;
        min-height: 9rem;
        width: 100%;
        background-color: var(--green);
    }

    @media only screen and (max-width: 800px) {
        .section { max-width: 30rem; }
    }

    @media only screen and (max-width: 770px) {
        .section { max-width: 25rem; }
    }
</style>