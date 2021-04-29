import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../pages/Home.vue";
import Operations from "../pages/Operations.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/operations/:id/:type?",
    name: "Operations",
    component: Operations,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
