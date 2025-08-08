// utils/api.ts
export const fetchCountries = async () => {
  const res = await fetch(
    "https://api3.yesim.cc/sale_list?force_type=countries&lang=ru"
  );
  const data = await res.json();
  return data.countries.ru;
};
