import { useState } from "react";
import styles from "./EditModeContent.module.css";
import { useRegexContext } from "@/hooks/useRegexContext";
import { PatternList } from "./PatternList";
import { validateAndDispatch } from "@/utils/validateAndDispatch/validateAndDispatch";

export const EditModeContent = () => {
  const [newLabel, setNewLabel] = useState("");
  const [newPattern, setNewPattern] = useState("");
  const { state, addRegex } = useRegexContext();

  const handleAdd = () => {
    if (!newPattern || !newLabel) return;

    validateAndDispatch(newPattern, state.regexList, () => {
      addRegex({
        label: newLabel,
        pattern: newPattern,
        isApproved: false,
      });
    });

    setNewLabel("");
    setNewPattern("");
  };

  // TODO: Add reducer for approved and unapproved patterns
  const approved = state.regexList.filter((r) => r.isApproved);
  const unapproved = state.regexList.filter((r) => !r.isApproved);

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
        <button className={styles.addButton} onClick={handleAdd}>
          Add
        </button>
      </div>

      {state.regexList.length === 0 && (
        <p className={styles.noPatterns}>No patterns added yet</p>
      )}

      {unapproved.length > 0 && (
        <PatternList patterns={unapproved} title="Unapproved Patterns" />
      )}

      {approved.length > 0 && (
        <PatternList patterns={approved} title="Approved Patterns" />
      )}
    </div>
  );
};
