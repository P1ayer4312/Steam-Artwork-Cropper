import { Resolution } from "../../store/types/artworkShowcaseData";
import gifsicle from "gifsicle-wasm-browser";
import getGifInfo from "./getGifInfo";
import extractGifFrames from "./extractGifFrames";

export type TGifProps = {
  imageData: File | Blob | ArrayBuffer;
  offset?: number;
  resolution?: Resolution;
  resize?: Resolution;
};

export async function cropGif(gifProps: TGifProps) {
  const gifData = gifProps.imageData;

  const gifInfo = await getGifInfo(gifData);
  const items = await extractGifFrames(gifData);
  console.log("info:", gifInfo);
  console.log("frames:", items);

  if (gifProps.resize) {
    return await gifsicle
      .run({
        input: [
          {
            file: gifProps.imageData,
            name: "1.gif",
          },
        ],
        command: [
          `1.gif --colors 256 --resize ${gifProps.resize.width}x${gifProps.resize.height} -o /out/out.gif`,
        ],
      })
      .then((res) => res[0]);
  }

  if (gifProps.resolution && "offset" in gifProps) {
    const data = await gifsicle.run({
      input: [
        {
          file: gifData,
          name: "1.gif",
        },
      ],
      command: [
        `--crop ${gifProps.offset},0+${gifProps.resolution.width}x${gifProps.resolution.height} 1.gif -o /out/out.gif`,
      ],
    });

    return new Promise<string>((resolve) => {
      const fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result as string);
      };

      fr.readAsDataURL(data[0]);
    });
  }

  throw new Error("Missing values. Either send 'resize', or send 'resolution' with optional 'offset'");
}
