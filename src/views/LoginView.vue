<template>
  <button-translation />
  <section class="login-view">
    <as-card>
      <h1>
        {{ $t('common.title.login') }}
      </h1>
      <main-login-form />
    </as-card>
  </section>
</template>

<script lang="ts" setup>
import MainLoginForm from '@/components/Login/MainLoginForm.vue';
import ButtonTranslation from '@/components/common/ButtonTranslation.vue';
import AsCard from '@/library/atoms/as-card/AsCard.vue';
</script>
<style lang="scss" scoped>
.login-view {
  display: flex;
}
</style>
