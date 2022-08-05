<template>
  <base-input-item
    :text="score"
    :inputName="score"
    :max="maxPricePossible"
    :min="minPricePossible"
    :value="price"
    @valueInputted="inputtedPrice"
    @valueChanged="incrementedPrice"
    :readonly="true"
    size="medium"
  ></base-input-item>
</template>

<script>
import { computed } from "vue";

import { useStore } from "vuex";

export default {
  props: {
    score: {
      type: String,
      required: true,
    },
    maxPricePossible: {
      type: Number,
      required: false,
    },
    minPricePossible: {
      type: Number,
      required: false,
    },
  },
  setup(props) {
    const store = useStore();

    const price = computed(() => {
      return store.getters["abilityScores/scorePrice"](props.score);
    });
    const maxPricePossible = computed(() => props.maxPricePossible || 19);
    const minPricePossible = computed(() => props.minPricePossible || -4);

    function inputtedPrice(value) {
      store.dispatch("abilityScores/updatePriceAllocation", {
        score: props.score,
        amount: value,
        set: true,
      });
    }
    function incrementedPrice(value) {
      store.dispatch("abilityScores/updatePriceAllocation", {
        score: props.score,
        amount: value,
      });
    }

    return {
      props,
      price,
      maxPricePossible,
      minPricePossible,

      inputtedPrice,
      incrementedPrice,
    };
  },
};
</script>
