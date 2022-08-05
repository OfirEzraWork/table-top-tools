<template>
  <div class="input-container" :class="`input-container-gap--${componentSize}`">
    <input
      class="input"
      :class="`input--${componentSize}`"
      type="number"
      :name="inputName"
      :value="value"
      :min="min"
      :max="max"
      :readonly="isReadOnly"
      @input="$emit('valueInputted', Number($event.target.value))"
    />
    <base-arrows
      @onChangeValue="changeValue"
      arrowsColor="background"
      :size="size"
    ></base-arrows>
  </div>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
export default {
  emits: ["valueChanged", "valueInputted"],
  props: {
    inputName: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    step: {
      type: Number,
      required: false,
    },
    readOnly: {
      type: Boolean,
      required: false,
    },
    size: {
      type: String,
      required: false,
      default: "large",
    },
  },

  setup(props, { emit }) {
    const initialValue = !isNaN(props.value) ? props.value : props.min;
    const computedStep = !isNaN(props.step) ? props.step : 1;

    const isReadOnly = props.readOnly ? props.readOnly : false;

    function changeValue(change) {
      if (
        (props.value <= props.min && change < 0) ||
        (props.value >= props.max && change > 0)
      )
        return;
      emit("valueChanged", change, props.name);
    }

    const componentSize = computed(() => {
      switch (props.size) {
        case "large":
          return "large";
        case "medium":
          return "medium";
        case "small":
          return "small";
        default:
          return "large";
      }
    });

    return {
      props,
      initialValue,
      computedStep,
      isReadOnly,
      componentSize,

      changeValue,
    };
  },
};
</script>

<style scoped>
.input-container {
  /* height: 100%; */
  display: flex;
  align-items: center;
  justify-content: center;
}
.input-container-gap--large {
  gap: 0.6rem;
}
.input-container-gap--medium {
  gap: 0.5rem;
}
.input-container-gap--small {
  gap: 0.4rem;
}
.input {
  border: none;
  border-radius: var(--border-radius--card);
  color: var(--background-color);
  background-color: var(--font-color-one);
  box-shadow: var(--shadow-soft);
  font-family: inherit;

  font-weight: 500;
  text-align: center;
}
.input--large {
  height: 6.4rem;
  width: 6.4rem;
  font-size: 2.4rem;
}
.input--medium {
  height: 5.6rem;
  width: 5.6rem;
  font-size: 2rem;
}
.input--small {
  height: 4.8rem;
  width: 4.8rem;
  font-size: 1.8rem;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  /* margin: 0; */
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
