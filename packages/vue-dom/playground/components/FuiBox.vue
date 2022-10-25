<script setup>
import { defineProps } from 'vue';

defineProps({
  title: String,
  description: String,
});
</script>

<template>
  <div class="fui-box">
    <h1 class="fui-box__title">{{ title }}</h1>
    <p class="fui-box__description">{{ description }}</p>
    <slot />
  </div>
</template>

<style lang="scss">
.fui-box {
  background-color: var(--bg-color-dim);
  border-radius: 6px;
  padding: 16px;

  &__title {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  &__description {
    margin-top: 0;
    margin-bottom: 1rem;
  }
}
</style>
