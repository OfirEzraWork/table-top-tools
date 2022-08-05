<template>
  <base-card>
    <header>
      <h2 class="free-text free-text--centered">Purchaseable Scores</h2>
    </header>
    <ul class="min-max-list">
      <li>
        <min-max-scores-price-base-input-wrapper
          type="Min"
          :score="minScorePurchasable"
          :maxScorePossible="maxScorePurchasable"
          :minScorePossible="borderMinScorePurchasable"
        >
        </min-max-scores-price-base-input-wrapper>
      </li>
      <li>
        <min-max-scores-price-base-input-wrapper
          type="Max"
          :score="maxScorePurchasable"
          :maxScorePossible="borderMaxScorePurchasable"
          :minScorePossible="minScorePurchasable"
        >
        </min-max-scores-price-base-input-wrapper>
      </li>
    </ul>
  </base-card>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import MinMaxScoresPriceBaseInputWrapper from "./MinMaxScoresPriceBaseInputWrapper.vue";
export default {
  components: {
    MinMaxScoresPriceBaseInputWrapper,
  },
  setup() {
    const store = useStore();
    const maxScorePurchasable = computed(
      () => store.getters["abilityScores/maxScorePurchasable"]
    );
    const minScorePurchasable = computed(
      () => store.getters["abilityScores/minScorePurchasable"]
    );
    const borderMaxScorePurchasable = computed(
      () => store.getters["abilityScores/borderMaxScorePurchasable"]
    );
    const borderMinScorePurchasable = computed(
      () => store.getters["abilityScores/borderMinScorePurchasable"]
    );

    return {
      maxScorePurchasable,
      minScorePurchasable,
      borderMaxScorePurchasable,
      borderMinScorePurchasable,
    };
  },
};
</script>

<style scoped>
.min-max-list {
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
