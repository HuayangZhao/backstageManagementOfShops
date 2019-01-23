<template>
    <div class="loanAccount">
        <p>贷款账户</p>
        <div class="loanAccountBox">
            <h2>账户总额</h2>
            <a href="#"><div class="loanAccountHelp">？</div></a>
            <a href="#" class="checkGetDetail">查看收支明细</a>
            <p>提现中</p>
            <h3>0.00<span>元</span></h3>
            <button class="getCash">提现</button>
            <h5>0.00<span>元</span></h5>
        </div>
        <div class="getCashRecord">
            <span></span>
            <div>提现记录<p>共查询到&nbsp;&nbsp;<span>{{msg}}</span>&nbsp;&nbsp;条数据</p></div>
            <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="date"
            label="创建时间"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="提现类型"
            >
            </el-table-column>
            <el-table-column
            prop="cash"
            label="提现金额">
            </el-table-column>
            <el-table-column
            prop="techPay"
            label="技术服务费">
            </el-table-column>
            <el-table-column
            prop="cashAccount"
            label="收款账户">
            </el-table-column>
            <el-table-column
            prop="cashStatus"
            label="提现状态">
            </el-table-column>
            <el-table-column
            prop="info"
            label="说明">
            </el-table-column>
        </el-table>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            msg:0,
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            cash: '0',
            techPay:'2',
            cashAccount:'上海市xx行',
            cashStatus:'已提现',
            info:'xxxxxxx'
            }]
        }
    }
}
</script>
<style lang="less" scoped>
  .loanAccount {
    padding-right: 20%;
  }
a{
    text-decoration: none;
}
.loanAccountBox{
    border:1px solid #ccc;
    position: relative;
    padding-left: 20px;
    padding-top: 10px;
    height: 100px;
    margin-top: 20px;
    box-sizing: border-box;
    .loanAccountHelp{
        width: 15px;
        height: 15px;
        background-color: #ccc;
        border-radius: 50%;
        color:#fff;
        text-align: center;
        left: 20px;
        position: absolute;
        top: 20px;
        left: 90px;
        font-size: 13px;
    }
    .checkGetDetail{
        position: absolute;
        top: 23px;
        left:120px;
        color: skyblue;
        font-size: 13px;
    }
    h3{
        color:red;
        font-weight: 700;
        margin-top: 5px;
        span{
            font-weight: 400;
            margin-left: 8px;
            color: #000;
            font-size: 13px;
        }
    }
    p{
        position: absolute;
        top: 25px;
        left: 400px;
        font-size: 13px;
    }
    h5{
        position: absolute;
        top: 55px;
        left: 400px;
        font-size: 13px;
        font-weight: 700;
        span{
            font-weight: 400;
            margin-left: 8px;
        }
    }
    .getCash{
        position: absolute;
        top: 48px;
        left: 110px;
        width: 65px;
        height: 25px;
        font-size: 13px;
        color:#646464;
    }
}
.getCashRecord{
    position: relative;
    margin-top: 25px;
    >span{
        width: 2px;
        height: 16px;
        background: red;
        position: absolute;
        top: 0;
        left: 0;
    }
    >div{
        margin-left: 10px;
        font-size: 16px;
        margin-bottom: 25px;
        >p{
            display: inline-block;
            margin-left: 20px;
            font-size: 13px;
            >span{
                color:red;
            }
        }
    }
}
</style>

