import { ArtworkShowcaseDefs } from "./artworkShowcaseData";

type FileData = {
  name: string;
  data: File | undefined;
  dataUrl: string | undefined;
  width: number;
  height: number;
  fileType: string;
  mediaType: "gif" | "image" | "video" | "";
};

type FileDefs = {
  file: FileData;
  setFile: (value: FileData) => void;
};

type StatusDefs = {
  status: string;
  setStatus: (value: string) => void;
};

type ActiveTabValues = "artwork" | "workshop";

type ActiveTabDefs = {
  activeTab: ActiveTabValues;
  setActiveTab: (value: ActiveTabValues) => void;
  reset: () => void;
};

type AdvancedToolsPopupWindow = {
  popupWindowOpen: boolean;
  setPopupWindowOpen: (value: boolean) => void;
  popupWindowData: {
    posX?: number;
    posY?: number;
    width?: number;
    height?: number;
  };
  setPopupWindowPos: (posX: number, posY: number) => void;
  setPopupWindowSize: (width: number, height: number) => void;
};

type GlobalStoreValues = FileDefs &
  StatusDefs &
  ActiveTabDefs &
  ArtworkShowcaseDefs &
  AdvancedToolsPopupWindow;
