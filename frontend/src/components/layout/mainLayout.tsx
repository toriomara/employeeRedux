import { FC, ReactNode } from "react";
import styles from "./mainLayout.module.css";
import { Layout as AntLayout } from "antd";
import { Header } from "../Header/header";

type Props = {
  children: ReactNode;
};

export const MainLayout: FC<Props> = ({ children }) => {
  return (
    <div className={styles.mainLayout}>
      <AntLayout.Content>
        <Header />
        {children}
      </AntLayout.Content>
    </div>
  );
};
