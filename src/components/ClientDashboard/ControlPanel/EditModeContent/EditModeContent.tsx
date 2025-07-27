import { useState } from "react";
import styles from "./EditModeContent.module.css";
import { useRegexContext } from "@/hooks/useRegexContext";

export const EditModeContent = () => {
  const [newLabel, setNewLabel] = useState("");
  const [newPattern, setNewPattern] = useState("");
  const { addRegex, state } = useRegexContext();

  console.log(state, "state");

  const handleAddPattern = () => {
    addRegex({
      label: newPattern,
      pattern: newPattern,
      isApproved: false,
    });
    setNewLabel("");
    setNewPattern("");
  };

  return (
    <div className={styles.editModeContent}>
      <div className={styles.newPatternInputWrapper}>
        <input
          type="text"
          placeholder="Enter new regex pattern"
          className={styles.input}
          value={newPattern}
          onChange={(e) => setNewPattern(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter a description"
          className={styles.input}
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
        />
        <button className={styles.addButton} onClick={handleAddPattern}>
          Add
        </button>
      </div>
    </div>
  );
};
