import CustomCanvas from "../../classes/CustomCanvas";
import getComputedValueFor from "../getComputedValueFor";
import getImageFileSize from "../getImageFileSize";
import { MeasuresData, Resolution } from "../../store/types/artworkShowcaseData";
import { FileData } from "../../store/types/useGlobalStore";
import { cropGif } from "../cropGif";

export default async function measureArtworkMedia(
  primaryImg: HTMLImageElement,
  rightColImg: HTMLImageElement,
  file: FileData,
  statusCallback: (message: string) => void = () => {}
): Promise<MeasuresData> {
  return await new Promise((resolve) => {
    /**
     * TODO: Some resolutions are not displayed correctly, needs to be checked
     * TODO: Also code refactor
     */

    let fileWidth = file.width;
    let fileHeight = file.height;
    let imgDataUrl: string = file.dataUrl!;
    let originalResizedValues: Resolution | undefined = undefined;
    const tempImg = new Image();
    tempImg.src = imgDataUrl;

    // Check if the image is too small for the panel and upscale it
    if (tempImg.width < 618) {
      // If the image is small try to upscale it by 2. If that is too small,
      // default it to 620 to not cause size issues.
      fileWidth *= 2;
      if (fileWidth < 618) {
        fileWidth = 620;
      }

      fileHeight = Math.round((fileWidth * file.height) / file.width);
      const resizedImgCanvas = new CustomCanvas(null, fileWidth, fileHeight);
      resizedImgCanvas.drawImage(tempImg, 0, 0, fileWidth, fileHeight);

      tempImg.src = imgDataUrl = resizedImgCanvas.toDataURL();
      originalResizedValues = {
        width: fileWidth,
        height: fileHeight,
      };
    }

    const steamHeight = Math.round((fileHeight * 618) / fileWidth);
    const primaryImgWidth = Math.round((fileHeight * 508) / steamHeight);
    const rightColImgWidth = Math.round((fileHeight * 102) / steamHeight);

    const primaryImgCanvas = new CustomCanvas(primaryImg, primaryImgWidth, fileHeight);
    const rightColImgCanvas = new CustomCanvas(rightColImg, rightColImgWidth, fileHeight);

    primaryImgCanvas.fillSolid();
    rightColImgCanvas.fillSolid();

    primaryImg.src = primaryImgCanvas.toDataURL();
    rightColImg.src = rightColImgCanvas.toDataURL();

    function checkResolutions() {
      // Measure current images on the DOM
      const primaryImgHeight = Math.round(getComputedValueFor(primaryImg, "height") as number);

      const rightColImgHeight = Math.round(getComputedValueFor(rightColImg, "height") as number);

      if (primaryImgHeight !== rightColImgHeight) {
        if (rightColImgHeight < primaryImgHeight) {
          rightColImgCanvas.decreaseWidth();
          primaryImgCanvas.increaseWidth();
        } else {
          primaryImgCanvas.decreaseWidth();
        }
      } else {
        primaryImg.removeEventListener("load", checkResolutions);
        displayImages();
      }
    }

    async function displayImages() {
      const rightColOffset = rightColImgCanvas.canvas.width - fileWidth;
      primaryImgCanvas.drawImage(tempImg, 0, 0);
      rightColImgCanvas.drawImage(tempImg, rightColOffset, 0);

      const imgType = file.fileType;
      let primaryImgDataUrl: string;
      let rightColImgDataUrl: string;

      if (file.fileType === "image/gif") {
        let gifData = file.data!;

        // Check if the gif needs to be resized first
        if (originalResizedValues) {
          statusCallback("Resizing main gif...");
          gifData = (await cropGif({
            imageData: gifData,
            resize: originalResizedValues,
          })) as File;
        }

        statusCallback("Cropping gifs... (1/2)");
        primaryImgDataUrl = (await cropGif({
          imageData: gifData,
          offset: 0,
          resolution: {
            width: primaryImgCanvas.canvas.width,
            height: fileHeight,
          },
        })) as string;

        statusCallback("Cropping gifs... (2/2)");
        rightColImgDataUrl = (await cropGif({
          imageData: gifData,
          offset: Math.abs(rightColOffset) - 2,
          resolution: {
            width: rightColImgCanvas.canvas.width,
            height: fileHeight,
          },
        })) as string;
      } else {
        primaryImgDataUrl = primaryImgCanvas.toDataURL(imgType, 1);
        rightColImgDataUrl = rightColImgCanvas.toDataURL(imgType, 1);
      }

      const measuredData: MeasuresData = {
        imageLinks: {
          primary: primaryImgDataUrl,
          rightCol: rightColImgDataUrl,
          rightColCropped: undefined,
        },
        imageResolutions: {
          rightColCroppedHeight: 0,
          primary: {
            width: primaryImgCanvas.canvas.width,
            height: primaryImgCanvas.canvas.height,
          },
          rightCol: {
            width: rightColImgCanvas.canvas.width,
            height: rightColImgCanvas.canvas.height,
          },
          originalResized: originalResizedValues,
        },
        imageSize: {
          primary: getImageFileSize(primaryImgDataUrl),
          rightCol: getImageFileSize(rightColImgDataUrl),
          rightColCropped: 0,
          // original: getImageFileSize(imgDataUrl),
        },
      };

      // Return measured values to be stored into the useGlobalContext
      resolve(measuredData);
    }

    // We'll use the bigger image as a loop to check if we have the desired values
    primaryImg.addEventListener("load", checkResolutions);
  });
}
