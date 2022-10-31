import { h, cloneVNode, mergeProps, Fragment, VNode } from 'vue';

export function render({
  ourProps,
  props = {},
  attrs = {},
  slots,
  slotScope = {},
  name,
}) {
  let children = slots.default?.(slotScope);
  const theProps = mergeProps(ourProps, props);

  if (theProps.asTemplate) {
    children = flattenFragments(children ?? []);
    let [template, ...other] = children;

    if (!isValidElement(template)) {
      throw Error(
        `The current component <${name} /> is rendering "asTemplate", but provided child (slot) is not a valid element.
        Please provide a single element as the child so that we can forward the props and events onto that element.`
      );
    }

    return cloneVNode(template, theProps);
  }

  return h('div', theProps, children);
}

/**
 * When passed a structure like this:
 * <Example><span>something</span></Example>
 *
 * And Example is defined as:
 * <SomeComponent><slot /></SomeComponent>
 *
 * We need to turn the fragment that <slot> represents into the slot.
 * Luckily by this point it's already rendered into an array of VNodes
 * for us so we can just flatten it directly.
 *
 * We have to do this recursively because there could be multiple
 * levels of Component nesting all with <slot> elements interspersed
 * @credits headless.ui https://github.com/tailwindlabs/headlessui/blob/f66f4926c489fc15289d528294c23a3dc2aee7b1/packages/%40headlessui-vue/src/utils/render.ts#L155-L180
 * @param children
 * @returns
 */
export function flattenFragments(children: VNode[]): VNode[] {
  return children.flatMap((child) => {
    if (child.type === Fragment) {
      return flattenFragments(child.children as VNode[]);
    }

    return [child];
  });
}

/**
 * @credits headless.ui https://github.com/tailwindlabs/headlessui/blob/f66f4926c489fc15289d528294c23a3dc2aee7b1/packages/%40headlessui-vue/src/utils/render.ts#L155-L180
 */
export function isValidElement(input: any): boolean {
  if (input == null) return false; // No children
  if (typeof input.type === 'string') return true; // 'div', 'span', ...
  if (typeof input.type === 'object') return true; // Other components
  if (typeof input.type === 'function') return true; // Built-ins like Transition
  return false; // Comments, strings, ...
}
