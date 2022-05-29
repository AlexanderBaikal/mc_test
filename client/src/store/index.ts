import { createStore, Store, ModuleTree } from "vuex";
import { ILayerState, layerModule } from "./layerModule";
import { IMapState, mapModule } from "./mapModule";

export interface IRootState {
  map: IMapState;
  layer: ILayerState;
}

export default createStore<Store<IRootState>>({
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    map: mapModule,
    layer: layerModule,
  },
});
