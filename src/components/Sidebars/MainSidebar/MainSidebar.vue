<template>
  <main-sidebar-layout
    :title="$t('common.components.sidebar.title')"
    img-src="/img/appointment-logo.svg"
  >
    <template #nav-content-main>
      <main-sidebar-nav-content-main />
    </template>
    <template #nav-content-footer>
      <main-sidebar-nav-content-footer />
    </template>
  </main-sidebar-layout>
</template>
<script lang="ts" setup>
import MainSidebarLayout from '@/components/Layouts/MainSidebarLayout/MainSidebarLayout.vue';
import MainSidebarNavContentMain from '@/components/Sidebars/MainSidebar/MainSidebarNavContentMain.vue';
import MainSidebarNavContentFooter from '@/components/Sidebars/MainSidebar/MainSidebarNavContentFooter.vue';
</script>
<style lang="scss" scoped>
.main-sidebar {
  &__nav-container {
    display: flex;
    flex-direction: column;
    gap: $spacing-medium;

    @include mq-touch {
      align-items: center;
    }
  }
}
</style>
