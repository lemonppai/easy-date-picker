import Vue from 'vue';
import DatePicker from './date-picker';

const Components = {
  DatePicker
};

Components.install = () => {
  for (let key in Components) {
    if (key != 'install') {
      Components[key].install(Vue);
    }
  }
}

export default Components;
