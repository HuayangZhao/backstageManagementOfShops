<template>
    <div>
      <div class="waring">
        <i class="el-icon-warning"></i>默认模板由系统根据现有商品的信息自动生成，可以修改，未被使用的模板可以删除
      </div>
      <el-button type="danger" size="mini" @click="toCreateFreight">新建运费模板</el-button>
      <div style="margin-top: 10px">
        <el-table
          :data="tableData"
          stripe
          border
          :header-cell-style="{background:'#F3F4F8',fontWeight:'700',color:'#000'}"
          style="width: 100%">
          <el-table-column
            label="模板名称"
            width="180">
            <template slot-scope="scope">
              <router-link to="/templateDetails">{{scope.row.date}}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="计费方式"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="最后编辑时间">
          </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">复制</el-button>
              <el-button type="text" size="small">编辑</el-button>
              <el-button @click="handleDelClick(scope.row)" type="text" size="small">删除</el-button>
              <el-button type="text" size="small">使用情况</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    </div>
</template>

<script>
    export default {
        name: "freightTemplate",
     data(){
       return {
         tableData:[{
           date: '2016-05-03',
           name: '王小虎',
           province: '上海',
           city: '普陀区',
           address: '上海市普陀区金沙江路 1518 弄',
           zip: 200333
         }, {
           date: '2016-05-02',
           name: '王小虎',
           province: '上海',
           city: '普陀区',
           address: '上海市普陀区金沙江路 1518 弄',
           zip: 200333
         }, {
           date: '2016-05-04',
           name: '王小虎',
           province: '上海',
           city: '普陀区',
           address: '上海市普陀区金沙江路 1518 弄',
           zip: 200333
         }, {
           date: '2016-05-01',
           name: '王小虎',
           province: '上海',
           city: '普陀区',
           address: '上海市普陀区金沙江路 1518 弄',
           zip: 200333
         }],
       }
     },
      methods:{
        handleClick(row) {
          console.log(row);
        },
        handleDelClick() {
          this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
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
        },
        toCreateFreight(){
          this.$router.push({path:"/createFreight"})
        }
      }
    }
</script>

<style scoped lang="less">
  .waring {
    border: 1px solid #ffd888;
    margin: 10px 0;
    padding: 10px;
    font-size: 12px;
    background-color: #fff7dd;
  .el-icon-warning{
    color: #ffa900;
    margin-right: 10px;
  }
  }
</style>
