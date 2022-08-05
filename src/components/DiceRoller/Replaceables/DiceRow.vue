<template>
  <li class="free-text--medium row dice-row">
    <div class="dice-row-controller">
      <base-button type="icon" @click="changeAmount(-1)">
        <ion-icon
          class="ionicon-tooltip-remove"
          name="caret-down-circle-outline"
        ></ion-icon>
      </base-button>
      <p class="centered-text">{{ props.amount }}</p>
      <base-button type="icon" @click="changeAmount(1)">
        <ion-icon
          class="ionicon-tooltip-remove"
          name="caret-up-circle-outline"
        ></ion-icon>
      </base-button>
    </div>
    <img
      @click="$emit('single-roll', die)"
      class="dice-icon"
      :src="props.path"
    />
  </li>
</template>

<script>
import { ref, watch } from "vue";
export default {
  emits: ["amount-changed", "single-roll"],
  props: {
    die: {
      required: true,
      type: Number,
    },
    path: {
      required: true,
      type: String,
    },
    amount: {
      required: true,
      type: Number,
    },
  },
  setup(props, ctx) {
    function changeAmount(change) {
      if (
        (props.amount <= 0 && change < 0) ||
        (props.amount >= 50 && change > 0)
      )
        return;
      ctx.emit("amount-changed", change, props.die);
    }

    return {
      props,

      changeAmount,
    };
  },
};
</script>

<style scoped>
.dice-row {
  padding: 1.2rem;
  gap: 2.4rem;
  border-radius: var(--border-radius--item);
}

.dice-row-controller {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.2rem;
}

.dice-icon {
  width: 5.2rem;
  cursor: pointer;
}

.centered-text {
  width: 3.2rem;
  text-align: center;
  font-size: 3.2rem;
}
</style>
