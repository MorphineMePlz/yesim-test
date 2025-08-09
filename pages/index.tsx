import { useState, useEffect, useRef, FC } from "react";

import { GetStaticProps } from "next";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import styles from "../styles/Home.module.scss";

import { Country } from "@/types/country";
import { fetchCountries } from "../utils/api";
import {
  CountryCard,
  Dropdown,
  PrimaryButton,
  SearchInput,
} from "@/components";

const Home: FC<{ countries: Country[] }> = ({ countries }) => {
  const { t } = useTranslation();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Country[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const cleanedCountries = countries.filter(
    ({ iso }) => typeof iso === "string"
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
      setSearchResults(cleanedCountries.slice(0, 12));
    } else {
      const filtered = cleanedCountries.filter(({ country }) =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const handleFocus = () => {
    setSearchResults(cleanedCountries.slice(0, 12));
    setIsDropdownOpen(true);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const visible = showAll ? cleanedCountries : cleanedCountries.slice(0, 12);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t("simTitle")}</h1>

      <div style={{ position: "relative" }} ref={wrapperRef}>
        <SearchInput
          value={search}
          onChange={handleSearchChange}
          placeholder={t("findCountry")}
          onFocus={handleFocus}
        />
        {isDropdownOpen && <Dropdown results={searchResults} />}
      </div>

      <div className={styles.countryContainer}>
        <p className={styles.text}>
          {!showAll ? t("popularCountries") : t("allCountries")}
        </p>
        <div className={styles.grid}>
          {visible.map((details) => (
            <CountryCard key={details.id} {...details} />
          ))}
        </div>
        <PrimaryButton onClick={() => setShowAll(!showAll)}>
          {showAll ? t("hideCountries") : t("showAllCountries")}
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const countries = await fetchCountries();

  return {
    props: {
      countries,
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
    revalidate: 300,
  };
};
