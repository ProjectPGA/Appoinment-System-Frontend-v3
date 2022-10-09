<template>
  <div class="container has-text-centered">
    <img
      height="115"
      width="340"
      @click="toHome"
      class="logo"
      src="../../assets/img/logo.svg"
      :alt="$t('titles.altImage')"
    />
  </div>
</template>

<script setup lang="ts">
//   function toHome(): void {
//     if (this.$route.path !== '/') {
//       this.$router.push('/');
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.logo {
  height: 7.188rem;
  width: 21.25rem;
  cursor: pointer;
  @include mobile {
    width: 50%;
    height: 50%;
  }
}
</style>
