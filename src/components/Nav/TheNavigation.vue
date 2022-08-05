<template>
  <nav class="row nav">
    <ul class="nav-list">
      <li
        class="nav-item"
        active-link="nav-item--chosen"
        @click="changePageTo(0)"
      >
        <router-link to="/dice">Dice Roller</router-link>
      </li>
      <li
        class="nav-item"
        active-link="nav-item--chosen"
        @click="changePageTo(1)"
      >
        <router-link to="/ability-score-calculator"
          >Ability Score Calculator</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref } from "vue";
export default {
  emits: ["toRight", "toLeft"],
  setup(_, { emit }) {
    const currPageNum = ref(0);

    function changePageTo(num) {
      if (currPageNum.value < num) {
        emit("toLeft");
      } else if (currPageNum.value > num) {
        emit("toRight");
      } else {
        return;
      }
      currPageNum.value = num;
    }

    return {
      changePageTo,
    };
  },
};
</script>

<style scoped>
.nav {
  width: 100%;
  padding: 2.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
}
.nav-list {
  list-style: none;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 3.6rem;
}
.nav-item {
  padding: 1.2rem 0;
  cursor: pointer;
}
.nav-item a:link,
.nav-item a:hover,
.nav-item a:active,
.nav-item a:visited {
  padding: 1.2rem 2.4rem;
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 0.7px;
  text-decoration: none;
  color: inherit;
}
.nav-item--chosen {
  background-color: var(--font-color-one);
  color: var(--background-color) !important;

  border-radius: 50px;
}
</style>
