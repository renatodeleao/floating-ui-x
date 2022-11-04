import { useFloating as usePosition } from 'floating-ui-x-vue';
import { ref } from 'vue';
import { useInteractions } from './useInteractions';

/**
 * @param {import('./index').UseFloatingProps} options
 * @return {import('./index').UseFloatingReturn}
 */
export function useFloating({ open, interactions, ...restProps }) {
  const position = usePosition(restProps);
  const dataRef = ref({}); // context data for events
  const context = {
    open,
    dataRef,
    refs: {
      reference: position.reference,
      floating: position.floating,
    },
  };

  // EXPERIMENT, original package calls this outside
  const interactionProps = useInteractions(
    interactions.map((itx) => itx.fn(context))
  );

  return {
    ...position,
    interactionProps,
    context,
  };
}
