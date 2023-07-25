import { createApp, toRef } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/custom-fonts.css'
import { createPinia } from 'pinia';

const app = createApp(App);

const pinia = createPinia();

const ClosableDirective = {
    mounted(el, binding) {
        const handleOutsideClick = (e) => {
            e.stopPropagation();
            const { handler, exclude } = binding.value;

            let clickedOnExcludedEl = false;
            exclude.forEach((refName) => {
                if (!clickedOnExcludedEl) {
                    const excludedEl = toRef(refName);
                    clickedOnExcludedEl = e.target.outerHTML.includes(excludedEl.value)
                }
            });

            if (!el.contains(e.target) && !clickedOnExcludedEl) {
                binding.instance[handler]();
            }
        };

        window.addEventListener('click', handleOutsideClick);
        window.addEventListener('touchstart', handleOutsideClick);

        el._handleOutsideClick = handleOutsideClick
    },
    beforeUnmount(el) {
        window.removeEventListener('click', el._handleOutsideClick);
        window.removeEventListener('touchstart', el._handleOutsideClick);
    },    
};

app.directive('outside-closable', ClosableDirective);

app.use(pinia);
app.use(router);
app.mount('#app');