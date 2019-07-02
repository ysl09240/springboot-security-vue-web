// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';

require('!style-loader!css-loader!less-loader!./style/color.less');
import VueI18n from 'vue-i18n'
import VueResource from 'vue-resource'
import qs from 'qs';
import Treeselect from '@riophae/vue-treeselect';
import '@riophae/vue-treeselect/dist/vue-treeselect.css';
import Global from './components/Global'
// import SIdentify from './components/identify'
import QRCode from 'qrcodejs2'
import layer from 'vue-layer'
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'
import VueCookies from 'vue-cookies'

import Print from 'vue-print-nb'


Vue.prototype.$layer = layer(Vue);
Vue.prototype.GLOBAL = Global

Vue.use(qs);
Vue.use(VueResource);
Vue.use(ElementUI);//ui
Vue.use(VueI18n); // 通过插件的形式挂载
Vue.use(Treeselect);
// Vue.use(SIdentify);
Vue.use(preview);
Vue.use(VueCookies);
Vue.use(Print);

Vue.use(preview);//图片放大预览

const i18n = new VueI18n({
  locale: 'zh-CN', // 语言标识

  messages: {
    'zh-CN': require('./common/lang/zh'), // 中文语言包
  }
})
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: {
    App ,QRCode
  },
  template: '<App/>',
  render: h => h(App)
})
