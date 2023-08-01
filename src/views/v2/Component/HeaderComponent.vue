<template>
    <header :class="isShrinked ? 'shrink-header':''">
        <router-link to="/">
            <img src="@/assets/v2/logo_onlylemon.png" alt="LogoCitronPressé" class="logo">
            <img src="@/assets/v2/title_white.png" alt="Le Citron Pressé" class="titre" :class="[isShrinked ? 'shrink-title': '']">
        </router-link>

        <nav v-if="isShrinked">
            <router-link :to="homePath"><span class="link">ACCUEIL</span></router-link>
            <router-link :to="macaronPath"><span class="link">MACARONS</span></router-link>
            <router-link :to="patisseriePath"><span class="link">PÂTISSERIE</span></router-link>
            <router-link :to="patisseriePath"><span class="link">BISCUITS</span></router-link>
            <router-link :to="aProposPath"><span class="link">À PROPOS DE NOUS</span></router-link>
            <router-link :to="contactPath"><span class="link">CONTACT</span></router-link>
        </nav>

        <div class="nav-hamburger">
            <div ref="hamburger_icon" class="hamburger_icon" :class="isHamburgerNavActive ? 'hamburger-active': ''" @click="onClickHamburgerNav">
                <span class="hamburger_layer"></span>
                <span class="hamburger_layer"></span>
                <span class="hamburger_layer"></span>
            </div>
            <div v-outside-closable="{ exclude: ['hamburger_icon', 'hamburger_layer'], handler: 'disableHamburgerNav' }" class="nav-panel" :class="isHamburgerNavActive ? 'nav-active': ''">
                <router-link :to="homePath"><span class="link">ACCUEIL</span></router-link>
                <router-link :to="macaronPath"><span class="link">MACARONS</span></router-link>
                <router-link :to="patisseriePath"><span class="link">PÂTISSERIE</span></router-link>
                <router-link :to="patisseriePath"><span class="link">BISCUITS</span></router-link>
                <router-link :to="aProposPath"><span class="link">À PROPOS DE NOUS</span></router-link>
                <router-link :to="contactPath"><span class="link">CONTACT</span></router-link>
            </div>
        </div>

        <CartBadge />
        
    </header>
</template>

<script>
    import CartBadge from "@/views/v2/Component/CartBadge.vue"

    export default {
        name: 'HeaderComponent',
        components: { CartBadge },
        props: {
            showMobileCart: {
                type: Boolean,
                default: true
            },
            isShrinked: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                homePath: "/",
                macaronPath: "/macarons",
                patisseriePath: "/patisserie",
                biscuitPath: "/biscuits",
                aProposPath: "/a-propos-de-nous",
                contactPath: "/contact",
                isHamburgerNavActive: false
            }
        },
        methods: {
            onClickHamburgerNav() { this.isHamburgerNavActive = !this.isHamburgerNavActive; },
            disableHamburgerNav() { this.isHamburgerNavActive = false; }
        }
    }
</script>

<style>
    header {
        display: flex;
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
        width: 100%;
        margin-right: 2rem;
        gap: 0.2rem;
        animation: appear 0.3s normal forwards ease-in-out;
    }

    nav a,
    .nav-panel a {
        text-decoration: none;
        font-family: ps-bold, Avenir, Helvetica, Arial, sans-serif;
        color: var(--white);
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 1rem;
    }

    nav a.router-link-exact-active,
    .nav-panel a.router-link-exact-active {
        color: var(--green);
    }
    nav a.router-link-exact-active .link,
    .nav-panel a.router-link-exact-active .link {
        background-color: var(--yellow);
    }
    nav a.router-link-exact-active:hover,
    .nav-panel a.router-link-exact-active:hover {
        color: var(--light-green);
    }

    .nav-hamburger {
        position: relative;
        min-height: 100%;
        width: 100%;
        display: none;
        justify-content: flex-end;
        align-items: center;
        margin-right: 3rem;
    }

    .hamburger_icon {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        /* max-height: 2rem; */
        align-items: flex-end;
        justify-content: center;
        padding: 1rem;
        cursor: pointer;
    }
    .hamburger_icon:hover {
        background-color: var(--lighter-green);
        border-radius: 50%;
    }
    .hamburger_icon:hover .hamburger_layer { background-color: var(--green); }

    .hamburger_layer {
        background-color: var(--white);
        min-height: 0.3rem;
        min-width: 2.3rem;
        border-radius: 1rem;
        transform-origin: 0;
        opacity: 1;
        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    opacity 0.55s ease;
    }

    .hamburger-active { max-width: 2rem; }

    .hamburger-active > .hamburger_layer:nth-child(1) {
        transform: rotate(45deg) translate(15%, -100%);
        transform-origin: 0;
    }
    .hamburger-active > .hamburger_layer:nth-child(2) {
        opacity: 0;
        transform: scaleX(0);
    }
    .hamburger-active > .hamburger_layer:nth-child(3) {
        transform: rotate(-45deg) translate(10%, 130%);
        transform-origin: 0;
    }

    .nav-panel {
        position: absolute;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        left: 0;
        top: 100%;
        width: 100%;
        max-width: 15rem;
        min-height: 20rem;
        background-color: var(--light-green);
        border-radius: 0 0 30px 0;
        animation: appear-mobile 0.3s normal forwards ease-in-out;
    }

    .nav-active {
        display: flex;
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

    /* ANIMATIONS */
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

    @keyframes appear-mobile {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: none;
        }
    }

    /* MEDIA QUERIES */
    @media only screen and (max-width: 1200px) {
        header { min-height: 7rem; }
        .logo { max-width: 14rem; }
        .shrink-title { left: 15rem; }
        nav a { font-size: 0.75rem; }
        .link { min-height: 2.3rem; }
    }

    @media only screen and (max-width: 980px) {
        header { min-height: 6rem; }
        .logo { max-width: 12rem; }
        .titre { max-width: 12rem; }
        .shrink-title { 
            max-width: 9rem;
            left: 13.5rem; 
        }
    }

    @media only screen and (max-width: 950px) {
        nav { display: none; }
        .nav-hamburger { display: flex; }
    }

    @media only screen and (max-width: 570px) {
        /* header { min-height: 6rem; } */
        /* .logo { max-width: 9rem; } */
        .titre { max-width: 9rem; }
        .shrink-title { 
            max-width: 9rem;
            left: 13.5rem; 
        }

        .nav-hamburger { margin-right: 2rem; }
        .hamburger_icon { gap: 0.3rem; }
        .hamburger_layer { min-width: 2rem; }
        .hamburger-active { max-width: 1.75rem; }
    }

    @media only screen and (max-width: 430px) {
        .titre { max-width: 7rem; }
        .shrink-title {
            max-width: 7rem;
            left: 12.2rem;
        }
    }
</style>