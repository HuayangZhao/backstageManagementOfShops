<template>
    <div class="deliverySon">
      <div class="waring">
        <i class="el-icon-warning"></i>
        <span>虚假发货严重的可能会被处以店铺二级限制（商品移除资源位，移除广告，禁止上新，禁止上架）：</span>
        <p> 1.导入单号24小时内可修改，填错单号可能会被判虚假发货。</p>
        <p>2.请先揽件后导入，导入后24小时内无揽件信息会被判虚假发货</p>
      </div>

      <div class="tabBox">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="批量导入" name="first"></el-tab-pane>
          <el-tab-pane label="单条导入" name="second"></el-tab-pane>
          <el-tab-pane label="在线下单" name="third"></el-tab-pane>
        </el-tabs>
        <first :is="activeName" keep-alive></first>
      </div>
    </div>
</template>

<script>
  import first   from './batchImport'
  import second  from './singleImport'
  import third  from './orderOnline'
    export default {
        name: "deliverySon",
      data(){
          return {
            activeName: 'first'
          }
      },
      methods: {
        handleClick(tab, event) {
          this.activeName = tab.name; // tab 为当前触发标签页的组件名
        }
      },
      components:{
        first,
        second,
        third
      }
    }
</script>

<style scoped lang="less">
  .tabBox {
    margin-top: 20px;
  }
  .waring {
    border: 1px solid #ffd888;
    margin-top: 10px;
    padding: 10px;
    font-size: 12px;
    background-color: #fff7dd;
    p {
      margin-top: 10px;
      padding-left: 30px;
    }
  .el-icon-warning{
    color: #ffa900;
    margin-right: 10px;
  }
  }
</style>
