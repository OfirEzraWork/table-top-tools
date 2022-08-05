<template>
  <base-card>
    <div class="max-points-row">
      <p class="free-text free-text--centered free-text--medium">Max points:</p>
      <base-input
        inputName="maxPoints"
        :score="maxPoints"
        :max="54"
        :min="0"
        :value="maxPoints"
        @valueInputted="inputtedMaxPoints"
        @valueChanged="updateMaxPoints"
        size="medium"
      ></base-input>
    </div>
    <base-button @click="resetMaxPoints">Reset Max Points</base-button>
  </base-card>
</template>

<script>
import { useStore } from "vuex";
export default {
  props: {
    maxPoints: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    function inputtedMaxPoints(amount) {
      store.dispatch("abilityScores/updateMaxPoints", {
        amount: amount,
        set: true,
      });
    }
    function updateMaxPoints(amount) {
      store.dispatch("abilityScores/updateMaxPoints", {
        amount: amount,
      });
    }
    function resetMaxPoints() {
      store.dispatch("abilityScores/resetMaxPoints");
    }

    return {
      props,

      inputtedMaxPoints,
      updateMaxPoints,
      resetMaxPoints,
    };
  },
};
</script>

<style scoped>
.max-points-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.6rem;
}
</style>
