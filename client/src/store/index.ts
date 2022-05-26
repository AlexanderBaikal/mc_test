import { createStore } from "vuex";
import { layerModule } from "./layerModule";
import { mapModule } from "./mapModule";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    map: mapModule,
    layer: layerModule,
  },
});
