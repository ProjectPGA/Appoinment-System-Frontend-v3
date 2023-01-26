import { defineStore } from 'pinia';
import { ref } from 'vue';

import { Form } from '@/models/Form';

import { loginService } from '@/webservices/AuthWebservice';

const initialform: Form = {
  name: '',
  surname: '',
  nif: '',
  nameCompany: '',
  cif: '',
  address: '',
  postalCode: 0,
  city: '',
  province: '',
  email: '',
};

export const useFormStore = defineStore('formStore', () => {
  const form = ref<Form>(initialform);

  const sendform = async () => {
    // await loginService(form.value);
  };

  return { form, sendform };
});
