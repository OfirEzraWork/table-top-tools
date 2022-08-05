<template>
  <base-card class="add-dice-section">
    <header class="list-header">
      <div class="placeholder"></div>
      <p class="free-text--small free-text--bold">Dice</p>
      <block-picker
        :menuOptions="menuOptions"
        @choiceClicked="emitReplace"
      ></block-picker>
    </header>
    <ul class="dice-list">
      <dice-row
        v-for="item in props.dice"
        class="row dice-row"
        :amount="item.amount"
        :key="item.die"
        :die="item.die"
        :path="item.path"
        @amount-changed="amountChanged"
        @single-roll="singleRoll"
      >
      </dice-row>
    </ul>
  </base-card>
</template>

<script>
import BlockPicker from "./BlockPicker.vue";
import DiceRow from "./DiceRow.vue";
export default {
  components: {
    DiceRow,
    BlockPicker,
  },
  props: ["dice"],
  emits: ["amount-changed", "single-roll"],
  setup(props, ctx) {
    const menuOptions = ["saved", "history"];
    function amountChanged(change, die) {
      ctx.emit("amount-changed", change, die);
    }

    function singleRoll(die) {
      ctx.emit("single-roll", die);
    }

    function emitReplace(to) {
      emit("replace", "history", to);
    }

    return {
      props,
      singleRoll,
      menuOptions,

      amountChanged,
      emitReplace,
    };
  },
};
</script>

<style scoped>
.add-dice-section {
  grid-row: span 2;
  height: 100%;
  width: 100%;
  justify-content: space-between !important;
  padding: 3.6rem !important;
}
.list-header {
  position: relative;
  margin-bottom: 2.4rem;
  padding-right: 0.8rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: auto;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.dice-list {
  list-style: none;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.2rem;
}
</style>
