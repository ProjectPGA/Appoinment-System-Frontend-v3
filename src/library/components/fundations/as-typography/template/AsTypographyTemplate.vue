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
<script lang="ts" setup>
import { computed } from 'vue';
import AsBadge from '@/library/components/atoms/as-badge/AsBadge.vue';
import AsTypographyTable from '@/library/components/fundations/as-typography/template/AsTypographyTable.vue';
import { AsTypography } from '@/library/models/fundations/AsTypography';
const props = defineProps<{
  args: {
    head: string;
    size: string;
    weight?: string;
  };
}>();

const classObject = computed(() => ({
  [`is-${props.args.head}`]: true,
  [`is-${props.args.size}`]: true,
  [`is-${props.args.weight}`]:
    props.args.weight && props.args.head !== 'heading' ? true : false,
}));

const fontSizings: Array<AsTypography> = [
  {
    category: 'Heading',
    sizings: [
      {
        fontSizing: 'heading/extralarge',
        extraClasses: ['.is-extralarge'],
      },
      {
        fontSizing: 'heading/large',
        extraClasses: ['.is-large'],
      },
      {
        fontSizing: 'heading/medium',
        extraClasses: ['.is-medium'],
      },
      {
        fontSizing: 'heading/small',
        extraClasses: ['.is-small'],
      },
    ],
  },
  {
    category: 'Body',
    sizings: [
      {
        fontSizing: 'body/extralarge/regular',
        extraClasses: ['.is-extralarge', '.is-regular'],
      },
      {
        fontSizing: 'body/extralarge/semi',
        extraClasses: ['.is-extralarge', '.is-semi'],
      },
      {
        fontSizing: 'body/extralarge/bold',
        extraClasses: ['.is-extralarge', '.is-bold'],
      },
      {
        fontSizing: 'body/large/regular',
        extraClasses: ['.is-large', '.is-regular'],
      },
      {
        fontSizing: 'body/large/semi',
        extraClasses: ['.is-large', '.is-semi'],
      },
      {
        fontSizing: 'body/large/bold',
        extraClasses: ['.is-large', '.is-bold'],
      },
      {
        fontSizing: 'body/medium/regular',
        extraClasses: ['.is-medium', '.is-regular'],
      },
      {
        fontSizing: 'body/medium/semi',
        extraClasses: ['.is-medium', '.is-semi'],
      },
      {
        fontSizing: 'body/medium/bold',
        extraClasses: ['.is-medium', '.is-bold'],
      },
      {
        fontSizing: 'body/small/regular',
        extraClasses: ['.is-small', '.is-regular'],
      },
      {
        fontSizing: 'body/small/semi',
        extraClasses: ['.is-small', '.is-semi'],
      },
      {
        fontSizing: 'body/small/bold',
        extraClasses: ['.is-small', '.is-bold'],
      },
    ],
  },
  {
    category: 'Button',
    sizings: [
      {
        fontSizing: 'button/large/regular',
        extraClasses: ['.is-large', '.is-regular'],
      },
      {
        fontSizing: 'button/large/semi',
        extraClasses: ['.is-large', '.is-semi'],
      },
      {
        fontSizing: 'button/large/bold',
        extraClasses: ['.is-large', '.is-bold'],
      },
      {
        fontSizing: 'button/medium/regular',
        extraClasses: ['.is-medium', '.is-regular'],
      },
      {
        fontSizing: 'button/medium/semi',
        extraClasses: ['.is-medium', '.is-semi'],
      },
      {
        fontSizing: 'button/medium/bold',
        extraClasses: ['.is-medium', '.is-bold'],
      },
      {
        fontSizing: 'button/small/regular',
        extraClasses: ['.is-small', '.is-regular'],
      },
      {
        fontSizing: 'button/small/semi',
        extraClasses: ['.is-small', '.is-semi'],
      },
      {
        fontSizing: 'button/small/bold',
        extraClasses: ['.is-small', '.is-bold'],
      },
    ],
  },
];
</script>
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
    border-radius: 4px;
    padding: 4px 8px;
    background-color: $colors-neutral-white-10;
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
