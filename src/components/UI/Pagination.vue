<template>
  <div class="saved-data-paging">
    <base-button :disabled="!buttonsActive" type="icon" @click="onPrev">
      <ion-icon
        v-if="pagingBtnPrev"
        :class="`arrow-color--ionicon-is-weird arrow-size--ionicon-is-weird`"
        class="arrow-icon prev ionicon-tooltip-remove"
        name="caret-back-circle-outline"
      ></ion-icon>
      <div v-else></div>
    </base-button>
    <p class="centered-text page">{{ currentPage }}</p>
    <base-button :disabled="!buttonsActive" type="icon" @click="onNext">
      <ion-icon
        v-if="pagingBtnNext"
        :class="`arrow-color--ionicon-is-weird arrow-size--ionicon-is-weird`"
        class="arrow-icon next ionicon-tooltip-remove"
        name="caret-forward-circle-outline"
      ></ion-icon>
      <div v-else></div>
    </base-button>
  </div>
</template>

<script>
import { ref, computed } from "vue";
export default {
  emits: ["prev", "next"],
  props: {
    currentPage: {
      required: true,
      type: Number,
    },
    firstPage: {
      required: false,
      type: Number,
    },
    lastPage: {
      required: false,
      type: Number,
    },
  },
  setup(props, { emit }) {
    const buttonsActive = ref(true);

    const pagingBtnPrev = computed(() => {
      return !paginationOnFirstPage();
    });
    const pagingBtnNext = computed(() => {
      return !paginationOnLastPage();
    });

    function paginationOnFirstPage() {
      return props.currentPage <= props.firstPage ?? 1;
    }
    function paginationOnLastPage() {
      return props.currentPage >= props.lastPage ?? false;
    }

    function onPrev() {
      if (paginationOnFirstPage()) return;
      buttonsActive.value = false;
      setTimeout(() => (buttonsActive.value = true), 350);
      emit("prev");
    }
    function onNext() {
      if (paginationOnLastPage()) return;
      buttonsActive.value = false;
      setTimeout(() => (buttonsActive.value = true), 350);
      emit("next");
    }

    return {
      props,
      buttonsActive,

      pagingBtnPrev,
      pagingBtnNext,

      paginationOnFirstPage,
      paginationOnLastPage,

      onPrev,
      onNext,
    };
  },
};
</script>

<style scoped>
button {
  background: transparent;
  border: none;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}
.prev {
  grid-area: prev;
}
.page {
  grid-area: page;
}
.next {
  grid-area: next;
}
.saved-data-paging {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;
  gap: 2.4rem;

  grid-template-areas: "prev page next";
}
</style>
