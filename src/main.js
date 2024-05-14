import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "@/store";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import './assets/tailwind.css'
import "vue3-openlayers/styles.css";

import OpenLayersMap from "vue3-openlayers";
import {

    Map,
    Layers,
    Sources,
} from "vue3-openlayers";
const app = createApp(App);
app.use(store)
app.use(router)
app.use(Antd)
app.use(Map);
app.use(OpenLayersMap /*, options */);
app.mount('#app')
