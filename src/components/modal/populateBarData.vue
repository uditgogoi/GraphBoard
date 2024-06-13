<template>
  <el-dialog
    v-model="dialogTableVisible"
    title="Populate Data"
    width="800"
    @close="onClose"
  >
    <div>
      <el-text class="mx-1" type="primary">Title</el-text>
      <el-input v-model="title" style="width: 240px" placeholder="Edit title" />
    </div>
    <div>
      <el-text class="mx-1" type="primary">X-Axis Lables</el-text>
      <el-input
        v-model="xAxisLabel"
        style="width: 240px"
        placeholder="Edit X-Aixs"
      />
    </div>
    <div>
      <el-text class="mx-1" type="primary">Series Data</el-text>
      <div v-for="series in barGraphData.itemData.series" :key="series.name">
        <el-input
          style="width: 240px"
          placeholder="Enter Data"
          v-model="seriesNameModel[series.name]"
          v-if="displayEditSeriesName[series.name]"
        />
        <label v-else>
          {{ series.name }}
          <el-button :icon="Edit" circle @click="onEditSeriesName(series)" />
        </label>
        <el-input
          v-model="dataModel[series.name]"
          style="width: 240px"
          placeholder="Enter Data"
        />
      </div>
      or
      <el-button type="success" plain @click="addNewSeries"
        >Add new Series</el-button
      >
      <div v-if="showNewSeriesAdditionFields">
        <label>Series Name</label>
        <el-input
          v-model="seriesName"
          style="width: 240px"
          placeholder="Enter Series Name"
        />

        <label>Series values</label>
        <el-input
          v-model="seriesValue"
          style="width: 240px"
          placeholder="Enter Series Data"
        />
        <div>
          <el-button type="primary" plain @click="onAddNewSeries"
            >Add new series</el-button
          >
        </div>
      </div>
    </div>
    <div>
      <el-button type="primary" @click="onSubmit">Submit</el-button>
    </div>
  </el-dialog>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { computed, onMounted, ref } from "vue";
const dialogTableVisible = ref(true);
import { useGraphStore } from "../../store";
import { Edit } from "@element-plus/icons-vue";

const emits = defineEmits(["close"]);
const onClose = () => {
  emits("close");
};
const props = defineProps(["id"]);
const store = useGraphStore();
const dataModel = ref({});
const title = ref("");
const seriesName = ref("");
const seriesValue = ref("");
const xAxisLabel = ref(null);
const displayEditSeriesName = ref({});
const seriesNameModel = ref({});
const showNewSeriesAdditionFields = ref(false);
const dashboardListData = computed(() => store.getDashboardItemList);
const barGraphData = computed(() =>
  store.getDashboardItemList.find((item) => item.id === props.id)
);

onMounted(() => {
  getDefaultSeriesData();
  getInputDataModel();
});

const getDefaultSeriesData = () => {
  title.value = barGraphData.value.title;
  xAxisLabel.value =
    barGraphData.value.itemData.options.xaxis.categories.toString();
};

const getInputDataModel = () => {
  const objectMode = Object.assign([], barGraphData.value.itemData.series);
  for (let i = 0; i < objectMode.length; i++) {
    dataModel.value[objectMode[i].name] = objectMode[i].data.toString();
  }
};

const onSubmit = () => {
  const dataModelObj = JSON.parse(JSON.stringify(dataModel.value));
  const dashboardList = dashboardListData.value;
  for (let i = 0; i < dashboardList.length; i++) {
    if (dashboardList[i].id === props.id) {
      dashboardList[i].title = title.value;
      for (let key in dataModelObj) {
        const validModel = dataModelObj[key].split(",").filter((ele) => ele);
        const validxAxisLabel = xAxisLabel.value
          .split(",")
          .filter((ele) => ele);
        if (validModel.length !== validxAxisLabel.length) {
          notification({
            msg: `Number of series values in ${key} should be : ${validxAxisLabel.length}`,
            type: "error",
          });
          return;
        }
        dashboardList[i].itemData.options.xaxis.categories = validxAxisLabel;
        dashboardList[i].itemData.series = dashboardList[i].itemData.series
          .map((item) => {
            if (item.name === key) {
              item.data = dataModelObj[key].split(",");
              return item;
            }
            return item;
          })
          .filter((item) => item);
      }
    }
  }
  store.setNewDashboardItems(dashboardList);
  emits("close");
};

const addNewSeries = () => {
  showNewSeriesAdditionFields.value = !showNewSeriesAdditionFields.value;
  if (!showNewSeriesAdditionFields.value) {
    seriesName.value = "";
    seriesValue.value = "";
  }
};

const onAddNewSeries = () => {
  const dashboardList = dashboardListData.value;
  if (!seriesName.value || !seriesValue.value) {
    notification({ msg: "Invalid data entered", type: "error" });
    return;
  }

  // const existingData = dashboardList.find(
  //   (item) => item.id === props.id
  // ).itemData;
  const validxAxisLabel = xAxisLabel.value.split(",").filter((ele) => ele);
  const validSeriesValue = seriesValue.value.split(",").filter((e) => e);
  if (validSeriesValue.length !== validxAxisLabel.length) {
    notification({
      msg: "Data entered should be equivalent to xAxis values",
      type: "error",
    });
    return;
  }

  for (let i = 0; i < dashboardList.length; i++) {
    if (dashboardList[i].id === props.id) {
      dashboardList[i].itemData.series.push({
        name: seriesName,
        data: validSeriesValue,
      });
    }
  }
  getInputDataModel();
  store.setNewDashboardItems(dashboardList);
  addNewSeries();
};

const onEditSeriesName = (series) => {
  const dashboardList = dashboardListData.value;
  displayEditSeriesName.value[series.name] = true;
  seriesNameModel.value[series.name] = series.name;
};

const notification = (notice) => {
  ElMessage({
    message: notice.msg,
    type: notice.type,
  });
};
</script>