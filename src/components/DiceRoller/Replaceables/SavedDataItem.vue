<template>
  <li>
    <transition name="item" mode="out-in">
      <button v-if="!isClicked" @click="toggle" class="saved-data-item">
        <p>{{ desc }}</p>
        <p>{{ formula }}</p>
      </button>
      <div v-else class="saved-data-item saved-data-item--options">
        <button>
          <ion-icon
            @click="toggle"
            class="saved-data-icon"
            name="arrow-back-outline"
          ></ion-icon>
        </button>
        <button @click="rollSavedItem">
          <ion-icon
            class="saved-data-icon saved-data-icon--dice"
            name="dice-outline"
          ></ion-icon>
        </button>
        <button>
          <ion-icon
            @click="deleteSavedItem"
            class="saved-data-icon"
            name="trash-outline"
          ></ion-icon>
        </button>
      </div>
    </transition>
  </li>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["roll-saved-item", "delete-saved-item"],
  props: {
    desc: {
      required: true,
      type: String,
    },
    formula: {
      required: true,
      type: String,
    },
    id: {
      required: true,
      type: Number,
    },
  },
  setup(props, ctx) {
    const isClicked = ref(false);

    function toggle() {
      isClicked.value = !isClicked.value;
    }
    function rollSavedItem() {
      ctx.emit("roll-saved-item", props.id);
      toggle();
    }
    function deleteSavedItem() {
      ctx.emit("delete-saved-item", props.id);
    }
    return {
      props,
      isClicked,

      toggle,
      rollSavedItem,
      deleteSavedItem,
    };
  },
};
</script>

<style scoped>
button {
  background: transparent;
  border: none;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}
li {
  width: 100%;
}
.saved-data-item {
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

  cursor: pointer;
}

.saved-data-item--options {
  background-color: #b7b6bf;
  color: var(--background-color);
  flex-direction: row;
  justify-content: space-around;
  font-size: 2.4rem;
  cursor: default;

  /* z-index: 100; */
}
.saved-data-icon {
  cursor: pointer;
}
.saved-data-icon--dice {
  font-size: 4.2rem;
}

.saved-data-item:last-child {
  margin-bottom: 0;
}

.item-enter-active,
.item-leave-active,
.item-move {
  transition: opacity 0.05s;
}
.item-enter-from,
.item-leave-to {
  opacity: 0;
}
</style>
