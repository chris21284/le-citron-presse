<template>
    <div class="cart-container">

        <Transition name="fullCartAnim">
            <div class="fullCart" v-if="this.isFullCartShown">
                <!-- v-for cart item for each article in cart -->
                <CartItem v-for="item in cart"
                    :key="item.id"
                    :item="item"
                />
                <!-- button for devis page -->
                <button>DEVIS</button>
            </div>
        </Transition>
        
        <div v-outside-closable="{ exclude: ['cartImg', 'number', 'fullCart', 'fullCartAnim'], handler: 'disableFullCart' }" class="cart" @click="this.toggleFullCart">
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
                isFullCartShown: false
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
            },

            toggleFullCart() { this.isFullCartShown = !this.isFullCartShown; },
            disableFullCart() { this.isFullCartShown = false; }
        }
    }
</script>

<style>
    .cart-container {
        position: absolute;
        right: 0%;
        top: 100%;
        transform: translateX(-2.3rem);

        /* background-color: var(--green);
        border-radius: 0 0 50% 50%; */

        /* min-height: 4.7rem; */
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .fullCart {
        display: flex;
        flex-direction: column;
        min-width: 25rem;
        min-height: 39rem;
        width: 100%;
        height: 100%;
        background-color: var(--green);
        border-radius: 0 0 0 5rem;
        box-sizing: border-box;
        padding: 1rem;
    }

    .fullCartAnim-enter-active,
    .fullCartAnim-leave-active {
        transition: all 0.7s ease-in-out;
    }

    .fullCartAnim-enter-from,
    .fullCartAnim-leave-to {
        min-height: 0;
    }

    .fullCartAnim-enter-to,
    .fullCartAnim-leave-from {
        min-height: 39rem;
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
</style>