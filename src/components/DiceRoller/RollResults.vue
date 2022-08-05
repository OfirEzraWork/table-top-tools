<template>
  <base-card class="free-text free-text-bold">
    <div class="formula-block">
      <p class="formula-text">{{ rawFormula }}</p>
      <p class="formula-text">{{ resultsFormula }}</p>
    </div>
    <p class="row dice-total">{{ total }}</p>
  </base-card>
</template>

<script>
export default {
  props: ["rawFormula", "resultsFormula", "total"],
};
</script>

<style>
/***************************************/
/*Dice roll results section*/
/***************************************/

.formula-block {
  height: 33%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.formula-text {
  text-align: center;
  word-break: break-all;
  line-height: 1.25;
}
.dice-total {
  padding: 1.2rem 3rem;
  height: 33.33%;
  width: 80%;

  font-size: 4.8rem;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: var(--border-radius--item);
}
</style>
