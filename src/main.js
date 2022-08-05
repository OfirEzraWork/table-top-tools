import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";

import BaseBoard from "./components/BaseComponents/BaseBoard.vue";
import BaseCard from "./components/BaseComponents/BaseCard.vue";
import BaseModal from "./components/BaseComponents/BaseModal.vue";
import BaseInput from "./components/BaseComponents/BaseInput.vue";
import BaseArrows from "./components/BaseComponents/BaseArrows.vue";
import BaseButton from "./components/BaseComponents/BaseButton.vue";
import BaseInputItem from "./components/BaseComponents/BaseInputItem.vue";
import BaseDiceRollerList from "./components/BaseComponents/BaseDiceRollerList.vue";

const app = createApp(App);

app.component("base-board", BaseBoard);
app.component("base-card", BaseCard);
app.component("base-modal", BaseModal);
app.component("base-input", BaseInput);
app.component("base-arrows", BaseArrows);
app.component("base-button", BaseButton);
app.component("base-input-item", BaseInputItem);
app.component("base-dice-roller-list", BaseDiceRollerList);

app.use(router);
app.use(store);

app.mount("#app");
