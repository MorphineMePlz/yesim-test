import { FC } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import styles from "./styles.module.scss";
import { fetchCountries } from "@/utils/api";
import { Country } from "@/types/country";

const CountryPage: FC<Country> = ({ country, iso }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>
          {country} - {t("travelSim")}
        </title>
      </Head>
      <div className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>{country}</h1>
              <Image
                src={`/flags/${iso.toLowerCase()}.svg`}
                alt={`${country} flag`}
                width={32}
                height={32}
                className={styles.flag}
              />
            </div>
            <p className={styles.subtitle}>{t("travelSim")}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CountryPage;

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const slug = params?.slug as string;
  const countries = await fetchCountries();
  const country = countries.find((c: Country) => c.url === `/country/${slug}/`);
  if (!country) {
    return { notFound: true };
  }

  return {
    props: {
      ...country,
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
  };
};
