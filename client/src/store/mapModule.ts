interface IState {
  map: any;
}

export const mapModule = {
  state: (): IState => ({
    map: null,
  }),
  getters: {},
  mutations: {
    setMap(state: IState, map: Object) {
      // only once
      if (!state.map) state.map = map;
    },
  },
  actions: {},

  namespaced: true,
};
