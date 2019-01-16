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
            <span v-text="$store.state.selected.join(' > ')"></span>
            <router-link to="/publishNewGoods" class="link">修改分类</router-link>
          </el-form-item>
          <el-form-item label="商品标题" prop="title">
            <el-input v-model="ruleForm.title" max="60" placeholder="商品标题组成：商品描述+规格（60字以内）"></el-input>
          </el-form-item>
          <el-form-item label="商品属性" prop="brand">
            <i class="el-icon-warning"></i>
            <span>请准确填写属性，有利于商品在搜索和推荐中露出，错误填写可能面临商品下架或流量损失！</span>
            <div class="brand">
              <el-form-item label="品牌">
                <el-select v-model="value4" clearable placeholder="请选择品牌">
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
          <el-form-item label="商品轮播图" prop="picture">
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
          <div v-if="isMore">
            <el-form-item label="商品描述">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="商品详情图" >
              <el-upload
                :limit="limitnum"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt>
              </el-dialog>
            </el-form-item>
            <el-form-item label="商品活动主图">
              <el-upload
                :limit="1"
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="70%" :src="dialogImageUrl" alt>
              </el-dialog>
            </el-form-item>
            <el-form-item label="商品短标题">
              <el-input v-model="ruleForm.name" max="20"></el-input>
            </el-form-item>
          </div>
          <el-form-item>
            <span @click="lookMore" v-text="isMore?'收起':'填写更多图文详情'" class="clickhand"></span>
            <i v-show="!isMore" class="el-icon-arrow-down"></i>
            <i class="el-icon-arrow-up" v-show="isMore"></i>
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
                <el-select v-model="value4" placeholder="请选择" size="small" @change="showNext">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-checkbox v-model="addPicture" v-if="dynamicTags.length  > 0">添加照片</el-checkbox>
                <span>删除规格</span>
                <div class="itps" v-show="isTips">
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >{{tag}}
                    <Img style="margin-top: 10px;" v-if="addPicture"></Img>
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
              <div class="spsBox" v-show="isSpecifications == 2">
                <el-select v-model="value4" placeholder="请选择" size="small">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <span>删除规格</span>
                <div class="itps" v-show="isTips">
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    :disable-transitions="false"
                    @close="handleClose(tag)"
                  >{{tag}}</el-tag>
                  <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm"
                    @blur="handleInputConfirm"
                  ></el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    type="primary"
                    plain
                    @click="showInput"
                    v-show="isTag"
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
                  <el-select v-model="value4" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input placeholder="库存" size="mini" type="number" style="padding:0"></el-input>
                  <el-input placeholder="团购价" size="mini" type="number">
                    <!-- <template slot="prepend">￥</template> -->
                  </el-input>
                  <el-input placeholder="单买价" size="mini" type="number">
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
          <el-form-item label="商品市场价">
            <el-input
              v-model="ruleForm.name"
              placeholder="应高于商品最大单买价"
              style="width:250px"
              size="small"
            >
              <template slot="append">元</template>
            </el-input>
          </el-form-item>
        </div>
        <div>
          <h3>
            <span>3</span>服务与承诺
          </h3>
          <div class="thereBox">
            <el-form-item >
              <div class="tags">
                <el-tag>标签一</el-tag>
                <el-tag type="success">标签二</el-tag>
                <el-tag type="info">标签三</el-tag>
                <el-tag type="warning">标签四</el-tag>
                <el-tag type="danger">标签五</el-tag>
              </div>
            </el-form-item>
            <div v-if="isupdate">
              <el-form-item label="商品类型">
                <el-radio-group v-model="radio2">
                  <el-radio :label="3">普通商品</el-radio>
                  <el-radio :label="6">进口商品</el-radio>
                  <el-radio :label="9">直供商品</el-radio>
                  <el-radio :label="11">直邮商品</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="是否二手">
                <el-checkbox v-model="checked">非二手</el-checkbox>
              </el-form-item>
              <el-form-item label="是否预售">
                <el-radio-group v-model="radio2">
                  <el-radio :label="3">非预售</el-radio>
                  <el-radio :label="6">预售</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="时间承诺">
                <el-radio-group v-model="radio2">
                  <el-radio :label="3">48小时</el-radio>
                  <el-radio :label="6">24小时</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="运费模板">
                <el-select v-model="value4" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <router-link to>新建运费模板</router-link>
                <div class="adrs">
                  <div>
                      <span class="stronger">包邮配送地区:</span>
                      <span>北京、安徽、福建、广东、广西、贵州、河北、河南、黑龙江、湖北、湖南、吉林、江苏、江西、辽宁、山东、山西、陕西、上海、四川、天津、云南、浙江、重庆</span>
                  </div>
                  <div>
                      <span class="stronger">不包邮配送地区 ：</span>
                      <span>未选择地区</span>
                  </div>
                  <div>
                      <span class="stronger">不配送地区 ：</span>
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
      <el-button type="danger">提交上架</el-button>
      <el-button plain>保存草稿</el-button>
    </el-row>
  </div>
