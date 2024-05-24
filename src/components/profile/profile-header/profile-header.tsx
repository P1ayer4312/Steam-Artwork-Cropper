import { useRef } from "react";
import ProfileHeaderSummary from "./profile-header-summary/profile-header-summary";
import getRandomIntInclusive from "../../../functions/getRandomIntInclusive";

export default function ProfileHeader() {
  const randomBadge = useRef<string>(
    `lvl_${getRandomIntInclusive(1, 52) * 100} ` + `lvl_plus_${getRandomIntInclusive(1, 9) * 10}`
  );

  return (
    <>
      <div className="profile_header_bg">
        <div className="profile_header_bg_texture">
          <div className="profile_header">
            <div className="profile_header_content">
              <a
                href="https://steamcommunity.com/profiles/76561198065287239"
                target="_blank"
                className="profile_header_centered_persona"
              >
                <div className="persona_name" style={{ fontSize: "24px" }}>
                  <span className="actual_persona_name">P1ayer</span>
                </div>

                <div className="header_real_name ellipsis">
                  <bdi>(ง'̀-'́)ง</bdi> <img className="profile_flag" src="./img/mk.gif" alt="" /> Macedonia, The
                  Former Yugoslav Republic of
                </div>
              </a>

              <div className="playerAvatar profile_header_size">
                <div className="playerAvatarAutoSizeInner">
                  <img alt="" src="./img/profile_img_full.jpg" />
                </div>
              </div>

              <div className="profile_header_badgeinfo">
                <div className="profile_header_badgeinfo_badge_area">
                  <span className="persona_level_btn">
                    <div className="persona_name persona_level">
                      Level{" "}
                      <div className={`friendPlayerLevel ${randomBadge.current}`}>
                        <span className="friendPlayerLevelNum">4312</span>
                      </div>
                    </div>
                  </span>
                  <div className="profile_header_badge">
                    <a
                      target="_blank"
                      rel="noopener"
                      href="https://github.com/P1ayer4312/steam-artwork-cropper"
                      className="favorite_badge"
                    >
                      <div className="favorite_badge_icon">
                        <img alt="" src="./img/github_logo.png" className="badge_icon small" />
                      </div>
                      <div className="favorite_badge_description">
                        <div className="name ellipsis">GitHub</div>
                        <div className="xp">500 XP</div>
                      </div>
                    </a>
                  </div>
                </div>
                {/* <div className="profile_header_actions">
                  <a className="btn_profile_action btn_medium" href="#">
                    <span>Edit Profile</span>
                  </a>
                </div> */}
              </div>

              <ProfileHeaderSummary />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
