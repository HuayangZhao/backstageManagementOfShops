<template>
  <el-upload
    class="avatar-uploader"
    action="http://192.168.0.129:4006/files?fileSource=FASTDFS"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :disabled="isUpload"
    >
    <img v-if="imageUrl" :src="imageUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<style>
  .avatar-uploader .el-upload {
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
</style>

<script>
  export default {
    props:["tagName"],
    data() {
      return {
        imageUrl: '',
        isUpload:false
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.isUpload = true
        file.tag = this.tagName
        let obj = {}
        obj.name = file.tag
        obj.optionImg = res.data.url
        obj.qiniuId = res.data.id
        obj.specificationId = this.$store.state.shopId
        this.$emit('getTagImg',obj)
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      handleChange(file, fileList){
        console.log(file);
      },
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
