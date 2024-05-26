import { useEffect, useRef } from "react";
import useGlobalStore from "../../../store/useGlobalStore";
import measureArtworkMedia from "../../../functions/artwork/measureArtworkMedia";

export default function ArtworkPanel() {
  const primaryImgRef = useRef<HTMLImageElement>(null);
  const rightColImgRef = useRef<HTMLImageElement>(null);
  const rightColContainerRef = useRef<HTMLImageElement>(null);
  const { file, artwork, setArtwork, setStatus } = useGlobalStore();
  function statusCallback(message: string) {
    setStatus(message);
  }

  // Used as an event listener for triggering image measurement
  // and loading it on tab change
  useEffect(() => {
    (async () => {
      if (!artwork.isMeasured && file.data) {
        // Pass the image elements to be used for the measurement
        setStatus("Measuring, please wait....");
        const measuredData = await measureArtworkMedia(primaryImgRef.current!, rightColImgRef.current!, file, statusCallback);

        setArtwork({
          isMeasured: true,
          ...measuredData,
        });

        setStatus("Done");
      }
    })();
  }, [file, setArtwork, setStatus, artwork]);

  useEffect(() => {
    // Pass refs to panel elements
    setArtwork({
      panelElementRefs: {
        primaryImg: primaryImgRef.current,
        rightColImg: rightColImgRef.current,
        rightColContainer: rightColContainerRef.current,
      },
    });
  }, [setArtwork]);

  return (
    <>
      <div className="profile_customization myart">
        {/* <div className="profile_customization_header">Artwork Showcase</div> */}

        <div className="profile_customization_block">
          <div className="screenshot_showcase">
            <div className="screenshot_showcase_primary showcase_slot">
              <div className="screenshot_showcase_screenshot modalContentLink">
                <img width="100%" src={artwork.imageLinks.primary} ref={primaryImgRef} />
              </div>
              <div className="screenshot_showcase_itemname"> </div>
              <div className="screenshot_showcase_stats"></div>
            </div>
            <div
              className="screenshot_showcase_rightcol"
              ref={rightColContainerRef}
            >
              <div className="screenshot_showcase_smallscreenshot showcase_slot">
                <div className="screenshot_showcase_screenshot modalContentLink">
                  <img
                    width="100%"
                    style={{ maxWidth: "100px" }}
                    src={
                      artwork.bottomRightSpaceChecked
                        ? artwork.imageLinks.rightColCropped
                        : artwork.imageLinks.rightCol
                    }
                    ref={rightColImgRef}
                  />
                </div>
              </div>
              {/* 
                In case we decide to do something with the other images,
                we leave this commented out for now 
              */}
              {/* <div className="screenshot_showcase_smallscreenshot showcase_slot">
                <a
                  className="screenshot_showcase_screenshot modalContentLink"
                  href="#"
                >
                  <img
                    width="100%"
                    style={{ maxWidth: "100px" }}
                    src="./img/3.jpg"
                  />
                </a>
              </div>
              <div className="screenshot_showcase_smallscreenshot showcase_slot">
                <a
                  className="screenshot_showcase_screenshot modalContentLink"
                  href="#"
                >
                  <img
                    width="100%"
                    style={{ maxWidth: "100px" }}
                    src="./img/4.jpg"
                  />
                </a>
              </div> */}
              <div className="screenshot_showcase_smallscreenshot screenshot_count">
                <div className="screenshot_showcase_screenshot">+ 1</div>
              </div>
            </div>
            <div style={{ clear: "both" }}></div>
          </div>
        </div>
      </div>
    </>
  );
}
