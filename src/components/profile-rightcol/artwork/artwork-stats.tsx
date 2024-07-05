import { useRef, useState } from "react";
import Checkbox from "../../old-checkbox/checkbox";
import OptionsTable from "../../options-table/options-table";
import "./artwork-stats.css";
import downloadArtwork from "../../../functions/artwork/downloadArtwork";
import useGlobalStore from "../../../store/useGlobalStore";
import measureArtworkBottomRightSpace from "../../../functions/artwork/measureArtworkBottomRightSpace";
import WarningBox from "../../warning-box/warning-box";

function formatResolution(value: { width: number; height: number }) {
  return `${value.width} x ${value.height}`;
}

export default function ArtworkStats() {
  const checkboxRef = useRef<HTMLInputElement>(null);
  const [disableCheckbox, setDisableCheckbox] = useState<boolean>(false);
  const { artwork, file, setArtwork, setStatus } = useGlobalStore();

  // Get the width used for the "original" image
  const imgWidth = artwork.imageResolutions.originalResized
    ? artwork.imageResolutions.originalResized.width
    : file.width;

  const leftOffsetValue = artwork.isMeasured
    ? imgWidth - artwork.imageResolutions.rightCol.width
    : 0;

  async function measureBottomSpace() {
    // Measure bottom space if the image is measured first. This also disables
    // the checkbox if there's no file selected
    if (
      artwork.isMeasured &&
      artwork.imageLinks.rightColCropped === undefined
    ) {
      // Prevent checkbox spam
      setDisableCheckbox(true);
      setStatus("Measuring, please wait....");

      // Measure the bottom space and store the cropped image string
      // prettier-ignore
      const { rightColDataUrl, rightColHeight, rightColSize } = 
        await measureArtworkBottomRightSpace(artwork, file);

      // Update the right col image state
      setArtwork({
        bottomRightSpaceChecked: !artwork.bottomRightSpaceChecked,
        imageLinks: {
          ...artwork.imageLinks,
          rightColCropped: rightColDataUrl,
        },
        imageResolutions: {
          ...artwork.imageResolutions,
          rightColCroppedHeight: rightColHeight,
        },
        imageSize: {
          ...artwork.imageSize,
          rightColCropped: rightColSize,
        },
      });

      setDisableCheckbox(false);
      setStatus("Done");
    } else {
      setArtwork({ bottomRightSpaceChecked: !artwork.bottomRightSpaceChecked });
    }
  }

  return (
    <div className="profile_rightcol">
      <div className="responsive_status_info">
        <WarningBox
          title="Warning"
          textContent={[
            {
              text: "The image is above 8MB and you won't be able to add it to Steam.",
            },
            {
              text: "It can be cropped but it won't be able to be uploaded.",
              highlighted: true,
            },
            {
              text: "That's all :D",
            },
          ]}
        />
        <OptionsTable
          tableHead={{ key: "PANEL DATA", value: "VALUE" }}
          tableBody={[
            {
              key: "Original Image",
              value: formatResolution({
                width: file.width,
                height: file.height,
              }),
            },
            artwork.imageResolutions.originalResized
              ? {
                  key: "Original Resized",
                  value: formatResolution(
                    artwork.imageResolutions.originalResized
                  ),
                }
              : {
                  key: undefined,
                  value: undefined,
                },
            {
              key: "Big Image",
              value: formatResolution(artwork.imageResolutions.primary),
            },
            {
              key: "Small Image",
              value: artwork.bottomRightSpaceChecked
                ? formatResolution({
                    width: artwork.imageResolutions.rightCol.width,
                    height: artwork.imageResolutions.rightColCroppedHeight,
                  })
                : formatResolution(artwork.imageResolutions.rightCol),
            },
            { key: "Left Offset", value: `${leftOffsetValue}` },
            {
              key: "Big Image Size",
              value: `${artwork.imageSize.primary} kB`,
            },
            {
              key: "Small Image Size",
              value: `${
                artwork.bottomRightSpaceChecked
                  ? artwork.imageSize.rightColCropped
                  : artwork.imageSize.rightCol
              } kB`,
            },
          ]}
        />
        <Checkbox
          id="bottomRightSpace"
          ref={checkboxRef}
          onClick={measureBottomSpace}
          checked={artwork.bottomRightSpaceChecked}
          disabled={disableCheckbox}
        >
          Bottom right space
        </Checkbox>

        <button
          className="old-button artwork-stats-dl-btn"
          onClick={() => {
            const fileName = file.name;
            downloadArtwork(fileName);
          }}
          disabled={file.data === undefined}
        >
          Download Images
        </button>

        {/* <div className="profile_in_game persona online">
          <div className="profile_in_game_header">Currently Online</div>
        </div>
        <div className="profile_ban_status">
          <div className="profile_ban">
            1 VAC ban on record{" "}
            <span className="profile_ban_info">
              |{" "}
              <a className="whiteLink" href="#" target="_blank" rel="">
                Info
              </a>
            </span>
          </div>
          1023 day(s) since last ban
          <div>
            <a className="whiteLink" href="#">
              View Ban History
            </a>
          </div>
        </div> */}
      </div>

      {/* <div className="responsive_count_link_area">
        <div className="profile_item_links">
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Games</span>
              &nbsp;
              <span className="profile_count_link_total"> 323 </span>
            </a>
          </div>
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Inventory</span>
              &nbsp;
              <span className="profile_count_link_total">&nbsp;</span>
            </a>
          </div>
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Screenshots</span>
              &nbsp;
              <span className="profile_count_link_total"> 138 </span>
            </a>
          </div>
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Videos</span>
              &nbsp;
              <span className="profile_count_link_total">&nbsp;</span>
            </a>
          </div>
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Workshop Items</span>
              &nbsp;
              <span className="profile_count_link_total"> 5 </span>
            </a>
          </div>
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Reviews</span>
              &nbsp;
              <span className="profile_count_link_total"> 17 </span>
            </a>
          </div>
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Guides</span>
              &nbsp;
              <span className="profile_count_link_total"> 1 </span>
            </a>
          </div>
          <div className="profile_count_link ellipsis">
            <a href="#">
              <span className="count_link_label">Artwork</span>
              &nbsp;
              <span className="profile_count_link_total"> 5 </span>
            </a>
          </div>
          <div style={{ clear: "left" }}></div>
        </div>
      </div> */}
    </div>
  );
}
