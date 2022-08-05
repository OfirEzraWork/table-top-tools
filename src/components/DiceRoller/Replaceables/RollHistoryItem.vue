<template>
  <li>
    <transition name="item" mode="out-in">
      <div class="roll-history-item">
        <p>{{ formula }}</p>
        <p>= {{ total }}</p>
      </div>
    </transition>
  </li>
</template>

<script>
export default {
  props: {
    total: {
      required: true,
      type: Number,
    },
    formula: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style scoped>
/* button {
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
} */
li {
  width: 100%;
}
.roll-history-item {
  width: 100%;
  height: 9rem;
  padding: 1.6rem;
  border-radius: var(--border-radius--item);
  background-color: var(--background-color);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  font-size: 1.6rem;
  line-height: 1.25;
  text-align: center;
}

.saved-data-item:last-child {
  margin-bottom: 0;
}

.item-enter-active,
.item-leave-active,
.item-move {
  position: relative;
  transition: opacity 0.05s;
}
.item-enter-from,
.item-leave-to {
  opacity: 0;
}
</style>
