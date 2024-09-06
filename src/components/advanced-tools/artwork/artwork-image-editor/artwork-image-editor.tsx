import { useEffect, useRef, useState } from "react";
import useGlobalStore from "../../../../store/useGlobalStore";
import { TFooterButton, PopupWindowContent } from "../../../popup-window/content/popup-window-content";
import "./artwork-image-editor.css";
import { AreaSelector, IArea } from "@bmunozg/react-image-area";
import CustomCanvas from "../../../../classes/CustomCanvas";
import { ArtworkImageGaps, TArtworkImageGapsDirection } from "./artwork-image-gaps/artwork-image-gaps";
import Checkbox from "../../../old-checkbox/checkbox";

export default function ArtworkImageEditor() {
  // TODO: Convert the selection area to be the same size as the artwork panel

  const { file, popupWindowData, reset, setAdvancedEditorData, advancedEditorData } = useGlobalStore();
  const imgRef = useRef<HTMLImageElement>(null);
  const [areas, setAreas] = useState<IArea[]>([]);
  const [imageUrl, setImageUrl] = useState<string>(file.dataUrl!);
  const [gaps, setGaps] = useState<TArtworkImageGapsDirection>({ left: false, right: true });

  const buttons: TFooterButton[] = [
    {
      text: "OK",
      onClick: () => {
        // alert(1);
        applyChanges();
      },
    },
  ];

  function onChangeHandler(areas: IArea[]) {
    setAreas(areas);
  }

  function clearArea() {
    setAreas([]);
  }

  function previewSelection() {
    const { x, y, width, height } = areas[0];
    const img = imgRef.current!;
    const imgWidth = img.width;
    const imgHeight = img.height;
    const temp = new Image();
    temp.src = file.dataUrl!;

    const canvas = new CustomCanvas(null, width, height);
    canvas.drawImage(temp, -x, -y, imgWidth, imgHeight);
    setImageUrl(canvas.toDataURL(file.fileType, 1));
    clearArea();
  }

  function resetButton() {
    clearArea();
    setImageUrl(file.dataUrl!);
    setGaps({ left: false, right: true });
  }

  function applyChanges() {
    // TODO: Fix resolution n stuff
    reset();
    setAdvancedEditorData({
      isMediaEdited: true,
      artwork: {
        gaps: gaps,
        imageData: {
          dataUrl: imageUrl,
          data: undefined,
          fileType: file.fileType,
          width: imgRef.current!.width,
          height: imgRef.current!.height,
          mediaType: file.mediaType,
          name: file.name,
        },
        area: areas,
      },
    });
  }

  useEffect(() => {
    // Listen to window resize and clear the area to avoid buggy selection
    clearArea();
  }, [popupWindowData]);

  useEffect(() => {
    // Load saved changes from before if present
    if (advancedEditorData.isMediaEdited) {
      const saved = advancedEditorData.artwork;
      setAreas(saved.area);
      setImageUrl(saved.imageData?.dataUrl as string);
      setGaps(saved.gaps);
    }
  }, [advancedEditorData.artwork, advancedEditorData.isMediaEdited]);

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
            <img className="aie-img-element" ref={imgRef} src={imageUrl} />
            <ArtworkImageGaps gaps={gaps} />
          </AreaSelector>
        </div>
        <div className="aie-controls-col">
          <button className="old-button" onClick={resetButton}>
            Reset
          </button>
          <br />
          <button className="old-button" onClick={previewSelection} disabled={areas.length == 0}>
            Preview Selection
          </button>
          <br />
          <Checkbox
            id="gap-right"
            checked={gaps.right}
            onClick={() => setGaps((state) => ({ ...state, right: !state.right }))}
          >
            Show right gap
          </Checkbox>
          <Checkbox
            id="gap-left"
            checked={gaps.left}
            onClick={() => setGaps((state) => ({ ...state, left: !state.left }))}
          >
            Show left gap
          </Checkbox>
        </div>
      </div>
    </PopupWindowContent>
  );
}
