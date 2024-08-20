<template>
  <div>
    <el-dialog
      v-model="dialogTableVisible"
      title="Populate Data"
      width="1000"
      @close="onClose"
    >
      <el-row class="row">
        <el-col :span="14">
          <el-tabs
            v-model="activeTabName"
            class="demo-tabs"
            @tab-click="handleDataOptionChange"
          >
            <el-tab-pane label="Add Manually" name="manual">
              <div class="fields">
                <div>
                  <el-text class="mx-1" tag="b">Title</el-text>
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
                  <el-text class="mx-1" tag="b">Description</el-text>
                </div>
                <div>
                  <el-input
                    v-model="description"
                    style="width: 100%"
                    placeholder="Edit Description"
                  />
                </div>
              </div>
              <div class="fields">
                <div>
                  <el-text class="mx-1" tag="b">Suffix Text</el-text>
                </div>
                <div>
                  <el-input
                    v-model="suffix"
                    style="width: 100%"
                    placeholder="Edit Text"
                  />
                </div>
              </div>
              <div class="fields">
                <div>
                  <el-text class="mx-1" tag="b">Info text</el-text>
                </div>
                <div>
                  <el-input
                    v-model="infoText"
                    style="width: 100%"
                    placeholder="Edit Description"
                  />
                </div>
              </div>
              <div class="fields">
                <div>
                  <el-text class="mx-1" tag="b">Value</el-text>
                </div>
                <div>
                  <el-input
                    v-model="statisticValue"
                    style="width: 100%"
                    placeholder="Value"
                  />
                </div>
              </div>
              <el-row class="row">
                <el-col :span="12">
                  <div class="fields">
                    <div>
                      <el-text class="mx-1" tag="b">Trend</el-text>
                    </div>
                    <el-switch
                      v-model="incremented"
                      active-text="Increment"
                      inactive-text="Decrement"
                    />
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="fields">
                    <div>
                      <el-text class="mx-1" tag="b">Trend type</el-text>
                    </div>

                    <el-switch
                      v-model="trendType"
                      active-text="Number"
                      inactive-text="Percentage"
                    />
                  </div>
                </el-col>
              </el-row>

              <div class="fields">
                <div>
                  <el-text class="mx-1" tag="b">Increment value</el-text>
                </div>
                <el-input
                  v-model="trendValue"
                  style="width: 100%"
                  placeholder="Value"
                />
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="Upload file" name="file"></el-tab-pane> -->
            <el-tab-pane label="Add Api" name="api"></el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <div class="action">
        <el-button type="primary" @click="onSubmit">Save Data</el-button>
      </div>
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
const incremented = ref(false);
const trendValue = ref(0);
const description = ref("");
const suffix = ref("");
const trendType= ref('%')
const infoText= ref("");
const onClose = () => {
  emits("close");
};
onMounted(() => {
  populateDefaultData();
});

const populateDefaultData = () => {
  const dashboardList = dashboardListData.value.find(
    (item) => item.id === props.id
  );
  title.value = dashboardList.title || "";
  statisticValue.value = dashboardList.itemData.value || 0;
  incremented.value= dashboardList.itemData.trendIncrement;
  description.value= dashboardList.itemData.description;
  suffix.value=dashboardList.itemData.suffixText;
  trendValue.value=dashboardList.itemData.trendValue;
  incremented.value=dashboardList.itemData.trendIncrement;
  infoText.value=dashboardList.itemData.trendIncrement;
  trendType.value=dashboardList.itemData.trendType;
};

const handleDataOptionChange = (tab) => {
  activeTabName.value = tab.props.name;
};

const onSubmit = () => {
  const dashboardList = dashboardListData.value;
  for (let i = 0; i < dashboardList.length; i++) {
    if (dashboardList[i].id === props.id) {
      dashboardList[i].title = title.value;
      dashboardList[i].itemData.description = description.value;
      dashboardList[i].itemData.value = statisticValue.value;
      dashboardList[i].itemData.suffixText = suffix.value;
      dashboardList[i].itemData.trendValue = trendValue.value;
      dashboardList[i].itemData.trendType = trendType.value?"":"%";
      dashboardList[i].itemData.trendIncrement = incremented.value;
      dashboardList[i].itemData.infoText = infoText.value;
    }
    store.setNewDashboardItems(dashboardList);
    emits("submit");
  }
};
</script>