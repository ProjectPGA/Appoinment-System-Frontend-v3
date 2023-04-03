<template>
  <div class="field">
    <label class="label"> {{ label }}</label>
    <div class="control has-icons-right">
      <input
        :data-cy="`input-${name}${cy}`"
        v-bind="$attrs"
        :placeholder="placeholder"
        :value="modelValue"
        :maxlength="maxlength"
        :type="inputType"
        class="input"
        :class="[
          {
            'is-danger': errorMessage,
            'is-subtext': errorMessage,
            'is-password': isPasswordType,
          },
          ,
          inputClasses,
        ]"
        @input="handleChange"
        @blur="handleChange"
      />
      <template v-if="errors.length && name !== 'password'">
        <span class="icon is-right has-text-danger">
          <font-awesome-icon
            :icon="iconType.SOLID + ' ' + iconName.CIRCLE_EXCLAMATION"
          />
        </span>
        <span class="help" :class="{ 'is-danger': errorMessage }">
          {{ errorMessage }}
        </span>
      </template>
      <template v-if="name === 'password'">
        <span
          class="icon is-right has-text-danger is-clickable"
          @click="toggleTypePassword"
        >
          <font-awesome-icon :icon="passIconType + ' ' + passIconName" />
        </span>
        <span class="help" :class="{ 'is-danger': errorMessage }">
          {{ errorMessage }}
        </span>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useField } from 'vee-validate';
import { Ref, toRef, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { iconName, iconType } from '@/models/icons/fontawesome/iconsDictionary';

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
const emit = defineEmits<{
  (e: 'update:modelValue'): void;
}>();

const passIconType: Ref<string> = ref(iconType.SOLID);
const passIconName: Ref<string> = ref(iconName.EYE_LOW_VISION);
const inputType: Ref<string> = ref(props.name);
const isPasswordType: boolean = props.name === 'password';

function toggleTypePassword(): void {
  inputType.value === 'password'
    ? (inputType.value = 'text')
    : (inputType.value = 'password');

  passIconName.value === iconName.EYE_LOW_VISION
    ? (passIconName.value = iconName.EYE)
    : (passIconName.value = iconName.EYE_LOW_VISION);
}

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

const nameRef: Ref = toRef(props, 'name');
const { errorMessage, handleChange, errors } = useField(nameRef, isRequired);
</script>

<style lang="scss" scoped>
.is-password {
  & ~ .icon {
    color: $main-color-medium-light !important;
  }
}

@include tablet {
  .is-medium-tablet {
    font-size: $size-5;
  }

  // Start Bulma elements selecion
  .control.has-icons-right .input.is-medium-tablet ~ .icon {
    font-size: $size-5;
  }

  // End Bulma elements selection
}
</style>
