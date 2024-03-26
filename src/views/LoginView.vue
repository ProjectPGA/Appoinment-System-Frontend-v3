<template>
  <div>
    <button-translation />
    <section>
      <div>
        <div>
          <logo-app />
        </div>
      </div>
      <div>
        <div>
          <h1>
            {{ $t('common.title.login') }}
          </h1>
          <main-login-form />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import LogoApp from '@/components/Navigation/LogoApp.vue';
import MainLoginForm from '@/components/Login/MainLoginForm.vue';
import ButtonTranslation from '@/components/common/ButtonTranslation.vue';
</script>
