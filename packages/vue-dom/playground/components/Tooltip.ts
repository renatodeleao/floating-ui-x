// @ts-ignore
import {
  toRefs,
  computed,
  ref,
  defineComponent,
  PropType,
  inject,
  provide,
  Ref,
  watch,
} from 'vue';

import {
  useFloating,
  Placement,
  UseFloatingReturn,
  arrow,
  arrowPosition,
  autoUpdate,
  offset,
} from 'floating-ui.vue-dom';

import { render } from '../utils/render';

const contextSymbol = Symbol('FuiTooltip');
type UseTooltipContextReturn = {
  useFloatingReturn: UseFloatingReturn;
  toggle: Function;
  shown: Ref<boolean>;
  arrowRef: Ref<HTMLElement | null>;
};

export const useTooltipContext = () => {
  return inject(contextSymbol) as UseTooltipContextReturn;
};

/**
 * Provider/Orchestrator Fragment
 */
export const FuiTooltip = defineComponent({
  name: 'FuiTooltip',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom',
    },
  },
  setup(props, { slots }) {
    const { placement } = toRefs(props);
    const arrowRef = ref(null);
    const offsetRef = ref(0);

    const middleware = computed(() => [
      offset(offsetRef.value),
      arrow({ element: arrowRef }),
      arrowPosition({ element: arrowRef }),
    ]);

    const useFloatingReturn = useFloating({
      placement,
      whileElementsMounted: autoUpdate,
      middleware,
    });

    const shown = ref(true);
    function toggle() {
      shown.value = !shown.value;
    }

    provide(contextSymbol, {
      useFloatingReturn,
      toggle,
      shown,
      arrowRef,
      offsetRef,
    });

    return () => {
      let children = slots.default?.();

      return children;
    };
  },
});

export const FuiTooltipReference = defineComponent({
  name: 'FuiTooltipReference',
  props: {
    asTemplate: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots, attrs }) {
    const { useFloatingReturn, toggle, shown } = useTooltipContext();
    const { reference } = useFloatingReturn;

    return () => {
      const slotScope = { isOpen: shown.value, ref: reference };
      const ourProps = {
        ref: (vnode) => {
          // if component has multiple root nodes we need to warn that is not possible
          // and that the ref should be forwarded to to the correct root node
          reference.value = vnode.$el ?? vnode;
        },
        onClick: (e) => {
          if (props.disabled) return;
          toggle(e);
        },
      };

      return render({
        ourProps,
        props,
        attrs,
        slots,
        slotScope,
        name: 'FuiTooltipReference',
      });
    };
  },
});

export const FuiTooltipFloating = defineComponent({
  name: 'FuiTooltipFloating',
  props: {
    offset: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { slots }) {
    const { useFloatingReturn, shown, offsetRef } = useTooltipContext();
    const { floating, strategy, y, x } = useFloatingReturn;

    watch(
      () => props.offset,
      (val) => (offsetRef.value = val),
      { immediate: true }
    );

    const style = computed(() => ({
      position: strategy.value,
      top: y.value ? `${y.value}px` : '',
      left: x.value ? `${x.value}px` : '',
      width: 'max-content',
    }));

    return () => {
      return shown.value
        ? render({
            name: 'FuiTooltipFloating',
            ourProps: {
              ref: floating,
              style: style.value,
            },
            slots,
          })
        : null;
    };
  },
});

export const FuiTooltipArrow = defineComponent({
  name: 'FuiTooltipArrow',
  setup(_, { slots }) {
    const { arrowRef } = useTooltipContext();

    return () =>
      render({
        name: 'FuiTooltipArrow',
        ourProps: {
          ref: arrowRef,
        },
        slots,
      });
  },
});
