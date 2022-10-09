<template>
  <b-field
    :label="$t('common.email')"
    :message="errorMessage"
    :type="{
      'is-danger': !isValid,
    }"
  >
    <b-input
      v-model="email"
      :placeholder="$t('common.email')"
      size="is-medium"
      :data-cy="`${view}-input-email`"
      @blur="checkEmail"
      @input="onInput"
      @keypress.native.enter="onEnterEmail"
    />
  </b-field>
</template>

<script lang="ts">
import { ref } from 'vue';
// import mainStore from '@/store/main-store/MainStore';

// @Prop(String) private view: string;

// private mainStore = mainStore.context(this.$store);

const email = ref<string>('');
const isValid = ref<boolean>(true);
const errorMessage = ref<string>('');

function onInput(): void {
  // this.$emit('input', email.value);

  checkEmail();
}

function onEnterEmail(): void {
  checkEmail();

  // if (isValid.value) {
  //   this.$emit('enter');
  // }
}

function checkEmail(): void {
  email.value === ''
    ? inputEmpty()
    : email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ? inputValid()
    : inputEmailInvalid();

  // this.$emit('check-email', isValid.value);
}

function inputEmpty(): void {
  // errorMessage.value = `${this.$t('views.login.inputEmpty')}`;

  isValid.value = false;
}

function inputEmailInvalid(): void {
  errorMessage.value = `${$t('common.emailInvalid')}`;

  isValid.value = false;
}

function inputValid(): void {
  errorMessage.value = '';
  isValid.value = true;
}

// private get currentLanguage(): string {
//   return this.mainStore.state.currentLanguage;
// }

// @Watch('currentLanguage')
// function onChangeLanguage(): void {
//   checkEmail();
// }
</script>

<style lang="scss" scoped></style>
