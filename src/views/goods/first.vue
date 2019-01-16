<template>
  <div>
    <el-table
      ref="multipleTable"
      border
      :header-cell-style="{background:'#F6F6F6',fontWeight:'700',color:'#000'}"
      :data="tableData3"
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
            <img src="@/assets/logo.png" alt="">
            <div class="goodsInfo">
              <p>336156805</p>
              <a href="#">母婴护理培训教具婴儿仿真娃娃沐浴抚触教学模型</a>
              <p>商品编码：YBD888</p>
            </div>
          </div>

        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="当前价"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="单购价"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="收藏数"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        sortable
        prop="address"
        align="center"
        label="库存"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        sortable
        align="center"
        label="累计销量"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        sortable
        align="center"
        label="近30天销量"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        align="center"
        label="在售状态"
        show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作"
        align="center"
        show-overflow-tooltip>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  export default {
    data() {
      return {
        currentPage4: 4,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '4567456745'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '4567456745'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '4567456745'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '4567456745'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '4567456745'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '4567456745'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '4567456745'
        }],
        multipleSelection: []
      }
    },

    methods: {
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
        this.multipleSelection = val;
      },
      // 编辑删除
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
<style lang="less" scoped>
    .goodsImg {
      img {
        position: absolute;
        top: 50%;
        transform: translateY(-49%);
        width: 20%;
        margin-top: -2px;
        border: 1px solid #ccc;
      }
      .goodsInfo {
        margin-left: 120px;
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
