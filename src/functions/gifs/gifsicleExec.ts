import gifsicle from "../../modules/gifsicle.min";

type TGifFile = {
  file: TGifData;
  name: string;
};

type TGifsicleExecProps = {
  gifFiles: TGifFile[];
  command: string[];
};

type TGifsicleResolve = {
  gifs: File[];
  outputLogs: string[];
};

export type TGifData = File | Blob | ArrayBuffer;

export function gifsicleExec(props: TGifsicleExecProps): Promise<TGifsicleResolve> {
  return gifsicle.run({
    input: props.gifFiles,
    command: props.command,
  }) as Promise<TGifsicleResolve>;
}
