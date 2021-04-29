import moment from "moment";
moment.locale("ru-RU");
moment.updateLocale("ru-RU", {
  monthsShort: ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"],
});

import TDate from "@/models/TDate";
export const dateFormat = (value: TDate): string => {
  if (!value) return "";
  return moment(value).format("DD MMM YYYY");
};

export default moment;
