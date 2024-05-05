<template>
  <user-data
    v-for="(user, index) in usersStore.users"
    :key="index"
    :user="user"
  >
    <div class="all-users__footer">
      <as-button
        :label="$t('common.buttons.deleteButton')"
        @click="usersStore.deleteUser(user._id)"
      >
      </as-button>
    </div>
  </user-data>
  <div>
    <modal-component
      name="first-modal"
      :is-open="isModalOpened"
      @modal-close="closeModal"
      @submit="submitHandler"
    >
    </modal-component>
  </div>
</template>

<script lang="ts" setup>
import UserData from '@/components/common/UserData.vue';
import ModalComponent from '@/components/common/ModalComponent.vue';

import AsButton from '@/library/components/atoms/as-button/AsButton.vue';

import { useUsersStore } from '@/stores/users';

import { ref } from 'vue';

const usersStore = useUsersStore();

const isModalOpened = ref(false);

const openModal = () => {
  isModalOpened.value = true;
};
const closeModal = () => {
  isModalOpened.value = false;
};

const submitHandler = () => {
  //here you do whatever
};
</script>

<style lang="scss" scoped>
.all-users {
  &__footer {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
}
</style>
