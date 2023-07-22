import { i18nGlobal } from './i18n';
import { Locales } from './locales';
import { changeLanguage } from '@/utils/functionUtils/localizationFunctions';

const i18n = i18nGlobal;

describe('Basic translations test', () => {
  it('Default ES locale is working', () => {
    expect(i18n.locale).toBe(Locales.ES);
    expect(i18n.t('common.title.home')).toBe('Inicio');
  });

  it('Basic change of language is working', () => {
    expect(i18n.locale).toBe(Locales.ES);
    expect(i18n.t('common.inputs.emailInputLabel')).toBe('Correo electrónico');
    expect(i18n.t('common.languages.spanish')).toBe('Español');
    expect(i18n.t('common.languages.english')).toBe('Inglés');
    changeLanguage();
    expect(i18n.locale).toBe(Locales.EN);
    expect(i18n.t('common.inputs.emailInputLabel')).toBe('Email');
    expect(i18n.t('common.languages.spanish')).toBe('Spanish');
    expect(i18n.t('common.languages.english')).toBe('English');
  });
});
