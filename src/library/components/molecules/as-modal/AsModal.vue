<template>
  <div class="as-modal">
    <transition name="fade">
      <div v-if="props.isOpen" class="as-modal__mask"></div>
    </transition>
    <transition name="slide-fade">
      <div v-if="props.isOpen" class="as-modal__wrapper">
        <as-card ref="target" class="as-modal__container">
          <div class="as-modal__header">
            <font-awesome-icon
              class="as-modal__close"
              :icon="iconType.SOLID + ' ' + iconName.XMARK"
              @click="emit('modal-close')"
            />
            <slot name="header"> </slot>
          </div>
          <div class="as-modal__body">
            <slot name="content"> </slot>
          </div>
          <div v-if="props.hasFooter" class="as-modal__footer">
            <slot name="footer"> </slot>
          </div>
        </as-card>
      </div>
    </transition>
  </div>
</template>

<script setup>
import './as-modal.scss';

import { ref } from 'vue';

import { iconType, iconName } from '@/models/icons/fontawesome/iconsDictionary';

import AsCard from '@/library/components/atoms/as-card/AsCard.vue';

import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  hasFooter: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['modal-close']);

const target = ref(null);

onClickOutside(target, () => emit('modal-close'));
</script>
