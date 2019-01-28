<template>
  <div>
    <div class="waring">
      <i class="el-icon-warning"></i><span v-text="msgWaring"></span>
    </div>
    <el-table
      :header-cell-style="{background:'#F3F4F8',color:'#000'}"
      :data="tableData"
      size="mini"
      v-loading="isLoading"
      border
      style="width: 100%">
      <el-table-column
        prop="id"
        align="center"
        label="商品ID"
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="createTime"
        align="center"
        label="上传时间">
      </el-table-column>
      <el-table-column
        prop="modifyTime"
        align="center"
        label="审核时间">
      </el-table-column>
      <el-table-column
        prop="reviewStatus"
        align="center"
        label="审核状态">
        <template slot-scope="scope">
          <el-button type="primary" round size="mini" v-if="scope.row.reviewStatus == 0">
            待审核
          </el-button>
          <el-button type="danger" round size="mini" v-if="scope.row.reviewStatus == 2">
            已驳回
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="reason"
        v-if="isShow"
        align="center"
        label="驳回原因">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        v-if="isShow">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            style="margin-bottom: 10px"
          >查看
          </el-button>
          <el-button
            size="mini"
            type="text"
            style="margin-bottom: 10px"
          >申诉
          </el-button>
          <el-button
            size="mini"
            type="text"
            style="margin-bottom: 10px"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name: "tableComponent",
    props:['tableData','msgWaring','isShow','isLoading']
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
