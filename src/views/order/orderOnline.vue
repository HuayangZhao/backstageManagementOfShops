<template>
    <div class="orderOnline">
      <h3>来自客户的评价</h3>
      <div class="selectBox">
        <p>开通本服务后，成团2小时且满足特定条件（未发货、非虚拟商品）的订单将按照您配置的默认信息自动发起在线下单</p>
        <el-form ref="form" :model="form" label-width="150px">
          <el-form-item label="默认快递公司:">
            <select name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </el-form-item>
          <el-form-item label="我的退货地址:">
            <select name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </el-form-item>
          <el-form-item label="我的发货地址:">
            <select name="" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </select>
          </el-form-item>
          <el-button size="mini" style="margin-left: 15%;" plain type="primary">确认</el-button>
        </el-form>
      </div>
      <h3>快速筛选订单</h3>
      <div>
        <div class="waring">
          <i class="el-icon-warning"></i>发货24小时内的订单，可筛选”已下单-已发货“修改物流信息
        </div>
        <div class="butBox">
          <span>快速筛选订单:</span>
          <el-button type="primary" plain>未下单</el-button>
          <el-button type="success" plain>已下单-未发货</el-button>
          <el-button type="danger" plain>已下单-已发货</el-button>
        </div>
      </div>
      <h3>查询结果 <el-button size="mini" style="float: right;margin-right: 10px;">批量下单</el-button></h3>
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
        name: "orderOnline",
      data() {
        return {
          value4:'',
          options:[],
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          }
        }
      },
      methods: {
        onSubmit() {
          console.log('submit!');
        }
      }
    }
</script>

<style scoped lang="less">
  .butBox {
    padding: 20px;
    margin-top: 20px;
    background-color: #F8F8F8;
    span {
      font-weight: 700;
      margin-right: 20px;
    }
  }
  .selectBox {
    padding: 20px;
    p {
      margin-bottom: 20px;
    }
    select {
      width: 250px;
      height:30px;
      border-radius: 2px;
      background-color:#F8F8F8;
    }
  }
  .el-form-item {
    margin-bottom: 10px;
  }
  h3 {
    border-left: 3px solid red;
    padding-left: 10px;
    margin: 20px 0;
  }
  .waring {
    border: 1px solid #338FCE;
    padding: 10px;
    font-size: 12px;
    background-color: #ECF7FE;
    .el-icon-warning{
      color: #338FCE;
      margin-right: 10px;
    }
  }
</style>
