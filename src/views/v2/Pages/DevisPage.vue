<template>
    <div class="devis-page">
        <div class="side-info">
            <div class="contact-mail"></div>
            <div class="mail-container">

            </div>
        </div>
        <div class="side-info">
            <div class="product-container">
                <div class="product-list"></div>
                <div class="price-estimate"></div>
            </div>

            <div class="contact-btn"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'DevisPage'
    }
</script>

<style scoped>
    .devis-page {
        display: flex;
        flex-direction: row;
    }

    .side-info {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
    }
</style>