import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

async function main() {
  let storeInstance = await store();

  new Vue({
    router: router(storeInstance),
    store: storeInstance,
    render: h => h(App),
  }).$mount('#app');
}

main();
