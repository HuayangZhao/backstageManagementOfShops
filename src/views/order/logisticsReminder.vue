<template>
  <div class="logisticsReminder">
    <div class="waring">
      <i class="el-icon-warning"></i>温馨提示：以下为揽件超时的订单，目前提供顺丰快递发货后4~8天的物流提醒，物流信息仅供参考，请以快递官网为准。
    </div>
    <div class="selectComplaint">
      <select name="" id="" style="height: 30px;border-radius: 3px;outline: none">
        <option value="3">订单编号</option>
        <option value="4">物流单号</option>
      </select>
      <el-input  placeholder="请输入单号" size="small" style="width: 250px;margin-right: 50px;"></el-input>
      <span>快递公司：</span>
      <el-select v-model="value8" filterable placeholder="请选择" size="small">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="danger" size="small" style="float: right;">查询</el-button>
    </div>
    <div>
      <h3>
        查询结果 <span>共查询到 <i>0</i> 条数据</span>
      </h3>
      <el-table
        :header-cell-style="{background:'#F3F4F8',color:'#000'}"
        :data="tableData"
        border
        style="width: 100%;font-size: 12px">
        <el-table-column
          prop="id"
          align="center"
          label="订单号"
        >
        </el-table-column>
        <el-table-column
          prop="amount3"
          align="center"
          label="商品名称">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="发货时间"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="订单确认时间"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="快递公司"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="快递单号"
          width="200"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="揽件时间"
          width="100">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "logisticsReminder"
  }
</script>

<style scoped lang="less">
  h3 {
    position: relative;
    border-left: 3px solid red;
    padding:10px;
    margin: 20px 0;
    >span {
      font-size: 12px;
      >i {
        color: red;
      }
    }
  }
  .selectComplaint {
    padding: 20px;
    margin:20px 0 ;
    background-color: #F8F8F8;
  }
  .waring {
    border: 1px solid #ffd888;
    margin-top: 10px;
    padding: 10px;
    font-size: 12px;
    background-color: #fff7dd;
    .el-icon-warning{
      color: #ffa900;
      margin-right: 10px;
    }
  }
</style>

