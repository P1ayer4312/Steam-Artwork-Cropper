import { FileData } from "./useGlobalStore";

export type Resolution = {
  width: number;
  height: number;
};

export interface MeasuresData {
  imageLinks: {
    /** @default "./img/1.jpg" */
    primary: string;
    /** @default "./img/2.jpg" */
    rightCol: string;
    rightColCropped: string | undefined;
  };

  /** Resolutions of the cropped images displayed on the Steam profile */
  imageResolutions: {
    originalResized?: Resolution;
    primary: Resolution;
    rightCol: Resolution;
    rightColBottomSpace?: Resolution;
    rightColCroppedHeight: number;
  };

  /** Cropped images size in kB */
  imageSize: {
    primary: number;
    rightCol: number;
    rightColCropped: number;
    /** Will hold value for original and original resized */
    // original: number;
  };
}

export interface ArtworkShowcaseData extends MeasuresData {
  isLoaded: boolean;
  isMeasured: boolean;
  bottomRightSpaceChecked: boolean;

  panelElementRefs: {
    primaryImg: HTMLImageElement | null;
    rightColImg: HTMLImageElement | null;
    rightColContainer: HTMLDivElement | null;
  };
}

export interface ArtworkShowcaseDefs {
  artwork: ArtworkShowcaseData;
  setArtwork: (value: Partial<ArtworkShowcaseData>) => void;
}
