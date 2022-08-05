export default {
  resetPointsAllocation(state) {
    state.pointsAllocationTable.forEach(
      (ability) => (ability.score = state.defaultPointsAllocationTableScore)
    );
  },
  /**
   *
   * @param {state} state
   * @param {{name: string, setScoreTo: number}} payload
   */
  updatePointsAllocation(state, payload) {
    const abilityToUpdate = state.pointsAllocationTable.find(
      (ability) => ability.name === payload.name
    );
    abilityToUpdate.score = payload.setScoreTo;
  },

  resetTotalPrice(state) {
    state.totalPrice = 0;
  },
  updateTotalPrice(state, payload) {
    state.totalPrice += payload;
  },
  setTotalPrice(state, payload) {
    state.totalPrice = payload;
  },

  resetPriceAllocation(state) {
    state.priceAllocationTable = [...state.defaultPriceAllocationTable];
  },
  /**
   *
   * @param {state} state
   * @param {{score: string, amount: number, set: boolean}}} payload. set is wheter we need to set the value or icrement it
   */
  updatePriceAllocation(state, { score, amount, set }) {
    let priceRecordIndex = -1;
    const priceRecord = state.priceAllocationTable.find((scorePriceItem, i) => {
      priceRecordIndex = i;
      return scorePriceItem[0] === score;
    });

    let newValue;
    if (set) {
      newValue = amount;
    } else {
      newValue = priceRecord[1] + amount;
    }
    state.priceAllocationTable[priceRecordIndex] = [score, newValue];
  },

  resetMaxPoints(state) {
    state.maxPoints = state.defaultMaxPoints;
  },
  /**
   *
   * @param {state} state
   * @param {{amount: number, set: boolean}}} payload. set is wheter we need to set the value or icrement it
   */
  updateMaxPoints(state, { amount, set }) {
    if (set) {
      state.maxPoints = amount;
    } else {
      state.maxPoints += amount;
    }
  },

  resetAmountPurchsable(state) {
    state.maxScorePurchasable = state.defaultMaxScorePurchasable;
    state.minScorePurchasable = state.defaultMinScorePurchasable;
  },
  updateMaxScorePurchasable(state, { amount, set }) {
    if (set) {
      state.maxScorePurchasable = amount;
    } else {
      state.maxScorePurchasable += amount;
    }
  },
  updateMinScorePurchasable(state, { amount, set }) {
    if (set) {
      state.minScorePurchasable = amount;
    } else {
      state.minScorePurchasable += amount;
    }
  },
};
