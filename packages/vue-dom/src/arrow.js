import { unref } from 'vue';
import { arrow as arrowCore } from '@floating-ui/dom';
import { unrefElement } from './utils';

/**
 * @param {import('./index').ArrowOptions} options
 * @returns {import('./index').Middleware}
 */
export function arrow(options) {
  const { element, padding } = options;
  return {
    name: 'arrow',
    options,
    /**
     * @param {import('./index').MiddlewareArguments} args
     * @return {object}
     */
    fn(args) {
      const $element = unrefElement(element);
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
 * @param {import('./index').ArrowPositionOptions} options
 * @returns {import('./index').Middleware}
 */
export function arrowPosition(options) {
  const { element } = options;
  return {
    name: 'arrowPosition',
    options,
    fn({ placement, middlewareData }) {
      const $element = unrefElement(element);

      if ($element) {
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
      }

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
 * @param {import('./index').ComputeArrowPositionOptions} options
 * @return {import('./index').ComputeArrowPositionReturn}
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
    // @ts-ignore
    arrow: { x: arrowX, y: arrowY },
  } = $middlewareData;

  /** @type {string} */
  // @ts-ignore
  const staticSide = {
    top: 'bottom',
    right: 'left',
    bottom: 'top',
    left: 'right',
  }[$placement.split('-')[0]];

  // @ts-ignore
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
    // @ts-ignore
    [staticSide]: staticSideOffset,
  };
}
