<template>
    <div class="all-articles">

        <div class="search-bar">
            <button class="search-btn" @click="search"> <span class="material-symbols-outlined">search</span> </button>

            <div class="search-txt">
                <input class="search-input" v-on:input="search" type="text" placeholder="Une envie particulière ?" name="search"/>
                <button class="filter-btn"> <span class="material-symbols-outlined">filter_list</span> </button>
            </div>
        </div>

        <!-- show if filter event is sent, easier to choose filter here for search filtering -->
        <!-- <div class="filters">
            <div class="filter"></div>
        </div> -->

        <!-- by default gets all articles from db, stores it in array (if filter is cleared, no need to get articles from db, just display those from array) -->
        <!-- maybe 2 arrays, initArray (copy of db), currentArray (applied filter if needed) -->
        <div class="articles">

            <ArticleCard
                v-for="article in articles"
                :key="getId(article)"
                :articleId="getId(article)"
                :article="article"

                :ref="setArticleRef"
            />

        </div>
    </div>
</template>

<script>
    import { app, credentials } from "@/utils/mongo.client";
    import ArticleCard from "@/views/SingleElement/ArticleCard.vue";

    export default {
        name: "AllArticles",
        components: { ArticleCard },
        data() {
            return {
                articles: [],
                init_articles_el: [],
                search_input: null
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
            },

            setArticleRef(element) {
                if (element) this.init_articles_el.push(element);
            },

            search() {
                let searchValue = this.search_input.value.toLowerCase();

                for (const element of this.init_articles_el) {
                    let article = element;

                    // check for title match
                    // check for tag matching (filter?)
                    // check for description?
                    let titleMatch = article.getTitle().toLowerCase().includes(searchValue);
                    let descMatch = article.getDescription().toLowerCase().includes(searchValue);

                    if (!titleMatch && !descMatch)
                        article.getElement().style.display = "none";
                    else
                        article.getElement().style.display = "flex";
                }
            }
        },
        mounted() {
            this.getListOfArticles();

            this.search_input = document.querySelector(".search-input");
        },
        beforeUpdate() {
            this.init_articles_el = [];
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
        width: 100%;
    }

    .search-bar {
        display: flex;
        flex-direction: row;
        gap: 0.13rem;
        min-height: 2.4rem;
        max-width: 20rem;
        width: 100%;
    }

    .search-btn {
        transform: scaleX(-1) translateY(1%);
        border-radius: 0 20px 20px 0;
        border: none;
        padding: 0.35rem 0.5rem;
        background-color: var(--light-green);
        color: var(--white);
    }

    .search-btn:hover {
        background-color: var(--lighter-green);
        color: var(--green);
        cursor: pointer;
    }

    .search-txt {
        position: relative;
        width: 100%;
    }

    .search-input {
        background-color: var(--light-green);
        width: 100%;
        min-height: 100%;
        padding: 0 0 0 1rem;
        box-sizing: border-box;
        margin: 0;
        border: none;
        border-radius: 0 20px 20px 0;
        color: var(--white);
        font-family: ps-regular, Arial, Helvetica, sans-serif;
        font-size: 0.9rem;
    }

    .search-input:focus { outline: none; }

    .search-input::placeholder {
        font-family: ps-italic, Arial, Helvetica, sans-serif;
        color: var(--green);
        /* opacity: 0.7; */
    }
    .search-input::-webkit-input-placeholder {
        font-family: ps-italic, Arial, Helvetica, sans-serif;
        color: var(--green);
        /* opacity: 0.7; */
    }
    .search-input::-moz-placeholder {
        font-family: ps-italic, Arial, Helvetica, sans-serif;
        color: var(--green);
        /* opacity: 0.7; */
    }
    .search-input::-ms-placeholder {
        font-family: ps-italic, Arial, Helvetica, sans-serif;
        color: var(--green);
        /* opacity: 0.7; */
    }

    .filter-btn {
        position: absolute;
        right: 0.27rem;
        top: 50%;
        border: none;
        border-radius: 50%;
        background-color: var(--green);
        color: var(--white);
        transform: translateY(-50%);
        width: 2rem;
        height: 2rem;
    }

    .filter-btn:hover {
        background-color: var(--lighter-green);
        color: var(--green);
        cursor: pointer;
    }

    .filter-btn span {
        font-size: 1.3rem;
        transform: translateY(15%);
    }

    .filters {
        display: flex;
        flex-direction: row;
    }

    .articles {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 0.5rem;
        margin-top: 3rem;
    }

    @media only screen and (max-width: 1000px) {
        .articles { width: 90vw; }
    }

    @media only screen and (max-width: 770px) {
        .all-articles {
            padding-left: 3rem;
            padding-right: 3rem;
        }
    }

    @media only screen and (max-width: 700px) {
        .all-articles {
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }
</style>