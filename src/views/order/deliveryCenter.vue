<template>
    <div class="deliveryCenter">
      <el-menu default-active="/deliveryCenter/deliverySon" class="el-menu-demo" mode="horizontal" router >
        <el-menu-item index="/deliveryCenter/deliverySon">处理中心</el-menu-item>
        <el-menu-item index="/deliveryCenter/complaint">物流服务异常投诉</el-menu-item>
        <el-menu-item index="/deliveryCenter/logisticsReminder">物流提醒</el-menu-item>
        <el-menu-item index="/deliveryCenter/deliverGoods">急速发货</el-menu-item>
      </el-menu>
      <div class="line"></div>
      <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: "deliveryCenter"
    }
</script>

<style scoped lang="less">
  .deliveryCenter {
    padding-right: 15%;
  }
  .el-menu--horizontal>.el-menu-item.is-active {
    font-weight: 700;
    color: #000;
  }
</style>
