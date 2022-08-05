<template>
  <section class="card">
    <slot></slot>
  </section>
</template>

<script>
export default {};
</script>

<style scoped>
.card {
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  background-color: rgba(66, 134, 244, 0.1);
  border-radius: var(--border-radius--card);
  box-shadow: var(--shadow);
}
</style>
