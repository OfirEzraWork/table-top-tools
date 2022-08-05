<template>
  <base-button type="icon" @click="toggleMenu">
    <ion-icon
      class="ionicon-tooltip-remove free-text"
      name="swap-horizontal-outline"
    ></ion-icon>
  </base-button>
  <transition :name="`menu${animationType}`">
    <ul v-if="menuOpen" class="popup free-text free-text--small">
      <li
        v-for="option in menuOptions"
        :key="option"
        @click="emitChoice(option)"
      >
        <base-button type="icon">{{
          option.charAt(0).toUpperCase() + option.slice(1)
        }}</base-button>
      </li>
      <li class="return-icon">
        <base-button type="icon" @click="menuOpen = false">
          <ion-icon
            class="ionicon-tooltip-remove"
            name="return-up-forward-outline"
          ></ion-icon>
        </base-button>
      </li>
    </ul>
  </transition>
</template>

<script>
import { computed, ref } from "vue";
import BaseButton from "../../BaseComponents/BaseButton.vue";
export default {
  components: { BaseButton },
  emits: ["choiceClicked"],
  props: {
    menuOptions: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const menuOpen = ref(false);
    const animationType = ref("");

    function toggleMenu() {
      menuOpen.value = !menuOpen.value;
    }

    function emitChoice(choice) {
      animationType.value = "-no-animation";
      toggleMenu();
      setTimeout(() => {
        animationType.value = "";
        emit("choiceClicked", choice);
      }, 100);
    }

    return {
      props,
      menuOpen,
      animationType,

      toggleMenu,
      emitChoice,
    };
  },
};
</script>

<style scoped>
.popup {
  list-style: none;
  position: absolute;
  width: 100%;

  padding: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.4rem;

  border-radius: var(--border-radius--card);

  color: var(--background-color);
  background-color: var(--font-color-one);
  box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 29px 0px;

  z-index: 1000;
}
.return-icon {
  position: absolute;
  right: 5%;
  display: flex;
  align-items: center;
}

.menu-enter-active,
.menu-leave-active {
  transition: all 0.2s;
}
.menu-enter-from,
.menu-leave-to {
  transform: scale(0);
  opacity: 0;
}
.menu-enter-to,
.menu-leave-from {
  transform: scale(100%);
  opacity: 1;
}
</style>
