export interface Country {
  id: number;
  country: string;
  url: string;
  iso: string;
  classic_info: {
    price_per_gb: string;
  };
}
