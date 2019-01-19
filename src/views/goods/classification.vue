<template>
  <div class="center">
    <vue-core-image-upload
      class="btn btn-primary"
      :crop="false"
      @imageuploaded="imageuploaded"
      :max-file-size="5242880"
      url="http://101.198.151.190/api/upload.php" >
    </vue-core-image-upload>
  </div>
</template>

<script>
  import VueCoreImageUpload from 'vue-core-image-upload/dist/vue-core-image-upload.vue'

  export default {
    components: {
      'vue-core-image-upload': VueCoreImageUpload,
    },
    data() {
      return {
        src: '/src/assets/logo.png',
      }
    },
    methods: {
      imageuploaded(res) {
        console.log(res);
      }
    }
  }
</script>
