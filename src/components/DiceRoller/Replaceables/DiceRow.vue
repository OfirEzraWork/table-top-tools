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
    <img @click="$emit('single-roll', die)" class="dice-icon" :src="imgPath" />
  </li>
</template>

<script>
import { computed } from "vue";
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
    const imgPath = computed(() => {
      switch (props.die) {
        case 4:
          return new URL("../../../assets/dice-images/d4.svg", import.meta.url);
        case 6:
          return new URL("../../../assets/dice-images/d6.svg", import.meta.url);
        case 8:
          return new URL("../../../assets/dice-images/d8.svg", import.meta.url);
        case 10:
          return new URL(
            "../../../assets/dice-images/d10.svg",
            import.meta.url
          );
        case 12:
          return new URL(
            "../../../assets/dice-images/d12.svg",
            import.meta.url
          );
        case 20:
          return new URL(
            "../../../assets/dice-images/d20.svg",
            import.meta.url
          );
      }
    });
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
      imgPath,

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
