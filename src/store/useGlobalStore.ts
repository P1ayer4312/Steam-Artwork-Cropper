import { create } from "zustand";
import { GlobalStoreValues } from "./types/useGlobalStore";

const useGlobalStore = create<GlobalStoreValues>()((set) => ({
  file: {
    name: "No file chosen",
    data: undefined,
    dataUrl: undefined,
    height: 0,
    width: 0,
  },
  setFile: (value) => set({ file: value }),

  status: "Idle",
  setStatus: (value) => set({ status: value }),

  activeTab: "artwork",
  setActiveTab: (value) => set({ activeTab: value }),

  artwork: {
    isLoaded: false,
    isMeasured: false,
    imageLinks: {
      primary: "./img/1.jpg",
      rightCol: "./img/2.jpg",
    },

    imageSize: {
      primary: 0,
      rightCol: 0,
      original: 0,
    },

    imageResolutions: {
      original: { width: 0, height: 0 },
      primary: { width: 0, height: 0 },
      rightCol: { width: 0, height: 0 },
    },

    panelElementRefs: {
      primaryImg: null,
      rightColContainer: null,
      rightColImg: null,
    },
  },
  setArtwork: (value) => {
    set((state) => ({
      artwork: { ...state.artwork, ...value },
    }));
  },

  reset: () => {
    set((state) => ({
      artwork: {
        ...state.artwork,
        isMeasured: false,
        imageSize: {
          primary: 0,
          rightCol: 0,
          original: 0,
        },
        imageResolutions: {
          original: { width: 0, height: 0 },
          primary: { width: 0, height: 0 },
          rightCol: { width: 0, height: 0 },
        },
      },
    }));
  },
}));

export default useGlobalStore;
