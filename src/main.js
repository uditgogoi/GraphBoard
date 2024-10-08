import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/dist/index.css";
import "./styles/main.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import VueApexCharts from "vue3-apexcharts";
import ApexCharts from "apexcharts";
import Vue3DraggableResizable from "vue3-draggable-resizable";
import { createPinia } from "pinia";
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";
import "./style/index.css";
// import firebase from "firebase";
import { firebaseApp } from "./auth/firebase";
import { VueFire, VueFireAuth } from "vuefire";

const pinia = createPinia();
// firebaseApp();
// console.log(firebaseApp)
const app = createApp(App);
app.config.globalProperties.$apexcharts = ApexCharts;

app
  .use(VueFire, {
    firebaseApp,
    modules: [
      VueFireAuth(),
    ],
  })
  .use(ElementPlus)
  .use(pinia)
  .use(router)
  .use(VueApexCharts)
  .use(Vue3DraggableResizable);

// firebase.initializeApp(app);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
