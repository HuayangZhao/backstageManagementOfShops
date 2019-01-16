<template>
  <div class="goodsDrafts">
    <h2><router-link to="/goodsList/onLineGoods">商品列表</router-link> <i class="el-icon-caret-right"></i>草稿箱</h2>
    <hr>
    <div class="waring">
      <i class="el-icon-warning"></i>
      仅可恢复近30天内被删除的商品
    </div>
    <el-table
      :header-cell-style="{background:'#F6F6F6',fontWeight:'700',color:'#000'}"
      :data="tableData"
      border
      style="width: 100%;margin-top: 10px">
      <el-table-column
        prop="id"
        label="商品ID"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品缩略图"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="商品价格">
      </el-table-column>
      <el-table-column
        prop="name"
        label="库存"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="删除时间"
        width="180">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="被恢复的商品将展示在 商品列表 > 下架中" placement="top-end">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">恢复</el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
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
    <!--弹框-->
    <div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
        name: "drafts",
      data(){
          return {
            dialogVisible:false,
            tableData:[
              {
                id: '12987122',
                name: '王小虎',
                amount1: '234',
                amount2: '3.2',
                amount3: 10
              }
            ]
          }
      },
      methods :{
        // 恢复
        handleEdit(index, row) {
          console.log(index, row);
          this.dialogVisible = true
        },
        // 关闭前的回调，会暂停弹框的关闭
        handleClose(done) {
          this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
        }
      }
    }
</script>

<style lang="less" scoped>
  .pageSize {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .waring {
    border: 1px solid #ffd888;
    margin-top: 10px;
    padding: 10px;
    font-size: 12px;
    background-color: #fff7dd;
  .el-icon-warning{
    color: #ffa900;
    margin-right: 10px;
  }
  }
  .search {
    margin: 20px 0;
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
</style>
