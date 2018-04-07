<template>
  <div id="app">
    <h3>{{ title }}</h3>

    <div style="padding: 10px;">
      普通：<lemon-date-picker v-model="dateStr1"></lemon-date-picker>
    </div>

    <div style="padding: 10px;">
      禁用：<lemon-date-picker v-model="dateStr2" disabled></lemon-date-picker>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: '日历组件',
      dateStr1: '2018-01-01',
      dateStr2: '2018-01-02'
    }
  }
}
</script>

<style lang="scss" scoped>
#app {

}
</style>
