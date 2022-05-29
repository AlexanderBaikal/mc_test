export interface IMapState {
  map: any;
}

export const mapModule = {
  state: (): IMapState => ({
    map: null,
  }),
  getters: {},
  mutations: {
    setMap(state: IMapState, map: Object) {
      // only once
      if (!state.map) state.map = map;
    },
  },
  actions: {},

  namespaced: true,
};
