<template>
    <div class="refund">
      <div class="waring">
        <i class="el-icon-warning"></i>未发货时买家申请退款的订单，请确保在承诺发货时间内退款成功。否则将被判定为延迟发货<br/><br/>&nbsp;&nbsp;退款申请逾期未处理，平台将默认商家同意退款申请，进行自动退款
      </div>
      <h4>退款申请待处理0单 |
          已退货待处理0单 |
          换货补寄待处理0单 |
          24小时内将逾期0单 |
          维修待处理0单 |
          平台处理中0单
      </h4>
      <div class="seachOrder">
        <div class="search">
          <div>
            <span>订单编号：</span>
            <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
          </div>
          <div>
            <span>商品ID：</span>
            <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
          </div>
          <div>
            <span>手机号码：</span>
            <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
          </div>
          <div>
            <span>售后编号：</span>
            <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
          </div>
          <div>
            <span>售后状态：</span>
            <el-select size="mini" v-model="values">
              <el-option label="全部" value="all"></el-option>
              <el-option label="无售后/售后处理中" value="0"></el-option>
              <el-option label="无售后/取消售后" value="1"></el-option>
              <el-option label="售后处理中" value="1"></el-option>
              <el-option label="退款中" value="1"></el-option>
              <el-option label="退款成功" value="1"></el-option>
            </el-select>
          </div>
          <div>
            <span>售后类型：</span>
            <el-select size="mini" v-model="values">
              <el-option label="全部" value="all"></el-option>
              <el-option label="仅退款" value="0"></el-option>
              <el-option label="退货退款" value="1"></el-option>
              <el-option label="换货" value="1"></el-option>
              <el-option label="补寄" value="1"></el-option>
              <el-option label="维修" value="1"></el-option>
            </el-select>
          </div>
          <div>
            <span>退款金额：</span>
            <el-input  placeholder="元" style="width:80px" size="mini"></el-input> -
            <el-input  placeholder="元" style="width:80px" size="mini"></el-input>
          </div>
          <div>
            <span>订单状态：</span>
            <el-select size="mini" v-model="values">
              <el-option label="全部" value="all"></el-option>
              <el-option label="待发货" value="0"></el-option>
              <el-option label="已发货" value="1"></el-option>
              <el-option label="已签收" value="1"></el-option>
              <el-option label="已申请缺货" value="1"></el-option>
              <el-option label="待付尾款" value="1"></el-option>
            </el-select>
          </div>
          <div></div>
          <div style="flex: 2">
            <span>申请时间：</span>
            <el-date-picker
              v-model="value7"
              type="daterange"
              align="right"
              size="mini"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
          <div style="text-align: center;padding-bottom: 10px;flex: 1">
            <el-button type="danger" size="mini">查询</el-button>
            <el-button size="mini">批量导出</el-button>
          </div>
        </div>
      </div>
      <h3>查询结果</h3>
      <div>
        <el-table
          :header-cell-style="{background:'#F3F4F8',fontWeight:'700',color:'#000'}"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            type="selection"
            align="center"
            width="55">
          </el-table-column>
          <el-table-column
            prop="id"
            align="center"
            label="订单编号">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="商品信息">
          </el-table-column>
          <el-table-column
            prop="amount3"
            align="center"
            label="交易信息">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="承诺发货时间">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="买家信息">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="下单状态">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
    export default {
        name: "refund"
    }
</script>

<style scoped lang="less">
  .refund {
    padding-right: 15%;
  }
  h3 {
    border-left: 3px solid red;
    padding-left: 10px;
    margin: 20px 0;
  }
  h4 {
    text-align: center;
    padding: 20px;
  }
  .seachOrder {
    background-color: #f8f8f8;
      .search {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 20px;
        background-color: #F8F8F8;
        >div {
          width: 33.33%;
          margin: 10px 0;
          span {
            font-size: 12px;
          }
        }
      }
  }
  .waring {
    border: 1px solid #ffd888;
    margin: 10px 0;
    padding: 10px;
    font-size: 12px;
    background-color: #fff7dd;
    .el-icon-warning{
      color: #ffa900;
      margin-right: 10px;
    }
  }
</style>
