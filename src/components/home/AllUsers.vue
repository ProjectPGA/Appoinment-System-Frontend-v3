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
      <as-button
        secondary
        :label="$t('common.buttons.editButton')"
        @click="openModal(user._id)"
      />
    </div>
  </user-data>
  <div>
    <as-modal
      name="first-modal"
      :is-open="isModalOpened"
      @modal-close="closeModal"
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

// The `const openModal = (userId: string) => {};` statement is defining a function named `openModal`
// that takes a parameter `userId` of type string. However, the function body is empty, meaning it
// currently does not have any implementation or logic inside it.
const openModal = (userId: string) => {
  userToEdit.value = userId;
  isModalOpened.value = true;
};

// The `const closeModal = () => {};` statement is defining a function named `closeModal` that doesn't
// have any implementation inside its body. This is essentially creating an empty function that can be
// later filled with the necessary logic to close a modal or perform any other actions related to
// closing a modal in the Vue component.
const closeModal = () => {
  isModalOpened.value = false;
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
