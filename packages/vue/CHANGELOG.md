# floating-ui-x-vue

## 0.0.0-initial-20221104174409

### Minor Changes

- fix: faulty package.json preventing module import

## 0.0.0-initial-20221104164148

### Minor Changes

- - Initial version of `useFloating` vue: almost 100% match the original react
    counterpart with one exception: it does not return a `refs` object, since in
    vue it's possible to just use returned `reference` + `floating` refs
    directly. Note that i might just return wrap the above references in refs
    object just for the sake of feature-parity.
  - Includes _vueifyed_ `arrow` middleware, which just unrefs the template ref
    provided to the element option in order to extract the HTMLElement node and
    forwards `@floating-ui/dom` `arrow` middleware call.

  ### Extras (not included in original package):

  - Exports `computeArrowPosition` util, basically encapsulates
    [the tutorial of the original package](https://floating-ui.com/docs/tutorial#arrow-middleware)
    to create the correct styles positioning object for the `floating` element
    instead of doing it manually. (It's easy to forget and it does not add that
    much weight)
  - **(experimental)** Exports `arrowPosition` `middleware` which calls the
    above util internally and mutates the DOM node automatically
