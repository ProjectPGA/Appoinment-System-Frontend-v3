<template>
  <section class="typography">
    <article>
      <h3 class="typography__title">
        {{ $props.category }}
        <AsBadge type="success" size="small" class="class-badge">{{
          `.is-${$props.category.toLowerCase()}`
        }}</AsBadge>
      </h3>
      <table class="typography__table">
        <thead class="typography__table-head">
          <tr>
            <th class="typography__table-head-cell">Type</th>
            <th class="typography__table-head-cell">Class</th>
            <th class="typography__table-head-cell">Mixin</th>
          </tr>
        </thead>
        <tbody class="typography__table-body">
          <tr
            v-for="item in $props.sizings"
            :key="item.fontSizing"
            class="typography__table-body-row"
          >
            <td class="typography__table-body-cell is-type">
              {{ item.fontSizing }}
            </td>
            <td class="typography__table-body-cell is-class">
              <AsBadge
                v-for="classItem in item.extraClasses"
                :key="classItem"
                type="success"
                size="small"
                class="class-badge"
                >{{ classItem }}</AsBadge
              >
            </td>
            <td class="typography__table-body-cell">
              <code>{{
                `@include font-sizing-selector('${item.fontSizing}')`
              }}</code>
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  </section>
</template>
<script lang="ts" setup>
import { AsTypography } from '@/library/models/fundations/AsTypography';
import AsBadge from '@/library/components/atoms/as-badge/AsBadge.vue';

defineProps<AsTypography>();
</script>
<style lang="scss" scoped>
.typography {
  margin-bottom: 24px;

  &__title {
    @include font-sizing-selector('heading/small');
  }

  &__table {
    margin-top: 12px;
    box-shadow: rgb(0 0 0 / 10%) 0 1px 3px 0;
  }

  &__table-head {
    @include font-sizing-selector('body/medium/semi');

    background-color: $main-color-dark;
    color: $colors-neutral-white-20;
  }

  &__table-head-cell {
    padding: 8px;
    text-align: left;
  }

  &__table-body-row {
    background-color: $colors-info-10;

    &:not(:last-child) {
      border-bottom: 1px solid $colors-neutral-white-10;
    }
  }

  &__table-body-cell {
    padding: 12px 8px;
    text-align: left;

    &.is-type {
      @include font-sizing-selector('body/large/semi');
    }

    &.is-class {
      display: flex;
      gap: 8px;
    }
  }
}
</style>
