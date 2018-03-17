<template>
  <div id="app">
    <h3>{{ title }}</h3>

    <div style="padding: 10px;">
      <lemon-date-picker></lemon-date-picker>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: '日历组件'
    }
  }
}
</script>

<style lang="scss" scoped>
#app {

}
</style>
