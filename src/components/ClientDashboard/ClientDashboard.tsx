"use client";

import { ReactElement, useEffect } from "react";
import { useRegexContext } from "@/hooks/useRegexContext";
import styles from "./ClientDashboard.module.css";
import { ControlPanel } from "./ControlPanel";
import { DocumentPreview } from "./DocumentPreview";

interface ClientDashboardProps {
  initialText: string;
}

export const ClientDashboard = ({
  initialText,
}: ClientDashboardProps): ReactElement => {
  const { state, setText } = useRegexContext();

  useEffect(() => {
    if (!state.textContent) {
      setText(initialText);
    }
  }, [initialText, setText, state]);

  return (
    <div className={styles.dashboard}>
      <ControlPanel />
      <DocumentPreview />
    </div>
  );
};
