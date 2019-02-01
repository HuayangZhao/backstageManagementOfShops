<template>
  <div class="createNewGoods">
    <h2><router-link to="/goodsIndex/goodsList">商品列表</router-link> > 商品详情</h2>
    <!--图片裁切-->
    <!--<croppa v-model="myCroppa"></croppa>-->
    <div class="borderBox">
      <el-form
        label-width="120px"
        class="demo-ruleForm"
      >
        <!--第一个盒子-->
        <div>
          <h3>
            <span>1</span>商品基本信息
          </h3>
          <el-form-item label="商品分类：" >
            <span style="font-size: 14px;font-weight: 600;color: blue" v-text="product.categoryId"></span>
          </el-form-item>
          <el-form-item label="商品名称：">
            <span style="font-size: 14px;font-weight: 600;color: blue" v-text="product.name"></span>
          </el-form-item>
          <el-form-item label="商品标题：">
            <span style="font-size: 14px;font-weight: 600;color: blue" v-text="product.title"></span>
          </el-form-item>
          <el-form-item label="库存警戒：">
            <span style="font-size: 14px;font-weight: 600;color: blue" v-text="product.warnStock"></span>
          </el-form-item>
          <el-form-item label="商品品牌：" >
            <span style="font-size: 14px;font-weight: 600;color: blue" v-text="product.brandId"></span>
          </el-form-item>
          <el-form-item label="商品轮播图：">
              <img v-for="item in productPicture" :src="item.imgUrl"  :key="item.id" style=" border-radius: 7px;width: 150px;height: 150px;margin-left: 10px;">
          </el-form-item>
        </div>
        <div>
          <h3>
            <span>2</span>商品规格与库存
          </h3>
          <el-form-item label="价格及库存:">
              <div>
                <el-table
                  :data="productSku"
                  class="tb-edit"
                  style="width: 100%"
                  highlight-current-row
                  border
                  :header-cell-style="{background:'#F2F5F7',fontWeight:'700',color:'#000'}">
                  <el-table-column  :label="headerName" v-if="isShowHeader">
                    <template slot-scope="scope">
                      <span>{{scope.row.tag}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="库存" >
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.stock" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)" type="number"></el-input> <span>{{scope.row.stock}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column  label="单价">
                    <template slot-scope="scope">
                      <el-input type="number" size="small" v-model="scope.row.price" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.price}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column  label="sku编码">
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.name" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column  label="商品编码">
                    <template slot-scope="scope">
                      <el-input size="small" v-model="scope.row.code" placeholder="请输入内容" @change="handleEdit(scope.$index, scope.row)"></el-input> <span>{{scope.row.code}}</span>
                    </template>
                  </el-table-column>
                </el-table>
                <br>
              </div>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  // import VueUmeditor from 'vue-ueditor'
  export default {
    data() {
      return {
        product:{},
        productPicture:[],
        productSku:[],
        productSpecOption:[],
        isShowHeader:true,
        headerName:"",
      };
    },
    created(){
      this.getGoods()
    },
    methods: {
      // 获取商品参数并解析
      getGoods(){
        console.log(this.$store.state.goodsInfo);
        this.product = this.$store.state.goodsInfo.product;
        this.productPicture = this.$store.state.goodsInfo.productPicture;
        this.productSku = this.$store.state.goodsInfo.productSku;
        this.productSpecOption = this.$store.state.goodsInfo.productSpecOption
        this.headerName = this.productSku[0].name
        this.productSku.forEach(item=>{
          this.productSpecOption.forEach(itps=>{
            if(item.productId === itps.productId){
              item.tag = itps.name
            }
          })
        })
      },
    },
  };
</script>
<style lang="less" scoped>
  .tb-edit .el-input {
    display: none
  }
  .tb-edit .current-row .el-input {
    display: block
  }
  .tb-edit .current-row .el-input+span {
    display: none
  }
  .edui-default .edui-toolbar .edui-combox .edui-combox-body {
    height: 20px;
  }
  .avatar-uploader-icon[data-v-5511ac25] {
    margin-top: 10px;
    border: 1px dashed #d9d9d9;
  }
  .avatar-uploader .el-upload {

    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .createNewGoods {
    padding-right: 15%;
    .butBox {
      margin-left: 30%;
      margin-top: 20px;
    }
    .clickhand {
      cursor: pointer;
    }
    .clickhand:hover {
      color:red;
    }
    .towBox {
      padding: 20px;
      background-color: #f8f8f8;
      line-height: 1;
      .setAllBox {
        padding: 10px;
        position: relative;
        background-color: #fff;
        >p {
          margin-bottom: 20px;
        }
        .sureBut {
          position: absolute;
          right: 20px;
          top: 10px;
        }
      }
      .setTable {
        margin-top: 20px;
      }
    }
    .thereBox {
      .tags {
        margin-bottom: -20px;
        margin-top: 10px;
      }
      .adrs {
        margin-top: 20px;
        margin-bottom: 10px;
        padding: 20px;
        border-radius: 7px;
        font-size: 12px;
        background-color: #f8f8f8;
        .stronger {
          font-weight: 700;
        }
        span {
          padding-left: 40px;
        }
        p {
          line-height: normal;
        }
      }
      .weight {
        background-color: #f8f8f8;
        border-radius: 7px;
        padding: 20px;
      }
      .GroupBuy{
        background-color: #f8f8f8;
        border-radius: 7px;
        padding: 20px;
        span {
          margin-right: 20px;
        }
      }
      .promise{
        >p span {
          color: #000;
          font-weight: 600;
        }
      }
    }

    margin-left: 30px;
    .el-icon-warning {
      color: #fea811;
      font-size: 16px;
      margin-right: 5px;
    }
    h2 {
      font-size: 22px;
      margin-bottom: 20px;
    }
    .borderBox {
      border: 1px solid #e9efed;
      .demo-ruleForm {
        > div {
          padding: 30px 20px;
          border-bottom: 1px solid #ccc;
          .link {
            text-decoration: none;
            color: blue;
          }
        }
      }
      h3 {
        font-size: 20px;
        margin-bottom: 10px;
        span {
          font-size: 24px;
          margin-right: 10px;
          color: #5f99ec;
        }
      }
      .brand {
        height: 90px;
        padding: 20px 0 0 80px;
        box-sizing: border-box;
        background-color: #f8f8f8;
      }
    }
    .spsBox {
      padding: 0 20px;
      background-color: #f3f4f8;
      margin-bottom: 10px;
      > span {
        color: blue;
        cursor: pointer;
        font-size: 14px;
        float: right;
      }
      .itps {
        margin: 0 -20px;
        padding: 10px;
        background-color: #fafafa;
      }
    }
    .setAll {
      .el-select {
        width: 100px;
      }
      .el-input {
        width: 100px;
      }
    }
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
