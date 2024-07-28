<template>
  <div class="as-profile-card" :class="{ 'is-active': props.active }">
    <img
      title="Profile image"
      width="54"
      height="54"
      alt="User profile image"
      :src="props.profileImageUrl ?? '/img/default-profile-image.webp'"
      class="as-profile-card__image"
    />
    <div class="as-profile-card__user-info">
      <p class="as-profile-card__user-name">
        {{ `${props.userName} ${props.userSurname}` }}
      </p>
      <p class="as-profile-card__user-email">
        {{ props.userEmail }}
      </p>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**
     * Url of user profile image
     */
    profileImageUrl?: string;
    /**
     * User Name
     */
    userName?: string;
    /**
     * User Surname
     */
    userSurname?: string;
    /**
     * User Email
     */
    userEmail?: string;
    /**
     * Set is active state
     */
    active?: boolean;
  }>(),
  {
    profileImageUrl: '/img/default-profile-image.webp',
    userName: 'Name',
    userSurname: 'Surname',
    userEmail: 'email@email.com',
    isActive: false,
  }
);
</script>
<style lang="scss" scoped>
@import 'as-profile-card';
</style>
