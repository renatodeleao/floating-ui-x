<script setup>
import { ref } from 'vue';

import {
  FuiBox,
  FuiWindow,
  FuiButton,
  FuiFloating,
  FuiArrow,
} from '../components';

import {
  useFloating,
  arrow,
  computeArrowPosition,
  arrowPosition,
  offset,
  autoUpdate,
} from 'floating-ui.vue-dom';

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
</script>

<template>
  <FuiBox
    title="Basic Component"
    description="Binding refs (reference and floating) to Components works out of the box"
  >
    <FuiWindow title="Basic">
      <FuiButton ref="reference" class="fui-reference">
        Component Reference
      </FuiButton>
      <FuiFloating
        ref="floating"
        :style="{
          position: strategy,
          top: y ? `${y}px` : '',
          left: x ? `${x}px` : '',
          width: 'max-content',
        }"
      >
        <FuiArrow ref="arrowRef" />
        Floating Component
      </FuiFloating>
    </FuiWindow>
  </FuiBox>
</template>
