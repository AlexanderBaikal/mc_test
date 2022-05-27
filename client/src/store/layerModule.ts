import { Commit } from "vuex";

interface IState {
  links: Array<ILink>;
}

interface ILink {
  id: String;
  href: String;
  textContent: String;
  active: Boolean;
}

interface IAction {
  state: IState;
  commit: Commit;
  rootState: any;
}

export const layerModule = {
  state: (): IState => ({
    links: [],
  }),
  getters: {},
  mutations: {
    setLinks(state: IState, links: Array<ILink>) {
      state.links = links;
      console.log("setlinks");
    },
    addLink(state: IState, link: ILink) {
      state.links = [...state.links, link];
      console.log("addlinks");
    },
    changeVisibility(state: IState, id: String) {
      const links = state.links.map((item: ILink) =>
        item.id === id ? { ...item, active: !item.active } : item
      );
      state.links = links;
      console.log("changeVisibility");
    },
  },
  actions: {},
  namespaced: true,
};
