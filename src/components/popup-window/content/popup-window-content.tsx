// CSS styles are located inside 'popup-window.css'

import { PropsWithChildren } from "react";
import useGlobalStore from "../../../store/useGlobalStore";

interface IPopupWindowContentProps extends PropsWithChildren {
  footerButtons?: TFooterButton[];
  defaultCancelButton?: boolean;
  defaultCancelOnClick?: () => void;
}

export type TFooterButton = {
  text: string;
  onClick: () => void;
};

export function PopupWindowContent(props: IPopupWindowContentProps) {
  const { setPopupWindowOpen } = useGlobalStore();
  const { defaultCancelButton = true } = props;

  let defaultCancelOnClick = props.defaultCancelOnClick;
  if (!defaultCancelOnClick) {
    defaultCancelOnClick = () => {
      setPopupWindowOpen(false);
    };
  }

  return (
    <>
      <div className="popup-window-content">{props.children ?? <h1>NO_CONTENT</h1>}</div>
      <div className="popup-window-footer-buttons">
        {props.footerButtons?.map((btn, index) => {
          return (
            <button key={index} className="old-button" onClick={btn.onClick}>
              {btn.text}
            </button>
          );
        })}
        {defaultCancelButton && (
          <button className="old-button" onClick={defaultCancelOnClick}>
            Cancel
          </button>
        )}
      </div>
    </>
  );
}
