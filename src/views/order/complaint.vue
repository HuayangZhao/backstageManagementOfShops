<template>
    <div class="Complaint">
      <div class="waring">
        <i class="el-icon-warning"></i>温馨提示：以下订单被消费者投诉为物流异常，请尽快联系消费者或物流公司跟进处理。
      </div>
      <div class="selectComplaint">
        <span>投诉时间：</span>
        <el-date-picker
          v-model="value1"
          type="date"
          size="small"
          placeholder="选择日期">
        </el-date-picker>
        <select name="" id="" style="height: 30px;border-radius: 3px;outline: none">
          <option value="1">全部</option>
          <option value="2">商品ID</option>
          <option value="3">订单编号</option>
          <option value="4">物流单号</option>
        </select>
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
            prop="name"
            align="center"
            label="商品ID"
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
            label="快递公司"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="物流单号"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="投诉类型"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="消费者投诉内容"
            width="200"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="投诉时间"
            width="100">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
    export default {
        name: "complaint"
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
