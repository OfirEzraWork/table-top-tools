import { createRouter, createWebHistory } from "vue-router";

import AbilityScoreCalculator from "./pages/AbilityScoreCalculator.vue";
import DiceRollerBoard from "./pages/DiceRollerBoard.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/dice" },
    { path: "/dice", component: DiceRollerBoard },
    { path: "/ability-score-calculator", component: AbilityScoreCalculator },
    { path: "/:notFound(.*)", redirect: "/dice" },
  ],
  linkActiveClass: "nav-item--chosen",
});

export default router;
