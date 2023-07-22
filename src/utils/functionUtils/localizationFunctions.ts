import { i18nGlobal } from '@/localization/i18n';
import { Locales } from '@/localization/locales';

/**
 * The `changeLanguage()` function is toggling between two language locales (Spanish and English) using
 * the `vue-i18n` library. It checks the current locale value and if it's equal to `Locales.ES`
 * (Spanish), it sets the locale value to `Locales.EN` (English), and vice versa. The `:click`
 * directive in the button element is calling this function when the button is clicked.
 */
export function changeLanguage(): void {
  i18nGlobal.locale === Locales.ES
    ? (i18nGlobal.locale = Locales.EN)
    : (i18nGlobal.locale = Locales.ES);
}
