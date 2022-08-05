<template>
  <div class="container--number" :class="{ error: error }">
    <p class="desc">{{ desc }}</p>
    <p class="number">{{ number }}</p>
  </div>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: false,
      default: "Total",
    },
    error: {
      type: Boolean,
      required: false,
      default: false,
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
.error {
  color: var(--font-color-error);
}
.container--number {
  position: relative;

  width: 6.4rem;
  height: 100%;
  padding-top: 0.4rem;
  padding-left: 0.3rem;

  border: 2px solid var(--font-color-one);
  border-radius: var(--border-radius--card);

  display: flex;
  align-items: center;
  justify-content: center;
}
.desc {
  font-size: 1.2rem;
  letter-spacing: 1px;
  position: absolute;
  top: 0%;
  transform: translate(-25%, -50%);
  background-color: var(--background-color);
}
.number {
  letter-spacing: 0;
  text-align: center;
}
</style>
