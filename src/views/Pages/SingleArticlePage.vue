<template>
    <div class="article-page">

        <div class="images">
            <div class="main-preview">
                <div class="bar1"></div>
                <div class="bar2"></div>
                <div class="bar3"></div>
                <div class="bar4"></div>
                
                <img :src="getCurrentPhoto()" alt="Article Preview" class="main-photo" loading="lazy"/>
            </div>

            <div class="carousel" v-if="this.article.photos.length >= 2">
                <img v-for="(imgId, index) in this.article.photos"
                :key="imgId"
                :src="getImgById(imgId)"
                alt="Carousel Photo"
                class="carousel-photo"
                :class="currentPhotoIndex == index ? 'selected': ''"
                @click="setCurrentPhotoSelected(index)"
                loading="lazy"
                />
            </div>
        </div>

        <div class="info-container">

            <div class="main-container">
                <div class="top-info">
                    <h2 class="title">{{ this.article.title }}</h2>
                    <p class="description">{{ this.article.description }}</p>
                </div>

                <div class="bottom-info">
                    <div class="price-info" v-if="this.article.price">{{ getFormattedPrice(this.article.price) }} €</div>
                    <div class="portion-info">Portion de 100g</div>
                </div>                
            </div>

            <div class="more-info">

                <div class="cart-controls">
                    <div class="quantity-btns">
                        <button class="decrementBtn" @click="decrementItem">-</button>
                        <input id="numberElmtInput" class="numberElmtInput" v-on:change="updateNumberOfItem" type="number" value="1"/>
                        <button class="incrementBtn" @click="incrementItem">+</button>
                    </div>
                    <button class="addToCartBtn" @click="addToCart">
                        <img class="cart-icon" src="@/assets/icons/panier.png" alt="Panier"/>
                        AJOUTER AU PANIER
                    </button>
                </div>

                <div class="allergenes" v-if="this.article.allergens">
                    <span class="allergenes-text">Allergènes</span>
                    <ul>
                        <li v-for="allergene in this.article.allergens" :key="allergene">{{ allergene }}</li>
                    </ul>
                </div>

            </div>

        </div>
    </div>
</template>

<script>
    import { useRoute } from 'vue-router';

    export default {
        name: 'SingleArticlePage',
        props: {
            articleId: {
                type: String
            }
        },
        data() {
            return {
                article: null,
                currentPhotoIndex: 0,
                numberElmtInput: null
            }
        },
        methods: {
            getArticle(articleId) { this.article = this.$root.store.getArticleById(articleId); },
            getCurrentPhoto() { return this.$root.store.getImgById(this.article.photos[this.currentPhotoIndex]); },
            getImgById(imgId) { return this.$root.store.getImgById(imgId); },

            redirect(path) { this.$router.push(path); },

            setCurrentPhotoSelected(idx) { this.currentPhotoIndex = idx; },

            updateNumberOfItem() { 
                if (this.numberElmtInput.value < 1) this.numberElmtInput.value = 1;
             },
            incrementItem() { this.numberElmtInput.value = parseInt(this.numberElmtInput.value) + 1; },
            decrementItem() { 
                this.numberElmtInput.value = parseInt(this.numberElmtInput.value) - 1;
                this.updateNumberOfItem();
            },

            addToCart() {
                this.$root.store.addArticleToCart(this.article, this.numberElmtInput.value);

                this.numberElmtInput.value = 1;
            },

            getFormattedPrice(price) {
                if (price["$numberDecimal"]) return price["$numberDecimal"];
                return price;
            }
        },
        created() {
            const route = useRoute();
            const articleId = route != null && route.params != null ? route.params.articleId : undefined;
            
            this.$root.forceShrinking();
            
            if (articleId) this.getArticle(articleId);
            else this.redirect("/not-found");
        },
        mounted() {
            this.numberElmtInput = document.getElementById("numberElmtInput");
        }
    }
</script>

