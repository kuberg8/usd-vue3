export const sym = (currency, locale = "ru") =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).formatToParts(1).find((x) => x.type === "currency")
    .value;

export const currencyFormat = new Intl.NumberFormat();
