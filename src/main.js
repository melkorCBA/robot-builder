import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import PinDirective from './shared/pin-derective';
import CurrencyFilter from './shared/currency-fillter';

Vue.config.productionTip = false;
Vue.directive('pin', PinDirective);
Vue.filter('currency', CurrencyFilter);

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
