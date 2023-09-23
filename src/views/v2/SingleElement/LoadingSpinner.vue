<template>
    <div class="load-ring"><div></div><div></div><div></div><div></div></div>
</template>

<script>
    export default {
        name: "LoadingSpinner"
    }
</script>

<style scoped>
    .load-ring {
        display: inline-block;
        position: absolute;
        width: 80px;
        height: 80px;
        z-index: 100;
        bottom: 0.5rem;
        left: 0.5rem;
        transform: scale(0.75);
    }
    .load-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 8px solid #fff;
        border-radius: 50%;
        animation: load-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #fff transparent transparent transparent;
    }
    .load-ring div:nth-child(1) { animation-delay: -0.45s; }
    .load-ring div:nth-child(2) { animation-delay: -0.3s; }
    .load-ring div:nth-child(3) { animation-delay: -0.15s; }

    @keyframes load-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>