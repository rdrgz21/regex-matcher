import { ClientDashboard } from "@/components/ClientDashboard";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Regex Matcher</h1>

      <ClientDashboard />
    </main>
  );
}
