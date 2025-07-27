"use client";

import { ReactElement } from "react";
import { useRegexContext } from "@/hooks/useRegexContext";
import styles from "./ClientDashboard.module.css";
import { ControlPanel } from "./ControlPanel";
import { DocumentPreview } from "./DocumentPreview";

export const ClientDashboard = (): ReactElement => {
  const { state } = useRegexContext();

  console.log(state, "state");

  return (
    <div className={styles.dashboard}>
      <ControlPanel />
      <DocumentPreview />
    </div>
  );
};
