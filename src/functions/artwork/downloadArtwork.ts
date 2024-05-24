import JSZip from "jszip";
import download from "downloadjs";

export default async function downloadArtwork(
  imgName: string
  // primaryImgDataUrl?: string,
  // rightColImgDataUrl?: string
) {
  const zip = new JSZip();
  await zip.generateAsync({ type: "base64" }).then((content) => {
    const zipName = `${imgName.split(".")[0]}_${new Date().getTime()}.zip`;
    download(content, zipName);
  });
}
