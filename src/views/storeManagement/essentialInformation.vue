<template>
    <div class="essentialInformation">
      <div class="waring">
        <i class="el-icon-warning"></i>非特殊商品发货时首次选择的快递公司为“顺丰快递”的订单，自商家点击发货时起满10天，且消费者未确认收货的，系统将自动确认收货。
      </div>
      <div class="info">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="店铺编号:" >
          1215841  <a href="#">二维码</a>
        </el-form-item>
        <el-form-item label="店铺名称:" >
          飞扬的小店
        </el-form-item>
        <el-form-item label="店铺认证:">
          个人店铺
        </el-form-item>
        <el-form-item label="主营类目:">
          母婴玩具
        </el-form-item>
        <el-form-item label="店铺logo:" prop="name">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
          <el-form-item label="店铺详情:" prop="name">
            <el-input type="textarea" v-model="ruleForm.desc" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="入驻人邮箱:" prop="name">
            <el-input v-model="ruleForm.desc" size="mini" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="入驻人手机号:" prop="name"  disabled>
            <el-input v-model="ruleForm.desc" size="mini" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人姓名:">
            <el-input v-model="ruleForm.desc" size="mini" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="紧急联系人手机:">
            <el-input v-model="ruleForm.desc" size="mini" style="width: 200px"></el-input>
            <el-button plain size="mini">获取验证码</el-button>
          </el-form-item>
          <el-form-item label="验证码:">
            <el-input v-model="ruleForm.desc" size="mini" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="" prop="name">
            <el-checkbox v-model="checked">
              我声明，此页面内容由本店铺自行填写和发布，内容真实有效，如有相关法律法规，
              平台协议及平台规则之规定冲突的，以法律法规、平台协议及平台规则规定为准
            </el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')" size="small">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
    export default {
        name: "essentialInformation",
      data() {
        return {
          ruleForm: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
          imageUrl: '',
          rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            region: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ],
            date1: [
              { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
              { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            type: [
              { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
            ],
            resource: [
              { required: true, message: '请选择活动资源', trigger: 'change' }
            ],
            desc: [
              { required: true, message: '请填写活动形式', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              alert('submit!');
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        // 照片上传
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      }
    }
</script>

<style scoped lang="less">
  .avatar-uploader>.el-upload>i {
    border: 1px dashed #d9d9d9;
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
  .el-form-item {
    margin-bottom: 10px;
  }
  .info {
    margin-top: 20px;
    width: 600px;
  }
  .waring {
    border: 1px solid #338FCE;
    padding: 10px;
    font-size: 12px;
    margin-top: 10px;
    background-color: #ECF7FE;
  .el-icon-warning{
      color: #338FCE;
      margin-right: 10px;
    }
  }
</style>
