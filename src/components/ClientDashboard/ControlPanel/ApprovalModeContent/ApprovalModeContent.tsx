"use client";
import { useEffect } from "react";
import { getMatchesForPattern } from "@/utils/getMatchesForPattern/getMatchesForPattern";
import styles from "./ApprovalModeContent.module.css";
import { useRegexContext } from "@/hooks/useRegexContext";

export const ApprovalModeContent = () => {
  const { state, selectPattern, approvePattern } = useRegexContext();

  useEffect(() => {
    return () => {
      selectPattern(null);
    };
  }, []);

  const selectedRegex = state.regexList.find(
    (r) => r.pattern === state.selectedPattern
  );
  const isAlreadyApproved = selectedRegex?.isApproved ?? false;

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectPattern(e.target.value);
  };

  const selectedPattern = state.selectedPattern;

  const selectedMatches = selectedPattern
    ? getMatchesForPattern(selectedPattern, state.textContent)
    : [];

  return (
    <section className={styles.section}>
      <div className={styles.selectRow}>
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
          className={`${styles.button} ${styles.approveButton}`}
          disabled={!state.selectedPattern || isAlreadyApproved}
          title={
            !state.selectedPattern
              ? "No pattern selected"
              : isAlreadyApproved
              ? "Pattern already approved"
              : "Approve this pattern"
          }
          onClick={() => approvePattern(state.selectedPattern ?? null)}
        >
          Approve
        </button>
      </div>

      {selectedPattern && (
        <div className={styles.matchSection}>
          <h3 className={styles.subtitle}>Selected Pattern Matches</h3>
          <strong className={styles.labelDisplay}>
            {selectedRegex?.label ?? "Untitled"}
          </strong>

          {selectedMatches.length > 0 ? (
            <ul className={styles.matchList}>
              {selectedMatches.map((match, idx) => (
                <li key={idx} className={styles.matchItem}>
                  {match}
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.noMatches}>No matches found.</p>
          )}
        </div>
      )}

      <div className={styles.matchSection}>
        <h3 className={styles.subtitle}>Approved Matches</h3>
        <ul className={styles.approvedList}>
          {Object.entries(state.extractedTerms).map(([pattern, matches]) => {
            const regexObj = state.regexList.find((r) => r.pattern === pattern);
            const label = regexObj?.label || "Untitled";

            return (
              <li key={pattern} className={styles.approvedGroup}>
                <strong className={styles.labelDisplay}>{label}</strong>
                <ul className={styles.matchList}>
                  {matches.map((match, idx) => (
                    <li key={idx} className={styles.matchItem}>
                      {match}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
