<template>
  <div style="width: 100%">
    <el-table
      ref="multipleTable"
      border
      :header-cell-style="{background:'#F6F6F6',fontWeight:'700',color:'#000'}"
      :data="goodsListData1"
      tooltip-effect="dark"
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
              <!--<p>scope.row.</p>-->
              <a href="#" v-text="scope.row.title"></a>
              <p>商品ID：{{scope.row.id}}</p>
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
        label="单购价"
        show-overflow-tooltip>
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
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button type="warning"  size="mini" v-if="scope.row.frameStatus == 0">待上架</el-button>
          <el-button type="success" size="mini" v-if="scope.row.frameStatus == 1">已上架</el-button>
          <el-button type="info" size="mini" v-if="scope.row.frameStatus == 2">已下架</el-button>
          <el-button type="primary" size="mini" icon="el-icon-edit" v-if="scope.row.frameStatus == 3">编辑中</el-button>
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
          <el-button
            type="text"
            size="mini"
            style="margin-bottom: 10px"
            @click="handleEdit(scope.$index, scope.row)">下架
          </el-button>
          <el-button
            size="mini"
            type="text"
            style="margin-left: -8px"
            @click="handleEdit(scope.$index, scope.row)">置顶
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
          <el-button plain>批量上架</el-button>
          <el-button plain>批量下架</el-button>
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
  import {getAllGoods,delGoods} from "@/api/axios"
  export default {
    data() {
      return {
        currentPage4: 4,
        goodsListData: [],
        multipleSelection: []
      }
    },
    mounted(){
      this.getGoodsList()
    },
    methods: {
      getGoodsList(){
       getAllGoods().then(res=>{
         console.log(res);
         if(res.data.data !== 1){
           this.goodsListData = res.data.data
         }else {
           this.$message.error('请求错误，请刷新页面重试');
         }
       })
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        console.log(val);
        this.multipleSelection = val;
      },
      // 编辑删除
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.$confirm('是否确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.goodsListData.splice(index,1)
          delGoods(row.id).then(res=>{
            console.log(res);
            if(res.data.)
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
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
      }
    }
  }
</script>
<style lang="less" scoped>
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
