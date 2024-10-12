<!-- eslint-disable @intlify/vue-i18n/no-raw-text -->
<script lang="ts" setup>
import { computed } from 'vue';
import AsBadge from '@/library/components/atoms/as-badge/AsBadge.vue';
import AsTypographyTable from '@/library/components/fundations/as-typography/template/AsTypographyTable.vue';
import { fontSizings } from '@/library/components/fundations/as-typography/constants';

const props = defineProps<{
  /**
   * The category of font-sizing (i.e heading)
   */
  category: string;
  /**
   * The size of font-sizing (i.e small)
   */
  size: string;
  /**
   * The weight of font-sizing (i.e semi)
   */
  weight?: string;
}>();

const classObject = computed(() => ({
  [`is-${props.category}`]: true,
  [`is-${props.size}`]: true,
  [`is-${props.weight}`]: true,
}));
</script>

<template>
  <section class="story">
    <h1 class="story__title as-typography is-heading is-medium">
      Typography
      <AsBadge type="success" size="small" class="class-badge"
        >.as-typography</AsBadge
      >
    </h1>
    <section class="story__customizable">
      <h2 class="story__customizable-title as-typography is-heading is-small">
        Customizable
      </h2>
      <article class="story__customizable-content">
        <span
          class="story__customizable-example as-typography"
          :class="classObject"
          >Typography text example</span
        >
      </article>
    </section>
    <AsTypographyTable
      v-for="item in fontSizings"
      :key="item.category"
      :category="item.category"
      :sizings="item.sizings"
    />
  </section>
</template>

<style lang="scss" scoped>
.story {
  &__title {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 12px;
  }

  &__customizable {
    margin: 24px 0 32px;
  }

  &__customizable-example {
    border-radius: $border-radius-xs;
    padding: 4px 8px;
    background-color: $colors-white-10;
  }

  &__customizable-classes {
    display: flex;
    gap: 8px;
  }

  &__customizable-content {
    margin-top: 10px;
  }
}
</style>
