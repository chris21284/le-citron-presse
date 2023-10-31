<template>
    <div class="info-bubble">
        <p>{{ msg }}</p>
        <div class="bubble one"></div>
        <div class="bubble two"></div>
        <div class="bubble three"></div>
        <div class="bubble four"></div>
        <div class="bubble five"></div>
        <div class="bubble six"></div>
    </div>
</template>

<script>
    export default {
        name: 'InfoBubble',
        props: [ 'msg' ]
    }
</script>

<style scoped>
    .info-bubble {
        position: absolute;
        /* top: v-bind('top'); */
        /* left: v-bind('left'); */
        padding: 0.5rem 1rem;
        background-color: var(--green);
        border-radius: 15px;
        color: var(--lighter-green);
        z-index: 20;
        font-family: ps-italic, Arial, Helvetica, sans-serif;
        font-size: 0.8rem;
    } 

    .info-bubble p { 
        max-width: 10rem; 
        position: relative;
        z-index: 30;
    }

    .bubble {
        position: absolute;
        background-color: var(--green);
        border-radius: 50%;
        z-index: 15;
        width: 1rem;
        height: 1rem;
    }

    .bubble.one {
        top: 20%;
        left: -3%;
    }

    .bubble.two {
        top: -10%;
        left: 9%;
    }

    .bubble.three {
        right: 8%;
        bottom: -13%;
        width: 1.3rem;
        height: 1.3rem;
    }

    .bubble.four {
        right: -3%;
        bottom: 25%;
    }

    .bubble.five {
        bottom: -23%;
        right: 19%;
        width: 0.8rem;
        height: 0.8rem;
    }

    .bubble.six {
        bottom: -30%;
        right: 13%;
        width: 0.4rem;
        height: 0.4rem;
    }
</style>