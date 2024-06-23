<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        Drop file here or <em>click to upload</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          Only .csv and .xls files allowed
        </div>
      </template>
    </el-upload>
  </div>
</template>
<script setup>
import { UploadFilled } from '@element-plus/icons-vue'

</script>