<template>
  <div class="goodsDrafts">
    <h2><router-link to="/goodsList/onLineGoods">线上商品</router-link> <i class="el-icon-caret-right"></i>草稿箱</h2>
    <hr>
    <div class="waring">
      <i class="el-icon-warning"></i>
      编辑中的草稿，15天内无修改将被自动删除，请商家及时修改或提交。
    </div>
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
    <el-button type="danger" size="small"  @click="toPublishNewGoods">创建新商品</el-button>
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
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="name"
        label="编辑账号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="编辑类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="上传时间"
        width="180">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除草稿</el-button>
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
  </div>
</template>

<script>
    export default {
        name: "drafts",
      data(){
          return {
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
          // 创建新商品
        toPublishNewGoods(){
          this.$router.push({path:'/publishNewGoods'})
        },
        // 编辑删除
        handleEdit(index, row) {
          console.log(index, row);
          this.$router.push({path:'/createNewGoods'})
        },
        handleDelete(index, row) {
          console.log(index, row);
          this.$confirm('确认删除这条草稿?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            center: true
          }).then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
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
