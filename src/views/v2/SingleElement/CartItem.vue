<template>
    <div class="cart-item">
        <button @click="deleteItem">X</button>
        <img class="previewImg" :src="getImgById(item.photo)" :alt="item.name"/>
        <div class="info">{{ item.name }}</div>
        <div class="quantity-btns">
            <button @click="decrementItem">-</button>
            <input class="numberElmtInput" @submit="updateNumberOfItem" type="number" :value="item.nbElement"/>
            <button @click="incrementItem">+</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CartItem',
        props: {
            item: {
                type: Object,
                default: null
            }
        },
        methods: {
            updateNumberOfItem() { this.$root.store.addItemToCart(this.item, document.getElementsByClassName("numberElmtInput").value); },
            incrementItem() { this.$root.store.addItemToCart(this.item); },
            decrementItem() { this.$root.store.removeOneItemFromCart(this.item); },
            deleteItem() { this.$root.store.deleteItemFromCart(this.item); },
            getImgById(imgId) { return this.$root.store.getImgById(imgId); }
        }
    }
</script>

<style>
    .cart-item {
        display: flex;
        padding: 2rem;
    }

    .previewImg {
        max-width: 2rem;
        object-fit: cover;
        aspect-ratio: 1 / 1;
    }
</style>