import { mergeProps } from 'vue';

/**
 * Merge props without overriding listeners.
 * @param {Array} propsList
 * @returns {Object}
 */
// [ useClick(), useHover ]
// [ { reference: { onClick, onMousedown } }, { reference: { onMousedown, onMouseup } }]
// { reference: { onClick, onMousedown: [ onMousedown, onMousedown], onMouseUp } }
export function useInteractions(propsList) {
  return propsList.reduce(
    (acc, propsMap) => {
      acc = {
        reference: propsMap.reference
          ? mergeProps(acc.reference, propsMap.reference)
          : acc.ref,
        floating: propsMap.floating
          ? mergeProps(acc.floating, propsMap.floating)
          : acc.floating,
      };

      return acc;
    },
    { reference: {}, floating: { tabIndex: -1 } }
  );
}
