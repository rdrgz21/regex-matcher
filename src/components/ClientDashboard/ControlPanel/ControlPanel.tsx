import { ReactElement, useState } from "react";
import { EditModeContent } from "./EditModeContent";
import { ApprovalModeContent } from "./ApprovalModeContent";
import styles from "./ControlPanel.module.css";

type Mode = "edit" | "approval";

export const ControlPanel = (): ReactElement => {
  const [mode, setMode] = useState<Mode>("edit");

  const isEditMode = mode === "edit";

  return (
    <div className={styles.controlPanel}>
      <div className={styles.modeToggle}>
        <button
          className={isEditMode ? styles.active : ""}
          onClick={() => setMode("edit")}
        >
          Edit Mode
        </button>

        <button
          className={!isEditMode ? styles.active : ""}
          onClick={() => setMode("approval")}
        >
          Approval Mode
        </button>
      </div>

      <div className={styles.modeContent}>
        {" "}
        {isEditMode ? <EditModeContent /> : <ApprovalModeContent />}
      </div>
    </div>
  );
};
