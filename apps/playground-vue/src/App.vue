<script setup>
import {
  FuiDemoBasic,
  FuiDemoBasicArrow,
  FuiDemoBasicVirtualElement,
  FuiDemoCompoundComponent,
  FuiDemoBasicInteractions,
  FuiDemoBasicComponentRefs,
} from './demos';
</script>

<template>
  <div class="fui-grid">
    <FuiDemoBasic />
    <FuiDemoBasicArrow />
    <FuiDemoBasicVirtualElement />
    <FuiDemoCompoundComponent />
    <FuiDemoBasicInteractions />
    <FuiDemoBasicComponentRefs />
  </div>
</template>

<style lang="scss">
.fui-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
}
</style>
