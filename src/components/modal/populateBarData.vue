<template>
  <el-dialog
    v-model="dialogTableVisible"
    title="Populate Data"
    width="1000"
    @close="onClose"
  >
    <el-row class="row">
      <el-col :span="8" class="left-col">
        <div class="fields">
          <div>
            <el-text class="mx-1">Title</el-text>
          </div>
          <div>
            <el-input
              v-model="title"
              style="width: 240px"
              placeholder="Edit title"
            />
          </div>
        </div>
        <div class="fields">
          <div>
            <el-text class="mx-1">X-Axis Label</el-text>
          </div>
          <div>
            <el-input
              v-model="xAxisLabel"
              style="width: 240px"
              placeholder="Edit X-Aixs"
            />
          </div>
        </div>
        <div class="fields">
          <div>Horizontal Bar</div>
          <el-switch
            v-model="horizontalValue[props.id]"
            @change="onSetHorizontalValue"
          />
        </div>
      </el-col>

      <el-col :span="16" class="right-col">
        <p>
          <el-text class="mx-1" size="large" type="primary"
            >Create series</el-text
          >
        </p>
        <el-tabs
          v-model="activeTabName"
          class="demo-tabs"
          @tab-click="handleDataOptionChange"
        >
          <el-tab-pane label="Add Manually" name="manual">
            <div class="series">
              <el-row>
                <el-col :span="8">
                  <el-text class="mx-1">Series Name</el-text>
                </el-col>
                <el-col :span="16">
                  <el-text class="mx-1">Series Value</el-text>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-input
                    v-model="seriesName"
                    placeholder="Enter Series Name"
                  />
                </el-col>
                <el-col :span="14" :offset="1">
                  <el-input
                    v-model="seriesValue"
                    placeholder="Enter Series Data"
                  />
                </el-col>
                <!-- <el-col :span="2" :offset="1">
                  <el-button type="danger" :icon="Close" circle />
                </el-col> -->
              </el-row>
              <el-row class="add-series-btn">
                <el-col :span="12">
                  <el-button type="primary" plain @click="onAddNewSeries"
                    >Add</el-button
                  >
                </el-col>
              </el-row>
              <div class="series-data" v-if="newSeriesData.length > 0">
                <el-text class="mx-1" type="primary">Series Data</el-text>
                <el-row
                  v-for="series in newSeriesData"
                  :key="series.id"
                  class="series-list"
                >
                  <el-col :span="8">
                    <el-text class="mx-1" type="primary">{{
                      series.name
                    }}</el-text>
                  </el-col>
                  <el-col :span="12">
                    <el-text class="mx-1" type="primary">{{
                      series.data.join()
                    }}</el-text>
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      type="danger"
                      :icon="DeleteFilled"
                      circle
                      text
                      @click="onClickDelete(series.id)"
                    />
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Upload File" name="file">
            <FileUpload @upload="onUploadFile" :files="allowedFiles"/>
          </el-tab-pane>
          <el-tab-pane label="Add Api" name="api">
            <div class="api-input">
              <label>Add Api: </label>
              <el-input
                v-model="input"
                style="width: 80%"
                placeholder="Please input"
              />
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <div class="action">
      <el-button type="primary" @click="onSubmit">Save Data</el-button>
    </div>
  </el-dialog>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { computed, onMounted, ref } from "vue";
import { useGraphStore } from "../../store";
import { Close, EditPen, DeleteFilled } from "@element-plus/icons-vue";
import { uniqueID } from "../../utils/helper";
import FileUpload from "../../components/FileUpload.vue";

const dialogTableVisible = ref(true);
const emits = defineEmits(["close"]);
const onClose = () => {
  emits("close");
};
const props = defineProps(["id"]);
const store = useGraphStore();
const title = ref("");
const seriesName = ref("");
const seriesValue = ref("");
const xAxisLabel = ref(null);
const horizontalValue = ref({});
const activeTabName = ref("manual");
const newSeriesData = ref([]);
const dashboardListData = computed(() => store.getDashboardItemList);
const allowedFiles= ref(['.csv', '.xls', '.xlsx', 'text/csv', 'application/csv'])
const barGraphData = computed(
  () => store.getDashboardItemList.find((item) => item.id === props.id) || {}
);
onMounted(() => {
  getDefaultOptions();
  getDefaultSeriesData();
});

const getDefaultOptions = () => {
  const dashboardList = dashboardListData.value;
  for (let i = 0; i < dashboardList.length; i++) {
    if (dashboardList[i].id === props.id) {
      horizontalValue.value[props.id] =
        dashboardList[i]?.itemData?.options?.plotOptions?.bar?.horizontal ||
        false;
    }
  }
};

