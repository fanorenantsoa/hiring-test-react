import type { FC, PropsWithChildren } from "react";
import styles from "./Content.module.css";

export const Content: FC<PropsWithChildren> = ({ children }) => {
  return <main className={styles.content}>{children}</main>;
};
