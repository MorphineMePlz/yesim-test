import { API_URL } from "./constants";

export const fetchCountries = async () => {
  const res = await fetch(API_URL, {
    next: { revalidate: 300 },
  });
  const data = await res.json();
  return data.countries.ru;
};
