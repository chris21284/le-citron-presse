<template>
    <div class="about-us-page">

        <!-- encadré sur le citron pressé, artisanale depuis année etc -->

        <AboutUsCard />

        <!-- localisé aux alentours d'aubagne, souvent sur le marché, suivez les réseaux pour des concours et retrouvez les dernières créations + photo stand citron pressé? -->
        <div class="section">
            <!-- <img /> image of citron presse market -->
            <div class="info">
                <h2>Aubagne et alentours</h2>
                <p>Un stand souvent présent sur le marché d'aubagne pour vous montrer les dernières créations et délicieuses patisseries. Pour le moment les commandes en lignes seront probablement à récupérer sur le marché d'Aubagne pour certains produits dont la livraison est pour le moment compliqué.</p>
            </div>
        </div>        
    </div>
</template>

<script>
    import AboutUsCard from "@/views/v2/SingleElement/AboutUsCard.vue"

    export default {
        name: 'AboutUsPage',
        components: { AboutUsCard }
    }
</script>

<style scoped>
    .about-us-page {
        margin: 0 2rem;
        flex-grow: 1;
    }

    .about-us-page .info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        font-family: ps-regular, Arial, Helvetica, sans-serif;
        font-size: 1rem;
        padding: 1.3rem 2rem;
        background-color: var(--green);
        color: var(--white);
    }
</style>