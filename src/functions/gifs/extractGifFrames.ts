import { gifsicleExec, TGifData } from "./gifsicleExec";

export default async function extractGifFrames(gif: TGifData): Promise<File[]> {
  const { gifs } = await gifsicleExec({
    gifFiles: [
      {
        file: gif,
        name: "1.gif",
      },
    ],
    command: ["--explode -o /out/out.gif 1.gif"],
  });

  return gifs.filter((el) => el);
}
