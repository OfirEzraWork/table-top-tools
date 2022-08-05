<template>
  <the-navigation
    @toLeft="setAnimationDirection('left')"
    @toRight="setAnimationDirection('right')"
  ></the-navigation>
  <main>
    <router-view v-slot="slotProps">
      <transition :name="`route-${direction}`" mode="out-in">
        <component :is="slotProps.Component"></component>
      </transition>
    </router-view>
  </main>
</template>

<script>
import { ref } from "vue";
import TheNavigation from "./components/Nav/TheNavigation.vue";

import "./css/app.css";
import "./css/route-animations.css";
export default {
  components: { TheNavigation },
  setup() {
    const direction = ref("right");
    function setAnimationDirection(dir) {
      direction.value = dir;
    }

    return {
      direction,
      setAnimationDirection,
    };
  },
};
</script>

<style></style>
