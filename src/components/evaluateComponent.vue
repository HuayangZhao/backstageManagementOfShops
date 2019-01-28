<template>
    <div style="padding:0 10px">
      <p style="font-size: 14px;margin-bottom: 10px">共 <span style="color: red">{{number}}</span>条评论</p>
      <el-table
        :header-cell-style="{background:'#F3F4F8',fontWeight:'700',color:'#000'}"
        border
        :data="tableData"
        tooltip-effect="light"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="address"
          label="评价内容"
          show-overflow-tooltip
       >
        </el-table-column>
        <el-table-column
          prop="numb"
          label="评分"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="numb"
          label="订单"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="商品名称"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "evaluateComponent",
      props:['tableData','number'],
      methods:{
        handleClick(row) {
          console.log(row);
        }
      },
    }
</script>

<style scoped>

</style>