</template>
<script>
  import Img from './code'
  import {getGoodsBrandByCategory} from "@/api/axios"
export default {
  data() {
    return {
      myCroppa:{},
      // 轮播图图片
      bannerimg:{},
      // 商品分类
      selectedOptions:[],
      // 第一条盒子是否显示更多\
      msg: "填写更多图文详情",
      limitnum: 6,
      isMore: false,
      // 第2条盒子添加规格
      isSpecifications: 0,
      isTips: false,
      addPicture:false,
      // 价格库存
      tableData6: [
        {
          id: "12987122",
          name: "款式",
          amount1: "234",
          amount2: "3.2",
          amount3: 10
        },
        {
          id: "12987123",
          name: "库存",
          amount1: "165",
          amount2: "4.43",
          amount3: 12
        },
        {
          id: "12987124",
          name: "团购价",
          amount1: "324",
          amount2: "1.9",
          amount3: 9
        },
        {
          id: "12987125",
          name: "单买价",
          amount1: "621",
          amount2: "2.2",
          amount3: 17
        },
        {
          id: "12987126",
          name: "sku编码",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        },
        {
          id: "12987126",
          name: "预览图",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        }
      ],
      // 商品信息
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      isTag: true,
      // 第三个盒子选择类
      radio2: 3,
      checked: true,
      isupdate:false,
      ruleForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        classification:[
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        title: [
          { required: true, message: "请输入商品标题", trigger: "blur" },
          { min: 5, max: 60, message: "长度在5-60字以内", trigger: "blur" }
        ],
        picture: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        brand: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
      // 选择品牌
      options: [],
      value4: "",
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
    Img
  },
  methods: {
    // 通过分类获取品牌
    getbaand(){
      var idCategory = this.$store.state.selected[this.$store.state.selected.length -1 ]
      console.log(idCategory);
      getGoodsBrandByCategory(idCategory).then(res=>{
        console.log(res);
        if(res.data.code == 0){
            this.options = res.data.data
        }
        else {
          this.$message.error('分类品牌加载失败，请重新选择分类');
        }
      })
    },
    // 添加规格
    showSpecifications() {
      this.isSpecifications++;
    },
    // 添加小标签
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 关闭小标签
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      if (this.dynamicTags.length < 5) {
        this.isTag = true;
      }
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    updateMore(){
      this.isupdate = !this.isupdate
    },
    // 添加小标签
    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
        if (this.dynamicTags.length > 4) {
          this.isTag = false;
        }
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    // 选择规格显示小标签
    showNext(val) {
      this.isTips = true;
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 文件上传
    handleRemove(file, fileList) {
      console.log(file);
      console.log(fileList);
    },
    handlePictureCardPreview(file) {
      // console.log(file);
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handlesuccess(response, file, fileList){
      console.log(response);
      console.log(file);
      file.id = response.data.id
      this.bannerimg[response.data.id] = response.data.url
      console.log(this.bannerimg);
    },
    // 上传更多图片
    lookMore() {
      this.isMore = !this.isMore;
    }
  }
};
</script>
<style lang="less" scoped>
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
      font-size: 14px;
      background-color: #f8f8f8;
      .stronger {
        font-weight: 700;
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
    border: 1px solid #ccc;
    width: 80%;
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
