import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
      // 商铺ID
      shopId:3,
      // 选择的商品分类ID
      selected:[],
      // 选择的商品分类名称
      selectedName:[],
    },
    mutations: {
      setSelectedName(state,option){
        state.selectedName = []
        state.selected = []
        option.forEach(item=>{
          state.selectedName.push(item.label)
          state.selected.push(item.value)
        })
      }
    }
})
