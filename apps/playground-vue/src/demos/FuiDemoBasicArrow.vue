<script setup>
import { FuiBox, FuiWindow } from '../components';
import { ref, computed } from 'vue';

import {
  useFloating,
  arrow,
  computeArrowPosition,
  arrowPosition,
  offset,
  autoUpdate,
} from 'floating-ui-x-vue';

const arrowRef = ref(null);
const { x, y, reference, floating, strategy, placement, middlewareData } =
  useFloating({
    placement: 'top-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      arrow({ element: arrowRef }),
      arrowPosition({ element: arrowRef }),
    ],
  });

/**
 * We could manually compute the styles ourselves if not
 * using arrowPosition middleware
 */
// eslint-disable-next-line
const arrowStyles = computed(() => {
  return computeArrowPosition({
    element: arrowRef,
    placement,
    middlewareData,
  });
});
</script>

<template>
  <FuiBox
    title="Basic Arrow"
    description="Dynamically positions arrow element inside the floating element."
  >
    <FuiWindow title="Basic Arrow">
      <span ref="reference" class="fui-reference">Reference</span>
      <div
        ref="floating"
        class="fui-floating"
        :style="{
          position: strategy,
          transform: `translate3d(${x ?? 0}px, ${y ?? 0}px, 0px)`,
          top: '0px',
          left: '0px',
          width: 'max-content',
        }"
      >
        <span ref="arrowRef" class="fui-arrow" />
        Floating element
      </div>
    </FuiWindow>
  </FuiBox>
</template>
