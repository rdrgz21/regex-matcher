"use client";

import styles from "./PatternList.module.css";
import { RegexPattern } from "@/types/regex";
import { useRegexContext } from "@/hooks/useRegexContext";
import { useState } from "react";
import { validateAndDispatch } from "@/utils/validateAndDispatch/validateAndDispatch";

interface PatternListProps {
  patterns: RegexPattern[];
  title: string;
}

export const PatternList = ({ patterns, title }: PatternListProps) => {
  const { editRegex, deleteRegex } = useRegexContext();
  const [editingPattern, setEditingPattern] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState("");
  const [editPattern, setEditPattern] = useState("");

  const startEditing = (pattern: RegexPattern) => {
    setEditingPattern(pattern.pattern);
    setEditLabel(pattern.label);
    setEditPattern(pattern.pattern);
  };

  const cancelEditing = () => {
    setEditingPattern(null);
    setEditLabel("");
    setEditPattern("");
  };

  const saveEdit = () => {
    if (editingPattern) {
      validateAndDispatch(
        editPattern,
        patterns,
        () => {
          editRegex(editingPattern, {
            label: editLabel,
            pattern: editPattern,
            isApproved: false,
          });
        },
        editingPattern
      );
      cancelEditing();
    }
  };

  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <ul className={styles.list}>
        {patterns.map((item) => {
          const isEditing = editingPattern === item.pattern;
          return (
            <li key={item.pattern} className={styles.item}>
              {isEditing ? (
                <div className={styles.editRow}>
                  <input
                    value={editLabel}
                    onChange={(e) => setEditLabel(e.target.value)}
                    className={styles.input}
                    placeholder="Edit label"
                  />
                  <input
                    value={editPattern}
                    onChange={(e) => setEditPattern(e.target.value)}
                    className={styles.input}
                    placeholder="Edit pattern"
                  />
                  <button onClick={saveEdit} className={styles.saveButton}>
                    Save
                  </button>
                  <button
                    onClick={cancelEditing}
                    className={styles.cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className={styles.viewRow}>
                  <div className={styles.info}>
                    <strong>{item.label}</strong> —{" "}
                    <code className={styles.pattern}>{item.pattern}</code>
                    {item.isApproved && (
                      <span className={styles.approved}>✔</span>
                    )}
                  </div>

                  <div className={styles.buttonGroup}>
                    <button
                      onClick={() => startEditing(item)}
                      className={styles.editButton}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteRegex(item.pattern)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
