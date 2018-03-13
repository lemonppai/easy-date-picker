<template>
  <div id="app">
    <h3>{{ title }}</h3>

    <div style="padding: 10px;">
      <date-picker></date-picker>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/date-picker';
export default {
  data() {
    return {
      title: '日历组件'
    }
  },
  components: {
    DatePicker
  }
}
</script>

<style lang="scss" scoped>
#app {

}
</style>
