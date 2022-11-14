import { unref } from 'vue';

/**
 * It's an extended version o @vueuse/core unrefElement with a little more info
 * an does not support getters yet.
 * checks nodeType to prevent assignment of text/comment nodes
 * @note still unsure if this belongs here on userland, but it might be weird to
 * bind a ref to a component and not work by default
 * @since 0.1.0
 * @example why i've added this.
 * ```vue
 * <script setup>
 *   const { reference, floating } = useFloating()
 * </script>
 *
 * <template>
 *   <!-- works out of the box -->
 *   <div ref="reference" />
 *   <!-- does not work out of the box -->
 *   <some-component ref="reference" />
 *
 *   <!-- consumers would have to do this manually -->
 *   <some component :ref="(componentPublicInstance) => reference = componentPublicInstance.$el" />
 *   <!-- or forward the ref as a prop and internally bind it to the element. -->
 *   <some component :forward-this-ref="reference" />
 * </template>
 *```
 *
 * @template T
 * @param {import('./types.js').MaybeRef<T>} templateRefBinding
 * @see {@link https://vueuse.org/core/unrefelement/#unrefelement}
 * @see {@link https://vuejs.org/guide/essentials/template-refs.html#ref-on-component}
 *
 */
export function unrefElement(templateRefBinding) {
  const templateRef = unref(templateRefBinding);
  if (templateRef === null || templateRef === undefined) return templateRef;

  if (templateRef.$el?.nodeType === 1) {
    // is a component and root is a single Element node
    return templateRef.$el;
  } else if (templateRef.$el) {
    // is a component, but a either multi-root node or and invalid one (ex: text only)
    console.warn(
      `You have assign assigned tge ref to a component, but its root node is not a valid Element.
      Check if you have a multi-root node component or text/comment nodes. If your component has
      multiple root elements intentionally, please forward the ref to your desired target el.`
    );
    return templateRef.$el.nextElementSibling;
  } else {
    if (templateRef.nodeType !== 1) {
      // is not an Element node, so not valid argument
      console.warn(
        '[floating-ui-x] invalid ref assignment: please assign the ref to valid Element or Component'
      );
    }

    // Not a component, but a raw an DOM Element node
    return templateRef;
  }
}
