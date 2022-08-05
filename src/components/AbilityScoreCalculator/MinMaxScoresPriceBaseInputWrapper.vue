<template>
  <base-input-item
    :text="type"
    :inputName="type"
    :max="maxScorePossible"
    :min="minScorePossible"
    :value="score"
    @valueInputted="inputtedScore"
    @valueChanged="incrementedScore"
    :readonly="false"
    size="medium"
  ></base-input-item>
</template>

<script>
import { useStore } from "vuex";
export default {
  emits: ["valueChanged", "valueInputted"],
  props: {
    type: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    maxScorePossible: {
      type: Number,
      required: true,
    },
    minScorePossible: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    function inputtedScore(value) {
      store.dispatch(`abilityScores/update${props.type}ScorePurchasable`, {
        score: props.score,
        amount: value,
        set: true,
      });
    }
    function incrementedScore(value) {
      store.dispatch(`abilityScores/update${props.type}ScorePurchasable`, {
        score: props.score,
        amount: value,
      });
    }

    return {
      props,

      inputtedScore,
      incrementedScore,
    };
  },
};
</script>
