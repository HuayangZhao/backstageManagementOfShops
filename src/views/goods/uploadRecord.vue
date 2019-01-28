<template>
  <div class="uploadRecord">
    <div class="search">
      <div>
        <span>商品ID</span>
        <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
      </div>
      <div>
        <span>商品名称</span>
        <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
      </div>
      <div>
        <span>编辑类型</span>
        <el-select size="mini" v-model="values">
          <el-option label="全部" value="all"></el-option>
          <el-option label="新增" value="0"></el-option>
          <el-option label="修改" value="1"></el-option>
        </el-select>
      </div>
      <div><el-button type="danger" plain size="mini">查询</el-button></div>
    </div>
    <div class="tabBox">
      <el-button type="danger" size="small" class="creatBut" @click="toPublishNewGoods">创建新商品</el-button>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="发布中" name="first">
          <myTable :tableData="tableRelease" :msgWaring="msg" :isLoading="loading"></myTable>
        </el-tab-pane>
        <el-tab-pane label="已驳回" name="second">
          <myTable :tableData="tableReject" :msgWaring="msg1" :isShow="true" :isLoading="loading"></myTable>
        </el-tab-pane>
        <!--<el-tab-pane label="上传成功" name="third">-->
          <!--<myTable :tableData="tableSuccess" :msgWaring="msg2" :isLoading="loading"></myTable>-->
        <!--</el-tab-pane>-->
      </el-tabs>
      <!--<first :is="activeName" keep-alive></first>-->
    </div>
    <div class="pageSize">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import myTable from '@/components/tableComponent'
  import {getGoodsByReviewStatus} from "@/api/axios"
  export default {
    data(){
      return {
        currentPage4: 4,
        msg:'排队发布中，预计将在提交后48小时内反馈发布结果。',
        msg1:'被驳回的商品，15天内无申诉将被自动删除，请商家及时查看并申诉。',
        // msg2:'请确保提交的商品符合国家法律法规，不得包含违禁商品。平台将随时进行抽审，一经发现，将对商品和店铺进行处理，严重将追究法律责任。',
        values:'',
        activeName:'first',
        loading:true,
        tableRelease:[],
        tableReject:[],
        tableSuccess:[],
      }
    },
    mounted(){
      this.getList()
    },
    methods:{
      // 获取列表
      getList(){
        this.loading = true
        getGoodsByReviewStatus("0").then(res=>{
          this.tableRelease = res.data.data
          this.loading = false
        })
        getGoodsByReviewStatus("1").then(res=>{
          this.tableSuccess = res.data.data
        })
        getGoodsByReviewStatus("2").then(res=>{
          this.tableReject =res.data.data
        })
      },
      toPublishNewGoods(){
        this.$router.push({path:'/publishNewGoods'})
      },
      handleClick(tab, event) {
        this.activeName = tab.name; // tab 为当前触发标签页的组件名
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    components:{
      myTable
    }

  }
</script>
<style lang="less" scoped>
  .pageSize {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .search {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 20px;
    background-color: #F8F8F8;
    >div {
      width: 25%;
      margin: 10px 0;
      span {
        font-size: 12px;
      }
    }
  }
  .tabBox {
    margin-top: 20px;
    position: relative;
    .creatBut {
      position: absolute;
      top: 2px;
      cursor: pointer;
      left: 350px;
      z-index: 9999999;
    }
  }
  .el-tabs__header {
    margin: 0;
  }
</style>


