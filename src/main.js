import Vue from 'vue';
import 'normalize.css';
import App from './app';
import Components from './components';
Vue.use(Components);


export default new Vue({
  el: '#app',
  template: '<app />',
  components: { App }
});
