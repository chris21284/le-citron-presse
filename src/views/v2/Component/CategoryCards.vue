<template>
    <div class="category-cards">

        <div class="card"> 
            <router-link to="/macarons"> <img src="@/assets/v2/macaron_card.png" alt="Macaron" loading="lazy"/> </router-link>
        </div>
        <div class="card"> 
            <router-link to="/patisserie"> <img src="@/assets/v2/patisserie_card.png" alt="Patisserie" loading="lazy"/> </router-link>
        </div>
        <div class="card"> 
            <router-link to="/biscuits"> <img src="@/assets/v2/biscuit_card.png" alt="Biscuits" loading="lazy"/> </router-link>
        </div>

    </div>
</template>

<script>
    export default {
        name: "CategoryCards"
    }
</script>

<style>
    .category-cards {
        margin: 3rem 4rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 4rem;
    }

    .card {
        transition: all linear 0.3s;
        max-width: 16rem;
    }

    .card:hover {
        transform: scale(1.1);
        cursor: pointer;
    }

    .card img {
        width: 100%;
    }

    @media only screen and (max-width: 770px) {
        .category-cards { 
            margin: 3rem 2rem;
            gap: 1rem ;
        }
    }

    @media only screen and (max-width: 400px) {
        .category-cards {
            flex-direction: column;
        }
    }
</style>