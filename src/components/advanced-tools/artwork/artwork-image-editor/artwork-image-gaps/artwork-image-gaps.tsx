import "./artwork-image-gaps.css";

export type TArtworkImageGaps = {
  gaps: TArtworkImageGapsDirection;
};

export type TArtworkImageGapsDirection = {
  right: boolean;
  left: boolean;
  // top: boolean;
  // bottom: boolean;
};

/**
 * Component used for visualizing the gaps of an image
 */
export function ArtworkImageGaps(props: TArtworkImageGaps) {
  return (
    <>
      {props.gaps.right && <div className="aie-gaps aie-gaps-right" />}
      {props.gaps.left && <div className="aie-gaps aie-gaps-left" />}
    </>
  );
}
