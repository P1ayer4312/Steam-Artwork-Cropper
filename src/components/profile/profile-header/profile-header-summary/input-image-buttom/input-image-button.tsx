import { useRef, ChangeEvent } from "react";
import "./input-image-button.css";
import useGlobalStore from "../../../../../store/useGlobalStore";
import parseMediaFile from "../../../../../functions/parseMediaFile";

export default function InputImageButton() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { file, setFile, reset } = useGlobalStore();

  function onOpenFileButtonClick() {
    inputFileRef.current?.click();
  }

  async function onInputFileChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;
    if (files && files[0]) {
      const file = files[0];
      const mediaData = await parseMediaFile(file);
      setFile({
        name: file.name,
        data: file,
        dataUrl: mediaData.dataUrl,
        height: mediaData.height,
        width: mediaData.width,
        fileType: file.type,
      });

      reset();
    }
  }

  return (
    <>
      <div className="input-image-wrapper">
        <p className="input-image-header">Select media file</p>
        <div className="input-image-box">
          <button className="old-button" onClick={onOpenFileButtonClick}>
            Open file
          </button>
          <div className="input-image-name">{file.name}</div>
          <input
            type="file"
            ref={inputFileRef}
            hidden
            style={{ display: "none" }}
            onChange={onInputFileChange}
            // TODO: Decide if we'll support more file types
            accept="image/png, image/jpeg, image/gif"
          />
        </div>
      </div>
    </>
  );
}
