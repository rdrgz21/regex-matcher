import { getMatchesForPattern } from "@/utils/getMatchesForPattern/getMatchesForPattern";
import styles from "./ApprovalModeContent.module.css";
import { useRegexContext } from "@/hooks/useRegexContext";

export const ApprovalModeContent = () => {
  const { state, selectPattern, approvePattern } = useRegexContext();

  console.log(state.extractedTerms, "extractedTerms");

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
              .map((regex) => (
                <option key={regex.pattern} value={regex.pattern}>
                  {`${regex.label}: ${regex.pattern}`}
                </option>
              ))}
          </optgroup>

          <optgroup label="✅ Approved ✅">
            {state.regexList
              .filter((r) => r.isApproved)
              .map((regex) => (
                <option key={regex.pattern} value={regex.pattern}>
                  {`${regex.label}: ${regex.pattern}`}
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

      {state.selectedPattern && (
        <div className={styles.selectedMatches}>
          <h3>Selected Pattern Matches:</h3>
          <strong>
            {state.regexList.find((r) => r.pattern === state.selectedPattern)
              ?.label ?? "Untitled"}
          </strong>
          <ul>
            {getMatchesForPattern(state.selectedPattern, state.textContent).map(
              (match, idx) => (
                <li key={idx}>{match}</li>
              )
            )}
          </ul>
        </div>
      )}

      <div className={styles.allMatches}>
        <h3>Approved Matches:</h3>
        <ul>
          {Object.entries(state.extractedTerms).map(([pattern, matches]) => {
            const regexObj = state.regexList.find((r) => r.pattern === pattern);
            const label = regexObj?.label || "Untitled";

            return (
              <div key={pattern}>
                <strong>{label}</strong>
                <ul>
                  {matches.map((match, idx) => (
                    <li key={idx}>{match}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
