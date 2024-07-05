import CustomCanvas from "../../classes/CustomCanvas";
import getComputedValueFor from "../getComputedValueFor";
import { ArtworkShowcaseData } from "../../store/types/artworkShowcaseData";
import getImageFileSize from "../getImageFileSize";
import { FileData } from "../../store/types/useGlobalStore";

export type TMeasuredRightSpaceData = {
  rightColDataUrl: string;
  rightColHeight: number;
  rightColSize: number;
};

async function measureArtworkBottomRightSpace(
  artwork: ArtworkShowcaseData,
  file: FileData
) {
  return new Promise<TMeasuredRightSpaceData>((resolve) => {
    const rightColImage = artwork.panelElementRefs.rightColImg!;
    const rightColContainer = artwork.panelElementRefs.rightColContainer!;

    const primaryImgHeight = getComputedValueFor(
      artwork.panelElementRefs.primaryImg!,
      "height"
    ) as number;

    // Calculate the screenshots count box height and subtract it from
    // the cropped resolution to speed up the measurement
    const screenshotCountBox = Math.round(
      (60 * artwork.imageResolutions.rightCol.width) / 102
    );

    const rightColCanvas = new CustomCanvas(
      rightColImage,
      artwork.imageResolutions.rightCol.width,
      artwork.imageResolutions.rightCol.height - screenshotCountBox
    );

    rightColCanvas.fillSolid();

    function measureHeight() {
      const rightColContainerHeight =
        (getComputedValueFor(rightColContainer, "height") as number) - 13;
      if (primaryImgHeight < rightColContainerHeight) {
        rightColCanvas.decreaseHeight();
      } else {
        rightColImage.removeEventListener("load", measureHeight);

        const tempImg = new Image();
        tempImg.addEventListener("load", () => {
          rightColCanvas.drawImage(tempImg, 0, 0);
          const rightColDataUrl = rightColCanvas.toDataURL(file.fileType, 1);

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
