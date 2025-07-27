import styles from "./ApprovalModeContent.module.css";
import { useRegexContext } from "@/hooks/useRegexContext";

export const ApprovalModeContent = () => {
  const { state, selectPattern, approvePattern } = useRegexContext();

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    selectPattern(value);
  };

  return (
    <div className={styles.approvalModeContent}>
      <label className={styles.label}>
        Select Regex Pattern:
        <select
          value={state.selectedPattern ?? ""}
          onChange={handleSelect}
          className={styles.select}
        >
          <option value="" disabled>
            Choose a pattern
          </option>

          <optgroup label="⌛ Unapproved ⌛">
            {state.regexList
              .filter((r) => !r.isApproved)
              .map((pattern) => (
                <option key={pattern.pattern} value={pattern.pattern}>
                  {pattern.pattern}
                </option>
              ))}
          </optgroup>

          <optgroup label="✅ Approved ✅">
            {state.regexList
              .filter((r) => r.isApproved)
              .map((pattern) => (
                <option key={pattern.pattern} value={pattern.pattern}>
                  {pattern.pattern}
                </option>
              ))}
          </optgroup>
        </select>
      </label>
      <button
        className={styles.approveButton}
        onClick={() => approvePattern(state.selectedPattern ?? null)}
      >
        Approve
      </button>
    </div>
  );
};
