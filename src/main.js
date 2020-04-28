import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2';
import VModal from 'vue-js-modal';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(VModal, { dynamic: true, dynamicDefaults: { clickToClose: true } })

Vue.use(VueAxios, axios);
Vue.use(VueClipboard);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

export const eventBus = new Vue();


new Vue({
  render: h => h(App),
}).$mount('#app')
