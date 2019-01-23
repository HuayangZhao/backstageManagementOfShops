<template>
  <div class="createNewGoods">
    <h2>新建商品</h2>
    <!--图片裁切-->
    <!--<croppa v-model="myCroppa"></croppa>-->
    <div class="borderBox">
      <el-form
        :model="productC"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <!--第一个盒子-->
        <div>
          <h3>
            <span>1</span>商品基本信息
          </h3>
          <el-form-item label="商品分类" prop="classifySelectedId">
            <el-cascader placeholder="试试搜索：指南"
                         :options="classifyOptions"
                         filterable
                         style="width: 300px"
                         v-model=product.classifySelectedId
                         @change="classification"
            ></el-cascader>
            <span v-text="'您已选择 ：' + classifySelectedName.join(' > ')" style="font-size: 14px;font-weight: 600;color: blue"></span>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="product.name"  placeholder="商品名称，15字以内"></el-input>
          </el-form-item>
          <el-form-item label="商品标题" prop="title">
            <el-input v-model="product.title"  placeholder="商品标题组成：商品描述+规格（60字以内）"></el-input>
          </el-form-item>
          <el-form-item label="库存警戒" prop="name">
            <el-input v-model="product.warnStock"  placeholder="当库存低于此警戒系统会自动提醒你" type="number"></el-input>
          </el-form-item>
          <el-form-item label="商品属性" >
            <i class="el-icon-warning"></i>
            <span>请准确填写属性，有利于商品在搜索和推荐中露出，错误填写可能面临商品下架或流量损失！</span>
            <div class="brand">
              <el-form-item label="品牌" prop="brandId">
                <el-select v-model="product.brandId" clearable placeholder="请选择品牌" @change="selectBrand">
                  <el-option
                    v-for="item in brandOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="商品轮播图" prop="file">
            <span>（默认第一张为商品封面图）</span>
            <el-upload
              :limit="limitnum"
              multiple
              action="http://192.168.0.129:4006/files?fileSource=FASTDFS"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-success="handlesuccess"
              :on-remove="handleRemove"
              :on-exceed="toTips"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>
          </el-form-item>
          <el-form-item label="商品详情" >
            <!--<VueUmeditor @ready="editorReady"></VueUmeditor>-->
          </el-form-item>
        </div>
        <!--第二个-->
        <div>
          <h3>
            <span>2</span>商品规格与库存
          </h3>
          <el-form-item label="商品规格">
            <el-button
              icon="el-icon-edit"
              size="mini"
              @click="showSpecifications"
              v-show="isSpecifications == false"
            >添加规格</el-button>
            <div v-show="isSpecifications==true">
              <div class="spsBox">
                <el-select v-model="specvalue" placeholder="请选择" size="small" @change="showNext">
                  <el-option
                    v-for="item in specOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-checkbox v-model="addPicture" v-if="dynamicTags.length  > 0">添加照片</el-checkbox>
                <span @click="delAll" style="font-size: 12px">删除规格</span>
                <div class="itps" v-if="isTips">
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >{{tag}}
                    <Img style="margin-top: 10px;" v-if="addPicture"  :tagName="tag" @getTagImg="tagImgObj"></Img>
                  </el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  >
                  </el-input>
                  <el-button
                    v-else
                    type="primary"
                    plain
                    class="button-new-tag"
                    size="small"
                    @click="showInput"
                    v-show="isTag"
                  >+ 输入规格名称</el-button>
                </div>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="价格及库存" >
            <div class="towBox">
              <div class="setAllBox">
                <p>批量设置：在下方栏中选择内容进行批量填充</p>
                <div class="setAll">
                  <el-input placeholder="库存" size="mini" type="number" style="padding:0" v-model="stockAll"></el-input>
                  <el-input placeholder="单价" size="mini" type="number" v-model="unitPrice"></el-input>
                  <el-input placeholder="sku编码" size="mini" v-model="skuCode"></el-input>
                  <el-input placeholder="商品编码" size="mini" v-model="goodsCode"></el-input>
                  <el-button type="info" size="mini" plain class="sureBut" @click="setAllSpce">确定</el-button>
                </div>
              </div>
              <div>
                <el-table
                  :data="tableData1"
                  class="tb-edit"
                  style="width: 100%"
                  highlight-current-row
                  border
                  :header-cell-style="{background:'#F2F5F7',fontWeight:'700',color:'#000'}"
                  @row-click="handleCurrentChange">
                  <el-table-column  :label="this.specLabel" v-if="isShowHeader">
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
                {{tableData}}
                <br>
              </div>
            </div>
          </el-form-item>
        </div>
        <el-row class="butBox">
          <el-button type="danger" @click="submitToTheShelves">提交上架</el-button>
          <el-button plain  @click="saveDraft">保存草稿</el-button>
        </el-row>
        {{objInfo}}
      </el-form>
    </div>
  </div>
