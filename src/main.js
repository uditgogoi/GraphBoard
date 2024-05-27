import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import ElementPlus from 'element-plus';
import "element-plus/theme-chalk/dark/css-vars.css";
import "element-plus/dist/index.css";
import './styles/main.css';
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
app
  .use(ElementPlus)
  .use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount("#app");
