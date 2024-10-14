import i18n from '@/localization';

import { reactive, Reactive } from 'vue';

export const i18nGlobal: Reactive<typeof i18n.global> = reactive(i18n.global);
