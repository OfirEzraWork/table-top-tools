import { createStore } from "vuex";

import abilityScores from "./ability-scores/index";

const store = createStore({
  modules: {
    abilityScores,
  },
  state() {},
});

export default store;
