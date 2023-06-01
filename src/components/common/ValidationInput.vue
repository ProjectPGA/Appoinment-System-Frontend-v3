<template>
  <div>
    <label> {{ label }}</label>
    <div :class="{ 'has-icons-right': inputError || isPasswordType }">
      <input
        :data-cy="`input-${name}${cy}`"
        v-bind="$attrs"
        :placeholder="placeholder"
        :value="modelValue"
        :maxlength="maxlength"
        :type="inputType"
        :class="{
          'is-danger': errorMessage,
          'is-subtext': errorMessage,
          'is-password': isPasswordType,
          'is-medium': isTablet,
        }"
        @input="handleChange"
        @blur="handleChange"
      />
      <template v-if="inputError">
        <span :class="{ 'is-size-5': isTablet }">
          <font-awesome-icon
            :icon="iconType.SOLID + ' ' + iconName.CIRCLE_EXCLAMATION"
          />
        </span>
        <span :class="{ 'is-danger': errorMessage }">
          {{ errorMessage }}
        </span>
      </template>
      <template v-if="isPasswordType">
        <span :class="{ 'is-size-5': isTablet }" @click="toggleTypePassword">
          <font-awesome-icon
            :icon="passIconType + ' ' + passIconName"
            :style="{ color: passIconColor }"
          />
        </span>
        <span :class="{ 'is-danger': errorMessage }">
          {{ errorMessage }}
        </span>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useField } from 'vee-validate';
import { Ref, toRef, ref, computed, ComputedRef } from 'vue';
import { useMediaQuery } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

import { AppColors } from '@/models/AppColors';
import { iconName, iconType } from '@/models/icons/fontawesome/iconsDictionary';
import { MediaQueries } from '@/models/utils/MediaQueries';
const { t } = useI18n();

const props = defineProps({
  regex: {
    type: String,
    default: '',
  },
  modelValue: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
    default: 'input',
  },
  inputClasses: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    required: true,
    default: '',
  },
  cy: {
    type: String,
    required: false,
    default: '',
  },
  type: {
    type: String,
    required: true,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: String,
    default: '255',
  },
});

const passIconColor: string = AppColors.MAIN_COLOR_MEDIUM_LIGHT;

const passIconType: Ref<string> = ref(iconType.SOLID);
const passIconName: Ref<string> = ref(iconName.EYE_LOW_VISION);
const inputType: Ref<string> = ref(props.name);
const isPasswordType: boolean = props.name === 'password';
const isTablet: Ref<boolean> = useMediaQuery(MediaQueries.TABLET);

const nameRef: Ref = toRef(props, 'name');
const { errorMessage, handleChange, errors } = useField(nameRef, isRequired);

const inputError: ComputedRef<boolean> = computed(() => {
  return errors.value.length > 0 && props.name !== 'password';
});

/**
 * This function toggles the input type of a password field between "password" and "text" and also
 * toggles the icon displayed next to the input field between an eye icon and an eye with a slash icon.
 * It is used in a Vue component to allow users to show or hide the password they are entering.
 */
function toggleTypePassword(): void {
  inputType.value === 'password'
    ? (inputType.value = 'text')
    : (inputType.value = 'password');

  passIconName.value === iconName.EYE_LOW_VISION
    ? (passIconName.value = iconName.EYE)
    : (passIconName.value = iconName.EYE_LOW_VISION);
}

/**
 * The `isRequired` function is a validation function that is used with the `useField` function from
 * the `vee-validate` library to validate the input value of a form field.
 * @param {string} value Input field being validated.
 */
function isRequired(value: string): boolean | string {
  if (value && value.trim()) {
    if (props.regex) {
      const regex = new RegExp(props.regex);

      return regex.test(value)
        ? true
        : t('common.components.validationInput.errorInput');
    }
    return true;
  }
  if (props.required) {
    return t('common.components.validationInput.requiredInput');
  }

  return true;
}
</script>

<style lang="scss" scoped>
// Styles
</style>
