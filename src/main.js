import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/custom-fonts.css'
import { createPinia } from 'pinia';
import { ClosableDirective } from './custom_directives/outside-closable';

const app = createApp(App);

const pinia = createPinia();

app.directive('outside-closable', ClosableDirective);

app.use(pinia);
app.use(router);
app.mount('#app');