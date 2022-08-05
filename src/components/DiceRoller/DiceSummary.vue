<template>
  <save-formula-modal
    :modalOpen="isSaveModalOpen"
    :formula="formula"
    :modelValue="modelValue"
    @close="closeModal"
    @input="newSavedRollNameChange"
    @save="save"
  ></save-formula-modal>
  <base-card class="free-text free-text-bold dice-summary-section">
    <div class="formula-row">
      <p class="formula-text">{{ formula }}</p>
      <base-input
        class="modifier-input"
        inputName="modifier"
        :max="99"
        :min="-99"
        :value="modifier"
        @valueInputted="inputModifier"
        @valueChanged="changeModifier"
      ></base-input>
    </div>
    <menu class="dice-summary-buttons">
      <base-button @click="clear">Clear</base-button>
      <base-button @click="roll">Roll</base-button>
      <base-button @click="openModal">Save</base-button>
    </menu>
  </base-card>
</template>

<script>
import { ref } from "vue";
import SaveFormulaModal from "./SaveFormulaModal.vue";
import BaseInput from "../BaseComponents/BaseInput.vue";
export default {
  emits: [
    "roll",
    "clear",
    "update:modelValue",
    "save",
    "modifierChanged",
    "modifierInputted",
  ],
  components: {
    SaveFormulaModal,
    BaseInput,
  },
  props: {
    dice: {
      required: true,
    },
    modifier: {
      type: Number,
      required: true,
    },
    formula: {
      required: true,
      type: String,
    },
    isFormulaLocked: {
      required: true,
      type: Boolean,
    },
    modelValue: {},
  },
  setup(props, ctx) {
    const isSaveModalOpen = ref(false);

    function clear() {
      ctx.emit("clear");
    }

    function roll() {
      ctx.emit("roll");
    }

    function openModal() {
      isSaveModalOpen.value = true;
    }
    function closeModal() {
      isSaveModalOpen.value = false;
    }
    function newSavedRollNameChange(newValue) {
      ctx.emit("update:modelValue", newValue);
    }
    function save() {
      ctx.emit("save");
    }
    function changeModifier(change) {
      ctx.emit("modifierChanged", change);
    }
    function inputModifier(value) {
      ctx.emit("modifierInputted", value);
    }
    return {
      props,
      isSaveModalOpen,

      roll,
      clear,
      openModal,
      closeModal,
      newSavedRollNameChange,
      save,
      changeModifier,
      inputModifier,
    };
  },
};
</script>

<style scoped>
.dice-summary-section {
  justify-content: end !important;
  gap: 3.6rem;
}
.dice-summary-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
}
.formula-row {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;
  justify-items: center;
}
.formula-text {
  grid-column: 2;
  text-align: center;
  /* overflow-wrap: break-word; */
  /* overflow-wrap: anywhere; */
  word-break: break-all;
}
.modifier-input {
  grid-column: 3;
  justify-self: right;
}
</style>
