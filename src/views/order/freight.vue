<template>
    <div style="padding-right: 15%">
      <el-menu default-active="/freight/freightTemplate" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/freight/freightTemplate">运费模板</el-menu-item>
        <el-menu-item index="/freight">送装服务模板</el-menu-item>
        <el-menu-item index="/freight/managementAddress">发货地址管理</el-menu-item>
      </el-menu>
      <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "freight"
    }
</script>

<style scoped>

</style>
