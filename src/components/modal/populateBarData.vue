<template>
  <el-dialog
    v-model="dialogTableVisible"
    title="Populate Data"
    width="1000"
    @close="onClose"
  >
    <!-- <div>
      <el-text class="mx-1" type="primary">Title</el-text>
      <el-input v-model="title" style="width: 240px" placeholder="Edit title" />
    </div>
    <div>
      <el-text class="mx-1" type="primary">X-Axis Label</el-text>
      <el-input
        v-model="xAxisLabel"
        style="width: 240px"
        placeholder="Edit X-Aixs"
      />
    </div>
    <div>
      <el-text class="mx-1" type="primary">Series Data</el-text>
      <div v-for="series in barGraphData.itemData.series" :key="series.name">
        <label>
          {{ series.name }}
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
    </div> -->
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
            v-if="activeTabName==='manual'"
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
              <el-input v-model="seriesName" placeholder="Enter Series Name" />
            </el-col>
            <el-col :span="14" :offset="1">
              <el-input v-model="seriesValue" placeholder="Enter Series Data" />
            </el-col>
            <el-col :span="2" :offset="1">
              <el-button type="danger" :icon="Close" circle />
            </el-col>
          </el-row>
          <el-row class="add-series-btn">
            <el-col :span="12">
              <el-button type="primary" @click="onAddNewSeries"
                >Save series</el-button
              >
            </el-col>
          </el-row>
          <div
            class="series-data"
            v-if="barGraphData.itemData.series.length > 0"
          >
            <el-text class="mx-1" type="primary">Series Data</el-text>
            <el-row
              v-for="series in barGraphData.itemData.series"
              :key="series.id"
              class="series-list"
            >
              <el-col :span="8">
                <!-- <el-input
                  v-model="seriesModel[series.name]"
                  style="width: 240px"
                  placeholder="Series name"
                /> -->
                <el-text class="mx-1" type="primary">{{ series.name }}</el-text>
              </el-col>
              <el-col :span="12">
                <el-text class="mx-1" type="primary">{{
                  series.data.join()
                }}</el-text>
                <!-- <el-input
                  v-model="dataModel[series.name]"
                  style="width: 240px"
                  placeholder="Enter Data"
                /> -->
              </el-col>
              <el-col :span="4">
                <!-- <el-button type="info" :icon="EditPen" circle  text @click="onClickEdit(series.id)"/> -->
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
          <el-tab-pane label="Add File" name="file">
            <FileUpload/>
          </el-tab-pane>
          <el-tab-pane label="Add Api" name="api">
            <div class="api-input">
              <label>Add Api: </label>
              <el-input v-model="input" style="width: 80%" placeholder="Please input" />
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
const dialogTableVisible = ref(true);
import { useGraphStore } from "../../store";
import { Close, EditPen, DeleteFilled } from "@element-plus/icons-vue";
import { uniqueID } from "../../utils/helper";
import FileUpload from "../../components/FileUpload.vue";
const emits = defineEmits(["close"]);
const onClose = () => {
  emits("close");
};
const props = defineProps(["id"]);
const store = useGraphStore();
const dataModel = ref({});
const seriesModel = ref({});
const title = ref("");
const seriesName = ref("");
const seriesValue = ref("");
const xAxisLabel = ref(null);
const horizontalValue = ref({});
const activeTabName= ref('manual')
const showNewSeriesAdditionFields = ref(false);
const dashboardListData = computed(() => store.getDashboardItemList);
const barGraphData = computed(
  () => store.getDashboardItemList.find((item) => item.id === props.id) || {}
);
onMounted(() => {
  getDefaultOptions();
  getDefaultSeriesData();
  getInputDataModel();
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
  title.value = barGraphData.value.title || "";
  xAxisLabel.value =
    barGraphData.value.itemData.options?.xaxis?.categories?.toString() || "";
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
      const validxAxisLabel = xAxisLabel.value.split(",").filter((ele) => ele);
      dashboardList[i].itemData.options.xaxis.categories = validxAxisLabel;

      for (let key in dataModelObj) {
        const validModel = dataModelObj[key].split(",").filter((ele) => ele);
        if (validModel.length !== validxAxisLabel.length) {
          notification({
            msg: `Number of series values in ${key} should be : ${validxAxisLabel.length}`,
            type: "error",
          });
          return;
        }
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
  emits("submit");
};

const clearFields = () => {
  seriesName.value = "";
  seriesValue.value = "";
};

const onAddNewSeries = () => {
  const dashboardList = dashboardListData.value;
  if (!seriesName.value || !seriesValue.value) {
    notification({ msg: "Invalid data entered", type: "error" });
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
  for (let i = 0; i < dashboardList.length; i++) {
    if (dashboardList[i].id === props.id) {
      dashboardList[i].itemData.options.xaxis.categories = validxAxisLabel;
      dashboardList[i].itemData?.series.push({
        name: seriesName.value,
        data: validSeriesValue,
        id: uniqueID(),
      });
    }
  }
  getInputDataModel();
  store.setNewDashboardItems(dashboardList);
  // addNewSeries();
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
  const dashboardList = dashboardListData.value;
  for (let i = 0; i < dashboardList.length; i++) {
    if (dashboardList[i].id === props.id) {
      dashboardList[i].itemData.series = dashboardList[
        i
      ].itemData.series.filter((item) => item.id !== seriesId);
    }
  }
  store.setNewDashboardItems(dashboardList);
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

const handleDataOptionChange=(tab)=> {
  activeTabName.value= tab.props.name
}
</script>
<style scoped>
.left-col {
  border-right: 1px solid rgba(208, 208, 208, 0.7);
}
.right-col {
  padding: 0 1rem;
}
.row {
  padding: 0.5rem;
}
.fields {
  margin-top: 0.8rem;
}
.action {
  margin-top: 1rem;
}
.text-center {
  text-align: center;
}
.add-series-btn {
  margin-top: 1rem;
}
.series-data {
  margin-top: 1rem;
}
.series-list {
  padding: 0.2rem 2rem;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
}
.series-list:nth-child(even) {
  background: #e3e3e2;
}
.api-input {
  margin-top: 1rem;
}
</style>