<style>
    .article-page {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        padding-top: 5rem;
        /* min-height: 60dvh; */
        flex-grow: 1;
        gap: 5rem;
        width: 100%;
        box-sizing: border-box;
        padding-left: 1rem;
        padding-right: 1rem;

        font-family: ps-regular, Arial, Helvetica, sans-serif;
    }

    .images {
        display: flex;
        flex-direction: column;
        margin: 0 1rem;
    }

    .main-preview {
        position: relative;
        width: fit-content;
    }

    .bar1, .bar2, .bar3, .bar4 { 
        position: absolute; 
        width: 100%;
        height: 100%;
        background-color: var(--yellow);
    }
    .bar1, .bar2 {
        max-height: 0.2rem;
    }
    .bar3, .bar4 {
        max-width: 0.2rem;
    }

    .bar1 { top: 0.3rem; }
    .bar2 { bottom: 0.54rem; }
    .bar3 { left: 0.3rem; }
    .bar4 { right: 0.3rem; }

    .main-photo {
        object-fit: cover;
        max-height: 25rem;
        border-radius: 0.3rem;
        width: 100%;
    }

    .carousel {
        display: flex;
        gap: 1rem;
        padding: 0.7rem;
        background-color: var(--light-green);
        border-radius: 1rem;
        width: fit-content;
        flex-wrap: wrap;
    }

    .carousel-photo {
        object-fit: cover;
        max-height: 7rem;
        border-radius: 0.3rem;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
    }

    .carousel-photo:hover { transform: translateY(-5%); }

    .selected {
        border: 0.3rem solid var(--green);
        box-sizing: border-box;
    }

    .info-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 40rem;
    }

    .bottom-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }

    .main-container {
        display: flex;
        flex-direction: column;
        padding: 1.2rem 2rem;
        min-height: 13rem;
        background-color: var(--light-green);
        border-radius: 1rem;
        color: var(--white);
    }

    .top-info {
        flex-grow: 1;
    }

    .title { 
        font-family: ps-bold, Arial, Helvetica, sans-serif;
        font-size: 2rem; 
    }
    .description {
        font-size: 1.1rem;
        padding: 1rem;
        max-width: 35rem;
        text-overflow: ellipsis;
        word-wrap: break-word;
    }

    .price-info { font-size: 1.4rem; }

    .more-info {
        display: flex;
        justify-content: space-between;
        padding: 0 2rem;
        color: var(--white);
    }

    .cart-controls {
        display: flex;
        padding: 1rem;
        border-radius: 0 0 1rem 1rem;
        background-color: var(--green);
        gap: 2rem;
        height: fit-content;
    }

    .quantity-btns {
        max-height: 3.7rem;
        display: flex;
        gap: 0.3rem;
    }

    .numberElmtInput {
        font-family: ps-regular, Arial, Helvetica, sans-serif;
        font-size: 1rem;
        padding: 0.5rem;
        margin: 0;
        border: none;
        max-width: 2rem;
        background-color: var(--light-green);
        color: var(--white);
        text-align: center;
        cursor: text;
        caret-color: var(--white);
    }

    .numberElmtInput::-webkit-outer-spin-button,
    .numberElmtInput::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .numberElmtInput[type=number] { -moz-appearance: textfield; }

    .numberElmtInput:hover { background-color: var(--lighter-green); }

    .decrementBtn,
    .incrementBtn {
        border: none;
        background-color: var(--light-green);
        color: var(--white);
        font-family: ps-bold, Arial, Helvetica, sans-serif;
        font-size: 1rem;
        cursor: pointer;
    }

    .decrementBtn { border-radius: 0.8rem 0 0 0.8rem; }
    .incrementBtn { border-radius: 0 0.8rem 0.8rem 0; }

    .decrementBtn:hover,
    .incrementBtn:hover {
        background-color: var(--lighter-green);
    }

    .addToCartBtn {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-family: ps-bold, Arial, Helvetica, sans-serif;
        font-size: 1rem;
        padding: 1rem 1.5rem;
        border: none;
        border-radius: 1rem;
        background-color: var(--light-green);
        color: var(--white);
        cursor: pointer;
        height: fit-content;
    }

    .addToCartBtn:hover { background-color: var(--lighter-green); }

    .cart-icon {
        height: 100%;
        object-fit: cover;
        max-height: 1.8rem;
    }

    .allergenes {
        display: flex;
        flex-direction: column;
        padding: 1rem 1.3rem;
        background-color: var(--green);
        border-radius: 0 0 1rem 1rem;
        width: fit-content;
    }

    .allergenes-text { text-decoration: underline; }

    .allergenes ul {
        padding-left: 1rem;
        margin: 0;
        margin-top: 0.7rem;
    }

    .allergenes ul li {
        text-decoration: none;
        list-style: none;
        padding: 0.3rem;
        padding-left: 1.5rem;
        /* list-style-image: url("@/assets/v2/lemon_icon.png"); */
        background-image: url("@/assets/icons/lemon_icon.png");
        background-repeat: no-repeat;
        background-position: left center;
        background-size: 1rem;
    }

    .allergenes ul li:hover {
        color: var(--lighter-green);
        /* list-style-image: url("@/assets/v2/lemon_icon_green.png"); */
        background-image: url("@/assets/icons/lemon_icon_green.png");
    }

    @media only screen and (max-width: 1100px) {
        .article-page { 
            flex-direction: column; 
            align-items: center; 
            gap: 1.2rem;
        }
    }

    @media only screen and (max-width: 620px) {
        .more-info { flex-direction: column; padding: 0 1rem; }
        .cart-controls { justify-content: center; }
        .allergenes { transform: translateY(-1%) translateX(1rem); }
    }

    @media only screen and (max-width: 500px) {
        .carousel-photo { max-height: 5rem; }
    }

    @media only screen and (max-width: 450px) {
        .addToCartBtn { font-size: 0.75rem; }
        .cart-controls { gap: 1rem; }
    }
</style>