<template>
    <!-- if event card not empty, then show? -->
    <div class="event-cards" v-if="eventCards.length > 0">
        <div class="slider">

            <div class="slide" v-for="eventCard in eventCards" :key="getId(eventCard)">
                <EventSingleCard 
                    :id="getId(eventCard)"
                    :name="eventCard.name"
                    :description="eventCard.description"
                    :imgId="eventCard.imgId"
                    :textColor="eventCard.textColor"
                    :borderColor="eventCard.borderColor"
                    :eventType="eventCard.eventType"
                    :articleId="getArticleId(eventCard.articleId)"
                />
            </div>

            <button class="btn btn-prev" @click="onPrevBtnClicked">◀</button>
            <button class="btn btn-next" @click="onNextBtnClicked">▶</button>

            <div class="pagination">
                <div class="bar"></div>
                <div class="nav">
                    <button class="page-btn" v-for="index in eventCards.length" :key="index" @click="goToSlide(index-1)"></button>
                </div>
                <div class="bar"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { app, credentials } from "@/utils/mongo.client";
    import EventSingleCard from "@/views/v2/SingleElement/EventSingleCard.vue";

    export default {
        name: 'EventCards',
        components: {
            EventSingleCard
        },
        data() {
            return {
                eventCards: [],
                currentCardIndex: 0,
                maxCardIndex: -1,
                slides: [],
                pageBtns: [],
                betweenSlidesOffset: 10,
                imgSelectorElement: null,
                initAutoPlayInterval: 5000,
                slowAutoPlayInterval: 15000,
                autoplaySlidesInterval: 5000,
                hasAutoplay: false,
                interval: null
            }
        },
        methods: {
            getId(eventCard) { return this.$root.store.getId(eventCard); },
            getArticleId(articleId) { return articleId ? articleId.toString() : null; },

            async getAllEventCards() {
                const user = await app.logIn(credentials);
                const listOfEventCards = user.functions.getAllEventCards();
                listOfEventCards.then((resp) => {
                    this.eventCards = resp;
                }).finally(() => { this.initSlideShow() });
            },

            initSlideShow() {
                this.slides = document.querySelectorAll(".slide");
                this.pageBtns = document.querySelectorAll(".page-btn");
                this.imgSelectorElement = document.createElement("img");
                this.imgSelectorElement.src = require("@/assets/v2/lemon_icon.png");
                this.imgSelectorElement.classList.add("imgSelectorIcon");

                this.maxCardIndex = this.slides.length;
                this.hasAutoplay = this.slides.length > 3;

                if (this.slides.length === 0) return;

                if (this.slides.length >= 3)
                    this.goToSlide(1);
                else
                    this.goToSlide(0);

                const prevSlide = document.querySelector(".btn-prev");
                const nextSlide = document.querySelector(".btn-next");

                prevSlide.addEventListener("click", () => this.onPrevBtnClicked);
                nextSlide.addEventListener("click", () => this.onNextBtnClicked);

                if (!this.hasAutoplay) return;
                this.autoplay();
            },


            updateSlidesPosition() {
                this.slides.forEach((s, idx) => {
                    let offset = 0;
                    offset = this.currentCardIndex > idx ? -this.betweenSlidesOffset : offset;
                    offset = this.currentCardIndex < idx ? this.betweenSlidesOffset : offset;
                    s.style.transform = `translateX(${100 * (idx - this.currentCardIndex) + offset}%)`;
                });

                this.addSelectedTag();
            },

            removeSelectedTag() {
                this.pageBtns[this.currentCardIndex]?.classList?.remove("selected");
            },
            addSelectedTag() {
                this.pageBtns[this.currentCardIndex]?.classList?.add("selected");
                this.pageBtns[this.currentCardIndex]?.appendChild(this.imgSelectorElement);
            },

            onPrevBtnClicked() {
                this.removeSelectedTag();
                this.slowAutoPlay();

                if (this.currentCardIndex === 0)
                    this.currentCardIndex = this.maxCardIndex-1;
                else
                    this.currentCardIndex--;

                this.updateSlidesPosition();
            },

            onNextBtnClicked() {
                this.removeSelectedTag();
                this.slowAutoPlay();
                this.currentCardIndex = (this.currentCardIndex + 1) % this.maxCardIndex;
                this.updateSlidesPosition();
            },

            goToSlide(newIdx) {
                this.removeSelectedTag();
                this.currentCardIndex = newIdx % this.maxCardIndex;
                this.updateSlidesPosition();
            },

            autoplay() {
                if(!this.hasAutoplay) return;

                this.autoplaySlidesInterval = this.initAutoPlayInterval;
                if (this.interval != null) clearInterval(this.interval);
                this.interval = setInterval(() => {
                    this.goToSlide(this.currentCardIndex + 1);
                }, this.autoplaySlidesInterval);
            },
            slowAutoPlay() {
                if(!this.hasAutoplay) return;

                this.autoplaySlidesInterval = this.slowAutoPlayInterval;
                if (this.interval != null) clearInterval(this.interval);
                this.interval = setInterval(() => {
                    this.autoplay();
                }, this.autoplaySlidesInterval);
            }
        },
        mounted() {
            this.getAllEventCards();
        }
    }
