import styles from "./SearchInput.module.scss";
import Image from "next/image";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

export default function SearchInput({ value, onChange, placeholder }: Props) {
  return (
    <div className={styles.wrapper}>
      <Image
        src="/icons/search.svg"
        alt="Search"
        width={20}
        height={20}
        className={styles.icon}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={styles.input}
        placeholder={placeholder || "Поиск..."}
      />
    </div>
  );
}
