// pages/index.tsx
import { GetStaticProps } from "next";
import { fetchCountries } from "../utils/api";
import { useState } from "react";
import styles from "../styles/Home.module.scss";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CountryCard from "@/components/CountryCard";
import SearchInput from "@/components/SearchInput";
import PrimaryButton from "@/components/PrimaryButton";

export default function Home({ countries }: { countries: any[] }) {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const cleanedCountries = countries.filter(
    (c) => c && typeof c.iso === "string"
  );

  const filtered = cleanedCountries.filter((c) =>
    c.country.toLowerCase().startsWith(search.toLowerCase())
  );

  const visible = showAll ? filtered : filtered.slice(0, 12);

  return (
    <main>
      <div className={styles.container}>
        <h1>{t("simTitle")}</h1>
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Найти направление"
        />
        <div className={styles.countryContainer}>
          <p className={styles.text}>
            {!showAll ? t("popularCountries") : "Все страны"}
          </p>
          <div className={styles.grid}>
            {visible.map((country) => (
              <CountryCard key={country.id} country={country} />
            ))}
          </div>
          <PrimaryButton onClick={toggleShowAll}>
            {showAll ? t("hideCountries") : t("showAllCountries")}
          </PrimaryButton>
        </div>
      </div>
    </main>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const countries = await fetchCountries();

  return {
    props: {
      countries,
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
  };
};
