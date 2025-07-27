import { ReactElement } from "react";
import styles from "./DocumentPreview.module.css";
import { useRegexContext } from "@/hooks/useRegexContext";
import { generateText } from "@/utils/generateText";

export const DocumentPreview = (): ReactElement => {
  const { state, setText } = useRegexContext();

  const regenerateText = () => {
    const newText = generateText();
    setText(newText);
  };

  return (
    <div className={styles.documentPreview}>
      <h2>Document Preview</h2>

      <button className={styles.button} onClick={regenerateText}>
        Regenerate Text 🔄
      </button>

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
