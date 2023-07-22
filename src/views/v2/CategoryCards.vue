<template>
    <div class="category-cards">

        <div class="card"> 
            <router-link to="/macarons"> <img src="@/assets/v2/macaron_card.png" alt="Macaron"/> </router-link>
        </div>
        <div class="card"> 
            <router-link to="/patisserie"> <img src="@/assets/v2/patisserie_card.png" alt="Patisserie"/> </router-link>
        </div>
        <div class="card"> 
            <router-link to="/biscuits"> <img src="@/assets/v2/biscuit_card.png" alt="Biscuits"/> </router-link>
        </div>
        <!-- background img? -->
        <!-- don't know if scale on hover will move the entire div or not, if so then add img element as child -->

    </div>
</template>

<script>
    export default {
        name: "CategoryCards"
    }
</script>

<style>
    .category-cards {
        margin-top: 3rem;
        margin-bottom: 3rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 4rem;
    }

    .card {
        transition: all linear 0.3s;
    }

    .card:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
</style>