import { IArea } from "@bmunozg/react-image-area";
import { FileData } from "./useGlobalStore";
import { TArtworkImageGapsDirection } from "../../components/advanced-tools/artwork/artwork-image-editor/artwork-image-gaps/artwork-image-gaps";

type AdvancedEditorProps = {
  // TODO: This might need to be refactored
  /** Used for checking if the user made any changes using the editor */
  isMediaEdited: boolean;
  artwork: {
    imageData: FileData | undefined;
    gaps: TArtworkImageGapsDirection;
    area: IArea[] | [];
  };
};

type AdvancedEditorData = {
  advancedEditorData: AdvancedEditorProps;
  setAdvancedEditorData: (value: Partial<AdvancedEditorProps>) => void;
};

export default AdvancedEditorData;

/*
artwork:
  imageData
  gaps:
    right
    left
    {{TDB: multi vertical gaps ?}}
  area







*/
