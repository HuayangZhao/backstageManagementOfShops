import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
      // 选择的商品分类ID
      selected:[],
      // 选择的商品分类名称
      selectedName:[],
    },
    mutations: {
      setSelected(state,option){
        state.selected = option
      },
      setSelectedName(state,option){
        state.selectedName = []
        state.selected = []
        option.forEach(item=>{
          state.selectedName.push(item.label)
          state.selected.push(item.value)
        })
        console.log(state.selected);
        console.log(state.selectedName);
      }
    }
})
