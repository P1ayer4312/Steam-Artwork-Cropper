import CustomCanvas from "../../classes/CustomCanvas";
import getComputedValueFor from "../getComputedValueFor";
import { ArtworkShowcaseData } from "../../store/types/artworkShowcaseData";
import getImageFileSize from "../getImageFileSize";

export type TMeasuredRightSpaceData = {
  rightColDataUrl: string;
  rightColHeight: number;
  rightColSize: number;
};

async function measureArtworkBottomRightSpace(artwork: ArtworkShowcaseData, imgType: string) {
  return new Promise<TMeasuredRightSpaceData>((resolve) => {
    const rightColImage = artwork.panelElementRefs.rightColImg!;
    const rightColContainer = artwork.panelElementRefs.rightColContainer!;

    const primaryImgHeight = getComputedValueFor(artwork.panelElementRefs.primaryImg!, "height") as number;
    const rightColCanvas = new CustomCanvas(
      rightColImage,
      artwork.imageResolutions.rightCol.width,
      artwork.imageResolutions.rightCol.height
    );

    rightColCanvas.fillSolid();

    function measureHeight() {
      const rightColContainerHeight = (getComputedValueFor(rightColContainer, "height") as number) - 13;
      if (primaryImgHeight < rightColContainerHeight) {
        rightColCanvas.decreaseHeight();
      } else {
        rightColImage.removeEventListener("load", measureHeight);

        const tempImg = new Image();
        tempImg.addEventListener("load", () => {
          rightColCanvas.drawImage(tempImg, 0, 0);
          const rightColDataUrl = rightColCanvas.toDataURL(imgType, 1);

          const returnData: TMeasuredRightSpaceData = {
            rightColDataUrl,
            rightColHeight: rightColCanvas.getHeight(),
            rightColSize: getImageFileSize(rightColDataUrl),
          };

          resolve(returnData);
        });

        tempImg.src = artwork.imageLinks.rightCol;
      }
    }

    rightColImage.addEventListener("load", measureHeight);
    measureHeight();
  });
}

export default measureArtworkBottomRightSpace;
