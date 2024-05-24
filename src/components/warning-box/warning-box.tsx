import { PropsWithChildren } from "react";
import "./warning-box.css";

type TextData = {
  text: string;
  highlighted?: boolean;
};

export interface WarningBoxProps extends PropsWithChildren {
  title?: string;
  textContent: TextData[];
}

export default function WarningBox(props: WarningBoxProps) {
  return (
    <div className="warning-box-wrapper">
      {props.title && <p className="warning-box-title">{props.title}</p>}
      <div className="warning-box-text">
        {props.textContent.map((el, index) => {
          const textClass = el.highlighted ? "warning-box-text-highlighted" : undefined;
          return (
            <span key={index} className={textClass}>
              {" "}
              {el.text}
            </span>
          );
        })}
      </div>
    </div>
  );
}
