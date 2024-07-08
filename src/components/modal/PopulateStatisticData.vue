<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      title="Populate Data"
      width="1000"
      @close="onClose"
    >
      <el-row class="row">
        <el-col :span="12">
          <el-tabs
            v-model="activeTabName"
            class="demo-tabs"
            @tab-click="handleDataOptionChange"
          >
            <el-tab-pane label="Add Manually" name="manual">
              <div class="fields">
                <div>
                  <el-text class="mx-1">Title</el-text>
                </div>
                <div>
                  <el-input
                    v-model="title"
                    style="width: 100%"
                    placeholder="Edit title"
                  />
                </div>
              </div>
              <div class="fields">
                <div>
                  <el-text class="mx-1">Value</el-text>
                </div>
                <div>
                  <el-input
                    v-model="statisticValue"
                    style="width: 100%"
                    placeholder="Value"
                  />
                </div>
              </div>
              <div class="fields">
                <div>Increment</div>
                <el-switch
                  v-model="incremented"
                  @change="onSetTrend"
                />
              </div>
            </el-tab-pane>
            <el-tab-pane label="Upload file" name="file"></el-tab-pane>
            <el-tab-pane label="Add Api" name="api"></el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { useGraphStore } from "../../store";

const store = useGraphStore();
const title = ref("");
const dialogTableVisible = ref(true);
const props = defineProps(["id"]);
const emits = defineEmits(["close"]);
const dashboardListData = computed(() => store.getDashboardItemList);
const activeTabName = ref("manual");
const statisticValue = ref("");
const incremented= ref(false);

const onClose = () => {
  emits("close");
};
onMounted(() => {
  populateDefaultData();
});

const populateDefaultData = () => {
  const dashboardList = dashboardListData.value.filter(
    (item) => item.id === props.id
  );
  console.log(dashboardList);
  title.value = dashboardList[0].title || "";
  statisticValue.value = dashboardList[0].value || 0;
};

const handleDataOptionChange = (tab) => {
  activeTabName.value = tab.props.name;
};
</script>