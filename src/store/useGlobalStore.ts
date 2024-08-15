import { create } from "zustand";
import { GlobalStoreValues } from "./types/useGlobalStore";

const useGlobalStore = create<GlobalStoreValues>()((set) => ({
  // =========================================================
  file: {
    name: "No file chosen",
    data: undefined,
    dataUrl: undefined,
    height: 0,
    width: 0,
    fileType: "",
  },
  setFile: (value) => set({ file: value }),

  // =========================================================
  status: "Idle",
  setStatus: (value) => set({ status: value }),

  // =========================================================
  activeTab: "artwork",
  setActiveTab: (value) => set({ activeTab: value }),

  // =========================================================
  popupWindowOpen: false,
  setPopupWindowOpen: (value) => set({ popupWindowOpen: value }),
  popupWindowData: {
    width: undefined,
    height: undefined,
    posX: undefined,
    posY: undefined,
  },
  setPopupWindowPos: (posX, posY) => {
    set((state) => {
      return {
        popupWindowData: {
          ...state.popupWindowData,
          posX: posX,
          posY: posY,
        },
      };
    });
  },
  setPopupWindowSize: (width, height) => {
    set((state) => {
      return {
        popupWindowData: {
          ...state.popupWindowData,
          width: width,
          height: height,
        },
      };
    });
  },

  // =========================================================
  artwork: {
    isLoaded: false,
    isMeasured: false,
    bottomRightSpaceChecked: false,
    imageLinks: {
      primary: "./img/1.jpg",
      rightCol: "./img/2.jpg",
      rightColCropped: undefined,
    },

    imageSize: {
      primary: 0,
      rightCol: 0,
      original: 0,
      rightColCropped: 0,
    },

    imageResolutions: {
      original: { width: 0, height: 0 },
      primary: { width: 0, height: 0 },
      rightCol: { width: 0, height: 0 },
      rightColCroppedHeight: 0,
    },

    panelElementRefs: {
      primaryImg: null,
      rightColContainer: null,
      rightColImg: null,
    },
  },
  setArtwork: (value) => {
    set((state) => ({ artwork: { ...state.artwork, ...value } }));
  },

  // =========================================================
  reset: () => {
    set((state) => ({
      popupWindowOpen: false,
      popupWindowData: {
        width: undefined,
        height: undefined,
        posX: undefined,
        posY: undefined,
      },
      artwork: {
        ...state.artwork,
        bottomRightSpaceChecked: false,
        isMeasured: false,
        imageSize: {
          primary: 0,
          rightCol: 0,
          original: 0,
          rightColCropped: 0,
        },
        imageResolutions: {
          original: { width: 0, height: 0 },
          primary: { width: 0, height: 0 },
          rightCol: { width: 0, height: 0 },
          rightColCroppedHeight: 0,
        },
      },
    }));
  },
}));

export default useGlobalStore;
