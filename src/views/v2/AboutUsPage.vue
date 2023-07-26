<template>
    <div class="about-us-page">

        <!-- encadré sur le citron pressé, artisanale depuis année etc -->

        <AboutUsCard />

        <!-- localisé aux alentours d'aubagne, souvent sur le marché, suivez les réseaux pour des concours et retrouvez les dernières créations + photo stand citron pressé? -->
    </div>
</template>

<script>
    import AboutUsCard from "@/views/v2/AboutUsCard.vue"

    export default {
        name: 'AboutUsPage',
        components: { AboutUsCard }
    }
</script>

<style scoped>
    .about-us-page {
        margin: 0 2rem;
    }
</style>