import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

interface Locales {
  locale: string;
  messages: {
    "ru-RU": Record<string, string>;
  };
}

import messagesRu from "@/locales/intterra-ru-RU.json";
const localRu: Locales = {
  locale: "ru-RU",
  messages: {
    "ru-RU": messagesRu,
  },
};
const i18n = new VueI18n(localRu);

export default i18n;
