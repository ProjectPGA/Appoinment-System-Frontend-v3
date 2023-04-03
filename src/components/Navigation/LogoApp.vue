<template>
  <div class="container has-text-centered">
    <img
      height="115"
      width="340"
      class="logo"
      src="../../assets/img/logo.svg"
      :alt="$t('common.images.logoApp.altText')"
    />
  </div>
</template>
<script lang="ts" setup></script>
<style lang="scss" scoped>
.logo {
  height: 7.188rem;
  width: 21.25rem;
  cursor: pointer;

  @include mobile {
    width: 60%;
  }
}
</style>
