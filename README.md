# lemon-date-picker
基于VUE日期选择组件

### 在项目中引用，并设置成全局组件
```js
import Vue from 'vue';
import Components from '@/componets';
Vue.use(Components);
```

### 在Vue的`template`调用日期选择组件
```html
<lemon-date-picker v-model="beginDate" @change="change"></lemon-date-picker>
```

### `script`部分
```js
export default {
  data() {
    return {
      beginDate: ''
    }
  },
  methods: {
    change(val) {
      console.log(val);
    }
  }
}
```

#### 更多功能开发中，敬请期待
