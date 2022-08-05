<template>
  <base-board class="ability-score-calculator">
    <abilities-block
      :pointsAllocationTable="pointsAllocationTable"
    ></abilities-block>
    <min-max-scores-block> </min-max-scores-block>
    <score-prices-block
      :priceAllocationTable="priceAllocationTable"
    ></score-prices-block>
    <max-points-block :maxPoints="maxPoints"></max-points-block>
    <cost-block :maxPoints="maxPoints" :totalPrice="totalPrice"></cost-block>
  </base-board>
</template>

<script>
import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import AbilitiesBlock from "../components/AbilityScoreCalculator/AbilitiesBlock.vue";
import MinMaxScoresBlock from "../components/AbilityScoreCalculator/MinMaxScoresBlock.vue";
import ScorePricesBlock from "../components/AbilityScoreCalculator/ScorePricesBlock.vue";
import MaxPointsBlock from "../components/AbilityScoreCalculator/MaxPointsBlock.vue";
import CostBlock from "../components/AbilityScoreCalculator/CostBlock.vue";
export default {
  components: {
    AbilitiesBlock,
    MinMaxScoresBlock,
    ScorePricesBlock,
    MaxPointsBlock,
    CostBlock,
  },
  setup() {
    const store = useStore();

    const maxPoints = computed(() => store.getters["abilityScores/maxPoints"]);

    const pointsAllocationTable = computed(
      () => store.getters["abilityScores/scores"]
    );
    const priceAllocationTable = computed(() => {
      return store.getters["abilityScores/prices"];
    });

    const totalPrice = computed(
      () => store.getters["abilityScores/totalPrice"]
    );

    return {
      pointsAllocationTable,
      priceAllocationTable,
      maxPoints,
      totalPrice,
    };
  },
};
</script>

<style scoped>
.ability-score-calculator {
  padding: 2.4rem 0;
  margin: 0 auto;
  width: 90%;

  display: grid;
  grid-template-columns: 7fr 3fr 3fr;
  grid-template-rows: repeat(3, 1fr);
  gap: 2.4rem;
}
</style>
