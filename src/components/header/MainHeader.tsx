import { useAppContext } from "../../contexts/AppContext";
import styles from "./MainHeader.module.css";
export const MainHeader = () => {
  const { theme, toggleTheme } = useAppContext();
  return (
    <header className={styles.mainHeader}>
      <h1>Feature List</h1>
      <div className={styles.mainHeader__toggle}>
        <span>Enable Dark Mode</span>
        <input
          type="checkbox"
          checked={theme === "dark"}
          onChange={toggleTheme}
          aria-label="Enable Dark Mode"
        />
      </div>
    </header>
  );
};
