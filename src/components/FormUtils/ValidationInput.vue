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
        :type="type"
        class="input"
        :class="[
          { 'is-danger': errorMessage, 'is-subtext': errorMessage },
          inputClasses,
        ]"
        @input="handleChange"
        @blur="handleChange"
      />
      <template v-if="errors.length">
        <span class="icon is-right has-text-danger">
          <font-awesome-icon icon="fa-solid fa-circle-exclamation" />
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
import { toRef } from 'vue';
import { useI18n } from 'vue-i18n';

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

function isRequired(value: string): boolean | string {
  if (value && value.trim()) {
    if (props.regex) {
      const regex = new RegExp(props.regex);
      console.error(regex.test(value));

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

const nameRef = toRef(props, 'name');
const { errorMessage, handleChange, errors } = useField(nameRef, isRequired);
</script>

<style lang="scss" scoped>
// Input validation styles
</style>
