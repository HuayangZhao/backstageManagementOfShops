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
      // 添加规格的名字：图片
      specImg:[]
    },
    mutations: {
      setSelectedName(state,option){
        state.selectedName = []
        state.selected = []
        option.forEach(item=>{
          state.selectedName.push(item.label)
          state.selected.push(item.value)
        })
      },
      pushSpecTag(state,obj){
        state.specImg.push(obj)
        console.log(state.specImg);
      },
      pushSpecImg(state,obj){
        state.specImg.forEach(item=>{
           if(item.name === obj.tag){
             item.optionImg = obj.url
           }
        })
        console.log(state.specImg);
      },
      removeSpecTag(state,obj){
        let index = state.specImg.indexOf(obj)
        if (index > -1) {
          state.specImg.splice(index, 1);
        }
        console.log(state.specImg);
      },
      delSpec(state){
        state.specImg.forEach(item=>{
          // if(item.hasOwnProperty("falg")){
          if("falg" in item){
            let index = state.specImg.indexOf(item)
            state.specImg.splice(index, 1);
          }
        })
        console.log(state.specImg);
      },
    }
})
