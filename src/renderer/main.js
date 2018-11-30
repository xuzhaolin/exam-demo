import Vue from 'vue'
import axios from 'axios'
import ElementUI from 'element-ui';
import App from './App'
import './assets/css/reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router';
import './datastore';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;


Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
