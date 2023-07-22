<template>
    <header :class="isShrinked ? 'shrink-header':''">
        <router-link to="/">
            <img src="@/assets/v2/logo_onlylemon.png" alt="LogoCitronPressé" class="logo">
            <img src="@/assets/v2/title_white.png" alt="Le Citron Pressé" class="titre" :class="[isShrinked ? 'shrink-title': '']">
        </router-link>

        <nav v-if="isShrinked">
            <router-link to="/"><span class="link">ACCUEIL</span></router-link>
            <router-link to="/macarons"><span class="link">MACARONS</span></router-link>
            <router-link to="/patisserie"><span class="link">PÂTISSERIE</span></router-link>
            <router-link to="/biscuits"><span class="link">BISCUITS</span></router-link>
            <router-link to="/a-propos-de-nous"><span class="link">À PROPOS DE NOUS</span></router-link>
            <router-link to="/contact"><span class="link">CONTACT</span></router-link>
        </nav>

        <div class="cart-container">
            <div class="cart">
                <img src="@/assets/v2/panier.png" alt="Panier"/>
                <div class="number prevent-text-selection">{{ numberOfElements }}</div>
            </div>
        </div>        
    </header>
</template>

<script>

export default {
    name: 'HeaderComponent',
    props: {
        numberOfElements: {
            type: Number,
            default: 0
        },
        showMobileCart: {
            type: Boolean,
            default: true
        },
        isShrinked: {
            type: Boolean,
            default: false
        },
        currentPath: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>
    header {
        /* display: flex; */
        position: fixed;
        width: 100vw;
        min-height: 7.5rem;
        z-index: 99;
        border-radius: 0 0 35px 0;
        background-color: var(--light-green);
        transition: all 250ms cubic-bezier(0.33, 1, 0.6, 1);
    }

    .shrink-header {
        min-height: 5rem;
    }

    nav {
        display: flex;
        min-height: 5rem;
        flex-wrap: nowrap;
        justify-content: flex-end;
        align-items: center;

        margin-right: 2rem;
        gap: 0.2rem;
        animation: appear 0.3s normal forwards ease-in-out;
    }

    @keyframes appear {
        0% {
            opacity: 0;
            transform: translateX(2%);
        }
        100% {
            opacity: 1;
            transform: translateX(0%);
        }
    }

    nav a {
        text-decoration: none;
        font-family: ps-bold, Avenir, Helvetica, Arial, sans-serif;
        color: var(--white);
        height: 100%;
        display: flex;
        align-items: center;
    }

    .link {
        min-height: 3rem;
        display: flex;
        align-items: center;
        padding: 0 0.95rem;
        border-radius: 2rem;
    }
    .link:hover {
        background-color: var(--lighter-green);
        cursor: pointer;
    }

    nav a.router-link-exact-active {
        color: var(--green);
    }
    nav a.router-link-exact-active .link {
        background-color: var(--yellow);
    }
    nav a.router-link-exact-active:hover {
        color: var(--light-green);
    }

    .logo {
        position: absolute;
        max-width: 18rem;
        top: 0%;
        left: 0%;
        transform: translateX(-30%) translateY(-30%);
        z-index: 100;
    }

    .titre {
        position: absolute;
        max-width: 15rem;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        transition: all 250ms cubic-bezier(0.33, 1, 0.6, 1);
    }

    .shrink-title {
        max-width: 9rem;
        left: 18rem;
    }

    .cart-container {
        position: absolute;
        right: 0%;
        bottom: 0%;
        transform: translateX(-53%) translateY(99%);

        background-color: var(--green);
        border-radius: 0 0 50% 50%;

        min-height: 4.7rem;
        display: flex;
        flex-direction: column-reverse;
    }

    .cart img {
        width: 25px;
        padding: 1rem;
    }

    .cart .number {
        position: absolute;
        color: white;
        top: 24%;
        right: 17%;

        background-color: var(--yellow);
        border-radius: 50%;
        padding: 0.12rem 0.4rem;
        font-size: 0.9rem;
    }

    .cart {
        margin: 0.4rem;
        min-height: 3.7rem;
        aspect-ratio: 1 / 1;
    }

    .cart:hover {
        background-color: var(--light-green);
        border-radius: 50%;
        cursor: pointer;
    }
</style>