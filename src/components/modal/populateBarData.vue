<template>
  <el-dialog
    v-model="dialogTableVisible"
    title="Populate Data"
    width="800"
    @close="onClose"
  >
    <div class="flex gap-4 mb-4">
      <div>
        <el-text class="mx-1" type="primary">Title</el-text>
        <el-input
          v-model="title"
          style="width: 240px"
          placeholder="Edit title"
        />
      </div>
    </div>
    <div>
      <el-text class="mx-1" type="primary">Add series data</el-text>
     
      <div v-for="series in props.data.chart.series" :key="series.name">
        <el-input
          v-model="dataModel[series.name]"
          style="width: 240px"
          placeholder="Enter Data"
        />
      </div>
    </div>
    <div>
      <el-button type="primary" @click="onSubmit">Submit</el-button>
    </div>
  </el-dialog>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
const dialogTableVisible = ref(true);
const emits = defineEmits(["onClose", "change"]);
const onClose = () => {
  emits("onClose");
};
const props = defineProps(["data"]);
const dataModel = ref({});
const title = ref(props.data.title);

onMounted(() => {
  getDefaultSeriesData();
});

const getDefaultSeriesData = () => {
  const newData = Object.assign([],props.data.chart.series);
  for (let i = 0; i < newData.length; i++) {
    dataModel.value[newData[i].name] = newData[i].data.toString();
  }
};

const onSubmit = () => {
  const obj = Object.assign({}, props.data);
  obj.title = title.value;
  if(getChartSeriesData()){
    obj.chart.series = getChartSeriesData();
  }
  console.log(obj)
  emits("change", obj);
};

const getChartSeriesData = () => {
  const categories = props.data.chart.options.xaxis.categories;
  let newArr = [];
  const newDataModel = Object.assign({}, dataModel.value);
  for (let key in newDataModel) {
    let newConstructedArray = newDataModel[key].split(",");
    if (newConstructedArray.length != categories.length) {
      notification({
        msg:
          "Number of series should be equal to X axis labels in" +
          newDataModel[key],
        type: "error",
      });
      return;
    }
    newArr.push({
      name: key,
      data: newDataModel[key].split(",").join(),
    });
  }
  console.log(newArr);
  return newArr;
};

const notification = (notice) => {
  ElMessage({
    message: notice.msg,
    type: notice.type,
  });
};
</script>