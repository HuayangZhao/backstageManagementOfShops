<template>
    <div>
      <h2><router-link to="/freight/freightTemplate">运费模板</router-link> <i class="el-icon-caret-right"></i>模板详情</h2>
      <div class="address">
        <p><b>模板名称：</b> 副本-20190111201856784-61 <b>发货地：</b></p>
        <div>
          <h5>包邮配送区域（按件收费）：</h5>
          <p>北京、安徽、福建、广东、广西、贵州、河北、河南、黑龙江、湖北、湖南、吉林、江苏、江西、辽宁、山东、山西、陕西、上海、四川、天津、云南、浙江、重庆</p>
        </div>
        <div>
          <h5>包邮配送区域（按件收费）：</h5>
          <p>未选择地区</p>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "templateDetails"
    }
</script>

<style scoped lang="less">
.address {
  margin-top: 10px;
  padding: 20px;
  background-color: #F2F5F7;
  >p {
    margin-bottom: 20px;
    >b{
      font-weight: 700;
    }
  }
  >div {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 20px;
    >h5 {
      margin-bottom: 20px;
      font-weight: 700;
    }
  }
}
</style>
