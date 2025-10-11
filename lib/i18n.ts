import { getRequestConfig } from "next-intl/server";

export const locales = ["fr", "en"] as const;
export type Locale = typeof locales[number];

export default getRequestConfig(async ({ locale }) => {
  // Default to French if locale is not supported
  const validLocale = locale && locales.includes(locale as any) ? locale : "fr";

  return {
    locale: validLocale,
    messages: (await import(`../content/site.${validLocale}.json`)).default,
  };
});