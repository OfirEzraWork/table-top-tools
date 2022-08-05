<template>
  <base-card>
    <p
      class="free-text free-text--centered"
      :class="{ 'free-text--error': !isPriceLegal }"
    >
      Points: {{ totalPrice }}/{{ maxPoints }}
    </p>
    <p class="free-text--error free-text--float" v-if="!isPriceLegal">
      Over max points!
    </p>
    <base-button @click="resetPointsAllocation">Reset Points</base-button>
  </base-card>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    maxPoints: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },

  setup(props) {
    const store = useStore();
    const isPriceLegal = computed(() => {
      return props.maxPoints >= props.totalPrice;
    });

    function resetPointsAllocation() {
      store.dispatch("abilityScores/resetPointsAllocation");
    }

    return {
      props,
      isPriceLegal,
      resetPointsAllocation,
    };
  },
};
</script>

<style scoped>
.free-text--float {
  position: absolute;
  transform: translateY(-50%);
}
</style>
