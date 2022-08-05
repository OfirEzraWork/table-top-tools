<template>
  <div class="input-button-container">
    <base-button class="input-button" type="icon" @click="onChangeValue(1)">
      <ion-icon
        :class="`arrow-color--${computedColor} arrow-size--${componentSize}`"
        class="ionicon-tooltip-remove"
        name="caret-up-circle-outline"
      ></ion-icon>
    </base-button>
    <base-button class="input-button" type="icon" @click="onChangeValue(-1)">
      <ion-icon
        :class="`arrow-color--${computedColor} arrow-size--${componentSize}`"
        class="ionicon-tooltip-remove"
        name="caret-down-circle-outline"
      ></ion-icon>
    </base-button>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  emits: ["onChangeValue"],
  props: {
    arrowsColor: {
      type: String,
      required: false,
      default: "font",
    },
    size: {
      type: String,
      required: false,
      default: "large",
    },
  },
  setup(props, { emit }) {
    const computedColor = computed(() => {
      if (props.arrowsColor === "background") {
        return "background";
      } else {
        return "font";
      }
    });

    function onChangeValue(amount) {
      emit("onChangeValue", amount);
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
      computedColor,
      onChangeValue,
      componentSize,
    };
  },
};
</script>

<style scoped>
.arrow-color--background {
  color: var(--background-color);
}
.arrow-color--font {
  color: var(--font-color-one);
}
.input-button-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.arrow-size--large {
  font-size: 3.2rem;
}
.arrow-size--medium {
  font-size: 2.8rem;
}
.arrow-size--small {
  font-size: 2.4rem;
}
</style>
