type TMediaType = "gif" | "image" | "video";

/**
 * Determine if the input file is a gif, image or video
 * @param mimeType
 * @returns
 */
export default function mediaType(mimeType: string): TMediaType {
  if (mimeType === "image/gif") {
    return "gif";
  }

  const temp = mimeType.split("/")[0];

  if (temp === "video") {
    return "video";
  }

  if (temp === "image") {
    return "image";
  }

  throw new Error("Unsupported file type");
}
