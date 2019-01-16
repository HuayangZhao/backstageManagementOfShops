<template>
    <div class="orderInvoice">
      <h2>订单开票</h2>
      <div class="waring">
        <i class="el-icon-warning"></i>
        若您在发布商品时勾选正品发票标签，则需要履行 <a href="#" style="color: blue">《正品发票服务规则》</a>中所述规则，如果违约，将按照条款中指定赔偿细则对消费者进行赔偿，还请知晓！
      </div>
      <div class="search">
        <div>
          <span>订单编号</span>
          <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
        </div>
        <div>
          <span>包裹状态:</span>
          <el-select size="mini" v-model="values">
            <el-option label="全部状态" value="all"></el-option>
            <el-option label="正常包裹" value="0"></el-option>
            <el-option label="异常包裹" value="1"></el-option>
            <el-option label="揽收超时包裹" value="2"></el-option>
            <el-option label="派签超时包裹" value="3"></el-option>
            <el-option label="物流更新超时包裹" value="4"></el-option>
          </el-select>
        </div>
        <div>
          <span>物流公司:</span>
          <el-select v-model="values" filterable placeholder="可输入搜索" size="mini">
            <el-option label="全部物流公司" value="5"></el-option>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div>
          <span>评价时间</span>
          <el-date-picker
            size="mini"
            v-model="value7"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <div>
          <el-button type="danger" size="mini" style="width: 100px">查询</el-button>
        </div>
      </div>



    </div>
</template>

<script>
    export default {
        name: "orderInvoice"
    }
</script>

<style scoped lang="less">
  .orderInvoice {
    padding-right: 15%;
  }
  .waring {
    border: 1px solid #ffd888;
    padding: 10px;
    font-size: 12px;
    margin-top: 10px;
    background-color: #fff7dd;
    .el-icon-warning{
      color:#ffd888;
      margin-right: 10px;
    }
  }
  .search {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    background-color: #F8F8F8;
    >div {
      width: 40%;
      margin: 10px 0;
      span {
        font-size: 12px;
      }
    }
  }
</style>
