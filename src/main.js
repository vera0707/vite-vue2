import Vue from 'vue';
import App from './App.vue';
import store from '@/store';
import router from '@/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/icons.scss';
import '@/styles/reset.scss';
import '@/styles/global.scss';

Vue.use(ElementUI, { size: 'small' });

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
