<template>
  <base-board class="dice-roller-board">
    <add-dice
      :class="`replaceable-${diceBlockLocation}`"
      :dice="dice[0]"
      @amount-changed="amountChanged"
      @single-roll="singleRoll"
      @replace="replace"
    ></add-dice>
    <saved-data
      :class="`replaceable-${savedBlockLocation}`"
      :list="savedRolls"
      @roll-saved-item="rollSavedItem"
      @delete-saved-item="deleteSavedItem"
      @replace="replace"
    ></saved-data>
    <rolls-history
      :class="`replaceable-${historyBlockLocation}`"
      :list="rollsHistory"
      @replace="replace"
    ></rolls-history>
    <roll-results
      :rawFormula="rawFormula"
      :resultsFormula="resultsFormula"
      :total="total"
    ></roll-results>
    <dice-summary
      :formula="formula"
      :dice="dice[0]"
      :isFormulaLocked="lockFormula"
      @modifierChanged="changeModifier"
      @modifierInputted="inputModifier"
      :modifier="dice[1].modifier"
      @roll="rollFormula"
      @clear="clear"
      @save="saveNewRoll"
      v-model="newSavedRollName"
    ></dice-summary>
  </base-board>
</template>

<script>
import { computed, ref } from "vue";
import AddDice from "../components/DiceRoller/Replaceables/AddDice.vue";
import DiceSummary from "../components/DiceRoller/DiceSummary.vue";
import RollResults from "../components/DiceRoller/RollResults.vue";
import SavedData from "../components/DiceRoller/Replaceables/SavedData.vue";
import RollsHistory from "../components/DiceRoller/Replaceables/RollsHistory.vue";
export default {
  components: {
    AddDice,
    DiceSummary,
    RollResults,
    SavedData,
    RollsHistory,
  },
  setup() {
    const dice = ref([
      [
        { die: 20, amount: 0, path: "/src/assets/dice-images/d20.svg" },
        { die: 12, amount: 0, path: "/src/assets/dice-images/d12.svg" },
        { die: 10, amount: 0, path: "/src/assets/dice-images/d10.svg" },
        { die: 8, amount: 0, path: "/src/assets/dice-images/d8.svg" },
        { die: 6, amount: 0, path: "/src/assets/dice-images/d6.svg" },
        { die: 4, amount: 0, path: "/src/assets/dice-images/d4.svg" },
      ],
      { modifier: 0 },
    ]);

    let lockFormula = ref(false);
    const rawFormula = ref(" ");
    const rawFormulaClearable = ref(" ");
    const resultsFormula = ref(" ");
    const total = ref("");

    const formula = computed(() => {
      const data = dice.value[0];
      const mod = dice.value[1].modifier;

      let formula = "";
      data.forEach(function (item) {
        if (item.amount >= 1) {
          formula += `${item.amount}d${item.die}+`;
        }
      });

      formula = formula.substring(0, formula.length - 1);
      if (mod > 0) {
        formula += `+${mod}`;
      } else if (mod < 0) {
        formula += `${mod}`;
      }
      return formula;
    });

    const savedRolls = ref(getSavedRolls());
    const newSavedRollName = ref("");

    function getSavedRolls() {
      return JSON.parse(localStorage.getItem("savedRolls"))
        ? JSON.parse(localStorage.getItem("savedRolls"))
        : [];
    }
    function setSavedRolls() {
      localStorage.setItem("savedRolls", JSON.stringify(savedRolls.value));
    }

    const rollsHistory = ref(getRollsHistory());
    function getRollsHistory() {
      return JSON.parse(localStorage.getItem("rollsHistory"))
        ? JSON.parse(localStorage.getItem("rollsHistory"))
        : [];
    }
    function setRollsHistory() {
      localStorage.setItem("rollsHistory", JSON.stringify(rollsHistory.value));
    }

    function saveNewRoll() {
      let newRollDice = [];
      dice.value[0].forEach(function (item) {
        if (item.amount >= 1) {
          newRollDice.push({ amount: item.amount, die: item.die });
        }
      });
      let mod = {};
      if (dice.value[1].modifier != 0) {
        mod = { modifier: dice.value[1].modifier };
      }
      savedRolls.value.push({
        id: Date.now(),
        desc: newSavedRollName.value,
        formula: formula.value,
        dice: newRollDice,
        ...mod,
      });
      setSavedRolls();
      newSavedRollName.value = "";
    }

    function clear() {
      lockFormula.value = false;
      dice.value[0].forEach((item) => (item.amount = 0));
      dice.value[1].modifier = 0;
      rawFormulaClearable.value = "";
    }

    function changeModifier(change) {
      dice.value[1].modifier += change;
    }

    function inputModifier(value) {
      dice.value[1].modifier = value;
    }

    function singleRoll(die) {
      dice.value[0].forEach((item) =>
        item.die === die ? (item.amount = 1) : (item.amount = 0)
      );
      lockFormula.value = true;
      rollFormula();
    }

    function rollSavedItem(id) {
      clear();
      const roll = savedRolls.value.find((roll) => roll.id === id);
      applyArrayToState(roll.dice, roll.modifier);
      rollFormula();
    }
    function deleteSavedItem(id) {
      const newSavedRolls = savedRolls.value.filter((roll) => roll.id !== id);
      setSavedRolls(newSavedRolls);
      savedRolls.value = newSavedRolls;
    }

    function amountChanged(change, die) {
      const item = dice.value[0].find((item) => item.die === die);
      if (lockFormula.value && item.amount != 1) {
        clear();
      }
      item.amount += change;
      generateClearableFormulaString();
      lockFormula.value = false;
    }

    function rollFormula() {
      const data = dice.value[0];
      const mod = dice.value[1].modifier;

      let newRawFormula = "",
        newResultsFormula = "",
        newTotal = mod;
      data.forEach(function (item) {
        if (item.amount > 1) {
          newRawFormula += `${item.amount}d${item.die}+`;
          newResultsFormula += "(";
          for (let i = 0; i < item.amount; i++) {
            const result = rollDie(item.die);
            newTotal += result;
            newResultsFormula += result.toString() + "+";
          }
          newResultsFormula =
            newResultsFormula.substring(0, newResultsFormula.length - 1) + ")+";
        } else if (item.amount === 1) {
          newRawFormula += `${item.amount}d${item.die}+`;
          const result = rollDie(item.die);
          newTotal += result;
          newResultsFormula += result.toString() + "+";
        }
      });

      rawFormula.value = newRawFormula.substring(0, newRawFormula.length - 1);
      resultsFormula.value = newResultsFormula.substring(
        0,
        newResultsFormula.length - 1
      );
      if (mod > 0) {
        rawFormula.value += `+${mod}`;
        resultsFormula.value += `+${mod}`;
      } else if (mod < 0) {
        rawFormula.value += `${mod}`;
        resultsFormula.value += `${mod}`;
      }

      rawFormulaClearable.value = rawFormula.value;
      total.value = newTotal;
      lockFormula.value = true;

      const formulaString = rawFormulaClearable.value;
      rollsHistory.value.unshift({
        id: Date.now(),
        formula: formulaString,
        total: total.value,
      });
      while (rollsHistory.value.length > 50) {
        rollsHistory.value.pop();
      }
      setRollsHistory();
    }

    function generateClearableFormulaString() {
      const data = dice.value[0];

      let newRawFormula = "";
      data.forEach(function (item) {
        if (item.amount >= 1) {
          newRawFormula += `${item.amount}d${item.die}+`;
        }
      });

      rawFormulaClearable.value = newRawFormula.substring(
        0,
        newRawFormula.length - 1
      );
    }

    function applyArrayToState(arr, mod) {
      arr.forEach((savedDieKeyValue) => {
        const diceRow = dice.value[0].find((item) => {
          return item.die === savedDieKeyValue.die;
        });
        diceRow.amount = savedDieKeyValue.amount;
      });
      dice.value[1].modifier = mod ?? 0;
    }

    function rollDie(die) {
      return Math.floor(Math.random() * die) + 1;
    }

    //Replaceables location management
    //dice, saved, history
    const replaceablesLocations = ref(["dice", "history"]);
    const diceBlockLocation = computed(() => {
      return replaceablesLocations.value.indexOf("dice") + 1;
    });
    const savedBlockLocation = computed(() => {
      return replaceablesLocations.value.indexOf("saved") + 1;
    });
    const historyBlockLocation = computed(() => {
      return replaceablesLocations.value.indexOf("history") + 1;
    });

    function replace(from, to) {
      const toIndex = replaceablesLocations.value.indexOf(to);
      const fromIndex = replaceablesLocations.value.indexOf(from);
      if (toIndex >= 0) {
        replaceablesLocations.value[toIndex] = from;
      }
      replaceablesLocations.value[fromIndex] = to;
    }

    //Replaceables location management

    return {
      dice,
      rawFormula,
      rawFormulaClearable,
      formula,
      lockFormula,
      resultsFormula,
      total,
      savedRolls,
      rollsHistory,
      newSavedRollName,

      diceBlockLocation,
      savedBlockLocation,
      historyBlockLocation,

      clear,
      amountChanged,
      singleRoll,
      rollFormula,
      rollSavedItem,
      saveNewRoll,
      deleteSavedItem,
      changeModifier,
      inputModifier,
      replace,
    };
  },
};
</script>

<style scoped>
.dice-roller-board {
  grid-template-columns: 1fr 2fr 1fr;
  grid-template-rows: 2fr 1fr;
  gap: 2.4rem;

  grid-template-areas:
    "replaceable-one results replaceable-two"
    "replaceable-one summary replaceable-two";
}
.replaceable-0 {
  display: none !important;
  visibility: hidden;
}
.replaceable-1 {
  grid-area: replaceable-one;
}
.replaceable-2 {
  grid-area: replaceable-two;
}
</style>
