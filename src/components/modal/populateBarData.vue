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

        <div>
          <el-text class="mx-1" type="primary">Series Data</el-text>
          <div
            v-for="series in barGraphData.itemData.series"
            :key="series.name"
          >
            <label>
              {{ series.name }}
            </label>
            <el-input
              v-model="dataModel[series.name]"
              style="width: 240px"
              placeholder="Enter Data"
            />
          </div>
        </div>

        <div class="fields">
          Horizontal bar
          <el-switch v-model="value" />
        </div>
      </el-col>

      <el-col :span="16" class="right-col">
        <p>
          <el-text class="mx-1" size="large" type="primary"
            >Create series</el-text
          >
        </p>
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
              <el-button type="primary" @click="onSubmit"
                >Save series</el-button
              >
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <div class="action">
      <el-button type="primary" @click="onSubmit">Submit</el-button>
    </div>
  </el-dialog>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { computed, onMounted, ref } from "vue";
const dialogTableVisible = ref(true);
import { useGraphStore } from "../../store";
import { Close } from "@element-plus/icons-vue";
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
const showNewSeriesAdditionFields = ref(false);
const dashboardListData = computed(() => store.getDashboardItemList);
const barGraphData = computed(
  () => store.getDashboardItemList.find((item) => item.id === props.id) || {}
);

onMounted(() => {
  getDefaultSeriesData();
  getInputDataModel();
});

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
  console.log(dashboardList);
  store.setNewDashboardItems(dashboardList);
  emits("close");
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
  console.log(dashboardList);
  for (let i = 0; i < dashboardList.length; i++) {
    if (dashboardList[i].id === props.id) {
      dashboardList[i].itemData.options.xaxis.categories = validxAxisLabel;
      dashboardList[i].itemData?.series.push({
        name: seriesName.value,
        data: validSeriesValue,
      });
    }
  }
  getInputDataModel();
  store.setNewDashboardItems(dashboardList);
  addNewSeries();
  clearFields();
};

const notification = (notice) => {
  ElMessage({
    message: notice.msg,
    type: notice.type,
  });
};
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
</style>