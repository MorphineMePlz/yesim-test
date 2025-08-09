import { FC } from "react";

import Image from "next/image";

import styles from "./SearchInput.module.scss";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  onFocus?: () => void;
};

const SearchInput: FC<Props> = ({ value, onChange, placeholder, onFocus }) => {
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
        onFocus={onFocus}
        className={styles.input}
        placeholder={placeholder || "Поиск..."}
      />
    </div>
  );
};

export default SearchInput;
