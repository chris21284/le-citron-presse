<template>
    <div class="devis-item" @click="redirect">
        <div class="info">
            <button class="deleteBtn" @click="deleteItem"> <img src="@/assets/v2/close_icon.png" alt="Delete" /> </button>
            <img class="previewImg" :src="getImgById(item.photo)" :alt="item.name" loading="lazy"/>
            <div class="text-info"> 
                <p class="title">{{ item.name }}</p> 
                <div class="price-info"> <span class="totalItemPrice"> Prix Unitaire : {{ getItemPrice }} € </span> </div>
            </div>
        </div>

        <div class="info">
            <button class="decrementBtn" @click="decrementItem">-</button>
            <input id="numberElmtInput" class="numberElmtInput" @click="stopEventPropagation" @keyup.enter="updateNumberOfItem" type="number" :value="item.nbElement"/>
            <button class="incrementBtn" @click="incrementItem">+</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DevisItem',
        props: {
            item: {
                type: Object,
                default: null
            }
        },
        computed: {
            getItemPrice() { 
                // return this.item.nbElement * this.item.price.$numberDecimal; 
                return this.item.price.$numberDecimal;
            }
        },
        methods: {
            stopEventPropagation(event) {
                event.stopPropagation();
                event.stopImmediatePropagation();
            },

            updateNumberOfItem(event) { 
                this.stopEventPropagation(event);
                this.$root.store.addItemToCart(this.item, document.getElementById("numberElmtInput").value); 
            },
            incrementItem(event) { 
                this.stopEventPropagation(event);
                this.$root.store.addItemToCart(this.item); 
            },
            decrementItem(event) { 
                this.stopEventPropagation(event);
                this.$root.store.removeOneItemFromCart(this.item); 
            },
            deleteItem(event) { 
                this.stopEventPropagation(event);
                this.$root.store.deleteItemFromCart(this.item); 
            },

            getImgById(imgId) { return this.$root.store.getImgById(imgId); },

            redirect() { this.$root.store.redirectToArticle(this.item['id']); }
        }
    }
</script>

<style scoped>
    .devis-item {
        display: flex;
        flex-direction: row;
        padding: 0.3rem;
        justify-content: space-between;
        height: 5rem;
        background-color: var(--light-green);
        border-radius: 1rem;
        cursor: pointer;
        color: var(--white);
        gap: 1.3rem;
    }

    .devis-item:hover { background-color: var(--lighter-green); }

    .info {
        display: flex;
        flex-direction: row;
        gap: 0.3rem;
        font-family: ps-regular, Arial, Helvetica, sans-serif;
        font-size: 1.5rem;
        min-height: 100%;
    }

    .info:nth-child(1) { flex-grow: 1; }

    .text-info {
        flex-grow: 1;
        word-wrap: break-word;
        /* max-width: 10rem; */
        text-overflow: ellipsis;
        display: flex;
        flex-direction: column;
    }

    .price-info {
        display: flex;
        justify-content: flex-end;
        flex-grow: 1;
        max-height: 1.5rem;
        align-items: flex-end;
    }

    .title { flex-grow: 1; }

    .previewImg {
        max-height: 100%;
        object-fit: cover;
        aspect-ratio: 1 / 1;
    }

    .deleteBtn {
        min-height: 100%;
        margin: 0;
        padding: 0.3rem;
        border-radius: 0.8rem 0 0 0.8rem;
        border: none;
        background-color: var(--green);
        color: var(--white);
        font-family: ps-bold, Arial, Helvetica, sans-serif;
        font-size: 1rem;
        cursor: pointer;
    }

    .deleteBtn:hover { background-color: var(--lighter-green); }

    .deleteBtn img { height: 25%; }

    .numberElmtInput {
        font-family: ps-regular, Arial, Helvetica, sans-serif;
        font-size: 1rem;
        padding: 0.5rem;
        margin: 0;
        border: none;
        max-width: 2rem;
        background-color: var(--green);
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
        background-color: var(--green);
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

    .totalItemPrice {
        font-size: 1.2rem;
    }

    @media only screen and (max-width: 380px) {
        .cart-item { height: 3rem; }
        .numberElmtInput { max-width: 1.2rem; }
    }
</style>