</script>

<style>
    .event-cards {
        min-height: 15.7rem;
        min-width: 26.25rem;
        display: grid;
        place-items: center;
        margin-top: 2rem;
        margin-bottom: 5rem;
    }

    .event-cards .slider {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .event-cards .slider .slide {
        width: 100%;
        height: 100%;
        position: absolute;
        transition: all 0.5s;
        z-index: 10;
    }

    .event-cards .slider .btn {
        position: absolute;
        width: 50px;
        height: 50px;
        border: none;
        box-sizing: border-box;
        border-radius: 50%;
        z-index: 11;
        cursor: pointer;
        background-color: var(--green);
        color: var(--white);
        font-size: 30px;
        top: 50%;
        padding-top: 5px;
    }

    .event-cards .slider .btn:hover {
        border: 2px solid var(--green);
        background-color: var(--lighter-green);
        color: var(--green);
    }

    .event-cards .slider .btn:active {
        background-color: var(--white);
    }

    .event-cards .slider .btn-prev {
        left: 0%;
        transform: translateX(-50%) translateY(-50%);
        padding-right: 12px;
    }

    .event-cards .slider .btn-next {
        right: 0%;
        transform: translateX(50%) translateY(-50%);
        padding-left: 12px;
    }

    .event-cards .slider .pagination {
        position: absolute;
        bottom: -13%;
        display: flex;
        flex-direction: row;
        width: 100%;
        justify-content: center;
        align-items: center;
    }

    .event-cards .slider .pagination .bar {
        flex-grow: 1;
        background-color: rgba(0, 0, 0, 0.2);
        height: 3px;
    }

    .event-cards .slider .pagination .bar:nth-child(1) {
        transform: translateX(0.3%);
        border-radius: 15px 0 0 15px;
    }
    .event-cards .slider .pagination .bar:nth-child(3) {
        transform: translateX(-0.3%);
        border-radius: 0 15px 15px 0;
    }

    .event-cards .slider .pagination .nav {
        display: flex;
        gap: 1.3rem;
        padding: 0.15rem 0.3rem;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 30px;
    }

    .event-cards .slider .pagination .nav .page-btn {
        background-color: var(--white);
        border-radius: 50%;
        border: none;
        padding: 7px;
        cursor: pointer;
        position: relative;
    }

    .event-cards .slider .pagination .nav .page-btn:hover {
        background-color: var(--light-green);
    }

    .event-cards .slider .pagination .nav .page-btn:hover .imgSelectorIcon {
        content: url("@/assets/v2/lemon_icon_green.png");
    }

    .event-cards .slider .pagination .nav .selected {
        background-color: transparent;
    }

    .event-cards .slider .pagination .nav .page-btn .imgSelectorIcon {
        position: absolute;
        transform: translateX(-50%) translateY(-50%);
        z-index: 50;

        height: 4vh;
    }

    @media only screen and (max-width: 500px) {
        .event-cards {
            min-height: 14.7rem;
            min-width: 22.25rem;
        }
    }

    @media only screen and (max-width: 440px) {
        .event-cards {
            min-height: 13.7rem;
            min-width: 19.25rem;
        }
    }

    @media only screen and (max-width: 390px) {
        .event-cards {
            min-height: 10.7rem;
            min-width: 14.25rem;
        }

        .event-cards .slider .btn {
            font-size: 15px;
            width: 35px;
            height: 35px;
            padding-top: 0;
        }

        .event-cards .slider .pagination .nav { gap: 1rem; }
        .event-cards .slider .pagination .nav .page-btn .imgSelectorIcon { height: 2vh; }
    }
    
</style>