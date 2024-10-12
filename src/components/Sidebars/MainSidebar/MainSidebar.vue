<script lang="ts" setup>
import MainSidebarLayout from '@/components/Layouts/MainSidebarLayout/MainSidebarLayout.vue';
import MainSidebarNavContentMain from '@/components/Sidebars/MainSidebar/MainSidebarNavContentMain.vue';
import MainSidebarNavContentFooter from '@/components/Sidebars/MainSidebar/MainSidebarNavContentFooter.vue';
</script>

<template>
  <MainSidebarLayout
    :title="$t('common.components.sidebar.title')"
    imgSrc="/img/appointment-logo.svg"
  >
    <template #nav-content-main>
      <MainSidebarNavContentMain />
    </template>
    <template #nav-content-footer>
      <MainSidebarNavContentFooter />
    </template>
  </MainSidebarLayout>
</template>
