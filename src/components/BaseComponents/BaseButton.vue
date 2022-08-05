<template>
  <button class="button" :class="buttonStyleType">
    <slot>Click</slot>
  </button>
</template>

<script>
import { computed } from "@vue/runtime-core";
export default {
  props: {
    type: {
      type: String,
      required: false,
    },
  },
  setup(props, { emit }) {
    const buttonStyleType = computed(() => {
      if (props.type) {
        if (props.type === "full") {
          return "button--full";
        } else if (props.type == "icon") {
          return "button--icon";
        }
      } else {
        return "button--full";
      }
    });

    return {
      buttonStyleType,

      emit,
    };
  },
};
</script>

<style>
.button {
  font: inherit;
  cursor: pointer;
}
.button--full {
  font-size: 2.4rem;
  padding: 1.2rem 2.4rem;
  color: var(--font-color-one);
  background-color: var(--background-color);
  border: 2px solid var(--background-color);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 29px 0px;
  border-radius: 50px;
  transition: all 0.3s;
}
.button--full:hover {
  border: 2px solid var(--font-color-one);
}
.button--icon {
  background: transparent;
  border: none;
  color: inherit;
  display: flex;
  align-items: center;
  /* changed the justify-content from center to right for the add dice replaceable
  if it causes any issue add a new prop to handle justifying */
  justify-content: right;
  transition: all 0.15s;
}
.button--icon:hover {
  transform: scale(115%);
}
</style>
