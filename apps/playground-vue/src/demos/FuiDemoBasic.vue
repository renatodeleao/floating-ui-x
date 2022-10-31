<script setup>
import { FuiBox, FuiWindow } from '../components';
import { useFloating } from 'floating-ui.vue-dom';
const { x, y, reference, floating, strategy } = useFloating();
</script>

<template>
  <FuiBox
    title="Basic"
    description="Dynamically positions your floating element relative to the reference one. By default, it does not automatically update position on resize/scroll."
  >
    <FuiWindow title="Basic">
      <span ref="reference" class="fui-reference">Reference</span>
      <div
        ref="floating"
        class="fui-floating"
        :style="{
          position: strategy,
          top: y ? `${y}px` : '',
          left: x ? `${x}px` : '',
          width: 'max-content',
        }"
      >
        Floating element
      </div>
    </FuiWindow>
  </FuiBox>
</template>
