import { unref } from 'vue';
import { arrow as arrowCore } from '@floating-ui/dom';

export function arrow(options) {
  const { element, padding } = options;
  return {
    name: 'arrow',
    options,
    fn(args) {
      const $element = unref(element);
      if ($element != null) {
        return arrowCore({ element: $element, padding }).fn(args);
      }

      return {};
    },
  };
}

