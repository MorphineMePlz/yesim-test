import Link from "next/link";
import styles from "./Dropdown.module.scss";
import { Country } from "@/types/country";
import { useTranslation } from "next-i18next";

export default function Dropdown({ results }: { results: Country[] }) {
  const { t } = useTranslation();
  if (!results.length) {
    return (
      <div className={styles.dropdown}>
        <p className={styles.notFound}>{t("notFound")}</p>
      </div>
    );
  }

  return (
    <div className={styles.dropdown}>
      {results.map((country) => (
        <Link key={country.id} href={country.url} className={styles.item}>
          <img
            src={`https://flagcdn.com/w40/${country.iso.toLowerCase()}.png`}
            alt={country.country}
            className={styles.flag}
          />
          <div className={styles.info}>
            <span className={styles.name}>{country.country}</span>
            <span className={styles.price}>
              от €{country.classic_info?.price_per_gb}/GB
            </span>
          </div>
          <span className={styles.arrow}>›</span>
        </Link>
      ))}
    </div>
  );
}
