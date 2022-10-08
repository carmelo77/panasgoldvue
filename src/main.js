import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import "./css/style.css";

import axios from 'axios';

Vue.config.productionTip = false
Vue.prototype.$http = axios;
// axios.defaults.baseURL = 'https://panasgold.com/dashboard/public/api';
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

import Zendesk from '@dansmaculotte/vue-zendesk'

Vue.use(Zendesk, {
  //testing
  key: 'f94a30a1-0548-4f3a-b372-25c8972e5666',
  // key: 'a40aceb4-3a36-4c72-a049-a9b638fbe892',
  disabled: false,
  hideOnLoad: false,
  // settings: {
  //   webWidget: {
  //     color: {
  //       theme: '#78a300'
  //     }
  //   }
  // }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
