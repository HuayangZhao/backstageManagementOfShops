<template>
  <div class="createNewGoods">
    <h2>新建商品</h2>
    <!--图片裁切-->
    <!--<croppa v-model="myCroppa"></croppa>-->
    <div class="borderBox">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        class="demo-ruleForm"
      >
        <div>
          <h3>
            <span>1</span>商品基本信息
          </h3>
          <el-form-item label="商品分类" prop="classification">
            <span v-text="$store.state.selectedName.join(' > ')" style="font-size: 14px;font-weight: 600"></span>
            <router-link to="/publishNewGoods" class="link">修改分类</router-link>
          </el-form-item>
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name"  placeholder="商品名称，15字以内"></el-input>
          </el-form-item>
          <el-form-item label="商品标题" prop="title">
            <el-input v-model="ruleForm.title"  placeholder="商品标题组成：商品描述+规格（60字以内）"></el-input>
          </el-form-item>
          <el-form-item label="商品属性" >
            <i class="el-icon-warning"></i>
            <span>请准确填写属性，有利于商品在搜索和推荐中露出，错误填写可能面临商品下架或流量损失！</span>
            <div class="brand">
              <el-form-item label="品牌" prop="brandId">
                <el-select v-model="ruleForm.brandId" clearable placeholder="请选择品牌" @change="selectBrand">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="商品轮播图" prop="file">
            <!--<el-button type="primary" @click="croppaVisible=true" size="mini">点击上传</el-button>-->
            <!--<div id="bannerImgs" v-lfcous>-->

            <!--</div>-->
            <!--<el-dialog title="图片裁剪"-->
                       <!--:visible.sync="croppaVisible"-->
                       <!--width="500px"-->
                       <!--:before-close="handleClose"-->
                       <!--style="text-align: center;"-->
                       <!--:show-close="isClose">-->
                <!--<croppa-->
                        <!--v-model="myCroppa"-->
                        <!--:width="375"-->
                        <!--:height="400"-->
                        <!--:prevent-white-space="true"-->
                        <!--initial-size="natural"-->
                        <!--initial-position="center"-->
                        <!--:remove-button-size="20"-->
                        <!--remove-button-color="#ccc"-->
                        <!--&gt;-->
                <!--</croppa>-->
              <!--<span slot="footer" class="dialog-footer">-->
                    <!--<el-button @click="croppaVisible = false">取 消</el-button>-->
                    <!--<el-button type="primary" @click="uploadCroppedImage">确 定</el-button>-->
              <!--</span>-->
            <!--</el-dialog>-->
            <el-upload
              :limit="limitnum"
              multiple
              action="http://192.168.0.129:4006/files?fileSource=FASTDFS"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-success="handlesuccess"
              :on-remove="handleRemove"
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
        <div>
          <h3>
            <span>2</span>商品规格与库存
          </h3>
          <el-form-item label="商品规格">
            <div v-show="isSpecifications == 1||isSpecifications == 2">
              <span style="color: #ccc;font-size: 12px">最多添加两个商品规格，第一个商品规格可添加规格图片</span>
              <div class="spsBox">
                <el-select v-model="specvalue1" placeholder="请选择" size="small" @change="showNext">
                  <el-option
                    v-for="item in specOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-checkbox v-model="addPicture" v-if="dynamicTags.length  > 0">添加照片</el-checkbox>
                <span @click="delAll">删除规格</span>
                <div class="itps" v-if="isTips">
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >{{tag}}
                    <Img style="margin-top: 10px;" v-if="addPicture"  :tagName="tag"></Img>
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
              <div class="spsBox" v-if="isSpecifications == 2">
                <el-select v-model="specvalue2" placeholder="请选择" size="small">
                  <el-option
                    v-for="item in specOptions"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  ></el-option>
                </el-select>
                <span @click="delLast">删除规格</span>
                <div class="itps" v-show="isTips">
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags1"
                    closable
                    :disable-transitions="false"
                    @close="handleClose1(tag)"
                  >{{tag}}</el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible1"
                    v-model="inputValue1"
                    ref="saveTagInput1"
                    size="small"
                    @keyup.enter.native="handleInputConfirm2"
                    @blur="handleInputConfirm2"
                  ></el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    type="primary"
                    plain
                    @click="showInput1"
                    v-show="isTag1"
                  >+ 输入规格名称</el-button>
                </div>
              </div>
            </div>
            <el-button
              icon="el-icon-edit"
              size="mini"
              @click="showSpecifications"
              v-show="isSpecifications !== 2"
            >添加规格</el-button>
          </el-form-item>
          <el-form-item label="价格及库存">
            <div class="towBox">
              <div class="setAllBox">
                <p>批量设置：在下方栏中选择内容进行批量填充</p>
                <div class="setAll">
                  <el-select v-model="specvalue2" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in specOptions"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                  <el-input placeholder="库存" size="mini" type="number" style="padding:0"></el-input>
                  <el-input placeholder="团购价" size="mini" type="number">
                  </el-input>
                  <el-input placeholder="单价" size="mini" type="number">
                    <!-- <template slot="prepend">￥</template> -->
                  </el-input>
                  <el-input placeholder="sku编码" size="mini"></el-input>
                  <el-button type="info" size="mini" plain class="sureBut">确定</el-button>
                </div>
              </div>
              <div class="setTable">
                <el-table :data="tableData6" border show-summary style="width: 100%">
                  <el-table-column prop="id" label="款式" width="180"></el-table-column>
                  <el-table-column prop="name" label="库存"></el-table-column>
                  <el-table-column prop="amount1" sortable label="团购价"></el-table-column>
                  <el-table-column prop="amount2" sortable label="单买价"></el-table-column>
                  <el-table-column prop="amount3" label="sku编码"></el-table-column>
                  <el-table-column prop="amount3" label="预览图"></el-table-column>
                </el-table>
              </div>
            </div>
          </el-form-item>
        </div>
        <div>
          <h3>
            <span>3</span>服务与承诺
          </h3>
          <div class="thereBox">
            <el-form-item >
              <div class="tags">
                <el-tag>{{radio}}</el-tag>
                <el-tag type="success">{{checked?'新品':'二手'}}</el-tag>
                <el-tag type="info">{{radio1==0?'非预售':'预售'}}</el-tag>
                <el-tag type="warning">{{radio1==0?'承诺发货时间48小时':'承诺发货时间24小时'}}</el-tag>
                <el-tag type="danger">{{freight}}</el-tag>
              </div>
            </el-form-item>
            <div v-if="isupdate">
              <el-form-item label="商品类型">
                <el-radio-group v-model="radio">
                  <el-radio label="普通商品">普通商品</el-radio>
                  <el-radio label="进口商品">进口商品</el-radio>
                  <el-radio label="直供商品">直供商品</el-radio>
                  <el-radio label="直邮商品">直邮商品</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否二手">
                <el-checkbox v-model="checked">非二手</el-checkbox>
              </el-form-item>
              <el-form-item label="是否预售">
                <el-radio-group v-model="radio1">
                  <el-radio label="0">非预售</el-radio>
                  <el-radio label="1">预售</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="时间承诺">
                <el-radio-group v-model="radio2">
                  <el-radio label="0">48小时</el-radio>
                  <el-radio label="1">24小时</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="运费模板">
                <el-select v-model="value4" placeholder="请选择"  @change="freightSelect">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <router-link to="/createFreight">新建运费模板</router-link>
                <div class="adrs">
                  <div>
                      <div class="stronger">包邮配送地区:</div>
                      <span>北京、安徽、福建、广东、广西、贵州、河北、河南、黑龙江、湖北、湖南、吉林、江苏、江西、辽宁、山东、山西、陕西、上海、四川、天津、云南、浙江、重庆</span>
                  </div>
                  <div>
                      <div class="stronger">不包邮配送地区 ：</div>
                      <span>未选择地区</span>
                  </div>
                  <div>
                      <div class="stronger">不配送地区 ：</div>
                      <span>甘肃、海南、内蒙古、宁夏、青海、西藏、新疆</span>
                  </div>
                </div>
                <div class="weight">
                   <el-form-item label="重量(含包装)">
                     <el-input placeholder="请输入重量" style="width:200px" size="small ">
                      <template slot="append">KG</template>
                    </el-input>
                  </el-form-item>
                </div>
              </el-form-item>
              <el-form-item label="团购要求">
                <div class="GroupBuy">
                  <p>
                    <span>团购人数</span>
                    <el-input placeholder="请输入人数" style="width:300px" size="small ">
                    </el-input>
                  </p>
                  <p>
                    <span>单次限购</span>
                    <el-input placeholder="请输入人数" style="width:300px" size="small ">
                    </el-input>
                  </p>
                  <p>
                    <span>限购次数</span>
                    <el-input placeholder="请输入人数" style="width:300px" size="small ">
                    </el-input>
                  </p>
                </div>
              </el-form-item>
            </div>
            <el-form-item label="承诺" class="promise">
                <p>
                  <el-checkbox checked disabled><span>7天无理由退换货</span>该类商品，必须支持【七天无理由退换货】服务</el-checkbox>
                </p>
                <p>
                  <el-checkbox checked disabled><span>假一赔十</span>该类商品，必须支持假一赔十服务</el-checkbox>
                </p>
                <span @click="updateMore" v-text="isupdate?'收起':'展开修改'" class="clickhand"></span>
                <i v-show="!isMore" class="el-icon-arrow-down"></i>
                <i class="el-icon-arrow-up" v-show="isMore"></i>
            </el-form-item>
          </div>
        </div>
      </el-form>
    </div>
    <el-row class="butBox">
      <el-button type="danger" @click="submitToTheShelves">提交上架</el-button>
      <el-button plain>保存草稿</el-button>
    </el-row>
  </div>
