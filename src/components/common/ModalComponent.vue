<template>
  <div class="modal">
    <transition name="fade">
      <div v-if="props.isOpen" class="modal__mask"></div>
    </transition>
    <transition name="slide-fade">
      <div v-if="props.isOpen" class="modal__wrapper">
        <as-card ref="target" class="modal__container">
          <div class="modal-header">
            <font-awesome-icon
              :icon="iconType.SOLID + ' ' + iconName.XMARK"
              @click="emit('modal-close')"
            />
            <slot name="header"> </slot>
          </div>
          <div class="modal-body">
            <slot name="content"> </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer"> </slot>
          </div>
        </as-card>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';

import { iconType, iconName } from '@/models/icons/fontawesome/iconsDictionary';

import AsCard from '@/library/components/atoms/as-card/AsCard.vue';

import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(['modal-close']);

const target = ref(null);

onClickOutside(target, () => emit('modal-close'));
</script>

<style lang="scss" scoped>
.modal {
  &__mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0 0 0 / 50%);
  }

  &__wrapper {
    position: fixed;
    z-index: 9999;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__container {
    width: 300px;
  }
}
</style>
