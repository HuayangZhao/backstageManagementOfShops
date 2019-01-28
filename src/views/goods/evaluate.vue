<template>
    <div style="padding-right: 15%">
      <h2>评价管理</h2>
      <hr>
      <h3>店铺近90天动态评分 <span>(暂无评分：有效评价数低于50条时不显示评分)</span></h3>
      <div class="score">
        <div>
          <p>描述相符</p>
          <p>--</p>
          <p>暂无评分</p>
        </div>
        <div>
          <p>物流服务</p>
          <p>--</p>
          <p>暂无评分</p>
        </div>
        <div>
          <p>服务态度</p>
          <p>--</p>
          <p>暂无评分</p>
        </div>
      </div>
      <h3>来自客户的评价</h3>
      <div class="search">
        <div>
          <span>商品ID</span>
          <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
        </div>
        <div>
          <span>评价时间</span>
          <el-date-picker
            v-model="value7"
            type="daterange"
            align="right"
            size="mini"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2">
          </el-date-picker>
        </div>
        <div>
          <span>描述相符</span>
          <el-select v-model="value5" multiple placeholder="请选择" style="width: 250px" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>物流服务</span>
          <el-select v-model="value5" multiple placeholder="请选择" style="width: 250px" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>服务态度</span>
          <el-select v-model="value5" multiple placeholder="请选择" style="width: 250px" size="mini">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>订单号</span>
          <el-input  placeholder="请输入内容" style="width:200px" size="mini"></el-input>
        </div>

        <div>
          <el-button type="danger" size="mini" style="width: 100px">查询</el-button>
        </div>
      </div>
      <div class="tagBox">
        <el-tooltip class="item" effect="light"  placement="bottom" >
          <div slot="content" style="width: 300px;line-height: 18px;">
              评价展示规则：<br/><br/>
              1、由于近期数据量较大，评价会在消费者评价2天后<br/>
              才显示，部分评价不显示或延迟显示属正常情况<br/><br/>
              2、成人用品、内衣内裤、裤袜等商品分类的评价不对<br/>
              消费者展示，若发现黄图广告等评价请立即举报<br/><br/>
              3、为保障购物体验，部分评价在消费者端不展示或随<br/>
              机排序展示
          </div>
          <span class="evaluationRules">评价展示规则<i class="el-icon-question"></i></span>
        </el-tooltip>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部评价" name="first">
            <evaluateComponent number="20" :tableData="tableData"></evaluateComponent>
          </el-tab-pane>
          <el-tab-pane label="初评评价" name="second">
            <evaluateComponent number="20" :tableData="tableData"></evaluateComponent>
          </el-tab-pane>
          <el-tab-pane label="追加评价" name="fourth">
            <evaluateComponent number="20" :tableData="tableData"></evaluateComponent>
          </el-tab-pane>
          <el-tab-pane label="已举报的评价" name="five">
            <evaluateComponent number="20" :tableData="tableData"></evaluateComponent>
          </el-tab-pane>
        </el-tabs>
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
  import evaluateComponent from '@/components/evaluateComponent'
    export default {
        name: "evaluate",
      data(){
          return {
            tableData: [{
              id: '246354646',
              address: '上海市普陀区金固化剂固化剂复古怀旧复古怀旧复古印花风格化的规范化的规范化风格化的分隔号的分隔号沙江路 1518 弄',
              numb: 200333
            }, {
              date: '2016-05-02',
              address: '上海市普陀区金沙江路 1518 弄',
              numb: 200333
            }, {
              date: '2016-05-04',
              address: '上海市普陀区金沙江路 1518 弄',
              numb: 200333
            }, {
              date: '2016-05-01',
              address: '上海市普陀区金沙江路 1518 弄',
              numb: 200333
            }],
            activeName2:'first',
            options: [{
              value: '选项1',
              label: '1分'
            }, {
              value: '选项2',
              label: '2分'
            }, {
              value: '选项3',
              label: '3分'
            }, {
              value: '选项4',
              label: '4分'
            }, {
              value: '选项5',
              label: '5分'
            }],
            value5: [],
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
            value7: '',
          }
      },
      methods:{
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
        evaluateComponent
      }

    }
</script>

<style lang="less" scoped>
  .pageSize {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .evaluationRules {
    position: absolute;
    top: 22px;
    cursor: pointer;
    right: 125px;
    z-index: 9999999;
    font-size: 12px;
  }
  .tagBox {
    position: relative;
    margin-top: 10px;
  }
  h3 {
    border-left: 3px solid red;
    padding-left: 10px;
    margin: 20px 0;
    >span {
      font-size: 14px;
    }
  }
  .score {
    display: flex;
    padding: 30px;
    box-sizing: border-box;
    background-color: #F8F8F8;
    >div {
      height: 100px;
      width: 25%;
      >p {
        height: 33.33%;
        text-align: center;
      }
    }
  }
  .search {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    /*justify-content: space-between;*/
    padding: 20px;
    background-color: #F8F8F8;
    >div {
      margin: 10px 50px;
      span {
        font-size: 12px;
      }
    }
  }
</style>

