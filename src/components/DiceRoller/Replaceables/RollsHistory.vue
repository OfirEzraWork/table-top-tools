<template>
  <base-card class="list-section">
    <div class="list-container">
      <header class="list-header">
        <p class="free-text--small free-text--bold">Rolls History:</p>
        <block-picker
          :menuOptions="menuOptions"
          @choiceClicked="emitReplace"
        ></block-picker>
      </header>
      <transition-group
        tag="ul"
        class="list"
        :name="`row-${animationDirection}`"
        mode="out-in"
      >
        <roll-history-item
          v-for="data in computedList"
          :total="data.total"
          :formula="data.formula"
          :key="data.id"
        ></roll-history-item>
      </transition-group>
    </div>
    <pagination
      :firstPage="1"
      :currentPage="currentPage"
      :lastPage="amountOfPages"
      @prev="previousPage"
      @next="nextPage"
    ></pagination>
  </base-card>
</template>

<script>
import { computed, ref } from "vue";
import Pagination from "../../UI/Pagination.vue";
import RollHistoryItem from "./RollHistoryItem.vue";
import BlockPicker from "./BlockPicker.vue";

export default {
  emits: ["prev", "next", "replace"],
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  components: {
    Pagination,
    RollHistoryItem,
    BlockPicker,
  },
  setup(props, { emit }) {
    const menuOpen = ref(true);
    const menuOptions = ["saved", "dice"];

    const animationDirection = ref("next");
    const currentPage = ref(1);

    const MAX_ROWS_IN_PAGE = 5;

    const amountOfPages = computed(() => {
      return Math.ceil(props.list.length / MAX_ROWS_IN_PAGE);
    });

    const computedList = computed(() => {
      const startIndex = (currentPage.value - 1) * MAX_ROWS_IN_PAGE;
      const endIndex = startIndex + MAX_ROWS_IN_PAGE;
      if (props.list?.length > 0) return props.list.slice(startIndex, endIndex);
      return [];
    });

    function previousPage() {
      animationDirection.value = "prev";
      currentPage.value--;
      emit("prev");
    }
    function nextPage() {
      animationDirection.value = "next";
      currentPage.value++;
      emit("next");
    }

    function emitReplace(to) {
      emit("replace", "history", to);
    }

    return {
      props,
      menuOpen,
      menuOptions,
      currentPage,

      computedList,
      amountOfPages,
      animationDirection,

      previousPage,
      nextPage,
      emitReplace,
    };
  },
};
</script>

<style scoped>
.list-section {
  grid-row: span 2;
  height: 100%;
  width: 100%;
  justify-content: space-between !important;
  padding: 3.6rem !important;
}
.list-container {
  width: 100%;
}
.list-header {
  position: relative;
  margin-bottom: 2.4rem;
  padding-right: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list {
  list-style: none;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.row-next-move,
.row-prev-move,
.row-next-enter-active,
.row-prev-enter-active {
  transition: all 0.3s;
}
.row-next-enter-from {
  transform: translateX(30px);
  opacity: 0;
}
.row-next-leave-to,
.row-prev-enter-from {
  transform: translateX(-30px);
  opacity: 0;
}
.row-next-enter-to,
.row-prev-enter-to {
  transform: translateX(0);
  opacity: 1;
}
.row-next-leave-active,
.row-prev-leave-active {
  transition: none;
  position: absolute;
}
</style>
