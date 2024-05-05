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
      />
      <as-button secondary label="Editar" @click="openModal(user._id)" />
    </div>
  </user-data>
  <div>
    <as-modal
      name="first-modal"
      :is-open="isModalOpened"
      @modal-close="closeModal"
      @submit="submitHandler"
    >
      <template #content>
        <user-form :user-id="userToEdit" is-update @user-updated="closeModal" />
      </template>
    </as-modal>
  </div>
</template>

<script lang="ts" setup>
import UserData from '@/components/common/UserData.vue';

import AsModal from '@/library/components/molecules/as-modal/AsModal.vue';
import AsButton from '@/library/components/atoms/as-button/AsButton.vue';

import UserForm from '@/components/home/UserForm.vue';

import { useUsersStore } from '@/stores/users';

import { ref } from 'vue';

const usersStore = useUsersStore();

const isModalOpened = ref(false);
const userToEdit = ref('');

const openModal = (userId: string) => {
  userToEdit.value = userId;
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
