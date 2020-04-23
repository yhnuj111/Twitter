import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2';

Vue.use(VueAxios, axios);
Vue.use(VueClipboard);

export const eventBus = new Vue();


new Vue({
  render: h => h(App),
}).$mount('#app')
