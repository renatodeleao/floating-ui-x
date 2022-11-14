<script setup>
// https://github.com/floating-ui/floating-ui/blob/8670939a7f72587e53d726b481570be0e3b59253/website/pages/index.js#L410
import { FuiBox, FuiWindow } from '../components';
import { useFloating, shift } from 'floating-ui-x-vue';
import { ref, reactive, computed, watchEffect } from 'vue';

const { x, y, reference, floating } = useFloating({
  placement: 'top',
  middleware: [
    shift({
      crossAxis: true,
      padding: 5,
      rootBoundary: 'document',
    }),
  ],
});

const boundary = ref(null);
const mouse = reactive({ x: 0, y: 0 });
const virtualEl = computed(() => {
  const { x, y } = mouse;
  return {
    getBoundingClientRect: () => {
      return {
        width: 0,
        height: 0,
        x: x,
        y: y,
        top: y,
        left: x,
      };
    },
  };
});

watchEffect(() => {
  reference.value = virtualEl.value;

  if (boundary.value) {
    boundary.value.addEventListener('mousemove', onMousemove);
  } else {
    boundary.value?.removeEventListener('mousemove', onMousemove);
  }
});

function onMousemove({ clientX: x, clientY: y }) {
  Object.assign(mouse, { x, y });
}
</script>

<template>
  <FuiBox
    title="Virtual Element"
    description="Dynamically positions your floating element relative to the mouse position."
  >
    <FuiWindow
      title="Stalk me floater"
      :forward-ref-content="(tr) => (boundary = tr)"
    >
      {{ { mouseX: mouse.x, mouseY: mouse.y, x, y } }}
      <div
        ref="floating"
        class="fui-floating"
        :style="{
          position: 'absolute',
          transform: `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0)`,
          top: 0,
          left: 0,
          width: 'max-content',
          background: 'yellow',
          'z-index': 1000,
        }"
      >
        Floating element
      </div>
    </FuiWindow>
  </FuiBox>
</template>
