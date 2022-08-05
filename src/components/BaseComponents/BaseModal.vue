<template>
  <teleport to="#app">
    <transition name="background">
      <div
        v-if="modalOpen"
        class="modal-background"
        @click="$emit('close')"
      ></div>
    </transition>
    <transition name="modal">
      <dialog v-if="modalOpen" class="modal-dialog" open>
        <header v-if="hasHeaderSlot()">
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section class="modal-section">
          <slot></slot>
        </section>
        <menu class="modal-buttons">
          <slot name="actions">
            <base-button @click="$emit('close')">Close</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
import BaseCard from "./BaseCard.vue";
export default {
  components: { BaseCard },
  emits: ["close"],
  props: {
    title: {
      required: false,
      type: String,
    },
    modalOpen: {
      required: true,
      type: Boolean,
    },
  },
  setup(slots) {
    function hasHeaderSlot() {
      return !!slots.header;
    }

    return {
      hasHeaderSlot,
    };
  },
};
</script>

<style>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
}
.modal-dialog {
  position: fixed;
  width: 40%;
  height: 40%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  border: none;
  border-radius: var(--border-radius--card);

  color: var(--background-color);
  background-color: var(--font-color-one);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 29px 0px;
}
.modal-section {
  margin-top: 2.4rem;
}
.modal-section p {
  margin-bottom: 2.4rem;
}
.modal-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
}

.modal-enter-active {
  animation: modal 0.3s ease-out;
}
.modal-leave-active {
  animation: modal 0.3s ease-out reverse;
}

.background-enter-active {
  animation: background 0.3s ease-out;
}
.background-leave-active {
  animation: background 0.3s ease-out reverse;
}

@keyframes background {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes modal {
  from {
    transform: translate(-75%, -50%);
    opacity: 0;
  }

  to {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
}
</style>
