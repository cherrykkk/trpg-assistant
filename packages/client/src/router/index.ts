import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/DM",
  },
  {
    path: "/player/:id",
    name: "player",
    component: () => import("@/views/PL/index.vue"),
  },
  {
    path: "/DM",
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
        component: () => import("@/views/DM/SceneControl.vue"),
      },
      {
        path: "combatControl",
        name: "combatControl",
        component: () => import("@/views/DM/CombatControl.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
