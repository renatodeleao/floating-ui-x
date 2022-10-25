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

/**
 * THESE DO NOT EXIST IN THE ORIGINAL PACKAGE.
 * Created as helpers to make demos cleaner, decided to export them anyways.
 */

/**
 * Middleware for auto-applying computedArrowPosition as "style" to arrow element
 * @protected
 */
export function arrowPosition(options) {
  const { element } = options;
  return {
    name: 'arrowPosition',
    options,
    fn({ placement, middlewareData }) {
      const $element = unref(element);
      const { arrow } = middlewareData;

      if (!arrow) {
        console.error('Please call this after arrow middleware.');
        return {};
      }

      const position = computeArrowPosition({
        element: $element,
        placement,
        middlewareData,
      });
      Object.assign($element.style, position);
      return {};
    },
  };
}

/**
 * Utility function that returns a position "style" object to be applied
 * to the arrow element. This is called under the hood by arrowPosition middleware
 * but i can be used manually as a computed property for ex
 * @protected
 * {@link https://floating-ui.com/docs/tutorial#arrow-middleware}
 */
export function computeArrowPosition({ element, placement, middlewareData }) {
  const $element = unref(element);
  const $placement = unref(placement);
  const $middlewareData = unref(middlewareData);
  const dimensions = {
    width: $element.clientWidth,
    height: $element.clientHeight,
  };
  const {
    arrow: { x: arrowX, y: arrowY },
  } = $middlewareData;

  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[$placement.split('-')[0]];

  const staticSideOffset = {
    top: `-${dimensions.height / 2}px`,
    right: `-${dimensions.width / 2}px`,
    left: `-${dimensions.width / 2}px`,
    bottom: `-${dimensions.height / 2}px`,
  }[staticSide];

  return {
    left: arrowX != null ? `${arrowX}px` : '',
    top: arrowY != null ? `${arrowY}px` : '',
    right: '',
    bottom: '',
    [staticSide]: staticSideOffset,
  };
}

