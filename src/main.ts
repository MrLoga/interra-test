import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

// Модули для инициализации
import i18n from "./boot/i18n";
import { dateFormat } from "./boot/moment";

// Фильтры
Vue.filter("dateFormat", dateFormat);

export const app = new Vue({
  router,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
