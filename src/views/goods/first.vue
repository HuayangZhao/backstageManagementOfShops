<template>
  <div style="width: 100%">
    <el-table
      ref="multipleTable"
      border
      v-loading="loading"
      :header-cell-style="{background:'#F6F6F6',fontWeight:'700',color:'#000'}"
      :data="goodsListData1"
      tooltip-effect="light"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        align="center"
        width="55">
      </el-table-column>
      <el-table-column
        label="商品信息"
        width="400"
      >
        <template slot-scope="scope">
          <div class="goodsImg">
            <div class="img_Box">
              <img :src="scope.row.videoImgUrl" alt="">
            </div>
            <div class="goodsInfo">
              <p>商品ID：{{scope.row.id}}</p>
              <span v-text="scope.row.title" @click="goodsInfo(scope.row.id)" style="color:blue;cursor: pointer;"></span>
              <p>Sku编码：{{scope.row.code}}</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        align="center"
        label="当前价"
      >
      </el-table-column>
      <el-table-column
        prop=""
        align="center"
        label="收藏数"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        sortable
        prop=""
        align="center"
        label="库存"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop=""
        sortable
        align="center"
        label="累计销量"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop=""
        sortable
        align="center"
        label="近30天销量"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="frameStatus"
        align="center"
        label="在售状态"
       >
        <template slot-scope="scope">
          <el-button type="warning"  size="mini" v-if="scope.row.frameStatus == 0">待上架</el-button>
          <el-button type="success" size="mini" v-if="scope.row.frameStatus == 1">已上架</el-button>
          <el-button type="info" size="mini" v-if="scope.row.frameStatus == 2">已下架</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        align="center"
        width="100"
        >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            style="margin-bottom: 10px"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button type="text" size="mini" style="margin-bottom: 10px" @click="handleLower(scope.$index, scope.row)"
                     v-if="scope.row.frameStatus == 2 || scope.row.frameStatus == 0"
          >
            上架
          </el-button>
          <el-button type="text" size="mini" style="margin-bottom: 10px" @click="handleLower(scope.$index, scope.row)"
                     v-if="scope.row.frameStatus == 1"
          >
            下架
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="row">
        <div>
          <el-button plain @click="batchOperation(1)">批量上架</el-button>
          <el-button plain @click="batchOperation(2)">批量下架</el-button>
        </div>
        <div class="grid-content">
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
  </div>
</template>
<script>
  function getCascaderObj(val,opt) {
    return val.map(function (value, index, array) {
      for (var itm of opt) {
        if (itm.value == value) { opt = itm.children; return itm; }
      }
      return null;
    });
  }
  import {getAllGoods,delGoods,updateGoodsByFrameStatus,getOneProduct,getAllSelectList} from "@/api/axios"
  export default {
    props:['goodsListData'],
    data() {
      return {
        loading:true,
        currentPage4: 4,
        multipleSelection: [],
      }
    },
    mounted(){
      this.getGoodsList()
    },
    methods: {
      // 获取所有列表
      getGoodsList(){
        this.loading = true
       getAllGoods().then(res=>{
         // console.log(res);
         if(res.data.data !== 1){
           this.goodsListData = res.data.data
           this.loading = false
         }else {
           this.$message.error('请求错误，请刷新页面重试');
         }
       })
      },
      // 编辑
      handleEdit(index, row) {
        getOneProduct(row.id).then(res=>{
          console.log(res);
          if(res.data.data != "1"){
            this.$store.commit('setGoodsInfo',res.data.data)
            this.$router.push({path:'/editGoods'})
          }
        })
      },
      // 上下架
      handleLower(index, row) {
          this.$confirm('确认下架商品?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let status ;
            row.frameStatus !== 1? status = "1":status = "2"
            updateGoodsByFrameStatus(row.id,status).then(res=>{
              if(res.data.data === 0){
                this.getGoodsList()
                this.$message({
                  type: 'success',
                  message: '操作成功!'
                });
              }else {
                this.$message({
                  type: 'error',
                  message: '请求失败，请重试!'
                });
              }
            })
          }).catch(() => {});
      },
      // 删除
      handleDelete(index, row) {
        // console.log(index, row);
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.goodsListData.splice(index,1)
          delGoods(row.id).then(res=>{
            console.log(res);
            if(res.data.data === 0){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else {
              this.$message({
                type: 'error',
                message: '请求失败，请重试!'
              });
            }
          })
        }).catch(() => {});
      },
      // 表格多选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 批量操作
      batchOperation(val){
        if(this.multipleSelection.length == 0){
          return
        }
        let goodsId = []
        this.multipleSelection.forEach(item=>{
          goodsId.push(item.id)
        })
        let status ;
        val == 1 ? status = "1":status = "2"
        console.log(status);
        updateGoodsByFrameStatus(goodsId.join(','),status).then(res=>{
          if(res.data.data === 0){
            this.getGoodsList()
            this.$message({
              type: 'success',
              message: '操作成功!'
            });
          }else {
            this.$message({
              type: 'error',
              message: '请求失败，请重试!'
            });
          }
        })
      },
      // 查看商品详情
      goodsInfo(id){
        getOneProduct(id).then(res=>{
          console.log(res);
          if(res.data.data != "1"){
            this.$store.commit('setGoodsInfo',res.data.data)
            this.$router.push({path:'/goodsIndex/goodsInfo'})
          }
        })
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    computed:{
      goodsListData1(){
        return this.goodsListData
      },
      productC(){
        return this.product
      }
    }
  }
</script>
<style lang="less" scoped>
  .goodsBaseInfo{
    width: 90%;
    margin-top: 10px;
  }
    .goodsImg {
      display: flex;
      .img_Box {
        flex-shrink:0;
        width: 70px;
        height: 70px;
        margin-right: 20px;
        border-radius: 7px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .goodsInfo {
        display: flex;
        flex-direction:column;
        justify-content:center;
        font-size: 12px;
        a {
          text-decoration: none;
          color: blue;
        }
      }
    }
  .row {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    padding: 10px;
  }


</style>
