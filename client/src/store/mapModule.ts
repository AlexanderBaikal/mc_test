import { Commit } from "vuex";

interface IState {
  map: any;
}

interface IAction {
  state: IState;
  commit: Commit;
  rootState: any;
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
  actions: {
    addImage(
      { state, commit, rootState }: IAction,
      { link, title }: { link: String; title: String }
    ) {
      if (!state.map) return;
      state.map.loadImage(link, (error: any, image: any) => {
        if (error) throw error;
        state.map.addImage(title, image);
      });
    },
  },

  namespaced: true,
};
