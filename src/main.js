// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入自己的css
import "@/style/index.less"
Vue.config.productionTip = false;
// 引入element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 引入状态仓库
import store from "../src/store/store.js"
// 引入图片裁剪工具
// import Croppa from 'vue-croppa';
// import 'vue-croppa/dist/vue-croppa.css';
// Vue.use(Croppa);
// 引入移动端富文本编辑器
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
import $ from 'jquery'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
