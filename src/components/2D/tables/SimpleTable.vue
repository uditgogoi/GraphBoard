<template>
  <div id="table">
    
    <el-table :data="tableData" style="width: 100%">
      
      <el-table-column
        v-for="record in columns"
        :key="record.prop"
        :prop="record.prop"
        :label="record.label"
        :width="record.width"
      />
    </el-table>
  </div>
</template>
  <script setup>
import { column } from "element-plus/es/components/table-v2/src/common";
import { computed, onMounted, ref } from "vue";
import { useGraphStore } from "../../../store";
import { capitalizeFirstLetter } from "../../../utils/helper";

const store = useGraphStore();
const props = defineProps(["id", "ready"]);
const tableData = computed(
  () =>
    store.getDashboardItemList.find((item) => item.id === props.id)?.itemData || []
);
const columns = computed(() => {
  if (!tableData || tableData.value.length===0) {
    return [];
  }
  let columns = Object.keys(tableData.value[0]) || [];
  columns = columns.map((header) => {
    return { prop: header, label: capitalizeFirstLetter(header), width: 180 };
  });
  return columns;
});

// onMounted(() => {
//   fetchTableData();
// });

// const fetchTableData = () => {};

// console.log(tableData);
// const tableData = [
//   {
//     date: "2016-05-03",
//     name: "Tom",
//     address: "No. 189, Grove St, Los Angeles",
//   },
//   {
//     date: "2016-05-02",
//     name: "Tom",
//     address: "No. 189, Grove St, Los Angeles",
//   },
//   {
//     date: "2016-05-04",
//     name: "Tom",
//     address: "No. 189, Grove St, Los Angeles",
//   },
//   {
//     date: "2016-05-01",
//     name: "Tom",
//     address: "No. 189, Grove St, Los Angeles",
//   },
// ];
</script>
<style scoped>
#table {
  padding: 0.5rem;
}
</style>