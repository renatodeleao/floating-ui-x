<script setup>
import { FuiBox, FuiWindow } from '../components';
import { ref, computed } from 'vue';
import {
  // re-exports everything  'floating-ui.vue-dom'
  arrow,
  computeArrowPosition,
  arrowPosition,
  offset,
  autoUpdate,
  // hook
  useFloating,
  useClickInteractionware,
  useInteractions,
} from 'floating-ui.vue-dom-interactions';

const arrowRef = ref(null);
const openRef = ref(false);

const {
  x,
  y,
  reference,
  floating,
  strategy,
  placement,
  middlewareData,
  interactionProps: { reference: referenceProps, floating: floatingProps },
} = useFloating({
  open: openRef,
  placement: 'top-start',
  whileElementsMounted: autoUpdate,
  middleware: [
    offset(6),
    arrow({ element: arrowRef }),
    arrowPosition({ element: arrowRef }),
  ],
  interactions: [useClickInteractionware()],
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

function externallyToggleOpen() {
  openRef.value = !openRef.value;
}
</script>

<template>
  <FuiBox
    title="Basic Interactions"
    description="Adding basic interactive behaviour with floating-ui.vue-dom-interactions package"
  >
    <FuiWindow title="Interactions">
      <span ref="reference" class="fui-reference" v-bind="referenceProps">
        Click me Reference
      </span>
      <div
        v-if="openRef"
        ref="floating"
        class="fui-floating"
        :style="{
          position: strategy,
          top: y ? `${y}px` : '',
          left: x ? `${x}px` : '',
          width: 'max-content',
        }"
        v-bind="floatingProps"
      >
        <span ref="arrowRef" class="fui-arrow" />
        Floating element
      </div>

      <div>
        <button @click="externallyToggleOpen">External open control</button>
      </div>
    </FuiWindow>
  </FuiBox>
</template>
