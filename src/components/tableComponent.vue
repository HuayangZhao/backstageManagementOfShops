<template>
    <div>
      <div class="waring">
        <i class="el-icon-warning"></i><span v-text="msgWaring"></span>
      </div>
      <el-table
        :header-cell-style="{background:'#F3F4F8',fontWeight:'700',color:'#000'}"
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          align="center"
          label="商品ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="amount3"
          align="center"
          label="状态">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="编辑账号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="编辑类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="上传时间"
          width="180">
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "tableComponent",
      props:['tableData','msgWaring']
    }
</script>

<style lang="less" scoped>
  .waring {
    padding: 10px;
    font-size: 12px;
  .el-icon-warning{
      color: #ffa900;
      margin-right: 10px;
    }
  }
</style>
