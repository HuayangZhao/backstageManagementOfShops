<template>
    <div style="padding-right: 15%">
      <h2>订单列表</h2>
      <hr>
        <el-button type="success" icon="el-icon-search" size="small" style="margin: 20px;" @click="$router.push({path:'/orderIndex/orderList'})">订单搜索</el-button>
      <div>
        <test-table
          :data="data"
          :frontendPagination="frontendPagination"
          :columns="columns"
          :headerCellStyle="function(){return {background:'#f3f6f8',color:'#333'}}"
          :tableSize="'medium'">
          <template slot="orderStatus" slot-scope="scope" >
            <span v-if="scope.row.orderStatus == -1">未付款</span>
            <span v-if="scope.row.orderStatus == 1">已付款</span>
            <span v-if="scope.row.orderStatus == 2">已发货</span>
            <span v-if="scope.row.orderStatus == 3">已签收</span>
            <span v-if="scope.row.orderStatus == 4">退货申请</span>
            <span v-if="scope.row.orderStatus == 5">退货中</span>
            <span v-if="scope.row.orderStatus == 6">已退货</span>
            <span v-if="scope.row.orderStatus == 7">取消交易</span>
          </template>
        </test-table>
      </div>
    </div>
</template>
<script>
  import {getAllOrders} from  "@/api/order"
  import testTable from "@/components/table.vue"
    export default {
        components:{
          testTable
        },
       data(){
          return {
            "submit": {
              "isForce": ""
            },
            frontendPagination:true,
            data:[],
            columns:[
              {
                label:"商品ID",
                index:"productId"
              },
              {
                label:"商品名称",
                index:"productName"
              },
              {
                label:"订单状态",
                slot:"orderStatus"
              },
              {
                label:"售后状态",
                index:"id"
              },
              {
                label:"买家",
                index:'userId '
              },
              {
                label:"数量",
                index:"count"
              },
              {
                label:"商品单价",
                index:"totalPrice"
              },
              {
                label:"支付金额",
                index:"totalPrice"
              },
              {
                label:"操作",
                buttons:[
                  {
                    text:"详情",
                    type:'text',
                    click: function(){
                      alert("查看详情")
                    }
                  },
                  {
                    text:"删除",
                    type:'text',
                    click: function(){
                      alert("删除订单")
                    }
                  }
                ]
              },
            ],
          }
        },
      mounted(){
        this.getOrders()
      },
      methods:{
        getOrders(){
          getAllOrders().then(res=>{
            // console.log(res);
            if(res.data.data!==1){
              this.data = res.data.data
            }
          })
        },
      }
    }
</script>
<style scoped>

</style>

