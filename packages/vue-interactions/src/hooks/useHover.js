import { ref } from 'vue';

export function useHover(context, options = {}) {
  const { open } = context;
  const { enabled = true, delay = 2000 } = options;

  if (!enabled) return {};

  const timer = ref(undefined);

  return {
    reference: {
      onMouseenter() {
        clearTimeout(timer.value);

        timer.value = setTimeout(() => {
          open.value = true;
        }, parseInt(delay));
      },
      onMouseleave() {
        clearTimeout(timer.value);

        timer.value = setTimeout(() => {
          open.value = false;
        }, parseInt(delay));
      },
    },
  };
}
