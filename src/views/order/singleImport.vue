<template>
    <div class="singleImport">
      <div class="waring">
        <i class="el-icon-warning"></i>非特殊商品发货时首次选择的快递公司为“顺丰快递”的订单，自商家点击发货时起满10天，且消费者未确认收货的，系统将自动确认收货。
      </div>
      <div class="formBox">
        <el-form ref="form" :model="form" label-width="100px" style="width: 400px;margin: auto;">
          <el-form-item label="订单号：" style="font-size: 12px">
            <el-input v-model="form.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="快递单号：" style="font-size: 12px">
            <el-input v-model="form.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="快递公司：" style="font-size: 12px">
            <el-select v-model="values" filterable placeholder="可输入搜索" size="mini" style="width: 300px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="退货地址：" style="font-size: 12px">
            <el-select v-model="values" filterable placeholder="可输入搜索" size="mini" style="width: 300px">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-button type="danger" size="mini">确认导入</el-button>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "singleImport",
      data() {
        return {
          options:[],
          values:"",
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
  .formBox {
    background-color: #f6f6f6;
    padding: 20px 20px 10px;
    margin-top: 20px;
    text-align: center;
    .el-button {
      margin-top: 10px;
    }
    .el-form-item {
margin-bottom: 0;
    }
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
