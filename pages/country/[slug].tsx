// pages/country/[slug].tsx
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import styles from "@/styles/CountryPage.module.scss";
import Image from "next/image";

export default function CountryPage({ country }: { country: any }) {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>
          {country.country} - {t("travelSim")}
        </title>
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>{country.country}</h1>
              <Image
                src={`/flags/${country.iso.toLowerCase()}.svg`}
                alt={`${country.country} flag`}
                width={32}
                height={32}
                className={styles.flag}
              />
            </div>
            <p className={styles.subtitle}>{t("travelSim")}</p>
          </div>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
}) => {
  const slug = params?.slug as string;

  const res = await fetch(
    "https://api3.yesim.cc/sale_list?force_type=countries&lang=ru"
  );
  const data = await res.json();
  const countries = data.countries.ru;

  const country = countries.find((c: any) => c.url === `/country/${slug}/`);

  if (!country) {
    return { notFound: true };
  }

  return {
    props: {
      country,
      ...(await serverSideTranslations(locale ?? "ru", ["common"])),
    },
  };
};
