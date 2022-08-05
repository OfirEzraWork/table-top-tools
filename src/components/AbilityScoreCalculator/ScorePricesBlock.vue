<template>
  <base-card class="cost-block">
    <header>
      <h2 class="free-text free-text--centered">Scores Price</h2>
    </header>
    <ul class="cost-list">
      <cost-base-input-wrapper
        v-for="scorePriceRecord in priceAllocationTable"
        :score="scorePriceRecord[0]"
        :key="scorePriceRecord[0]"
      ></cost-base-input-wrapper>
    </ul>
    <base-button @click="resetPriceAllocation">Reset Prices</base-button>
  </base-card>
</template>

<script>
import { useStore } from "vuex";
import CostBaseInputWrapper from "./CostBaseInputWrapper.vue";

export default {
  components: {
    CostBaseInputWrapper,
  },
  props: {
    priceAllocationTable: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    function resetPriceAllocation() {
      store.dispatch("abilityScores/resetPriceAllocation");
    }
    return {
      props,

      resetPriceAllocation,
    };
  },
};
</script>

<style>
.cost-block {
  grid-row: span 3;
  gap: 2.4rem;
}
.cost-list {
  list-style: none;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  justify-items: center;
  column-gap: 1.2rem;
  row-gap: 2.4rem;
}
</style>
