import { FC } from "react";

import Link from "next/link";
import Image from "next/image";

import styles from "./CountryCard.module.scss";

import { Country } from "@/types/country";

const CountryCard: FC<Country> = ({ country, iso, url, classic_info }) => {
  const price = classic_info?.price_per_gb
    ? parseInt(classic_info.price_per_gb) / 20
    : null;

  return (
    <Link href={url} className={styles.card}>
      <div className={styles.flagWrapper}>
        <Image
          src={`/flags/${iso.toLowerCase()}.svg`}
          alt={`${country} flag`}
          width={40}
          height={40}
          className={styles.flag}
        />
      </div>

      <div className={styles.info}>
        <span className={styles.name}>{country}</span>
        {price && <span className={styles.price}>от €{price}/GB</span>}
      </div>

      <div className={styles.arrow}>
        <svg width="16" height="16" fill="none" stroke="currentColor">
          <path
            d="M5 3l6 5-6 5"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  );
};

export default CountryCard;
