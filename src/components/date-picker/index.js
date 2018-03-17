import Component from './main.vue';
import './main.scss';

Component.install = (Vue) => {
  Vue.component(Component.name, Component);
}

export default Component;
