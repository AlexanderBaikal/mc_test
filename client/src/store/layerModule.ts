import { Commit } from "vuex";

export interface ILayerState {
  links: Array<ILink>;
}

interface ILink {
  id: String;
  href: String;
  textContent: String;
  active: Boolean;
}

interface IAction {
  state: ILayerState;
  commit: Commit;
  rootState: any;
}

export const layerModule = {
  state: (): ILayerState => ({
    links: [],
  }),
  getters: {},
  mutations: {
    setLinks(state: ILayerState, links: Array<ILink>) {
      state.links = links;
    },
    addLink(state: ILayerState, link: ILink) {
      state.links = [...state.links, link];
    },
    changeVisibility(state: ILayerState, id: String) {
      const links = state.links.map((item: ILink) =>
        item.id === id ? { ...item, active: !item.active } : item
      );
      state.links = links;
    },
  },
  actions: {},
  namespaced: true,
};
