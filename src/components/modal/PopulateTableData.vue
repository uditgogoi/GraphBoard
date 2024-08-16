<template>
  <el-dialog v-model="dialogTableVisible" title="Populate Data" width="1000">
    <el-row class="row">
      <el-col :span="24">
        <el-tabs
          v-model="activeTabName"
          class="demo-tabs"
          @tab-click="handleDataOptionChange"
        >
          <el-tab-pane label="Upload file" name="upload">
            <el-row class="row">
              <el-col :span="8">
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
              </el-col>
            </el-row>
            <el-row class="row">
              <el-col :span="6">
                <FileUpload @upload="onUploadFile" :files="allowedFiles" />
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="Add Api" name="api"></el-tab-pane>
          <el-tab-pane label="Add manually" name="manual"></el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <div class="action">
      <el-button type="primary" @click="onSubmit">Save Data</el-button>
    </div>
  </el-dialog>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import FileUpload from "../../components/FileUpload.vue";
import { useGraphStore } from "../../store";

const dialogTableVisible = ref(true);
const emits = defineEmits(["close"]);
const store = useGraphStore();
const props = defineProps(["id"]);
const activeTabName = ref("upload");
const tableData = ref([]);
const allowedFiles = ref([".xlsx", ".json"]);
const dashboardListData = computed(() => store.getDashboardItemList);
const title = ref("");
const excelFile = ref(null);

onMounted(() => {
  getDefaultOptions();
});

const getDefaultOptions = () => {
  const dashboardList = dashboardListData.value;
  for (let i = 0; i < dashboardList.length; i++) {
    if (dashboardList[i].id === props.id) {
      title.value = dashboardList[i]?.title;
    }
  }
};

const onUploadFile = (data) => {
  // check if the table data is valid
  if (!data || Object.keys(data).length === 0) {
    return;
  }
  // construct the table data

  tableData.value = data
    .map((record) => {
      if (record) {
        let newRecord = {};
        for (let key in record) {
          if (record.hasOwnProperty(key)) {
            newRecord[key.trim().toLowerCase()] = record[key];
          }
        }
        return newRecord;
      }
    })
    .filter((record) => record !== null);
};

const onSubmit = () => {
  const dashboardList = JSON.parse(JSON.stringify(dashboardListData.value));
  for (let i = 0; i < dashboardList.length; i++) {
    if (dashboardList[i].id === props.id) {
      dashboardList[i].title = title.value;
      dashboardList[i].itemData = tableData.value;
    }
  }
  store.setNewDashboardItems(dashboardList);
  emits("submit");
};
</script>