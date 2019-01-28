<template>
    <div class="sale">
      <el-menu default-active="/afterSale/refund" class="el-menu-demo" mode="horizontal" router >
        <el-menu-item index="/afterSale/refund">退款/售后</el-menu-item>
        <el-menu-item index="2">退货包运费</el-menu-item>
        <el-menu-item index="3">商家举证</el-menu-item>
        <el-menu-item index="4">售后小助手</el-menu-item>
        <el-menu-item index="5">急速退款</el-menu-item>
      </el-menu>
      <div class="line"></div>
      <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: "index"
    }
</script>

<style scoped>

</style>
