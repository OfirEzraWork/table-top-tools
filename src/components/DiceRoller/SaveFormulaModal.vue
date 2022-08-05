<template>
  <base-modal :modalOpen="modalOpen">
    <template #default>
      <p class="formula-text">Save roll formula?</p>
      <p class="formula-text">{{ formula }}</p>
      <form>
        <p>Name:</p>
        <input
          :class="{
            'input--invalid': isInputInvalid === true ? true : false,
          }"
          id="name"
          name="name"
          type="text"
          :value="modelValue"
          @input="$emit('input', $event.target.value)"
        />
      </form>
    </template>
    <template #actions>
      <button @click="$emit('close')" class="button--full">Cancel</button>
      <button @click="save" class="button--full">Save</button>
    </template>
  </base-modal>
</template>

<script>
import { watch, ref } from "vue";
export default {
  emits: ["close", "input", "save"],
  props: {
    formula: {
      required: true,
      type: String,
    },
    modelValue: {
      required: true,
      type: String,
    },
    modalOpen: {
      required: true,
      type: Boolean,
    },
  },
  setup(props, ctx) {
    const formulaName = ref("");
    const isInputInvalid = ref("false");

    function save() {
      if (props.modelValue === "") {
        isInputInvalid.value = true;
        return;
      } else {
        ctx.emit("save");
        ctx.emit("close");
      }
    }
    return {
      props,
      formulaName,
      isInputInvalid,

      save,
    };
  },
};
</script>

<style scoped>
.formula-text {
  text-align: center;
}
input {
  height: 75%;

  padding-left: 0;
  margin-right: 5rem;

  font-family: inherit;
  font-size: 2.4rem;
  font-weight: 500;
  text-align: center;

  color: var(--background-color);
  background-color: var(--font-color-one);

  border-radius: var(--border-radius--card);
  border: 2px solid black;
}
.input--invalid {
  color: #c92a2a;
  border-color: #c92a2a;
}
form {
  display: flex;
  align-items: center;
  gap: 1.2rem;
}
form p {
  margin-bottom: 0;
}
</style>
