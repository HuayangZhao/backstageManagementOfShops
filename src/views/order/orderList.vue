<template>
    <div class="orderList">
      <h2>订单列表查询</h2>
      <hr>
      <div class="seachOrder">
          <div class="itemBox">
            <span>快速筛选订单：</span>
            <el-badge :value="12" class="item">
            <el-button size="small">待发货</el-button>
          </el-badge>
            <el-badge :value="3" class="item">
              <el-button size="small">即将延迟发货</el-button>
            </el-badge>
            <el-badge :value="1" class="item" type="primary">
              <el-button size="small">以延迟发货</el-button>
            </el-badge>
            <el-badge :value="2" class="item" type="warning">
              <el-button size="small">已发货未签收</el-button>
            </el-badge>
            <el-badge :value="2" class="item" type="warning">
              <el-button size="small">即将揽件超时</el-button>
            </el-badge>
          </div>
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
            <span>收货手机：</span>
            <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
          </div>
          <div>
            <span>快递单号：</span>
            <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
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
            <span>承诺发货时间：</span>
            <el-select size="mini" v-model="values">
              <el-option label="全部" value="all"></el-option>
              <el-option label="已过发货时间" value="0"></el-option>
              <el-option label="12小时内需发货" value="1"></el-option>
              <el-option label="今天需要发货" value="1"></el-option>
              <el-option label="三天内要发货" value="1"></el-option>
              <el-option label="三天后要发货" value="1"></el-option>
            </el-select>
          </div>
          <div>
            <span>剩余揽件时间：</span>
            <el-select size="mini" v-model="values">
              <el-option label="不限" value="all"></el-option>
              <el-option label="12H内需揽件" value="0"></el-option>
              <el-option label="24H内需揽件" value="1"></el-option>
              <el-option label="36H内需揽件" value="1"></el-option>
              <el-option label="48H内需揽件" value="1"></el-option>
            </el-select>
          </div>
          <div>
            <span>是否抽奖/0元试用：</span>
            <el-select size="mini" v-model="values">
              <el-option label="否" value="all"></el-option>
              <el-option label="是" value="0"></el-option>
              <el-option label="全部" value="1"></el-option>
            </el-select>
          </div>
          <div>
            <span>收件人姓名：</span>
            <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
          </div>
          <div>
            <span>拼单成功时间：</span>
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
        </div>
        <div style="text-align: center;padding-bottom: 10px;">
          <el-button type="danger" size="mini">查询</el-button>
          <el-button size="mini">批量导出</el-button>
          <el-button size="mini">查看以生产报表</el-button>
        </div>
      </div>
      <div>
        <h3>
          查询结果 <span>共查询到 <i>0</i> 条数据</span>
          <div>
            <a href="#">去合并发货</a>
            <el-select v-model="values" placeholder="请选择" size="mini">
              <el-option label="全部" value="1"></el-option>
              <el-option label="有备注" value="2"></el-option>
            </el-select>
          </div>
        </h3>
        <el-table
          :header-cell-style="{background:'#F3F4F8',fontWeight:'700',color:'#000'}"
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            align="center"
            label="商品ID"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="商品名称"
            >
          </el-table-column>
          <el-table-column
            prop="amount3"
            align="center"
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="售后状态"
           >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="买家"
           >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="商品总价"
           >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="数量"
            >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="支付金额">
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="100">
            <template>
              <!--@click="handleClick(scope.row)"-->
              <el-button  type="text" size="small">发货</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
</template>

<script>
    export default {
        name: "orderList",
      data(){
          return {
            tableData:[],
            pickerOptions2: {
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
            value7: '',
            values:'',
          }
      }
    }
</script>

<style lang="less" scoped>
  h3 {
    position: relative;
    border-left: 3px solid red;
    padding:10px;
    margin: 20px 0;
    >div {
      position: absolute;
      right: 10px;
      top: 4px;
      a {
        font-size: 12px;
      }
    }
    >span {
      font-size: 12px;
      >i {
        color: red;
      }
    }
  }
  .orderList {
    padding-right: 15%;
  }
  .el-button--mini, .el-button--small{
    font-size: 16px !important;
  }
  .seachOrder {
    background-color: #f8f8f8;

    .itemBox {
      border-bottom: 1px solid #ccc;
      padding: 20px;
    }
    .item {
       margin-right: 50px;
     }
  }
  .search {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;
    background-color: #F8F8F8;
    >div {
      margin: 10px 0;
      span {
        font-size: 12px;
      }
    }
  }
</style>
