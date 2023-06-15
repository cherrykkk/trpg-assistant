import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import router from "./router";
import { createPinia } from "pinia";
import "rich-text-component/dist/style.css";

const app = createApp(App);

app.use(router).use(ElementPlus).use(createPinia()).mount("#app");
