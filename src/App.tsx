import "./assets/css/buttons.css";
import "./assets/css/old_buttons.css";
import "./assets/css/globalv2.css";
import "./assets/css/profile.css";
import "./assets/css/profilev2.css";
import "./assets/css/shared_global.css";
import "./assets/css/shared_responsive.css";
import "./assets/css/scrollbar.css";
import ProfileTemplate from "./components/profile/profile-template";
import SmallWindowDialog from "./components/dialog/small-window-dialog";

function App() {
  return (
    <SmallWindowDialog>
      <ProfileTemplate />
    </SmallWindowDialog>
  );
}

export default App;
