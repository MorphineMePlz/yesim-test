import styles from "./PrimaryButton.module.scss";

type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

export default function PrimaryButton({
  children,
  onClick,
  type = "button",
}: Props) {
  return (
    <button className={styles.button} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
