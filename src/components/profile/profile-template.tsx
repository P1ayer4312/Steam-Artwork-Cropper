// Main component for the Steam profile

import useGlobalStore from "../../store/useGlobalStore";
import ArtworkPanel from "../panel/artwork/artwork-panel";
import WorkshopPanel from "../panel/workshop/workshop-panel";
import AdvancedToolsHandler from "../popup-window/advanced-tools-handler/advanced-tools-handler";
import PopupWindow from "../popup-window/parent/popup-window";
import ArtworkStats from "../profile-rightcol/artwork/artwork-stats";
import ProfileContentNavButtons from "./profile-content-navbar/profile-content-nav-buttons";
import ProfileHeader from "./profile-header/profile-header";
import "./profile-template.css";

export default function Profile() {
  const {
    activeTab,
    popupWindowOpen,
    setPopupWindowOpen,
    setPopupWindowPos,
    setPopupWindowSize,
    popupWindowData,
  } = useGlobalStore();

  return (
    <>
      <div className="responsive_page_frame with_header">
        <div className="responsive_page_menu_ctn localmenu">
          <div className="responsive_page_menu" id="responsive_page_local_menu">
            <div className="localmenu_content"></div>
          </div>
        </div>

        <div className="responsive_page_content">
          <div id="application_root">
            <div className="FullModalOverlay" style={{ display: "none" }}>
              <div className="ModalOverlayContent ModalOverlayBackground"></div>
            </div>
          </div>

          <div role="main" className="responsive_page_template_content" id="responsive_page_template_content">
            <div className="no_header profile_page">
              <ProfileHeader />
              {/* Profile content */}
              <div className="profile_content">
                <ProfileContentNavButtons />
                <div className="profile_content_border">
                  <div className="profile_content_inner">
                    <ArtworkStats />

                    <div className="profile_leftcol">
                      <div className="profile_customization_area">
                        {activeTab == "artwork" && <ArtworkPanel />}
                        {activeTab == "workshop" && <WorkshopPanel />}
                      </div>
                      <div>
                        <div className="recentgame_quicklinks">
                          View
                          <a className="whiteLink" href="#">
                            All Recently Played
                          </a>
                          <span className="link_separator">|</span>
                          <a className="whiteLink" href="#">
                            Wishlist
                          </a>
                          <span className="link_separator">|</span>
                          <a className="whiteLink" href="#">
                            Reviews
                          </a>
                        </div>
                        <div style={{ clear: "right" }}></div>
                      </div>
                      <div className="profile_comment_area">
                        <div className="commentthread_area">
                          <div className="commentthread_header">
                            <div className="commentthread_paging has_view_all_link">
                              <a className="commentthread_allcommentslink" href="#">
                                View all
                                <span>27</span>
                                comments
                              </a>
                              <a href="#" className="pagebtn disabled">
                                &lt;
                              </a>
                              <span className="commentthread_pagelinks">
                                <span className="commentthread_pagelink active">1</span>
                                <span className="commentthread_pagelink">2</span>
                                <span className="commentthread_pagelink">3</span>
                                <span className="commentthread_pagelink">4</span>
                                <span className="commentthread_pagelink">5</span>
                              </span>
                              <span className="commentthread_pagedropdown">
                                <select>
                                  <option value="0">1</option>
                                  <option value="1">2</option>
                                  <option value="2">3</option>
                                  <option value="3">4</option>
                                  <option value="4">5</option>
                                </select>
                              </span>
                              <a href="#" className="pagebtn">
                                &gt;
                              </a>
                            </div>
                            <div className="commentthread_count">
                              <span className="ellipsis commentthread_count_label">
                                <span className="commentthread_header_label">Comments</span>
                              </span>
                              <div className="commentthread_subscribe_ctn checked">
                                <span className="commentthread_subscribe_checkbox">
                                  <span className="commentthread_subscribe_check"></span>
                                </span>
                                <span className="commentthread_subscribe_desc">Subscribe to thread</span>
                              </div>
                              <span className="commentthread_subscribe_hint">
                                (<span className="commentthread_subscribe_hint_q">?</span>)
                              </span>
                            </div>
                            <div style={{ clear: "both" }}></div>
                          </div>
                        </div>
                      </div>
                      PA
                    </div>
                    <div style={{ clear: "both" }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {popupWindowOpen && (
          <PopupWindow
            title="Advanced Editor"
            onCloseClicked={() => setPopupWindowOpen(false)}
            onDragStop={setPopupWindowPos}
            onResizeStop={setPopupWindowSize}
            posX={popupWindowData.posX}
            posY={popupWindowData.posY}
            width={popupWindowData.width}
            height={popupWindowData.height}
          >
            <AdvancedToolsHandler />
          </PopupWindow>
        )}
      </div>
    </>
  );
}
