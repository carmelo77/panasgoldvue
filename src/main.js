import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import "./css/style.css";

import axios from 'axios';

Vue.config.productionTip = false
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://localhost:8000/api';

import Zendesk from '@dansmaculotte/vue-zendesk'

Vue.use(Zendesk, {
  key: 'f94a30a1-0548-4f3a-b372-25c8972e5666',
  disabled: false,
  hideOnLoad: false,
  settings: {
    webWidget: {
      color: {
        theme: '#78a300'
      }
    }
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
