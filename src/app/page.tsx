import { ClientDashboard } from "@/components/ClientDashboard";
import { generateText } from "@/utils/generateText";
import styles from "./page.module.css";

export default function Home() {
  const initialText = generateText();

  return (
    <main className={styles.main}>
      <h1>Regex Matcher</h1>

      <ClientDashboard initialText={initialText} />
    </main>
  );
}
