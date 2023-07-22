<template>
    <div class="all-articles">
        <!-- on search enter + filter btn click event thrown to method in AllArticles.vue file -->
        <div class="search-bar">
            <button class="search-btn"> <span class="material-symbols-outlined">search</span> </button>
            <input type="text" placeholder="Une envie particulière ?" name="search"/>
            <button class="filter-btn"> <span class="material-symbols-outlined">filter_list</span> </button>
        </div>

        <!-- show if filter event is sent, easier to choose filter here for search filtering -->
        <div class="filters"></div>

        <!-- by default gets all articles from db, stores it in array (if filter is cleared, no need to get articles from db, just display those from array) -->
        <!-- maybe 2 arrays, initArray (copy of db), currentArray (applied filter if needed) -->
        <div class="articles">

            <ArticleCard
                v-for="article in articles"
                :key="getId(article)"
                :articleId="getId(article)"
                :article="article"
            />

        </div>
    </div>
</template>

<script>
    import { app, credentials } from "@/utils/mongo.client";
    import ArticleCard from "@/views/v2/ArticleCard.vue";

    export default {
        name: "AllArticles",
        components: { ArticleCard },
        data() {
            return {
                articles: []
            }
        },
        methods: {
            async getListOfArticles() {
                const user = await app.logIn(credentials);
                const listOfArticles = user.functions.getAllArticles();
                listOfArticles.then((resp) => {
                    this.articles = resp;
                });
            },

            getId(article) {
                return article._id.toString();
            }
        },
        mounted() {
            this.getListOfArticles();
        }
    }
</script>

<style>
    .all-articles {
        display: flex;
        flex-direction: column;
        padding-left: 10rem;
        padding-right: 10rem;
        align-items: center;
    }

    .search-bar {
        display: flex;
        flex-direction: row;
    }

    .filters {
        display: flex;
        flex-direction: row;
    }

    .articles {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
</style>