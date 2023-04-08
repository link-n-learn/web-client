import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/mainIndex'
// import FlashMessage from '@smartweb/vue-flash-message';

createApp(App).use(store).use(router).mount('#app')
