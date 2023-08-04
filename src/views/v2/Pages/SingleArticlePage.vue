<template>
    <div class="article-page">
        <div class="images">
            <div class="main-preview"></div>
            <div class="slideshow"></div>
        </div>
        <div class="info-container">
            <div class="main-container">
                <div class="title"></div>
                <div class="description"></div>
            </div>
            <div class="more-info">
                <div class="cart-controls"></div>
                <div class="allergenes"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SingleArticlePage',
        props: {
            articleId: {
                type: String
            }
        },
        data() {
            return {
                article: null
            }
        },
        methods: {
            getArticle() { this.article = this.$root.store.getArticleById(this.articleId); }
        },
        mounted() {
            this.getArticle();
        }
    }
</script>

<style>
    .article-page {
        display: flex;
    }
</style>