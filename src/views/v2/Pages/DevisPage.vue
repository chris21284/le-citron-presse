<template>
    <div class="devis-page">
        <div class="side-info">
            <div class="contact-mail">
                <input id="contactInput" class="contactInput" v-on:keyup.enter="updateCart" placeholder="Entrez votre mail de contact..."/>
            </div>
            <div class="additionnal-info">
                <textarea id="addInfoInput" class="addInfoInput" v-on:keyup.enter="updateCart" placeholder="Merci de préciser vos demandes spécifiques dans cet encadré avant d'envoyer votre mail... (Allergies / Évènement spécial / Demandes sur-mesure / etc)"></textarea>
            </div>
            <div class="mail-container">
                <textarea id="devisInput" class="devisInput" :value="getDevisMail" placeholder="Votre devis sera généré automatiquement dès qu'il y aura des produits dans votre panier..."></textarea>
                <img src="@/assets/v2/clipboard_icon.png" alt="Clipboard Icon" loading="lazy" class="clipboard-btn" @click="copyToClipboard">
            </div>
        </div>
        <div class="side-info">
            <div class="product-container">
                <div class="product-list">
                    <p v-if="numberOfElements <= 0" class="emptyCartText">Rien dans votre panier pour le moment !</p>
                    <DevisItem v-for="item in cart"
                        :key="item.id"
                        :item="item"
                    />
                </div>
                <div class="price-estimate"> Total Estimé : {{ getTotalPrice }} €</div>
            </div>

            <div class="contact-container">
                <a :href="getMailHref" class="contact-btn">COMMANDER PAR MAIL</a>
            </div>
        </div>
    </div>
</template>

<script>
    import DevisItem from "@/views/v2/SingleElement/DevisItem.vue";

    export default {
        name: 'DevisPage',
        components: { DevisItem },
        data() {
            return {
                cart: {},
                numberOfElements: 0,
                componentKey: 0,
                mailInput: null,
                devisInput: null,
                addInfoInput: null
            }
        },
        created() {
            window.addEventListener(process.env.VUE_APP_CART_UPDATE, this.updateCart);
            this.updateCart();
        },
        mounted() {
            this.mailInput = document.getElementById("contactInput");
            this.devisInput = document.getElementById("devisInput");
            this.addInfoInput = document.getElementById("addInfoInput");
        },
        beforeUnmount() { window.removeEventListener(process.env.VUE_APP_CART_UPDATE, this.updateCart); },
        computed: {
            getTotalPrice() {

                if (this.numberOfElements <= 0) return '- -';

                let priceSum = 0;
                for (let id in this.cart) {
                    let item = this.cart[id];
                    priceSum += (item.nbElement * item.price.$numberDecimal);
                }

                return priceSum;
            },

            getDevisMail() {
                this.componentKey;
                if (this.numberOfElements <= 0) return '';

                let devis = "Bonjour, je souhaite passer commande des produits suivants : \n";

                for (let id in this.cart) {
                    let item = this.cart[id];
                    devis += "\t• " + item.nbElement + "x " + item.name + '\n';
                }

                devis += "\n\nPour un total estimé à " + this.getTotalPrice + " €.\n";

                if (this.mailInput && this.mailInput.value)
                    devis += "\nContactez-moi à cette adresse : " + this.mailInput.value;

                if (this.addInfoInput && this.addInfoInput.value) {
                    if (this.addInfoInput.value.trim() != "")
                        devis += "\nInfo Complémentaire(s) : " + this.addInfoInput.value.split(/\r?\n/).filter(line => line.trim() !== '').join('\n');
                }

                devis += "\n\nMerci d'avance !";
                return devis;
            },

            getMailHref() {
                if (this.numberOfElements <= 0) return '';
                if (!this.devisInput || !this.devisInput.value) return '';

                let mailHref = "mailto:" + process.env.VUE_APP_LE_CITRON_PRESSE_MAIL + "?subject=Commande Devis&body=" + encodeURIComponent(this.devisInput.value);
                return mailHref;
            }
        },
        methods: {
            updateCart() {
                this.numberOfElements = this.$root.store.getCartNumberOfItems();
                this.cart = this.$root.store.cart;
                if (this.devisInput)
                    this.devisInput.value = ""; //empties the devis input field
                this.componentKey += 1; //force re calculate computed
            },

            copyToClipboard() {
                let copyTxt = document.getElementById("devisInput");
                copyTxt.select();
                copyTxt.setSelectionRange(0, 99999);

                navigator.clipboard.writeText(copyTxt.value);
            }
        }
    }
</script>

<style scoped>
    .devis-page {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin: 3.5rem 1.2rem;
        margin-bottom: 0;
        gap: 5rem;
        flex-grow: 1;
    }

    .side-info {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        max-height: 58dvh;
        max-width: 40rem;
        height: 58dvh;
        width: 100%;
        margin: 1rem;
        gap: 0.3rem;
    }

    .mail-container {
        height: 100%;
        position: relative;
    }

    .devisInput,
    .contactInput,
    .addInfoInput {
        width: 100%;
        height: 100%;
        margin: 0;
        border: none;
        background-color: var(--light-green);
        /* border-radius: 1rem; */
        color: var(--white);
        font-family: ps-regular, Arial, Helvetica, sans-serif;
        font-size: 1.2rem;
        padding: 1rem 1.3rem;
        box-sizing: border-box;
        resize: none;
    }

    .contactInput { border-radius: 1rem 1rem 0 0; }
    .addInfoInput { border-radius: 0; }
    .devisInput { border-radius: 0 0 1rem 1rem; }

    .clipboard-btn {
        position: absolute;
        bottom: 0.3rem;
        right: 0.3rem;
        object-fit: cover;
        max-width: 1.5rem;
        cursor: pointer;
        padding: 0.5rem;
    }

    .clipboard-btn:hover { 
        background-color: var(--lighter-green); 
        border-radius: 1rem;
    }

    .contact-mail {
        min-height: 2.5rem;
    }

    .additionnal-info {
        min-height: 7rem;
    }

    .addInfoInput::-webkit-scrollbar-track {
        margin-right: 1rem;
    }

    .product-container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        padding: 1rem 2rem;
        background-color: var(--light-green);
        border-radius: 1rem 1rem 0 1rem;
    }

    .product-list {
        flex-grow: 1;
        overflow-y: scroll;
    }

    .price-estimate {
        text-align: end;
        color: var(--white);
        font-family: ps-bold, Arial, Helvetica, sans-serif;
        font-size: 1.3rem;
        margin-right: 1.5rem;
    }

    .contact-container {
        min-height: 3rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .contact-btn {
        max-width: 20rem;
        background-color: var(--green);
        border-radius: 0 0 1rem 1rem;
        font-family: ps-bold, Arial, Helvetica, sans-serif;
        font-size: 1.4rem;
        color: var(--white);
        cursor: pointer;
        text-decoration: none;
        padding: 0.5rem 1.3rem;
        box-sizing: border-box;
    }

    .contact-btn:hover { 
        background-color: var(--lighter-green); 
        border: 1px solid var(--green);
    }

    @media only screen and (max-width: 1285px) {
        .devis-page { flex-direction: column; }
    }
</style>