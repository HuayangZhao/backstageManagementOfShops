import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
      // 商铺ID  先写着  用户注册或登录就能获取
      shopId:3,
      // 商品信息
      goodsInfo:{},
      // 路由信息
      submenu:'/goodsList',
      option:['1'],
    },
    mutations: {
      setGoodsInfo(state,data){
        state.goodsInfo = data
      },
      setIndexPath(state,data){
        state.option = data
      },
      setKey(state,data){
        state.submenu = data
      }
    }
})
