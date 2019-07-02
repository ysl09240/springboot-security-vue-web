<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
import Vue from "vue";
for (var item in config.server) {
    Vue.prototype[item] = config.server[item];
    if(process.env.NODE_ENV != 'production' && item == 'VIDEO_MONITOR_SERVER_API'){
        Vue.prototype[item]= '/VIDEO_MONITOR_SERVER_API'
    }
}
document.title = config.titles.index;
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
