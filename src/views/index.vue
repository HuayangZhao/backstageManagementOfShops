<template>
  <div class="box">
    <el-container>
      <el-header>
        <h1>人人咖管理后台</h1>
        <div class="tab">
          <el-menu
            :default-active="$route.path"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#2F3141"
            text-color="#fff">
            <el-menu-item index="1">站内信</el-menu-item>
            <el-menu-item index="2">客服平台</el-menu-item>
            <el-menu-item index="3">处理中心</el-menu-item>
            <el-menu-item index="4">处理中心</el-menu-item>
            <el-menu-item index="5">处理中心</el-menu-item>
            <el-menu-item index="6">下载APP</el-menu-item>
            <el-menu-item index="7">消息中心</el-menu-item>
          </el-menu>
          <div class="line"></div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="220px">
          <el-menu
            router
            :default-active="$route.path"
            :default-openeds="$store.state.option"
            class="el-menu-vertical-demo"
            @open="changeSubmenu"
            @select="changeOption"
          >
            <el-submenu index="/goodsIndex">
              <template slot="title">
                <i class="el-icon-goods"></i>
                <span>商品管理</span>
              </template>
                <el-menu-item index="/goodsIndex/createNewGoods">新商品发布</el-menu-item>
                <el-menu-item index="/goodsIndex/goodsList">商品列表</el-menu-item>
                <el-menu-item index="/goodsIndex/evaluate">评价管理</el-menu-item>
            </el-submenu>
            <el-submenu index="/orderIndex">
              <template slot="title">
               <i class="el-icon-tickets"></i>
                <span>订单管理</span>
              </template>
                <el-menu-item index="/orderIndex/orderList">订单查询</el-menu-item>
                <el-menu-item index="/orderIndex/deliveryCenter">发货中心</el-menu-item>
                <el-menu-item index="/orderIndex/freight">物流工具</el-menu-item>
                <el-menu-item index="/orderIndex/package">包裹中心</el-menu-item>
            </el-submenu>
            <el-submenu index="/indexAfterSale">
              <template slot="title">
                <i class="el-icon-sold-out"></i>
                <span>售后管理</span>
              </template>
              <el-menu-item index="/IndexAfterSale/afterSale">退款/售后</el-menu-item>
              <el-menu-item index="3-2">售后设置</el-menu-item>
              <el-menu-item index="3-3">退货包运费</el-menu-item>
              <el-menu-item index="3-4">小额打款</el-menu-item>
              <el-menu-item index="3-4">售后小助手</el-menu-item>
            </el-submenu>
            <el-submenu index="/indexStoreManagement">
              <template slot="title">
                <i class="el-icon-location-outline"></i>
                <span>店铺管理</span>
              </template>
              <el-menu-item index="/indexStoreManagement/storeManagement">店铺信息</el-menu-item>
              <el-menu-item index="/indexStoreManagement/orderInvoice">订单开票</el-menu-item>
              <el-menu-item index="4-3">违规信息</el-menu-item>
              <el-menu-item index="4-4">订单申诉</el-menu-item>
              <el-menu-item index="4-4">退店</el-menu-item>
            </el-submenu>
            <el-submenu index="/indexDataCenter">
              <template slot="title">
                <i class="el-icon-sold-out"></i>
                <span>数据中心</span>
              </template>
              <el-menu-item index="/IndexDataCenter/businessOverview">经营总览</el-menu-item>
              <el-menu-item index="/IndexDataCenter/goodsData">商品数据</el-menu-item>
              <el-menu-item index="5-3">店铺数据</el-menu-item>
              <el-menu-item index="5-4">售后服务质量</el-menu-item>
            </el-submenu>
            <el-submenu index="/indexAccount">
              <template slot="title">
                <i class="el-icon-loading"></i>
                <span>账户资金</span>
              </template>
              <el-menu-item index="/indexAccount/loanAccount">贷款账户</el-menu-item>
              <el-menu-item index="6-2">保证金</el-menu-item>
              <el-menu-item index="6-3">发票管理</el-menu-item>
              <el-menu-item index="6-4">贷款扣款明细</el-menu-item>
              <el-menu-item index="6-5">资金限制</el-menu-item>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title">
                <i class="el-icon-loading"></i>
                <span>会员管理</span>
              </template>
              <el-menu-item index="7-1">权益管理</el-menu-item>
              <el-menu-item index="7-2">VIP设置</el-menu-item>
              <el-menu-item index="7-3">会员列表</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
      return {
        activeIndex1: '1',
      }

    },
  methods: {
    changeSubmenu(index,indexPath){
      console.log("一级");
      console.log(index, indexPath);
      this.$store.commit('setKey',index)
    },
    changeOption(key,indexPath){
      console.log("二级");
      console.log(key,indexPath);
      this.$store.commit('setIndexPath',indexPath)
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
   },
  watch: {
    '$route'(to, from) {
      this.activeIndex = to.name // data中放置一个default-active的绑定数据
    }
  }
};
</script>
<style lang="less" scoped>
  .el-submenu .el-menu-item {
    background-color: #F3F4F8;
  }
  .el-submenu .el-menu-item.is-active {
    background-color: skyblue;
    color: #fff;
  }
.el-menu--horizontal>.el-menu-item.is-active {
  color: red;
  border-bottom: 4px solid #f71111;
}
.box {
    height: 100%;
    .el-container {
        height: 100%;
    }
  .el-header {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
    height: 60px;
    background-color: #2f3141;
    color: #fff;
  }
  .el-menu-demo {
    font-size: 20px;
    font-weight: 800;
  }
  .el-menu-vertical-demo {
      background-color: #F3F4F8;
      height: 100%;
  }
}
</style>
