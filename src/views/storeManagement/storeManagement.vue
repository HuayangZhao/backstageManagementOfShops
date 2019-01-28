<template>
  <div style="padding-right: 15%">
    <el-menu default-active="/storeManagement/essentialInformation" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
      <el-menu-item index="/storeManagement/essentialInformation">基本信息</el-menu-item>
      <el-menu-item index="/storeManagement/qualificationInformation">资质信息</el-menu-item>
    </el-menu>
    <div class="line"></div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {

  }
</script>

<style scoped>

</style>
