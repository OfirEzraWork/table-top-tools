<template>
  <li class="row ability-row">
    <p class="ability-name">{{ rowLabel }}</p>
    <div class="input-container">
      <base-number-container
        desc="Buy"
        :number="row.score"
        :error="scoreOutOfBoundsError"
      ></base-number-container>
      <base-arrows @onChangeValue="onScoreChange"></base-arrows>
    </div>
    <div class="input-container">
      <base-number-container
        desc="Bonus"
        :number="bonus"
      ></base-number-container>
      <base-arrows @onChangeValue="onBonusChange"></base-arrows>
    </div>
    <base-number-container
      desc="Total"
      :number="rowScore"
    ></base-number-container>
  </li>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import BaseNumberContainer from "../BaseComponents/BaseNumberContainer.vue";
export default {
  components: {
    BaseNumberContainer,
  },
  props: {
    row: {
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const MAX_BONUS = 10;
    const MIN_BONUS = -10;

    const bonus = ref(0);

    const rowName = computed(() => props.row.name);
    const rowLabel = computed(() => props.row.label);
    const rowScore = computed(() => props.row.score + bonus.value);

    const maxScorePurchasable = computed(
      () => store.getters["abilityScores/maxScorePurchasable"]
    );
    const minScorePurchasable = computed(
      () => store.getters["abilityScores/minScorePurchasable"]
    );

    function onScoreChange(value) {
      store.dispatch("abilityScores/updatePointsAllocation", {
        name: rowName.value,
        amount: value,
      });
    }
    function onBonusChange(value) {
      if (bonus.value + value > MAX_BONUS || bonus.value + value < MIN_BONUS)
        return;
      bonus.value += value;
    }

    const scoreOutOfBoundsError = computed(() => {
      if (
        props.row.score > maxScorePurchasable.value ||
        props.row.score < minScorePurchasable.value
      ) {
        return true;
      }
      return false;
    });

    return {
      bonus,
      rowName,
      rowLabel,
      rowScore,

      onScoreChange,
      onBonusChange,

      scoreOutOfBoundsError,
    };
  },
};
</script>

<style scoped>
.ability-row {
  height: 100%;
  padding: 1.2rem 3.2rem;
  justify-content: space-between;
  gap: 2.4rem;
  border-radius: var(--border-radius--item);
}
.ability-name {
  width: 14rem;
  font-size: 2.4rem;
  letter-spacing: 0.75px;
}
.input-container {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
}
</style>
