<template>
  <div class="field">
    <label class="label"> {{ label }}</label>
    <div class="control">
      <input
        :data-cy="`input-${name}${cy}`"
        v-bind="$attrs"
        :value="modelValue"
        :maxlength="maxlength"
        :type="props.type"
        class="input"
        :class="{ 'is-danger': errorMessage, 'is-subtext': errorMessage }"
        @input="handleChange"
        @blur="handleChange"
      />
      <span class="help" :class="{ 'is-danger': errorMessage }">{{
        errorMessage
      }}</span>
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
      console.log(regex.test(value));

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
const { errorMessage, handleChange } = useField(nameRef, isRequired);
</script>

<style lang="scss" scoped>
// Input validation styles
</style>