const getDefaultSeriesData = () => {
  const dashboardList= dashboardListData.value.filter(item=> item.id=== props.id);
  newSeriesData.value=dashboardList[0].itemData.series;
  title.value = barGraphData.value.title || "";
  xAxisLabel.value =
    barGraphData.value.itemData.options?.xaxis?.categories?.toString() || "";
};

const onSubmit = () => {
  const dashboardList = JSON.parse(JSON.stringify(dashboardListData.value));
  for (let i = 0; i < dashboardList.length; i++) {
    if (dashboardList[i].id === props.id) {
      dashboardList[i].title = title.value;
      const validxAxisLabel = xAxisLabel.value.split(",").filter((ele) => ele);
      dashboardList[i].itemData.options.xaxis.categories = validxAxisLabel;
      dashboardList[i].itemData.options.chart.id= props.id;
      dashboardList[i].itemData.options.chart.type='bar';
      dashboardList[i].itemData.series = JSON.parse(
        JSON.stringify(newSeriesData.value)
      );
    }
  }
  store.setNewDashboardItems(dashboardList);
  newSeriesData.value = {};
  emits("submit");
};

const clearFields = () => {
  seriesName.value = "";
  seriesValue.value = "";
};

const onAddNewSeries = () => {
  if (!seriesName.value || !seriesValue.value) {
    notification({ msg: "Invalid data entered", type: "error" });
    return;
  }

  if (!xAxisLabel.value) {
    notification({ msg: "Invalid X-Axis labels", type: "error" });
    return;
  }
  const validxAxisLabel = xAxisLabel.value.split(",").filter((ele) => ele);
  const validSeriesValue = seriesValue.value.split(",").filter((e) => e);
  if (validSeriesValue.length !== validxAxisLabel.length) {
    notification({
      msg: "Data entered should be equivalent to xAxis values",
      type: "error",
    });
    return;
  }

  newSeriesData.value.push({
    name: seriesName.value,
    data: validSeriesValue,
    id: uniqueID(),
  });
  clearFields();
};

const notification = (notice) => {
  ElMessage({
    message: notice.msg,
    type: notice.type,
  });
};

const onClickEdit = (seriesId) => {
  const dashboardData = JSON.parse(JSON.stringify(dashboardListData.value));
  console.log(dashboardData);
};

const onClickDelete = (seriesId) => {
  newSeriesData.value = newSeriesData.value.filter(
    (data) => data.id != seriesId
  );
};

const onSetHorizontalValue = (e) => {
  const dashboardList = dashboardListData.value;
  for (let i = 0; i < dashboardList.length; i++) {
    if (dashboardList[i].id === props.id) {
      dashboardList[i].itemData.options.plotOptions.bar.horizontal = e;
    }
  }
  store.setNewDashboardItems(dashboardList);
};

const handleDataOptionChange = (tab) => {
  activeTabName.value = tab.props.name;
};

const onUploadFile = (data) => {
  let newSeries = {};
  for (let i = 0; i < data.length; i++) {
    for (let label in data[i]) {
      if (newSeries[label]) {
        newSeries[label].push(data[i][label]);
      } else {
        newSeries[label] = [data[i][label]];
      }
    }
  }
  const xAxis = newSeries["X-Axis"];
  let yAxisValues = [];
  for (let value in newSeries) {
    if (value !== "X-Axis") {
      yAxisValues.push({
        name: value,
        data: newSeries[value],
      });
    }
  }

  if (
    !xAxis ||
    !yAxisValues ||
    xAxis.length === 0 ||
    yAxisValues.length === 0
  ) {
    notification({
      msg: "Data entered are invalid. Please check the data before uploading",
      type: "error",
    });
    return;
  }

  if (isDataSyncWithLabels(xAxis, yAxisValues)) {
    enterDataFromFile(xAxis, yAxisValues);
  } else {
    notification({
      msg: "Data entered are doesn't matched with the X-Axis values",
      type: "error",
    });
    return;
  }
};

const isDataSyncWithLabels = (xAxis, yAxisValues) => {
  const xAxisLength = xAxis.length;
  let dataSync = true;
  for (let i = 0; i < yAxisValues.length; i++) {
    if (yAxisValues[i].data.length !== xAxisLength) {
      dataSync = false;
    }
  }
  return dataSync;
};

const enterDataFromFile = (xAxis, yAxisValues) => {
  newSeriesData.value=[];
  xAxisLabel.value = xAxis.join();
  for (let i = 0; i < yAxisValues.length; i++) {
    newSeriesData.value.push({
      name: yAxisValues[i].name,
      data: yAxisValues[i].data,
      id: uniqueID(),
    });
  }
};
</script>
<style scoped>

</style>