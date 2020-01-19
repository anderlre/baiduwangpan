// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui';
import {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入树形下拉框
import wl from "wl-vue-select";
import "wl-vue-select/lib/wl-vue-select.css"
Vue.use(wl);
// 引入文件管理器
import wlExplorer from "wl-explorer";
import "wl-explorer/lib/wl-explorer.css"
Vue.use(wlExplorer);

Vue.use(ElementUI);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
