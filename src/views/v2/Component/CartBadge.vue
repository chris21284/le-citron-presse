<template>
    <div class="cart-container" :key="componentKey">

        <Transition name="fullCartAnim">
            <div class="fullCart" v-if="this.isFullCartShown">
                <!-- v-for cart item for each article in cart -->
                <div class="fullCartContainer">
                    <p v-if="getCartSize() <= 0" class="emptyCartText">Rien dans votre panier pour le moment !</p>
                    <CartItem v-for="item in cart"
                        :key="item.id"
                        :item="item"
                    />
                </div>
                <!-- button for devis page -->
                <button class="devis-btn" @click="redirectToDevisPage">DEVIS</button>
                <button class="closeBtn">▲</button>
            </div>
        </Transition>
        
        <div v-outside-closable="{ exclude: ['cart-container', 
        'fullCartContainer', 'devis-btn', 'imgContainer', 'number', 'cartImg', 
        'number', 'fullCart', 'fullCartAnim', 'cart-item', 'deleteBtn', 'previewImg', 'info', 'decrementBtn',
        'incrementBtn', 'numberElmtInput'], 
        handler: 'disableFullCart' }" 
        class="cart" @click="this.toggleFullCart">
            <div class="imgContainer"> <img class="cartImg" src="@/assets/v2/panier.png" alt="Panier"/> </div>
            <div class="number" v-if="numberOfElements > 0">{{ numberOfElements }}</div>
        </div>
    </div>
</template>

<script>
    import CartItem from '../SingleElement/CartItem.vue';

    export default {
        name: 'CartBadge',
        components: { CartItem },
        data() {
            return {
                cart: {},
                numberOfElements: 0,
                isFullCartShown: false,
                componentKey: 0
            }
        },
        created() { 
            window.addEventListener(process.env.VUE_APP_CART_UPDATE, this.updateCart); 
            this.updateCart();
        },
        beforeUnmount() { window.removeEventListener(process.env.VUE_APP_CART_UPDATE, this.updateCart); },
        
        methods: {
            updateCart() {
                this.numberOfElements = this.$root.store.getCartNumberOfItems();
                this.cart = this.$root.store.cart;
                this.componentKey += 1; //force re-render - resolve bug that happens on opera 
                //bug detail - once cart item is updated (add or minus one), it adds another empty item instead of updating the current one, that doesn't happen in chrome
            },

            toggleFullCart() { this.isFullCartShown = !this.isFullCartShown; },
            disableFullCart() { this.isFullCartShown = false; },

            getCartSize() { return this.$root.store.getCartNumberOfItems(); },

            redirectToDevisPage() { this.$router.push({ path: 'devis' }); }
        }
    }
</script>

<style>
    .cart-container {
        position: absolute;
        right: 0%;
        top: 100%;
        transform: translateX(-2.3rem);
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .fullCart {
        display: flex;
        position: relative;
        flex-direction: column;
        min-width: 25rem;
        min-height: 80dvh;
        max-height: 80dvh;
        width: 100%;
        background-color: var(--green);
        border-radius: 0 0 0 5rem;
        box-sizing: border-box;
        padding: 1rem;
        align-items: center;
        overflow: hidden;
    }

    .fullCartAnim-enter-active,
    .fullCartAnim-leave-active {
        transition: all 0.7s ease-in-out;
    }

    .fullCartAnim-enter-from,
    .fullCartAnim-leave-to {
        min-height: 0;
        max-height: 0;
        height: 0%;
        margin: 0;
        padding: 0;
    }

    .fullCartAnim-enter-to,
    .fullCartAnim-leave-from {
        min-height: 80dvh;
    }

    .cart .number {
        position: absolute;
        color: white;
        top: 24%;
        right: 17%;

        background-color: var(--yellow);
        border-radius: 50%;
        padding: 0.12rem 0.5rem;
        font-size: 0.9rem;
    }

    .cart {
        position: relative;
        padding: 0.4rem;
        aspect-ratio: 1 / 1;
        min-height: 3.7rem;
        max-width: 3.7rem;
        max-height: 3.7rem;
        background-color: var(--green);
        border-radius: 0 0 50% 50%;
    }

    .imgContainer { 
        position: relative;
        width: 100%;
        aspect-ratio: 1 / 1;
        max-width: 3.7rem;
        padding: 1rem;
        overflow: visible; 
        box-sizing: border-box;
    }

    .cartImg {
        position: absolute;
        top: 0;
        left: 0;
        max-width: 2.1rem;
        object-fit: cover;
        transform: translateX(38%) translateY(35%);
    }

    .cart:hover .imgContainer{
        background-color: var(--light-green);
        border-radius: 50%;
        cursor: pointer;
    }

    .fullCartContainer {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        margin-bottom: 1rem;
        width: 100%;
        gap: 0.3rem;
        overflow: auto; /* test if scroll is behaving correctly with large amount of cart item */
    }

    .emptyCartText {
        font-family: ps-regular, Arial, Helvetica, sans-serif;
        font-size: 1.2rem;
        color: var(--white);
    }

    .devis-btn {
        background-color: var(--light-green);
        color: var(--white);
        border: none;
        border-radius: 1rem;
        padding: 1rem 2rem;
        font-family: ps-bold, Arial, Helvetica, sans-serif;
        font-size: 1rem;
        max-width: 7rem;
        cursor: pointer;
    }

    .devis-btn:hover { background-color: var(--lighter-green); }

    .closeBtn {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
        border: none;
        background-color: transparent;
        color: var(--white);
        font-size: 2rem;
    }

    .closeBtn:hover { color: var(--lighter-green); }

    @media only screen and (max-width: 530px) {
        .cart-container { left: 4.5rem; }
        .fullCart { min-width: 100%; }
    }
</style>