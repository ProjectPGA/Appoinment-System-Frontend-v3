<script lang="ts" setup>
import './as-modal.scss';

import { ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import { IconType, IconName } from '@/models/icons/fontawesome/iconsDictionary';

import AsCard from '@/library/components/atoms/as-card/AsCard.vue';

import { onClickOutside } from '@vueuse/core';

interface Props {
  isOpen: boolean;
  hasFooter: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'modalClose'): void;
}>();

const target = ref<HTMLElement | null>(null);

onClickOutside(target, () => emit('modalClose'));
</script>

<template>
  <div class="as-modal">
    <transition name="fade">
      <div v-if="props.isOpen" class="as-modal__mask"></div>
    </transition>
    <transition name="slide-fade">
      <div v-if="props.isOpen" class="as-modal__wrapper">
        <AsCard ref="target" class="as-modal__container">
          <div class="as-modal__header">
            <FontAwesomeIcon
              class="as-modal__close"
              :icon="IconType.SOLID + ' ' + IconName.XMARK"
              @click="emit('modalClose')"
            />
            <slot name="header"> </slot>
          </div>
          <div class="as-modal__body">
            <slot name="content"> </slot>
          </div>
          <div v-if="props.hasFooter" class="as-modal__footer">
            <slot name="footer"> </slot>
          </div>
        </AsCard>
      </div>
    </transition>
  </div>
</template>
