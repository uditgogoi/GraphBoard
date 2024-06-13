import { defineStore } from "pinia";
import { ref, computed } from "vue";
// export const useGraphStore = defineStore('graph', () => {
//     const barChart = ref({});
//     const areaChart = ref({});
//     const newDashboardItems=ref([]);
//     const getBarChart = computed(() => barChart);
//     const getAreaChart = computed(() => areaChart);
//     const getDashboardItemList= computed(()=>newDashboardItems )
//     function setBarChart(value) {
//         barChart.value=value;
//     }
//     function setNewDashboardItems(value) {
//         newDashboardItems.value= value;
//         console.log(getDashboardItemList.value)
//     }

//     return { barChart, areaChart, getBarChart, getDashboardItemList,getAreaChart,setBarChart,setNewDashboardItems}
//   })

export const useGraphStore = defineStore("graph", {
  state: () => ({
    barChart: {},
    areaChart: {},
    newDashboardItems: [],
  }),
  getters: {
    getBarChart(state){
        return state.barChart
    },
    getAreaChart(state) {return state.getAreaChart},
    getDashboardItemList(state) {return state.newDashboardItems},
  },
  actions: {
    // since we rely on `this`, we cannot use an arrow function
    setNewDashboardItems(value) {
      this.newDashboardItems = value;
    },
    setBarChart(value) {
      this.barChart = value;
    },
  },
});
