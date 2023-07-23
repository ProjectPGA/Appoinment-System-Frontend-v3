import { i18nGlobal } from './i18n';
import { Locales } from './locales';
import { changeLanguage } from '@/utils/functionUtils/localizationFunctions';

import es from './locales/es/main';
import en from './locales/en/main';

const i18n = i18nGlobal;

describe('Basic translations test', () => {
  it('Default ES locale is working', () => {
    expect(i18n.locale).toBe(Locales.ES);
    expect(i18n.t('common.title.home')).toBe(es.common.title.home);
  });

  it('Basic change of language is working', () => {
    expect(i18n.locale).toBe(Locales.ES);
    expect(i18n.t('common.inputs.emailInputLabel')).toBe(
      es.common.inputs.emailInputLabel
    );
    expect(i18n.t('common.languages.spanish')).toBe(
      es.common.languages.spanish
    );
    expect(i18n.t('common.languages.english')).toBe(
      es.common.languages.english
    );
    changeLanguage();
    expect(i18n.locale).toBe(Locales.EN);
    expect(i18n.t('common.inputs.emailInputLabel')).toBe(
      en.common.inputs.emailInputLabel
    );
    expect(i18n.t('common.languages.spanish')).toBe(
      en.common.languages.spanish
    );
    expect(i18n.t('common.languages.english')).toBe(
      en.common.languages.spanish
    );
  });
});
