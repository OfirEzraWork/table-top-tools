<template>
  <div class="board">
    <slot></slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.board {
  padding: 2.4rem 0;
  margin: 0 auto;
  width: 130rem;
  height: 80rem;
  display: grid;
}
</style>
