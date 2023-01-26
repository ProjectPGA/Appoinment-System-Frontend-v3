<template>
  <section class="text-center section" :data-cy="`${page}-view`">
    <div class="container">
      <h1 class="title" :data-cy="`${page}-title`">
        {{ $t('views.form.title') }}
      </h1>
      <form class="form" @submit="onSubmit">
        <validation-input
          v-model="name"
          :cy="'-' + page"
          name="name"
          required
          type="text"
          :label="$t('views.form.nameInputLabel')"
        />
        <validation-input
          v-model="surname"
          :cy="'-' + page"
          name="surname"
          required
          type="text"
          :label="$t('views.form.surnameInputLabel')"
        />
        <validation-input
          v-model="nif"
          :cy="'-' + page"
          name="nif"
          required
          type="text"
          :label="$t('views.form.nifInputLabel')"
          regex="((([X-Z])|([LM])){1}([-]?)((\d){7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]))"
        />
        <validation-input
          v-model="nameCompany"
          :cy="'-' + page"
          name="company"
          required
          type="text"
          :label="$t('views.form.nameCompanyInputLabel')"
        />
        <validation-input
          v-model="cif"
          :cy="'-' + page"
          name="cif"
          required
          type="text"
          :label="$t('views.form.cifInputLabel')"
          regex="^([ABCDEFGHJKLMNPQRSUVW])(\d{7})([0-9A-J])$"
        />
        <validation-input
          v-model="address"
          :cy="'-' + page"
          name="address"
          required
          type="text"
          :label="$t('views.form.addressInputLabel')"
        />
        <validation-input
          v-model="postalCode"
          :cy="'-' + page"
          name="postalCode"
          required
          type="number"
          :label="$t('views.form.postalCodeInputLabel')"
        />
        <validation-input
          v-model="city"
          :cy="'-' + page"
          name="city"
          required
          type="text"
          :label="$t('views.form.cityInputLabel')"
        />
        <validation-input
          v-model="province"
          :cy="'-' + page"
          name="province"
          required
          type="text"
          :label="$t('views.form.provinceInputLabel')"
        />
        <validation-input
          v-model="email"
          :cy="'-' + page"
          name="email"
          required
          type="text"
          :label="$t('views.form.emailInputLabel')"
          regex="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
        />
        <button :disabled="!isValid && isDirty" class="button is-primary">
          {{ $t('views.form.sendButtonLabel') }}
        </button>
      </form>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useHead } from '@vueuse/head';
import { useForm, useIsFormDirty, useIsFormValid } from 'vee-validate';
import { useToast } from 'vue-toastification';

import { useFormStore } from '@/stores/form';

import ValidationInput from '@/components/ValidationInput.vue';

const formStore = useFormStore();

const { handleSubmit } = useForm();
const isDirty = useIsFormDirty();
const isValid = useIsFormValid();
const toast = useToast();

const name = ref<string>('');
const surname = ref<string>('');
const nif = ref<string>('');
const nameCompany = ref<string>('');
const cif = ref<string>('');
const address = ref<string>('');
const postalCode = ref<string>('');
const city = ref<string>('');
const province = ref<string>('');
const email = ref<string>('');
const page = ref<string>('home-page');

useHead({
  title: () => 'Form - Home',
  meta: [{ name: 'description', content: () => 'Description' }],
});

function onInvalidSubmit() {
  toast.error('Rellene los campos correctamente');
}

const onSubmit = handleSubmit(() => {
  formStore.form = {
    name: name.value,
    surname: surname.value,
    nif: nif.value,
    nameCompany: nameCompany.value,
    cif: cif.value,
    address: address.value,
    postalCode: Number(postalCode.value),
    city: city.value,
    province: province.value,
    email: email.value,
  };
  formStore.sendform();
}, onInvalidSubmit);
</script>

<style lang="scss" scoped>
// Form page styles
</style>
