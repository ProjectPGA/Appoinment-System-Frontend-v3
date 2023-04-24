import { createI18n } from 'vue-i18n';
import { Locales } from './locales';

import es from './locales/es/main';
import en from './locales/en/main';

const messages = {
  [Locales.ES]: es,
  [Locales.EN]: en,
};

const defaultLocale = Locales.ES;

type LocalesSchema = Locales.ES | Locales.EN;
type MessageSchema = typeof es;

const i18n = createI18n<[MessageSchema], LocalesSchema>({
  locale: defaultLocale,
  messages: messages,
  fallbackWarn: false,
});

export default i18n;
