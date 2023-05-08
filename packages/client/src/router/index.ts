import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/notFound",
  },
  {
    path: "/player/:id",
    name: "player",
    component: () => import("@/views/PL/index.vue"),
  },
  {
    path: "/DM/:id",
    name: "DM",
    component: () => import("@/views/DM/index.vue"),
    children: [
      {
        path: "characterControl",
        name: "characterControl",
        component: () => import("@/views/DM/CharacterControl.vue"),
      },
      {
        path: "sceneControl",
        name: "sceneControl",
        component: () => import("@/views/DM/scene-controller/SceneControl.vue"),
      },
    ],
  },
  {
    path: "/notFound",
    name: "notFound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
