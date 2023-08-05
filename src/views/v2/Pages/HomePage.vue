<template>
    <div class="home">
        <!-- carte produit ou promo ou evenement ou concours -->
        <EventCards/>
        <!-- about us section + bio logo -->
        <AboutUsCard />
        
        <SeparatorBar />

        <!-- carte catégorie macaron patisserie etc -->
        <CategoryCards />
        <SeparatorBar />
        <!-- section recherche avec tout les produits -->
        <AllArticles />

        <!-- TODO -->
        <!-- V - fix separator bar -->
        <!-- V - reduce size about us card -->
        <!-- V - fix header sizing with min-width max-width etc, make it almost responsive -->
        <!-- V - add category cards macaron patisserie etc -->
        <!-- V - add all articles section + search bar filtering -->
        <!-- V - lazy load all images -->
        <!-- V - rework footer home page -->
        <!-- present other pages (V - priority to single article page) -->
        <!-- V - then try to make cart page and make it all work -->
        <!-- V - maybe add mobile version of cart as well -->
        <!-- X - convert local images to db images for future management (may be unecessary if using simple-git for pushing new images directly to git repo and new id to db, should work) -->
        <!-- V - add functions for event cards in db (crud, title, desc, event type + color) -->
        <!-- add local Storage caching for pinia states - prevent user from requesting from db every refresh, add data validity duration -->
        <!-- V1 should be working by now -->
 
        <!-- next up, website for admin of db -->
        <!-- basic auth -->
        <!-- management event card and all articles (price, photos, description, allergenes, disponibilité? (indispo pour le moment ?)) -->

        <!-- question : options pour les produits? pack de 12 cookie prix différent de l'unité? -->

    </div>
</template>

<script>
    import EventCards from '@/views/v2/Component/EventCards.vue'
    import AboutUsCard from '@/views/v2/SingleElement/AboutUsCard.vue'
    import SeparatorBar from '@/views/v2/SingleElement/SeparatorBar.vue';
    import CategoryCards from '@/views/v2/Component/CategoryCards.vue';
    import AllArticles from '@/views/v2/Component/AllArticles.vue';

    export default {
        name:'HomePage',
        components: { AboutUsCard, EventCards, SeparatorBar, CategoryCards, AllArticles }
    }
</script>

<style>
    .home {
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-x: hidden;
        flex-grow: 1;
    }
</style>