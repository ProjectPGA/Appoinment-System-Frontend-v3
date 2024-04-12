<template>
  <as-card>
    <form class="create-user-form">
      <div class="create-user-form__inputs-container">
        <as-input
          :label="$t('views.home.createUser.name.label')"
          :placeholder="$t('views.home.createUser.name.placeholder')"
        />
        <as-input
          :label="$t('views.home.createUser.surname.label')"
          :placeholder="$t('views.home.createUser.surname.placeholder')"
        />
      </div>
      <div class="create-user-form__inputs-container">
        <as-input
          :label="$t('views.home.createUser.email.label')"
          :placeholder="$t('views.home.createUser.email.placeholder')"
        />
        <as-input
          :label="$t('views.home.createUser.roles.label')"
          :placeholder="$t('views.home.createUser.roles.placeholder')"
        />
      </div>
      <div class="create-user-form__inputs-container">
        <as-input
          type="password"
          :label="$t('views.home.createUser.password.label')"
          :placeholder="$t('views.home.createUser.password.placeholder')"
        />
        <as-input
          type="password"
          :label="$t('views.home.createUser.repeatPassword.label')"
          :placeholder="$t('views.home.createUser.repeatPassword.placeholder')"
        />
      </div>
      <as-button>
        {{ $t('views.home.createUser.enterButton') }}
      </as-button>
    </form>
  </as-card>
</template>

<script lang="ts" setup>
import AsCard from '@/library/components/atoms/as-card/AsCard.vue';
import AsInput from '@/library/components/atoms/as-input/AsInput.vue';
import AsButton from '@/library/components/atoms/as-button/AsButton.vue';
</script>

<style lang="scss" scoped>
.create-user-form {
  &__inputs-container {
    display: flex;
    gap: 16px;
    margin-bottom: 10px;
  }
}
</style>
