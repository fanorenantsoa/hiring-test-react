import type { FC, PropsWithChildren } from "react";
import { MainHeader } from "../header/MainHeader";
import styles from "./Layout.module.css";
import { Content } from "../content/Content";
import { Menu } from "../menu/Menu";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.mainPage}>
      <MainHeader />
      <section className={styles.mainPage__content}>
        <Menu />
        <Content>{children}</Content>
      </section>
    </div>
  );
};
