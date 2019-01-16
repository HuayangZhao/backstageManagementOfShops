<template>
    <div class="goodsList">
        <h2>商品列表</h2>
        <hr>
      <div class="goodsListTag">
        <div class="creatBut">
          <div><i class="el-icon-document"></i><span @click="toDrafts">草稿箱（0）</span></div>
          <div><i class="el-icon-delete"></i><span  @click="toRecycleBin">回收站（0）</span></div>
        </div>
        </div><el-menu default-active="/goodsList/onLineGoods" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/goodsList/onLineGoods">线上商品</el-menu-item>
        <el-menu-item index="/goodsList/uploadRecord">上传记录</el-menu-item>
    </el-menu>
      <div class="line"></div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    methods:{
      toDrafts(){
        this.$router.push({path:'/drafts'})
      },
      toRecycleBin(){
        this.$router.push({path:'/recycleBin'})
      }
    }
}
</script>
<style lang="less" scoped>
.goodsListTag {
  position: relative;
  .creatBut {
    position: absolute;
    display: flex;
    top: 40px;
    right: 10px;
    font-size: 12px;
    z-index: 9999;
    span {
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
</style>


