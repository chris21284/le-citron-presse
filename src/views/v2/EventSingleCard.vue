<template>
    <div class="event-card">
        <!-- img from props, border color from props, name & description from props, maybe little badge icon for type of event card (concours / promo / etc) -->
        <img class="back-img" :src="getImgById(imgId)" :alt="imgId" loading="lazy" />

        <div class="title">
            <h2>{{ eventType }}</h2>
        </div>

        <div class="product-info">
            <h3>{{ name }}</h3>
            <p>{{ description }}</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'EventSingleCard',
        props: {
            // 'imgId': 'cookie1', 'borderColor':'red', 'name': 'cookie', 'description': 'biscuit'
            id: {
                type: String
            },
            name: {
                type: String
            },
            description: {
                type: String
            },
            imgId: {
                type: String
            },
            borderColor: {
                type: String
            },
            eventType: {
                type: String //Object //object like, hold info like name of type (incontournable, tout nouveaux etc) ou date concours, ou valeur de promo -15% etc
            }
        },
        methods: {
            getImgById(id) {
                let img = this.$root.store.getImgById(id);
                return img;
            }
        }
    }
</script>

<style scoped>
    .event-card {
        /* background-color: v-bind(borderColor); */
        position: relative;
        border: 5px v-bind(borderColor) solid;
        border-radius: 15px;
        box-sizing: border-box;
        /* padding: 0.2rem; */
        width: 100%;
        height: 100%;
        transition: all cubic-bezier(0.2, 0, 0.8, 1) 0.15s;
    }

    .event-card:hover {
        cursor: pointer;
        transform: scale(1.07);
    }

    .back-img {
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }

    .title {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        padding: 0.4rem 1rem;
        border-radius: 0 0 20px 20px;
        font-size: 0.75rem;
        background-color: v-bind(borderColor);
        color: var(--white);
    }

    .event-card h2, .event-card h3 {
        margin: 0;
    }

    .product-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 2.2rem 0 1.1rem 1.3rem;
        background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
        border-radius: 10px;
    }

    .product-info h3 {
        font-family: ps-bold, Arial, Helvetica, sans-serif;
        font-size: 1.75rem;
        color: var(--white);
    }

    .product-info p {
        font-family: ps-italic, Arial, Helvetica, sans-serif;
        font-size: 0.9rem;
        color: rgba(255, 255, 255, 0.7);
    }

    @media only screen and (max-width: 440px) {
        .event-card { border-width: 3px; }
    }

    @media only screen and (max-width: 390px) {
        .title {
            padding: 0.3rem 0.8rem;
            font-size: 0.5rem;
        }

        .product-info { padding: 1.2rem 0 0.7rem 0.9rem; }
        .product-info h3 { font-size: 1.2rem; }
        .product-info p { font-size: 0.75rem; }
    }

</style>