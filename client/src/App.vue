<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
const layout = "default";
export default {
  name: 'App',
  computed: {
    layout() {
        return (this.$route.meta.layout || layout) + '-layout';
    },
  }
}
</script>


<style src="./assets/css/main.scss" lang="scss" />
