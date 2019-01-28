<template>
    <div class="OnLineGoods">
      <div class="waring">
        <i class="el-icon-warning"></i>请确保提交的商品符合国家法律法规，不得包含违禁商品。平台将随时进行抽审，一经发现，将对商品和店铺进行处理，严重将追究法律责任。
      </div>
        <div class="search">
            <div>
                <span>商品ID</span>
                <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
            </div>
            <div>
                <span>商品编码</span>
                <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
            </div>
            <div>
                <span>商品名称</span>
                <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
            </div>
            <div>
                <span>商品分类</span>
                <el-cascader
                  placeholder="试试搜索：指南"
                  :options="options"
                  filterable
                  size="mini"
                  change-on-select
                ></el-cascader>
            </div>
            <div>
                <span>累计销量</span>
                <el-input style="width:80px" size="mini"></el-input>
                -
                <el-input style="width:80px" size="mini"></el-input>
            </div>
            <div>
                <span>是否预售</span>
                <el-select size="mini" v-model="values">
                    <el-option label="全部" value="all"></el-option>
                    <el-option label="是" value="0"></el-option>
                    <el-option label="否" value="1"></el-option>
                </el-select>
            </div>
           <div>
                <span>当前价</span>
                <el-input style="width:80px" size="mini"></el-input>
                -
                <el-input style="width:80px" size="mini"></el-input>
            </div>
            <div>
                <el-button type="danger" size="mini" style="width: 100px">查询</el-button>
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
            <first :is="activeName" keep-alive></first>
        </div>
    </div>
</template>
<script>
  import first from './first'
  import second from './second'
  import third from './third'
  import fourth from './fourth'
  export default {
    data() {
      return {
        // 子路由
        activeName:'first',
        values:'',
        options: [],
      };
    },
    methods: {
      handleClick(tab, event) {
        this.activeName = tab.name; // tab 为当前触发标签页的组件名
      },
      toPublishNewGoods(){
        this.$router.push({path:'/publishNewGoods'})
      }
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

