import i18n from '../../src/localization/index';
import { Locales } from '../../src/localization/locales';

/**
 * The `changeLanguage()` function is toggling between two language locales (Spanish and English) using
 * the `vue-i18n` library. It checks the current locale value and if it's equal to `Locales.ES`
 * (Spanish), it sets the locale value to `Locales.EN` (English), and vice versa. The `:click`
 * directive in the button element is calling this function when the button is clicked.
 */
function changeLanguage(): void {
  i18n.global.locale === Locales.ES
    ? (i18n.global.locale = Locales.EN)
    : (i18n.global.locale = Locales.ES);
}

describe('Basic translations test', () => {
  it('Default ES locale is working', () => {
    expect(i18n.global.locale).toBe(Locales.ES);
    expect(i18n.global.t('common.title.home')).toBe('Inicio');
  });

  it('Basic change of language is working', () => {
    expect(i18n.global.locale).toBe(Locales.ES);
    expect(i18n.global.t('common.inputs.emailInputLabel')).toBe(
      'Correo electrónico'
    );
    expect(i18n.global.t('common.languages.spanish')).toBe('Español');
    expect(i18n.global.t('common.languages.english')).toBe('Inglés');
    changeLanguage();
    expect(i18n.global.locale).toBe(Locales.EN);
    expect(i18n.global.t('common.inputs.emailInputLabel')).toBe('Email');
    expect(i18n.global.t('common.languages.spanish')).toBe('Spanish');
    expect(i18n.global.t('common.languages.english')).toBe('English');
  });
});
