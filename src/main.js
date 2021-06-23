import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

// 加载vant组件库
import Vant from 'vant';
// 加载vant组件库样式
import 'vant/lib/index.css';

import './styles/index.less'

// 自动设置REM基准值大小(HTML标签字体大小)
import 'amfe-flexible'

// 全局注册vant中的组件
Vue.use(Vant);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
