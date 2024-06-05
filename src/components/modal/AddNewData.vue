<template>
  <el-dialog v-model="dialogTableVisible" title="Shipping address" width="800" @close="onClose">
    <el-table :data="gridData">
      <el-table-column property="date" label="Date" width="150" />
      <el-table-column property="name" label="Name" width="200" />
      <el-table-column property="address" label="Address" />
    </el-table>
  </el-dialog>
</template>
<script setup>
import {ref} from "vue";
const dialogTableVisible = ref(true)
const emits= defineEmits(['onClose'])
const onClose=()=> {
    emits('onClose')
}
</script>