</template>

<script>
  import Img from './code'
  // import Cropper from './cropper'
  // import VueUmeditor from 'vue-ueditor'
  import {getGoodsBrandByCategory,postCommodity,removeImg,postImg,postGoodsImgs,getAllSpec,postSpecImgs} from "@/api/axios"
export default {
  data() {
    return {
      isClose:false,
      visible2: false,
      croppaVisible: false,
      // 轮播图图片
      myCroppa: {},
      bannerimg:[],
      // 商品分类 id
      selectedOptions:[],
      doogId:'',
      msg: "填写更多图文详情",
      limitnum: 5,
      isMore: false,
      // 第2条盒子添加规格
      isSpecifications: 0,
      isTips: false,
      addPicture:false,
      // 价格库存
      tableData6: [],
      // 商品信息
      dynamicTags: [],
      dynamicTags1: [],
      inputVisible: false,
      inputVisible1: false,
      inputValue: "",
      inputValue1: "",
      isTag: true,
      isTag1: true,
      // 第三个盒子选择类
      radio:"普通商品",
      radio1: "0",
      radio2: "0",
      freight:"河南",
      checked: true,
      isupdate:false,
      specOptions:[],
      specvalue1:null,
      specvalue2:null,
      ruleForm: {
        title: "",
        brandId: "",
        name:"",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        classification:[
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
      // 选择品牌
      options: [
        {label:"河南",value:2},
        {label:"河北",value:3},
        {label:"武汉",value:4}],
      value4: 2,
      // 文件上传
      dialogImageUrl: "",
      dialogVisible: false,
      imageUrl: '',
    };
  },
  mounted(){
    this.getbaand()
  },
  components:{
    Img,
    // Cropper,
    // VueUmeditor
  },
  methods: {
    editorReady (editorInstance) {
      // editorInstance.setContent('Hello world!<br>你可以在这里初始化编辑器的初始内容。');
      editorInstance.addListener('contentChange', () => {
        console.log('编辑器内容发生了变化：', editorInstance.getContent());
      })
    },
    // uploadCroppedImage() {
    //   this.myCroppa.generateBlob(
    //     blob => {
    //       // console.log(this.myCroppa.generateDataUrl());
    //       let formdata = new FormData();
    //       formdata.append('file', this.convertBase64UrlToBlob(this.myCroppa.generateDataUrl()));
    //       console.log(formdata.get("file"))
    //       // let urlFiles = "http://192.168.0.129:4006/files?fileSource=FASTDFS"
    //       console.log(formdata.get("file"));
    //       postImg(formdata).then(res => {
    //         console.log(1);
    //         console.log(res);
    //         // let data = res.data;
    //         // if (data.status) {
    //         //   that.$message.success("保存成功");
    //         //   that.dialogVisible = false;
    //         // }
    //         let newImg = document.createElement("img")
    //         let url = URL.createObjectURL(blob);
    //         console.log(blob);
    //         // 释放URL
    //         newImg.onload = function() {
    //           URL.revokeObjectURL(url);
    //         };
    //         newImg.src = url;
    //         let bannerImgs = document.getElementById('bannerImgs')
    //         newImg.style.width = "125px"
    //         newImg.style.border = "1px dashed #ccc"
    //         newImg.style.marginRight = "20px"
    //         bannerImgs.appendChild(newImg);
    //       });
    //     },
    //     "image/jpeg",
    //     0.8
    //   ); // 80%压缩文件
    // },
    getbaand(){
      var idCategory = this.$store.state.selected[this.$store.state.selected.length -1 ]
      getGoodsBrandByCategory(idCategory).then(res=>{
        if(res.data.code == 0){
            this.options = res.data.data
        }
        else {
          this.$message.error('分类品牌加载失败，请重新选择分类');
        }
      })
      // 获取商品规格
      getAllSpec().then(res=>{
        console.log(res);
        if(res.data.code==0){
          this.specOptions = res.data.data
        }
      })
    },
    // 选择品牌
    selectBrand(value){
      this.ruleForm.brandId = value
      console.log(this.ruleForm.brandId);
    },
    // 选择规格显示小标签
    showNext(val) {
      this.isTips = true;
    },
    // 添加规格 显示第二个
    showSpecifications() {
      this.isSpecifications++;
    },
    // 分辨两个规格的骚操作
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    showInput1() {
      this.inputVisible1 = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput1.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
        if (this.dynamicTags.length > 4) {
          this.isTag = false;
        }
        let obj = {}
        obj.specificationId = this.specvalue1
        obj.name = inputValue
        this.$store.commit("pushSpecTag",obj)
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleInputConfirm2(){
      let inputValue = this.inputValue1;
      if (inputValue) {
        this.dynamicTags1.push(inputValue);
        if (this.dynamicTags1.length > 4) {
          this.isTag1 = false;
        }
        let obj = {}
        obj.falg = "删除用"
        obj.specificationId = this.specvalue2
        obj.name = inputValue
        this.$store.commit("pushSpecTag",obj)
      }
      this.inputVisible1 = false;
      this.inputValue1 = "";
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      if (this.dynamicTags.length < 5) {
        this.isTag = true;
      }
      this.$store.state.specImg.forEach(item=>{
        if(item.name === tag){
          this.$store.commit("removeSpecTag",item)
        }
      })
    },
    handleClose1(tag) {
      this.dynamicTags1.splice(this.dynamicTags1.indexOf(tag), 1);
      if (this.dynamicTags1.length < 5) {
        this.isTag1 = true;
      }
      this.$store.state.specImg.forEach(item=>{
        if(item.name === tag){
          this.$store.commit("removeSpecTag",item)
        }
      })
    },
    // 删除规格
    delAll(){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isSpecifications = 0
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '已取消删除'
        // });
      });
    },
    delLast(){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.isSpecifications = 1
        this.$store.commit("delSpec")
        this.$message({type: 'success', message: '删除成功!'});
        this.dynamicTags1 = []
      }).catch(() => {});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 文件上传
    handleRemove(file, fileList) {
      console.log(file.id)
      removeImg(file.id).then(res=>{
        // console.log(res);
      })
      // console.log(file);
      // console.log(fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlesuccess(response, file, fileList){
      console.log(response);
      file.id = response.data.id
        let shopId = this.$store.state.shopId;
        let imgUrl = response.data.url
        let qiniuId = response.data.id
      this.bannerimg.push({shopId,imgUrl,qiniuId})
    },
    // 展开收起
    updateMore(){
      this.isupdate = !this.isupdate
    },
    freightSelect(value){
      let obj = {};
      obj = this.options.find((item)=>{
        return item.value === value;
      });
      this.freight = obj.label
    },
    // 提交上架
    submitToTheShelves(){
      let obj = {};
      obj.categoryId = this.$store.state.selected[this.$store.state.selected.length-1];
      obj.title = this.ruleForm.title;
      obj.name = this.ruleForm.name;
      obj.brandId = this.ruleForm.brandId;
      // console.log(obj);
      // 提交商品标题名称分类品牌
      // postCommodity(obj).then(res=>{
        // console.log(res);
        // if(res.data.code == 0){
        //   this.bannerimg.forEach(item=>{
        //     // item.goodsId = res.data.data
        //     item.goodsId = 44
        //   })
          // 提交轮播图
          // postGoodsImgs(this.bannerimg).then(res=>{
          //   console.log(res);
          // })
        // }
      // })
      // 提交规格
      postSpecImgs(this.$store.state.specImg).then(res=>{
        console.log(res);
      })

    }
  }
};
</script>
<style lang="less" scoped>
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
