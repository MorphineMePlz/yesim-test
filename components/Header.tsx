import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" passHref>
          <Image
            src="icons/logo.svg"
            alt="Yesim Logo"
            width={120}
            height={36}
            priority
          />
        </Link>
      </div>
    </header>
  );
}
