import { useEffect, useState } from "react";
import useGlobalStore from "../../../../store/useGlobalStore";
import { TFooterButton, PopupWindowContent } from "../../../popup-window/content/popup-window-content";
import "./artwork-image-editor.css";
import { AreaSelector, IArea } from "@bmunozg/react-image-area";

export default function ArtworkImageEditor() {
  const { file, popupWindowData } = useGlobalStore();
  const [areas, setAreas] = useState<IArea[]>([]);

  const buttons: TFooterButton[] = [
    {
      text: "OK",
      onClick: () => {
        alert(1);
      },
    },
  ];

  function onChangeHandler(areas: IArea[]) {
    setAreas(areas);
  }

  function clearArea() {
    setAreas([]);
  }

  useEffect(() => {
    // Listen to window resize and clear the area to avoid buggy selection
    clearArea();
  }, [popupWindowData]);

  return (
    <PopupWindowContent footerButtons={buttons}>
      <h1>Do something idk</h1>
      <div className="aie-container">
        <div className="aie-img-col">
          <AreaSelector
            mediaWrapperClassName="aie-img-area-selector"
            maxAreas={1}
            areas={areas}
            onChange={onChangeHandler}
          >
            <img src={file.dataUrl} />
          </AreaSelector>
        </div>
        <div className="aie-controls-col">
          <button className="old-button" onClick={clearArea}>
            Clear Selection
          </button>
        </div>
      </div>
    </PopupWindowContent>
  );
}
