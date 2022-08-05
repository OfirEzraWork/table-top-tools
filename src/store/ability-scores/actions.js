export default {
  resetPointsAllocation({ commit }) {
    commit("resetPointsAllocation");
    commit("resetTotalPrice");
  },
  /**
   *
   *
   * @param {{name: string, amount: number}}} payload
   * @returns false if no changes are made and true if is.
   */
  updatePointsAllocation({ commit, getters }, payload) {
    const oldScore = getters.score(payload.name);
    const newScore = Number(oldScore) + payload.amount;
    const oldScorePrice = getters.scorePrice(oldScore);
    const newScorePrice = getters.scorePrice(newScore);
    const priceDiff = newScorePrice - oldScorePrice;

    if (
      (getters.totalPrice + priceDiff > getters.maxPoints && priceDiff > 0) ||
      newScore > getters.maxScorePurchasable ||
      newScore < getters.minScorePurchasable
    )
      return false;

    commit("updatePointsAllocation", {
      name: payload.name,
      setScoreTo: newScore,
    });
    commit("updateTotalPrice", priceDiff);
  },

  resetPriceAllocation({ commit }) {
    commit("resetPriceAllocation");
  },
  /**
   *
   * @param {{score: string, amount: number}}} payload
   */
  updatePriceAllocation({ commit, getters }, payload) {
    //upadte a score's price
    commit("updatePriceAllocation", payload);
    //update total price
    const totalPrice = getters.scores.reduce((sum, score) => {
      return sum + getters.scorePrice(score.score);
    }, 0);
    commit("setTotalPrice", totalPrice);
  },
  // /**
  //  *
  //  * @param {{score: string, amount: number}}} payload
  //  */
  // setPriceAllocation({ commit, getters }, payload) {
  //   //upadte a score's price
  //   commit("setPriceAllocation", payload);
  //   //update total price
  //   const totalPrice = getters.scores.reduce((sum, score) => {
  //     console.log("sum", sum);
  //     return sum + getters.scorePrice(score.score);
  //   }, 0);
  //   commit("setTotalPrice", totalPrice);
  // },

  resetMaxPoints({ commit }) {
    commit("resetMaxPoints");
  },
  /**
   *
   * @param {state} state
   * @param {{amount: number, set: boolean}}} payload. set is wheter we need to set the value or icrement it
   */
  updateMaxPoints({ commit }, payload) {
    commit("updateMaxPoints", payload);
  },

  resetAmountPurchsable({ commit }) {
    commit("resetAmountPurchsable");
  },
  /**
   *
   * @param {{amount: number, set: boolean}}} payload. set is wheter we need to set the value or icrement it
   */
  updateMaxScorePurchasable({ commit, getters }, payload) {
    commit("updateMaxScorePurchasable", payload);
  },
  /**
   *
   * @param {{amount: number, set: boolean}}} payload. set is wheter we need to set the value or icrement it
   */
  updateMinScorePurchasable({ commit, getters }, payload) {
    commit("updateMinScorePurchasable", payload);
  },

  totalReset() {
    resetPointsAllocation();
    resetPriceAllocation();
    resetMaxPoints();
    resetAmountPurchsable();
  },
};
