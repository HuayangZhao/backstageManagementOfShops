<template>
    <div class="OnLineGoods">
      <div class="waring">
        <i class="el-icon-warning"></i>请确保提交的商品符合国家法律法规，不得包含违禁商品。平台将随时进行抽审，一经发现，将对商品和店铺进行处理，严重将追究法律责任。
      </div>
        <div class="search">
            <div>
                <span>商品ID</span>
                <el-input  placeholder="用ID查找时不要输入其他选项" style="width:200px" size="mini" type="number" v-model="searchData.id"></el-input>
            </div>
            <div>
                <span>商品编码</span>
                <el-input  placeholder="请输入商品编码" style="width:200px" size="mini" v-model="searchData.code"></el-input>
            </div>
            <div>
                <span>商品名称</span>
                <el-input  placeholder="请输入商品名称" style="width:200px" size="mini" v-model="searchData.name"></el-input>
            </div>
            <div>
                <span>商品分类</span>
                <el-cascader
                  placeholder="试试搜索：服装"
                  :options="classifyOptions"
                  filterable
                  size="mini"
                  v-model=selectCategoryId
                  change-on-select
                ></el-cascader>
            </div>
            <div>
                <span>累计销量</span>
                <el-input style="width:80px" size="mini" type="number" v-model="searchData.salesMax" placeholder="最小值"></el-input>
                -
                <el-input style="width:80px" size="mini" type="number" v-model="searchData.salesMin" placeholder="最大值"></el-input>
            </div>
           <div>
                <span>当前价</span>
                <el-input style="width:80px" size="mini" v-model="searchData.priceMin"  placeholder="最小值"></el-input>
                -
                <el-input style="width:80px" size="mini" v-model="searchData.priceMax"  placeholder="最大值"></el-input>
            </div>
            <div>
                <el-button type="danger" size="mini" style="width: 100px" @click="searchGoods">查询</el-button>
            </div>
        </div>
        <div class="tabBox">
            <el-button type="danger" size="small" class="creatBut" @click="toPublishNewGoods">创建新商品</el-button>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first"></el-tab-pane>
                <el-tab-pane label="在售中" name="second"></el-tab-pane>
                <el-tab-pane label="已售罄" name="third"></el-tab-pane>
                <el-tab-pane label="已下架" name="fourth"></el-tab-pane>
            </el-tabs>
            <first :is="activeName" keep-alive :goodsListData="tableData" @successData="success(resData)"></first>
        </div>
    </div>
</template>
<script>
  import first from './first'
  import second from './second'
  import third from './third'
  import fourth from './fourth'
  import {getAllSelectList,getProductByAll} from "@/api/axios"
  export default {
    data() {
      return {
        // 子路由
        activeName:'first',
        values:'',
        options: [],
        // 所有分类
        classifyOptions:[],
        selectCategoryId:[],
        searchData:{
          categoryId:null,
          code:null,
          id:null,
          name:null,
          priceMax:null,
          priceMin:null,
          salesMax:null,
          salesMin:null,
        },
        tableData:[]
      };
    },
    mounted(){
      this.getAllCategory()
    },
    methods: {
      handleClick(tab, event) {
        this.activeName = tab.name; // tab 为当前触发标签页的组件名
      },
      toPublishNewGoods(){
        this.$router.push({path:'/publishNewGoods'})
      },
      // 获取所有分类
      getAllCategory(){
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
              this.classifyOptions = newArr;
            }
          })
      },
      // 查询商品
      searchGoods(){
        if(this.searchData.categoryId === null && this.searchData.code === null && this.searchData.id === null && this.searchData.name === null && this.searchData.priceMax === null && this.searchData.priceMin === null){
            return this.$message({message: '查询信息至少有一项不为空', type: 'warning'});
        }
        if(this.selectCategoryId.length > 0){
          this.searchData.categoryId = this.selectCategoryId[this.selectCategoryId.length-1]
        }
        getProductByAll(this.searchData).then(res=>{
          console.log(res);
          if(res.data.data !== 1){
              this.tableData = res.data.data
          }else {
            this.$message({message: '未查询到商品信息', type: 'warning'});
          }
        })
      },
    },
    components:{
      first,
      second,
      third,
      fourth
    }
  };
</script>
<style lang="less" scoped>
  .search {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;
    background-color: #F8F8F8;
    >div {
      width: 33.333%;
      margin: 10px 0;
        span {
            font-size: 12px;
        }
    }
}
  .tabBox {
    margin-top: 20px;
    position: relative;
    .creatBut {
      float: right;
      margin-right: 30px;
      cursor: pointer;

    }
  }
  .waring {
    border: 1px solid #ffd888;
    margin-top: 10px;
    padding: 10px;
    font-size: 12px;
    background-color: #fff7dd;
    .el-icon-warning{
      color: #ffa900;
      margin-right: 10px;
    }
  }
</style>