</template>

<script>
  function getCascaderObj(val,opt) {
    return val.map(function (value, index, array) {
      for (var itm of opt) {
        if (itm.value == value) { opt = itm.children; return itm; }
      }
      return null;
    });
  }
  import Img from './code'
  // import Cropper from './cropper'
  // import VueUmeditor from 'vue-ueditor'
  import {
    getAllSelectList,
    getGoodsBrandByCategory,
    removeImg,
    postImg,
    postCommodity,
    getAllSpec,
    } from "@/api/axios"
export default {
  data() {
    return {
      objInfo:{},
      // 商铺ID  先写着  用户注册或登录就能获取
      shopId:3,
      // 商铺表接口
      product:{
          title:"",
          name:"",
          brandId:null,
          categoryId:null,
          warnStock:10,
        videoImgUrl:'',
          // 选择分类的ID
          classifySelectedId: [],
        },
      brandOptions:[],
      // 所有分类
      classifyOptions:[],
      // 选择的分类
      vals:[],
      // 选择分类的label
      classifySelectedName: [],
      // 轮播图图片
      limitnum: 5,
      dialogVisible: false,
      dialogImageUrl: "",
      productPicture:[],
      // 商品规格
      isSpecifications:false,
      isTips: false,
      isTag: true,
      // 选取的label
      specLabel:"",
        // 最后给后台的合集
      productSpecOption:[],
      specvalue:null,
      inputVisible: false,
      inputValue:"",
      addPicture:false,
      dynamicTags: [],
      // 所有规格类型
      specOptions:[],
      // 库存
      isShowHeader:false,
      tableData: [{
        name:'',
        tag:'',
        code:'',
        price: 0,
        stock:0,
      }],
      stockAll:null,
      unitPrice:null,
      skuCode:'',
      goodsCode:'',
      rules: {
        classifySelectedId:[
          { required: true, message: "请选择商品分类", trigger: "change" },
        ],
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 5, max: 20, message: "长度在5-20字以内", trigger: "blur" }
        ],
        title: [
          { required: true, message: "请输入商品标题", trigger: "blur" },
          { min: 5, max: 60, message: "长度在5-60字以内", trigger: "blur" }
        ],
        brandId: [
          { required: true, message: "请选择商品品牌", trigger: "change" }
        ],
        file: [
          { required: true, message: '请上传图片' }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
    };
  },
  mounted(){
    this.getAll()
    this.getbrand()
  },
  components:{
    Img,
    // Cropper,
    // VueUmeditor
  },
  methods: {
    // 获取所有分类
    getAll() {
      getAllSelectList().then(res => {
        var newArr = [];
        if(res.status == 200) {
          res.data.forEach(item => {
            if (item.parentId === 0) {
              item.children = [];
              newArr.push(item)
            }
          });
          res.data.forEach(item => {
            newArr.forEach(tisp => {
              if (item.parentId == tisp.value) {
                tisp.children.push(item)
              }
            })
          });
          this.classifyOptions = newArr;
        }
      })
    },
    // 获取所有商品规格
    getbrand(){
      getAllSpec().then(res=>{
        if(res.data.code==0){
          this.specOptions = res.data.data
        }
      })
    },
    // 每次选择的分类value和label
    classification(value){
      this.product.classifySelectedId = value
      this.product.categoryId = value[value.length-1]
      this.vals=getCascaderObj(value, this.classifyOptions);
      let classifyName = []
      this.vals.forEach(item=>{
        classifyName.push(item.label)
      })
      console.log(this.product);
      this.product.brandId = null
      this.classifySelectedName = classifyName
      // 通过分类ID获取品牌
      let idCategory = value[value.length-1]
      getGoodsBrandByCategory(idCategory).then(res=>{
        if(res.data.code == 0){
          this.brandOptions = res.data.data
        }
        else {
          this.$message.error('分类品牌加载失败，请重新选择分类');
        }
      })
    },
    // 选择品牌
    selectBrand(value){
      this.product.brandId = value
      console.log(this.product);
    },
    // 轮播图上传
    handleRemove(file, fileList) {
      removeImg(file.id).then(res=>{
        console.log(res)
        if(res.data.code !== 0){
          return this.$message.error('删除失败，请重试');
        }
        this.productPicture.forEach(item=>{
          if(item.qiniuId == file.id){
            let index = this.productPicture.indexOf(item)
            if (index > -1) {
              this.productPicture.splice(index, 1);
            }
          }
        })
      })

    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlesuccess(response, file, fileList){
      console.log(response);
      file.id = response.data.id
      let shopId = this.shopId;
      let imgUrl = response.data.url
      let qiniuId = response.data.id
      this.productPicture.push({shopId,imgUrl,qiniuId})
    },
    toTips(){
      this.$message({type: 'success', message: '删除成功!'});
    },
    // 显示选择规格
    showSpecifications(){
      this.isSpecifications = true
    },
    // 选择规格显示规格小标签
    showNext(val) {
      this.isTips = true;
      var obj = {};
      obj = this.specOptions.find(item=> item.id === val)
      this.specLabel = obj.name
      this.tableData=[]
      this.dynamicTags = []
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.isShowHeader = true
        var falg = true
       this.dynamicTags.forEach(item=>{
         if(item == inputValue){
           falg = false
           return this.$message.error('规格名称不能重复');
         }
       })
        if(falg){
          let obj = {}
          let obj_1 = {}
          obj.name = inputValue
          obj_1.tag = inputValue
          obj_1.code = ''
          obj_1.price = null
          obj_1.stock = 0
          obj_1.supplierId = this.shopId
          obj.specificationId = this.specvalue
          this.productSpecOption.forEach(item=>{
            if(item.tag === ''){
              let index = this.tableData.indexOf(item)
              if (index > -1) {
                this.tableData.splice(index, 1);
              }
            }
          })
          this.productSpecOption.push(obj)
          this.tableData.push(obj_1)
          this.dynamicTags.push(inputValue);
          if (this.dynamicTags.length > 4) {
            this.isTag = false;
          }
          this.inputVisible = false;
          this.inputValue = "";
        }
      }
    },
    // 获取子组件传过来的图片信息
    tagImgObj(data){
      this.productSpecOption.forEach(item=>{
        if(item.name == data.name){
          let index = this.productSpecOption.indexOf(item)
          if (index > -1) {
            this.productSpecOption.splice(index, 1);
          }
        }
      })
      this.productSpecOption.push(data)
      console.log(this.productSpecOption);
    },
    handleClose(tag) {
      var tagName = tag
      this.tableData.forEach(item=>{
        console.log(item);
        if(item.tag === tagName){
          console.log(1);
          let index = this.tableData.indexOf(item)
          if (index > -1) {
            this.tableData.splice(index, 1);
          }
        }
      })
      this.productSpecOption.forEach(item=>{
        if(item.name === tag){
          removeImg(item.qiniuId).then(res=>{
            // console.log(res);
          })
          let index = this.productSpecOption.indexOf(item)
          if (index > -1) {
            this.productSpecOption.splice(index, 1);
          }
        }
      })
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      if (this.dynamicTags.length < 5) {
        this.isTag = true;
      }
      if(this.dynamicTags.length === 0){
        this.isShowHeader = false
      }
    },
    // 删除所有规格
    delAll(){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isSpecifications = false
        this.dynamicTags1 = []
        this.productSpecOption = []
        this.tableData = []
        this.tableData.push({
          name:'',
          code:'',
          price: 0,
          stock:0,
        })
      }).catch(() => {
      });
    },
    // 批量设置库存
    setAllSpce(){
      if(this.skuCode !== ''){
        this.tableData.forEach(item=>{
          item.name = this.skuCode
        })
      }
      if(this.unitPrice !== null){
        this.tableData.forEach(item=>{
          item.price = this.unitPrice
        })
      }
      if(this.stockAll !== null){
        this.tableData.forEach(item=>{
          item.stock = this.stockAll
        })
      }
      if(this.goodsCode !== ''){
        this.tableData.forEach(item=>{
          item.code = this.goodsCode
        })
      }
    },
    // 提交上架
    submitToTheShelves(){
      let isTure = true
      if(this.productPicture.length === 0){
        isTure = false
        this.$message.error('请添加商品轮播图')
      }else {
        this.product.videoImgUrl = this.productPicture[0].imgUrl
      }

      for(let i in this.product){
        if(this.product[i] == ''|| this.product[i] == null){
          isTure = false
          this.$message.error('请完善商品的基本信息')
        }
      }
      this.tableData.forEach(item=>{
        for (var key in item) {
          if(item[key] == 0 ||  item[key] == ''){
            if(key !== 'tag') {
              isTure = false
              this.$message.error('请完善商品的价格及库存');
            }
          }
        }
      })
      if(isTure){
        if(!this.addPicture){
          this.productSpecOption.forEach(item=>{
            item.optionImg = ''
          })
        }
        let obj = {}
        obj.product = this.product
        obj.productPicture = this.productPicture
        obj.productSpecOption = this.productSpecOption
        obj.productSku = this.tableData
        this.objInfo = obj
        postCommodity(obj).then(res=>{
          console.log(res);
          if(res.data.data == 0) {
            this.$message.success('商品添加成功');
            this.$router.push({path:'/goodsList/onLineGoods'})
          }else {
            this.$message.error('添加异常,请重试')
          }
        })
      }
    },
    // 保存草稿
    saveDraft(){
      let isTure = true
      if(this.productPicture.length === 0){
        isTure = false
        this.$message.error('请添加商品轮播图')
      }else {
        this.product.frameStatus = 3
        this.product.videoImgUrl = this.productPicture[0].imgUrl
      }

      for(let i in this.product){
        if(this.product[i] == ''|| this.product[i] == null){
          isTure = false
          this.$message.error('保存前请完善商品的基本信息')
        }
      }
      this.tableData.forEach(item=>{
        for (var key in item) {
          if(item[key] == 0 ||  item[key] == ''){
            if(key !== 'tag') {
              isTure = false
              this.$message.error('保存前请完善商品的价格及库存');
            }
          }
        }
      })
      if(isTure){
        if(!this.addPicture){
          this.productSpecOption.forEach(item=>{
            item.optionImg = ''
          })
        }
        let obj = {}
        obj.product = this.product
        obj.productPicture = this.productPicture
        obj.productSpecOption = this.productSpecOption
        obj.productSku = this.tableData
        this.objInfo = obj
        postCommodity(obj).then(res=>{
          console.log(res);
          if(res.data.data == 0) {
            this.$router.push({path:'/goodsList/onLineGoods'})
            this.$message.success('商品保存成功');
          }else {
            this.$message.error('保存异常,请重试')
          }
        })
      }
    },
    // // 库存
    handleCurrentChange(row, event, column) {
      // console.log(row, event, column, event.currentTarget)
    },
    handleEdit(index, row) {
      // console.log(index, row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
    }
  },
  computed:{
    productC(){
      return this.product
    },
    productPictureC(){
       return this.productPicture
    },
    tableData1(){
      this.tableData.forEach(item=>{
        item.supplierId = this.shopId
      })
      return this.tableData
    },
  }
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
    padding-right: 30px;
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
