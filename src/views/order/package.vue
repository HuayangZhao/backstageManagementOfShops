<template>
    <div class="package">
      <h2>包裹中心</h2>
      <hr>
      <div class="search">
        <div>
          <span>包裹状态:</span>
          <el-select size="mini" v-model="values">
            <el-option label="全部状态" value="all"></el-option>
            <el-option label="正常包裹" value="0"></el-option>
            <el-option label="异常包裹" value="1"></el-option>
            <el-option label="揽收超时包裹" value="2"></el-option>
            <el-option label="派签超时包裹" value="3"></el-option>
            <el-option label="物流更新超时包裹" value="4"></el-option>
          </el-select>
        </div>
        <div>
          <span>物流公司:</span>
          <el-select v-model="values" filterable placeholder="可输入搜索" size="mini">
            <el-option label="全部物流公司" value="5"></el-option>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>运单编号</span>
          <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
        </div>
        <div>
          <span>评价时间</span>
          <el-date-picker
            size="mini"
            v-model="value7"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <div>
          <el-button type="danger" size="mini" style="width: 100px">查询</el-button>
        </div>
      </div>
      <div>
        <h3>
          查询结果 <span>共查询到 <i>0</i> 条数据</span>
          <div>
            包裹异常数据仅供参考，请以物流官网为准
          </div>
        </h3>
        <el-table
          :header-cell-style="{background:'#F3F4F8',fontWeight:'700',color:'#000'}"
          :data="tableData"
          border
          style="width: 100%;font-size: 12px">
          <el-table-column
            prop="id"
            align="center"
            label="发货时间"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="订单"
          >
          </el-table-column>
          <el-table-column
            prop="amount3"
            align="center"
            label="订单状态">
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="物流公司"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="运单编号"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="异常类型"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="揽收/停滞/派签时长"
            width="200"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="操作"
            width="100">
            <template>
              <!--@click="handleClick(scope.row)"-->
              <el-button  type="text" size="small">发货</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
    export default {
        name: "package",
      data(){
          return {
            tableData:[],
            values:'',
            options:[],
            pickerOptions2: {
              shortcuts: [{
                text: '最近一周',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近一个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                  picker.$emit('pick', [start, end]);
                }
              }, {
                text: '最近三个月',
                onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                  picker.$emit('pick', [start, end]);
                }
              }]
            },
            value7: ''
          }
      },
      methods:{

      }
    }
</script>

<style scoped lang="less">
  h3 {
    position: relative;
    border-left: 3px solid red;
    padding:10px;
    margin: 20px 0;
    >div {
      position: absolute;
      right: 10px;
      top: 17px;
      font-size: 12px;
    }
    >span {
      font-size: 12px;
      >i {
        color: red;
      }
    }
  }
  .package {
    padding-right: 15%;
  }
  .search {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    background-color: #F8F8F8;
  >div {
    width: 40%;
    margin: 10px 0;
  span {
    font-size: 12px;
  }
  }
  }
</style>
