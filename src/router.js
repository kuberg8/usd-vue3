import { createWebHistory, createRouter } from "vue-router";
import Catalog from "@/views/Catalog.vue";
import Converter from "@/views/Converter.vue";

const routes = [
  {
    path: "/",
    name: "Catalog",
    component: Catalog,
  },
  {
    path: "/converter",
    name: "Converter",
    component: Converter,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
