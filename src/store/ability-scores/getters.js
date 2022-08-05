export default {
  score: (state) => (name) => {
    const ability = state.pointsAllocationTable.find(
      (ability) => ability.name === name
    );
    return ability ? ability.score : null;
  },
  scores(state) {
    return state.pointsAllocationTable;
  },
  prices(state) {
    return state.priceAllocationTable;
  },
  scorePrice: (state) => (score) => {
    const priceRecord = state.priceAllocationTable.find(
      (scorePriceItem) => scorePriceItem[0] === score.toString()
    );
    if (priceRecord) {
      return priceRecord[1];
    } else {
      console.log("Couldnt find the score");
    }
    return;
  },
  totalPrice(state) {
    return state.totalPrice;
  },
  maxPoints(state) {
    return state.maxPoints;
  },
  maxScorePurchasable(state) {
    return state.maxScorePurchasable;
  },
  minScorePurchasable(state) {
    return state.minScorePurchasable;
  },
  borderMaxScorePurchasable(state) {
    return state.borderMaxScorePurchasable;
  },
  borderMinScorePurchasable(state) {
    return state.borderMinScorePurchasable;
  },
  maxPricePossible(state) {
    return state.maxPricePossible;
  },
  minPricePossible(state) {
    return state.minPricePossible;
  },
};
