// Wrapper component used for handling which advanced menu to be
// shown based on selected panel and type of media

import useGlobalStore from "../../../store/useGlobalStore";
import ArtworkGifEditor from "../../advanced-tools/artwork/artwork-gif-editor/artwork-gif-editor";
import ArtworkImageEditor from "../../advanced-tools/artwork/artwork-image-editor/artwork-image-editor";

export default function AdvancedToolsHandler() {
  const { file, activeTab } = useGlobalStore();

  if (activeTab === "artwork") {
    switch (file.mediaType) {
      case "gif":
        return <ArtworkGifEditor />;
      case "image":
        return <ArtworkImageEditor />;
      default:
        return <h1>BAD_FILE_TYPE</h1>;
    }
  }

  return <h1>ADD_ALL_CASES</h1>;
}
