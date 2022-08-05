import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const DEFAULT_PRICE_ALLOCATION_TABLE = [
  ["18", 19],
  ["17", 15],
  ["16", 12],
  ["15", 9],
  ["14", 7],
  ["13", 5],
  ["12", 4],
  ["11", 3],
  ["10", 2],
  ["9", 1],
  ["8", 0],
  ["7", -1],
  ["6", -2],
  ["5", -4],
];

export default {
  namespaced: true,
  state() {
    return {
      pointsAllocationTable: [
        { name: "strength", label: "Strength", score: 8 },
        { name: "dexterity", label: "Dexterity", score: 8 },
        { name: "constitution", label: "Constitution", score: 8 },
        { name: "intelligence", label: "Intelligence", score: 8 },
        { name: "wisdom", label: "Wisdom", score: 8 },
        { name: "charisma", label: "Charisma", score: 8 },
      ],
      defaultPointsAllocationTableScore: 8,
      totalPrice: 0,
      priceAllocationTable: [...DEFAULT_PRICE_ALLOCATION_TABLE],
      defaultPriceAllocationTable: [...DEFAULT_PRICE_ALLOCATION_TABLE],
      maxPoints: 27,
      defaultMaxPoints: 27,
      maxScorePurchasable: 15,
      defaultMaxScorePurchasable: 15,
      borderMaxScorePurchasable: 18,
      minScorePurchasable: 8,
      defaultMinScorePurchasable: 8,
      borderMinScorePurchasable: 5,
      maxPricePossible: 19,
      minPricePossible: -4,
    };
  },
  actions,
  getters,
  mutations,
};
