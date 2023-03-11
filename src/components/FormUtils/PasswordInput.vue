<template>
  <div class="field">
    <label class="label"> {{ $t('views.form.passwordInputLabel') }}</label>
    <div class="control has-icons-right">
      <input
        :data-cy="`input-${name}${cy}`"
        v-bind="$attrs"
        :placeholder="$t('views.form.passwordInputLabel')"
        :value="modelValue"
        :type="inputStore.inputType"
        class="input"
        :class="[
          { 'is-danger': errorMessage, 'is-subtext': errorMessage },
          inputClasses,
        ]"
        required
        @input="handleChange"
        @blur="handleChange"
      />
      <span class="icon is-right is-clickable" @click="toggleTypePassword">
        <font-awesome-icon :icon="inputStore.eyeIcon" />
      </span>
      <span class="help" :class="{ 'is-danger': errorMessage }">
        {{ errorMessage }}
      </span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useField } from 'vee-validate';
import { toRef, reactive } from 'vue';
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
  cy: {
    type: String,
    required: false,
    default: '',
  },
  inputClasses: {
    type: String,
    required: false,
    default: '',
  },
});
const emit = defineEmits<{
  (e: 'update:modelValue'): void;
}>();

const inputStore = reactive({
  eyeIcon: 'fa-eye-low-vision',
  inputType: 'password',
});

function toggleTypePassword() {
  inputStore.inputType === 'password'
    ? (inputStore.inputType = 'text')
    : (inputStore.inputType = 'password');

  inputStore.eyeIcon === 'fa-eye-low-vision'
    ? (inputStore.eyeIcon = 'fa-eye')
    : (inputStore.eyeIcon = 'fa-eye-low-vision');
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

  return t('common.components.validationInput.requiredInput');
}

const nameRef = toRef(props, 'name');
const { errorMessage, handleChange, errors } = useField(nameRef, isRequired);
</script>

<style lang="scss" scoped>
// Input validation styles
.input {
  & ~ .icon {
    color: $main-color-medium-light !important;
  }
}
</style>
