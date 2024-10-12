<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    /**
     * Url of user profile image
     */
    profileImageUrl?: string;
    /**
     * Url of user profile image
     */
    profileImageUrlSmall?: string;
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
    profileImageUrlSmall: '/img/default-profile-image-40.webp',
    userName: 'Name',
    userSurname: 'Surname',
    userEmail: 'email@email.com',
    active: false,
  }
);
</script>

<template>
  <div class="as-profile-card" :class="{ 'is-active': props.active }">
    <picture>
      <source
        media="(max-width:1023px)"
        width="40"
        height="40"
        :srcset="
          props.profileImageUrlSmall ?? '/img/default-profile-image-40.webp'
        "
      />
      <source
        media="(min-width:1024px)"
        width="54"
        height="54"
        :srcset="props.profileImageUrl ?? '/img/default-profile-image.webp'"
      />
      <img
        class="as-profile-card__image"
        :src="props.profileImageUrl ?? '/img/default-profile-image.webp'"
        width="54"
        height="54"
        title="Profile image"
        alt="User profile image"
      />
    </picture>
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

<style lang="scss" scoped>
@import 'as-profile-card';
</style>
