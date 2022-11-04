import { Ref, ToRefs } from 'vue';
import {
  MaybeRef,
  UseFloatingReturn as UseFloatingReturnVueDom,
  UseFloatingProps as UseFloatingPropsVueDom,
} from 'floating-ui-x-vue';

export * from 'floating-ui-x-vue';

export type UseFloatingContext = {
  open: Ref<boolean>;
};
export type UseFloatingReturn = UseFloatingReturnVueDom & {
  context: UseFloatingContext;
};

export type UseFloatingProps = UseFloatingPropsVueDom & {
  open: Ref<boolean>;
};

export function useFloating({
  open,
  placement,
  middleware,
  strategy,
  whileElementsMounted,
}?: UseFloatingProps): UseFloatingReturn;
