import { Props, Rnd } from "react-rnd";
import "./popup-window.css";

type TPopupWindowProps = {
  title: string;
  closeButton?: boolean;
  posX?: number;
  posY?: number;
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  onCloseClicked: () => void;
  onDragStop: (posX: number, posY: number) => void;
  onResizeStop: (width: number, height: number) => void;
};

export default function PopupWindow(props: TPopupWindowProps) {
  if (!props.onCloseClicked || !props.onDragStop || !props.onResizeStop) {
    throw new Error("Missing callback functions");
  }

  const {
    title = "NO_TITLE_PROVIDED",
    closeButton = true,
    width = 500,
    height = 400,
    minWidth = 500,
    minHeight = 400,
    posX = 100,
    posY = 50,
  } = props;

  const rndConfig: Props = {
    className: "popup-window-wrapper",
    dragHandleClassName: "popup-window-draggable",
    bounds: "parent",
    style: { cursor: "unset" },
    resizeHandleStyles: {
      right: { cursor: "ew-resize" },
      left: { cursor: "ew-resize" },
      top: { cursor: "ns-resize" },
      bottom: { cursor: "ns-resize" },
    },
    default: {
      x: posX,
      y: posY,
      width: width,
      height: height,
    },
    minWidth: minWidth,
    minHeight: minHeight,
    onDragStop: (_, data) => props.onDragStop(data.x, data.y),
    onResizeStop: (...args) => {
      const fix = (value: string) => Number(value.slice(0, -2));
      const element = args[2];
      props.onResizeStop(fix(element.style.width), fix(element.style.height));
    },
  };

  return (
    <Rnd {...rndConfig}>
      <img src="./img/steam-logo-disconnect.jpg" alt="" />
      <div className="popup-window-draggable">
        <span>{title}</span>
        {closeButton && (
          <button className="old-button" onClick={props.onCloseClicked}>
            ✖
          </button>
        )}
      </div>
      <h1>Hello :D</h1>
    </Rnd>
  );
}
