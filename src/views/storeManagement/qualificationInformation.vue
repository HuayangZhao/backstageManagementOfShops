<template>
    <div class="qualificationInformation">
      <h3>
        <i class="el-icon-document"></i><span>审核通过</span>

        <el-popover
          placement="right"
          width="800"
          trigger="click">
          <el-table
            :data="gridData"
            border
            :header-cell-style="{background:'#F3F4F8',fontWeight:'700',color:'#000'}"
          >
            <el-table-column  property="name" label="审核结果"></el-table-column>
            <el-table-column  property="date" label="提交时间"></el-table-column>
            <el-table-column  property="date" label="审核时间"></el-table-column>
            <el-table-column  property="address" label="审核结果"></el-table-column>
          </el-table>
          <el-button  slot="reference" type="text" size="mini">历史审核意见</el-button>
        </el-popover>
        <el-button type="danger" size="mini" style="float: right;">编辑</el-button>
      </h3>
      <div class="waring">
        <i class="el-icon-warning"></i>当前页面显示资质信息为店铺上一次审核通过的信息
      </div>
      <div class="info">
          <h4>店铺主体信息</h4>
        <div>
          <span class="new-label">店铺名称:</span>
          <span class="new-part">飞扬的小店</span>
        </div>
      </div>
      <div class="info">
        <h4>入驻人证件信息</h4>
        <div>
          <p>
            <span class="new-label">入住人姓名:</span>
            <span class="new-part">黄*洋</span>
          </p>
          <p>
            <span class="new-label">入住人身份证号:</span>
            <span class="new-part">421302********3313</span>
          </p>
          <p>
            <span class="new-label">身份证号有效期:</span>
            <span class="new-part">2036-12-15</span>
          </p>
          <p>
            <span class="new-label">入驻人身份证正面照:</span>
            <img src="" alt="">
          </p>
          <p>
            <span class="new-label">入驻人身份证背面照:</span>
            <img src="" alt="">
          </p>
        </div>
      </div>
      <div class="info">
        <h4>类目资质</h4>
        <div>
          <p>
            <span class="new-label">海关备案号:</span>
            <span class="new-part">无</span>
          </p>
          <p>
            <span class="new-label">海关备案名称:</span>
            <span class="new-part">无</span>
          </p>
          <p>
            <span class="new-label">质检报告:</span>
            <img src="" alt="">
          </p>
          <p>
            <span class="new-label">食品流通/经营许可证:</span>
            <img src="" alt="">
          </p>
          <p>
            <span class="new-label">食品流通/经营许可证有效期:</span>
            <span class="new-part">无</span>
          </p>
          <p>
            <span class="new-label">酒类流通许可证/备案登记表:</span>
            <img src="" alt="">
          </p>
          <p>
            <span class="new-label">医疗器械经营资质文件:</span>
            <img src="" alt="">
          </p>
          <p>
            <span class="new-label">医疗器械经营资质文件有效期:</span>
            <span class="new-part">无</span>
          </p>
          <p>
            <span class="new-label">营业执照:</span>
            <img src="" alt="">
          </p>
          <p>
            <span class="new-label">营业期限:</span>
            <span class="new-part">无</span>
          </p>
          <p>
            <span class="new-label">营业执照编号:</span>
            <span class="new-part">统一社会信用代码</span>
          </p>
          <p>
            <span class="new-label">出版物经营许可证:</span>
            <img src="" alt="">
          </p>
          <p>
            <span class="new-label">出版物经营许可证有效期:</span>
            <span class="new-part">无</span>
          </p>
        </div>
      </div>
      <div class="info">
        <h4>商标信息</h4>
        <div>
          <p>注：店铺包含“旗舰、专卖”，商家必须上传品牌授权或独占授权证明，需授权店铺从属人在拼多多经营该品牌产品。</p>
          <div class="trademark">
            <p>
              <span class="new-label">注册类型:</span>
              <span class="new-part">授权商标</span>
            </p>
            <p>
              <span class="new-label">商标注册号:</span>
              <span class="new-part"></span>
            </p>
            <p>
              <span class="new-label">商标注册证明:</span>
              <img src="" alt="">
            </p>
            <p>
              <span class="new-label">品牌授权证明:</span>
              <img src="" alt="">
            </p>
            <p>
              <span class="new-label">品牌授权有效期:</span>
              <span class="new-part">无</span>
            </p>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "qualificationInformation",
      data() {
        return {
          gridData: [{
            date: '2016-05-02',
            name: '审核通过',
            address: '审核通过'
          }, {
            date: '2016-05-04',
            name: '审核驳回',
            address: '身份证有效期要和身份证保持一致'
          },]
        };
      }
    }
</script>

<style scoped lang="less">
.qualificationInformation {
  h3 {
    margin-top: 20px;
    i{
      color: #ccc;
      margin-right: 5px;
    }
    span {
      color: #6cbc3b;
      margin-right: 20px;
    }
  }
  .info {
    border: 1px solid #edeff5;
    margin-top: 20px;
    h4 {
      line-height: 50px;
      height: 50px;
      text-indent: 20px;
      background-color: #f4f5f9;
      font-size: 14px;
      color: #333;
    }
    >div{
      padding: 30px;
      .trademark {
        background-color: #fbfbfb;
        border: 1px solid #e8e8e8;
        width: 600px;
        >p {
          margin: 40px 0;
        }
      }
      p {
        margin-bottom: 40px;
        font-size: 12px;
      }
      img {
        width: 160px;
        height: 100px;
        vertical-align:top;
      }
      .new-label{
        display: inline-block;
        width: 200px;
        text-align: right;
        color: #666;
        font-size: 12px;
        margin-right: 20px;
      }
      .new-part {
        color: #666;
        font-size: 12px;
      }
    }
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
</style>
