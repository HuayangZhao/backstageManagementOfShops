<template>
    <div class="batchImport">
      <div class="waring">
        <i class="el-icon-warning"></i>非特殊商品发货时首次选择的快递公司为“顺丰快递”的订单，自商家点击发货时起满10天，且消费者未确认收货的，系统将自动确认收货。
      </div>
      <div class="deliveryBox">
        <div class="iconDelivery">
          <div>
            <div></div>
            <p>24小时内可修改运单号</p>
          </div>
          <div>
            <div></div>
            <p>批量修改直接覆盖导入</p>
          </div>
          <div>
            <div></div>
            <p>可一次性导入多家快递</p>
          </div>
          <div>
            <div></div>
            <p>若无法按期发货,可选择</p>
            <router-link to="/shortage">批量申请缺货</router-link>
          </div>

        </div>
        <div class="muban">
          <el-button type="danger" size="mini">导入批量发货文件</el-button>
          <a href="/src/assets/new_import_excel_sample .xlsx" download="new_import_excel_sample .xlsx">下载发货模板</a>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        name: "batchImport"
    }
</script>

<style scoped lang="less">
    a{
      text-decoration: none;
      font-size:14px;
    }
    a:hover {
      color: skyblue;
    }

  .deliveryBox {
    background-color: #F6F6F6;
    padding: 50px 20px 10px;
    margin-top:20px;
    text-align: center;
    .iconDelivery {
      display: flex;
      justify-content: space-around;
      margin-bottom: 60px;
      >div {
        >div {
          width: 75px;
          height: 75px;
          background-color: #fff;
          border-radius: 50%;
          margin: auto;
        }
        p {
          font-size: 14px;
          margin-top: 10px;
          margin-bottom: 5px;
        }
        a {
          text-decoration: none;
          font-size: 14px;
        }
      }
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
