<template>
  <base-card class="ability-block">
    <ul class="free-text free-text-bold ability-list">
      <ability-row
        v-for="row in pointsAllocationTable"
        :row="row"
        :key="row.name"
      ></ability-row>
    </ul>
  </base-card>
</template>

<script>
import AbilityRow from "./AbilityRow.vue";
export default {
  components: {
    AbilityRow,
  },
  props: {
    pointsAllocationTable: {
      type: Array,
      required: true,
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
.ability-block {
  grid-row: span 3;
}
.ability-list {
  list-style: none;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3.6rem;
}
</style>
