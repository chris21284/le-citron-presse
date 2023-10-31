<template>
    <div class="page404">
        <div class="img-bg">
            <img class="lemon-bed" src="@/assets/icons/lemon_bed_404.png" alt="Sleepy Lemon" />
        </div>

        <div class="side-info">
            <h1>Rien à voir par ici</h1>
            <h3>À part un citron qui dort !</h3>
            <router-link to="/"><span>ACCUEIL</span></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NotFoundPage'
    }
</script>

<style scoped>
    .page404 {
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
        gap: 5rem;
        padding: 5rem 2rem;
    }

    .img-bg {
        position: relative;
        width: 100%;
        aspect-ratio: 1 / 1;
        max-width: 30rem;
        background-color: var(--light-green);
        border-radius: 50%;
        overflow: visible;
        transition: all cubic-bezier(0.2, 0, 0.8, 1) 0.7s;
    }

    .lemon-bed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all cubic-bezier(0.2, 0, 0.8, 1) 0.7s;
    }

    .img-bg:hover { transform: scale(1.2); }
    .img-bg:hover .lemon-bed { transform: scale( calc(1 / 1.2) ); }

    .page404 .side-info {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        height: fit-content;
        padding: 1rem 2rem;
        color: var(--white);
        border-radius: 30px;
        background-color: var(--light-green);
        min-width: 16rem;
    }

    .page404 .side-info h1 {
        font-family: ps-bold, Arial, Helvetica, sans-serif;
        font-size: 3rem;
    }

    .page404 .side-info h3 {
        font-family: ps-bold-italic, Arial, Helvetica, sans-serif;
        font-size: 1.3rem;
        opacity: 0.7;
    }

    .page404 .side-info a {
        margin-top: 3rem;
        width: fit-content;
        text-decoration: none;
        color: var(--white);
        padding: 1rem 2rem;
        background-color: var(--green);
        border-radius: 30px;
        font-family: ps-bold, Arial, Helvetica, sans-serif;
    }

    .page404 .side-info a:hover {
        color: var(--green);
        background-color: var(--lighter-green);
    }

    @media only screen and (max-width: 950px) {
        .page404 { flex-direction: column-reverse; gap: 2rem; padding: 2rem; }
    }

    @media only screen and (max-width: 370px) {
        .page404 .side-info { min-width: 8rem; }
        .page404 .side-info h1 { font-size: 1.5rem; }
        .page404 .side-info h3 { font-size: 0.7rem; }
    }
</style>
