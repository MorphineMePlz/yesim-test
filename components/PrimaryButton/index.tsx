import { FC } from "react";

import styles from "./styles.module.scss";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export const PrimaryButton: FC<Props> = ({
  children,
  onClick,
  type = "button",
}) => {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  );
};
