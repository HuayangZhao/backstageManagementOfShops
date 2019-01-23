<template>
    <div class="goods">
        <div class="goodsSj">商品数据</div>
        <div class="goodsXg"><p>商品效果</p></div>
        <div class="waring">
            <i class="el-icon-warning"></i>温馨提示：店铺销量突破1000单后，将会为您切换到新的页面，您将获得更多店铺经营数据。
        </div>
        <div class="businessStrategy">
            <div class="businessStrategyTitle">
                <span></span>
                <div>新店经营策略</div>
            </div>
            <div class="businessStrategyContent">
                <div>
                    <h3>学习爆款商品</h3>
                    <p>搜索拼多多中的竞品，学习标题图片和详情页的优化，合理定价、客服导购等</p>
                </div>
                <div>
                    <h3><a href="#">使用营销工具></a></h3>
                    <p>搜索拼多多中的竞品，学习标题图片和详情页的优化，合理定价、客服导购等</p>
                </div>
                <div>
                    <h3>学习爆款商品</h3>
                    <p>搜索拼多多中的竞品，学习标题图片和详情页的优化，合理定价、客服导购等</p>
                </div>
            </div>
        </div>
        <div class="businessStrategy">
            <div class="businessStrategyTitle">
                <span></span>
                <div>访问及支付订单（近7天）</div>
            </div>
            <div style="width:100%;height:300px;">
                <div id="myChart" style="width:100%;height:100%"></div>
            </div>
        </div>
    </div>
</template>
<script>
// 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require("echarts/lib/chart/line")
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/title')
require("echarts/lib/component/axisPointer")
require("echarts/lib/component/legendScroll")
export default {
    component:{
    },
    data(){
        return{
        }
    },
    mounted(){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: ''
            },
            // backgroundColor:['#333'],
            color:['blue','lightgreen'],
            legend: {
                data:['访客数', '支付订单数'],               
                right:'120px',
                icon: "rect", 
                itemWidth:10,//图例的宽度
                itemHeight:10,//图例的高度
                textStyle:{//图例文字的样式
                    fontSize:16
                }
            },
            // toolbox: {
            //     show : true,
            //     feature : {
            //         mark : {show: true},
            //         dataView : {show: true, readOnly: false},
            //         magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            //         restore : {show: true},
            //         saveAsImage : {show: true}
            //     }
            // },
            tooltip: {trigger: 'axis'},
            xAxis: [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['2019-01-15','2019-01-15','2019-01-16','2019-01-17','2019-01-18','2019-01-19','2019-01-20','2019-01-21']
                }
            ],
            yAxis: {
                type : 'value',
            },
            calculable : true,
            series: [
                {
                    name:'访客数',
                    type:'line',
                    stack: '总量',
                    itemStyle : {  
                        normal : {  
                            lineStyle:{  
                                color:'blue'  
                            }  
                        }  
                    },  
                    "smooth" : true,
                    data:[0, 0, 0, 0, 0, 0, 0,0]
                },
                {
                    name:'支付订单数',
                    type:'line',
                    stack: '总量',
                    itemStyle : {  
                        normal : {  
                            lineStyle:{  
                                color:'lightgreen'  
                            }  
                        }  
                    },  
                    "smooth" : true,
                    data:[0, 0, 0, 0, 0, 0, 0,0]
                }
            ]
        })
    }
}
</script>
<style lang="less" scoped>
a{
    text-decoration: none;
}
.goods{
  padding-right: 15%;
    .goodsSj{
        height: 40px;
        border-bottom: 1px solid #ccc;
        font-size: 20px;
    }
    .goodsXg{
        border-bottom: 1px solid #ccc;
        margin-top:20px;
        height: 30px;
        color: red;
        >p{
            border-bottom: 2px solid red;
            display: inline-block;
            height: 28px;
        }
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
    .businessStrategy{
        .businessStrategyTitle{
            margin:20px auto;
            position: relative;
            span{
                width: 2px;
                height: 18px;
                background: red;
                position: absolute;
            }
            &>div{
                margin-left: 10px;
            }
        }
        .businessStrategyContent{
            display: flex;
            height: 150px;
            div{
                width: 33.33%;
                border:1px solid #ccc;
                border-left: none;
                padding:0 20px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                &:nth-of-type(1){
                    border-left: 1px solid #ccc;
                }
                h3{
                    margin-bottom: 15px;
                }
                p{
                    line-height: 20px;
                    font-size: 13px;
                }
            }
        }      
    }
}
</style>
