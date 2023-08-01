<template>
    <div class="article-card" @click="redirect">

        <img class="article-img" :src="getFirstImg(article)" :alt="article.title" loading="lazy"/>

        <div class="product-info">
            <div class="product-text">
                <div class="top-info">
                    <h3>{{ article.title }}</h3>
                    <div class="price" v-if="article.price">
                        {{ article.price }} €
                    </div>
                </div>
                
                <p>{{ article.description }}</p>
            </div>
        </div>

        <div class="menu">
            <!-- flex row -->
            <!-- allergene if enough space -->
            <div class="allergenes">
                <!-- <p></p> allergene v-for all allergenes -->
            </div>

            <button class="more-info" @click="redirect">Plus d'infos</button>
            
            <div class="quick-cart" @click="quickAddToCart">
                <img src="@/assets/v2/panier.png" alt="Panier" loading="lazy" />
                <div class="plus-sign">+</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ArticleCard",
        props: {
            articleId: String,
            article: Object
        },
        methods: {
            getFirstImg(article) {
                let articleImgId = article.photos ? article.photos[0] : '';
                let img = this.$root.store.getImgById(articleImgId);
                return img;
            },

            getTitle() { return this.article.title; },
            getDescription() { return this.article.description; },
            getTags() { return this.article.tags; },
            getElement() { return this.$el; },

            quickAddToCart() {
                this.$root.store.addItemToCart(this.article);
            },

            redirect() { this.$root.store.redirectToArticle(this.articleId); }
        }
    }
</script>

<style scoped>
    .article-card {
        position: relative;
        display: flex;
        flex-direction: column;
        cursor: pointer;
        overflow: hidden;
    }

    .article-img {
        object-fit: cover;
        max-height: 21rem;
        transition: all cubic-bezier(0.3, 0, 0.75, 1) 0.3s;
    }

    .article-card:hover .article-img {
        transform: scale(1.1);
    }

    .product-info {
        position: absolute;
        display: flex;
        flex-direction: row;
        bottom: 0;
        left: 0;
        right: 0;
        color: var(--white);
        font-family: ps-regular, Arial, Helvetica, sans-serif;
        padding: 5rem 1.3rem 1.7rem 1.3rem;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
        transition: all cubic-bezier(0.3, 0, 0.8, 1) 0.1s;
    }

    .article-card:hover .product-info {
        padding-bottom: 4.3rem;
    }

    .product-text {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        min-width: 100%;
    }

    .product-text h3 {
        text-transform: uppercase;
        font-size: 1.2rem;
    }

    .product-text p {
        text-align: left;
        opacity: 0.7;
        font-size: 0.85rem;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        -o-text-overflow: ellipsis;
        white-space: nowrap;
    }

    .top-info {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        min-width: 100%;
    }

    .price {
        font-size: 1.1rem;
        transform: translateX(5rem);
        transition: all cubic-bezier(0.3, 0, 0.8, 1) 0.1s;
    }

    .article-card:hover .price {
        transform: translateX(0);
    }

    .menu {
        position: absolute;
        display: flex;
        flex-direction: row;
        bottom: -30%;
        left: 0;
        right: 0;
        justify-content: center;
        max-height: 3rem;

        transition: all cubic-bezier(0.3, 0, 0.8, 1) 0.1s;
    }

    .article-card:hover .menu {
        bottom: 0;
    }

    .more-info {
        background-color: var(--green);
        padding: 0.75rem 1.2rem;
        border: none;
        border-radius: 20px 20px 0 0;
        font-family: ps-regular, Arial, Helvetica, sans-serif;
        color: var(--white);
        font-size: 0.8rem;
        cursor: pointer;
    }

    .quick-cart {
        position: absolute;
        bottom: 0.7rem;
        right: 0.7rem;
        padding: 0.75rem;
        background-color: var(--green);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .quick-cart img {
        max-width: 1.5rem;
        object-fit: cover;
    }

    .quick-cart .plus-sign {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 3.2rem;
        z-index: 15;
        transform: translateX(25%) translateY(-40%);
        color: var(--light-green);
    }

    @media only screen and (max-width: 1000px) {
        .article-img { max-height: 17rem; }
        .product-text h3 { font-size: 0.9rem; }
        .product-text p { font-size: 0.75rem; }
        .price { font-size: 0.9rem; }
        .menu { max-height: 2rem; }
        .more-info { font-size: 0.6rem; }
        .quick-cart { padding: 0.4rem; }
        .quick-cart img { max-width: 1.3rem; }
        .quick-cart .plus-sign { font-size: 2.2rem; }

        .article-card:hover .product-info { padding-bottom: 3.3rem; }
    }

</style>
