import i18nConfig from "./next-i18next.config";
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  ...i18nConfig,
  reactStrictMode: true,
};

module.exports = {
  i18n,
  reactStrictMode: true,
};

export default nextConfig;
