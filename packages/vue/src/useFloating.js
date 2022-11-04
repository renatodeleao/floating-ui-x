import { ref, watch, toRefs, unref, reactive, computed } from 'vue';
import { computePosition } from '@floating-ui/dom';
import { unrefElement } from './utils';
/**
 * @param {import('./index').UseFloatingProps} options
 * @return {import('./index').UseFloatingReturn}
 */
export function useFloating({
  middleware,
  placement = 'bottom',
  strategy = 'absolute',
  whileElementsMounted,
} = {}) {
  const reference = ref(null);
  const floating = ref(null);
  const middlewareRef = ref(middleware);
  const placementRef = ref(placement);
  const strategyRef = ref(strategy);

  const referenceEl = computed(() => unrefElement(reference));
  const floatingEl = computed(() => unrefElement(floating));

  /**
   * Make tsc happy.
   * @template T
   * @typedef {import('vue').Ref<T>} Ref
   * @type {Ref<Function | void | null>}
   */
  const whileElementsMountedCleanupRef = ref(null);

  const data = reactive({
    // Setting these to `null` will allow the consumer to determine if
    // `computePosition()` has run yet
    x: null,
    y: null,
    placement: unref(placement),
    strategy: unref(strategy),
    middlewareData: ref({}),
  });

  const update = () => {
    if (!reference.value || !floating.value) {
      return;
    }

    return computePosition(referenceEl.value, floatingEl.value, {
      middleware: unref(middlewareRef),
      placement: unref(placement),
      strategy: unref(strategy),
    }).then((computedData) => {
      Object.assign(data, computedData);
      return computedData;
    });
  };

  watch([placementRef, strategyRef], update);
  watch(middlewareRef, update, { deep: true });

  watch([reference, floating], () => {
    if (whileElementsMountedCleanupRef.value) {
      whileElementsMountedCleanupRef.value();
      whileElementsMountedCleanupRef.value = null;
    }

    if (!reference.value || !floating.value) {
      return;
    }

    if (whileElementsMounted) {
      whileElementsMountedCleanupRef.value = whileElementsMounted(
        referenceEl.value,
        floatingEl.value,
        update
      );
    } else {
      update();
    }
  });

  return {
    ...toRefs(data),
    update,
    reference,
    floating,
  };
}
