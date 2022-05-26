import { toGeoJsonPoint } from "@/utils/geo";
import { Store, Commit } from "vuex";

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
    },
    addLink(state: IState, link: ILink) {
      state.links = [...state.links, link];
    },
    changeVisibility(state: IState, id: String) {
      const links = state.links.map((item: ILink) =>
        item.id === id ? { ...item, active: !item.active } : item
      );
      state.links = links;
    },
  },
  actions: {
    showLayer({ state, commit, rootState }: IAction, { id }: { id: String }) {
      const clickedLayer = state.links.find((item: ILink) => item.id === id);
      if (!clickedLayer) return;
      const clickedId = clickedLayer.textContent;
      const wasActive = clickedLayer.active;
      const links = state.links.map((item: ILink) =>
        item.id === id ? { ...item, active: !wasActive } : item
      );
      //   commit("setLinks", links);
      rootState.map.map.setLayoutProperty(
        clickedId,
        "visibility",
        wasActive ? "none" : "visible"
      );
    },
    addMarker(
      { state, commit, rootState }: IAction,
      { layer, title }: { layer: String; title: String }
    ) {
      const { map } = rootState.map;
      if (!map) return;
      const source = map.getSource(layer);
      if (!source) return;
      const { lat, lng } = map.getCenter();
      source.setData({
        type: "FeatureCollection",
        features: [
          ...source._data.features,
          toGeoJsonPoint([lng, lat], title, "custom-marker"),
        ],
      });
    },
  },
  namespaced: true,
};
