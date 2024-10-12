<script lang="ts" setup>
const props = defineProps<{
  imgSrc: string;
  title: string;
}>();
</script>

<template>
  <aside class="main-sidebar-layout">
    <h1 class="main-sidebar-layout__title">
      <img
        :src="props.imgSrc"
        width="32"
        height="30"
        :title="$t('common.components.sidebar.titleImgAlt')"
        :alt="$t('common.components.sidebar.titleImgTitle')"
      />
      <span class="main-sidebar-layout__title-text">{{ props.title }}</span>
    </h1>
    <nav class="main-sidebar-layout__main-nav">
      <slot name="nav-content-main" />
    </nav>
    <nav class="main-sidebar-layout__footer">
      <slot name="nav-content-footer" />
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
@import 'main-sidebar-layout';
</style>
