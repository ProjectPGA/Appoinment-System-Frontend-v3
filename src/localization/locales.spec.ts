import { i18nGlobal } from './i18n';
import { Locales } from './locales/locales';
import { messages } from './locales/messages';
import { changeLanguage } from '@/utils/functionUtils/localizationFunctions';
import { expect } from '@jest/globals';
const i18n = i18nGlobal;

const originalLocale = i18n.locale; // Save initial languaje

// Restore initial languaje
afterEach(() => {
  i18n.locale = originalLocale;
});

describe('01 Basic translations test', () => {
  it('01 - 1 Default ES locale is working', () => {
    expect(i18n.locale).toBe(Locales.ES);
    expect(i18n.t('common.title.home')).toBe(messages.es.common.title.home);
  });

  it('01 - 2 Basic change of language is working', () => {
    expect(i18n.locale).toBe(Locales.ES);
    expect(i18n.t('common.inputs.emailInputLabel')).toBe(
      messages.es.common.inputs.emailInputLabel
    );
    expect(i18n.t('common.languages.spanish')).toBe(
      messages.es.common.languages.spanish
    );
    expect(i18n.t('common.languages.english')).toBe(
      messages.es.common.languages.english
    );
    changeLanguage();
    expect(i18n.locale).toBe(Locales.EN);
    expect(i18n.t('common.inputs.emailInputLabel')).toBe(
      messages.en.common.inputs.emailInputLabel
    );
    expect(i18n.t('common.languages.spanish')).toBe(
      messages.en.common.languages.spanish
    );
    expect(i18n.t('common.languages.english')).toBe(
      messages.en.common.languages.english
    );
    changeLanguage();
    expect(i18n.t('common.inputs.emailInputLabel')).toBe(
      messages.es.common.inputs.emailInputLabel
    );
    expect(i18n.t('common.languages.spanish')).toBe(
      messages.es.common.languages.spanish
    );
    expect(i18n.t('common.languages.english')).toBe(
      messages.es.common.languages.english
    );
  });
});
