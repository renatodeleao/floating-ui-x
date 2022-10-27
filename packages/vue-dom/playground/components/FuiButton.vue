<template>
  <div class="fui-button">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'FuiButton',
};
</script>

<style lang="scss">
.fui-button {
  background: orange;
  border-radius: 6px;
  padding: 8px 12px;
  appearance: none;
}
</style>
