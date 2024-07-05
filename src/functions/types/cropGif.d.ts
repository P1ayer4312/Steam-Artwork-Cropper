declare module "gifsicle-wasm-browser" {
  type FileData = {
    name: string;
    file: File | Blob | ArrayBuffer;
  };

  type GifsicleRunProps = {
    input: FileData[];
    command: string[];
  };

  class gifsicle {
    static run(props: GifsicleRunProps): Promise<File[]>;
  }

  export = gifsicle;
}
