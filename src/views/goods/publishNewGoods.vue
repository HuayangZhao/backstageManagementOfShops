<template>
  <div class="publishNewGoods">
    <h2>发布新商品</h2>
    <hr>
    <h3>选择商品分类:</h3>
    <el-cascader placeholder="试试搜索：指南"
                 :options="options"
                 filterable
                 style="width: 300px"
                 v-model="selectedOptions"
                 @change="classification"
                 :props="props"
    ></el-cascader>
    <el-popover placement="top-start" title="已选:" width="200" trigger="hover" :content="$store.state.selectedName.join(' > ')">
      <el-button slot="reference" type="danger" @click="clickCreate">确认创建该类商品</el-button>
    </el-popover>
  </div>
</template>
<script>
  function getCascaderObj(val,opt) {
    return val.map(function (value, index, array) {
      for (var itm of opt) {
        if (itm.value == value) { opt = itm.children; return itm; }
      }
      return null;
    });
  }
  import {getAllSelectList} from "@/api/axios"
  export default {
    data() {
      return {
        vals:[],
        falg:false,
        selectedOptions: [],
        options:[],
        props:{
          label:"label",
          value:"value",
          children:"children"
        }
      }
    },
    mounted() {
      this.getAll()
    },
    methods: {
      // 获取所有分类函数
      getAll() {
        getAllSelectList().then(res => {
          var newArr = [];
          if(res.status == 200) {
            res.data.forEach(item => {
              if (item.parentId === 0) {
                item.children = [];
                newArr.push(item)
              }
            });
            res.data.forEach(item => {
              newArr.forEach(tisp => {
                if (item.parentId == tisp.value) {
                  tisp.children.push(item)
                }
              })
            });
            this.options = newArr;
          }
        })
      },
      classification(value){
        this.vals=getCascaderObj(this.selectedOptions, this.options);
        this.$store.commit('setSelectedName', this.vals);

      },
      clickCreate() {
        let selected = this.selectedOptions;
        this.$store.commit('setSelected', selected);
        if(this.selectedOptions.length !== 0){
          this.options.forEach(item=>{
            if(item.value == this.selectedOptions[0]){
              this.falg = true
              this.$router.push({path: 'createNewGoods'})
              return
            }
          })
          if(!this.falg){
            this.$message.error('请选择分类');
          }
        }else {
          this.$message.error('请选择分类');
        }

      }
    },
  };
</script>
<style lang="less" scoped>
  .publishNewGoods {
    width: 80%;
  }

  h3 {
    margin: 20px 0;
  }
</style>
