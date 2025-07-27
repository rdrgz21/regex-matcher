import { ReactElement } from "react";
import styles from "./DocumentPreview.module.css";
import { useRegexContext } from "@/hooks/useRegexContext";

export const DocumentPreview = (): ReactElement => {
  const { state } = useRegexContext();

  return (
    <div className={styles.documentPreview}>
      <h2>Document Preview</h2>

      <section className={styles.documentPreviewContent}>
        {state.textContent.split("\n").map((para, idx) => (
          <p className={styles.paragraph} key={idx}>
            {para}
          </p>
        ))}
      </section>
    </div>
  );
};
