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
    mediaType: "",
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
  advancedEditorData: {
    isMediaEdited: false,
    artwork: {
      gaps: {
        left: false,
        right: true,
      },
      imageData: undefined,
      area: [],
    },
  },
  setAdvancedEditorData: (value) => {
    set((state) => ({ advancedEditorData: { ...state.advancedEditorData, ...value } }));
  },

  // =========================================================
  /**
   * @param fullReset Set to true to reset all values
   */
  reset: (fullReset = false) => {
    set((state) => {
      return {
        popupWindowOpen: false,

        popupWindowData: fullReset
          ? {
              width: undefined,
              height: undefined,
              posX: undefined,
              posY: undefined,
            }
          : state.popupWindowData,

        artwork: {
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
          // advancedEditorData: fullReset ? undefined : state.artwork.advancedEditorData,
          imageLinks: {
            primary: "",
            rightCol: "",
            rightColCropped: "",
          },
          isLoaded: false,
          panelElementRefs: {
            primaryImg: null,
            rightColContainer: null,
            rightColImg: null,
          },
        },
        // ===
        advancedEditorData: {
          isMediaEdited: false,
          artwork: {
            gaps: {
              left: false,
              right: true,
            },
            imageData: undefined,
            area: [],
          },
        },
      };
    });
  },
}));

export default useGlobalStore;
